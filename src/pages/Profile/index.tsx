import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { useState } from 'react';
import { IUser } from '@/entity/User/types';
import { useFieldArray, useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import Sms from '@/shared/assets/sms.svg?react';
import { calculateTimeSince } from '@/shared/lib/utils';
import useUserStore, { setUser } from '@/entity/User/store';

export const Profile = () => {
	const user = useUserStore(state => state.user);
	const [isEditing, setIsEditing] = useState(false);
	const form = useForm<IUser>({
		defaultValues: user,
	});
	const {
		fields: emails,
		append,
		remove,
	} = useFieldArray({
		control: form.control,
		name: 'email',
	});

	const onSubmit = async (values: IUser) => {
		if (!values.email.length) {
			append({ email: '', time: new Date() });
			form.setError('email.0.email', { message: 'Email address is required' });
			return;
		}
		setUser(values);
		setIsEditing(false); // Завершите редактирование после сохранения
	};

	const handleEditClick = () => {
		if (isEditing) {
			form.handleSubmit(onSubmit)(); // Вызываем отправку формы для сохранения
		} else {
			setIsEditing(true); // Включаем режим редактирования
		}
	};
	const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsEditing(true);
		const file = event.target.files?.[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			form.setValue('image', imageUrl);
		}
	};

	return (
		<Form {...form}>
			<div className='rounded-lg overflow-hidden'>
				<div className='h-24 bg-custom-gradient-block'></div>
				<div className='p-7 pb-16 bg-white'>
					<div className='flex justify-between items-center'>
						<div className='flex items-center gap-5'>
							<label htmlFor='avatar-upload' className='cursor-pointer'>
								<Avatar className='h-24 w-24'>
									<AvatarImage src={form.watch('image')} />
									<AvatarFallback>Your Avatar</AvatarFallback>
								</Avatar>
								<input id='avatar-upload' type='file' accept='image/*' onChange={handleAvatarChange} className='hidden' />
							</label>
							<div>
								<div className='font-semibold text-lg'>{form.watch('fullName') || 'Your FullName'}</div>
								<div className='text-sm'>{form.watch('email')[0]?.email ?? 'Your email'}</div>
							</div>
						</div>
						<Button className='px-7 w-auto' onClick={handleEditClick}>
							{isEditing ? 'Save' : 'Edit'}
						</Button>
					</div>
					<form
						onSubmit={e => {
							e.preventDefault();
							if (isEditing) {
								form.handleSubmit(onSubmit)();
							} else {
								setIsEditing(true);
							}
						}}
					>
						<div className='mt-5 grid gap-x-7 gap-y-5 grid-cols-[repeat(auto-fit,minmax(555px,1fr))] max-sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]'>
							<FormField
								control={form.control}
								name='fullName'
								rules={{ required: 'Full Name is required', min: 2 }}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Full Name</FormLabel>
										<FormControl>
											<Input placeholder='Your Full Name' {...field} disabled={!isEditing} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='nickName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nick Name</FormLabel>
										<FormControl>
											<Input placeholder='Your Nick Name' {...field} disabled={!isEditing} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='gender'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Gender</FormLabel>
										<Select disabled={!isEditing} onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Your gender' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='male'>male</SelectItem>
												<SelectItem value='female'>female</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='country'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Country</FormLabel>
										<Select disabled={!isEditing} onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Your country' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='kg'>Kyrgyzstan</SelectItem>
												<SelectItem value='usa'>Amerika</SelectItem>
												<SelectItem value='ru'>Russia</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								rules={{ required: 'Language is required' }}
								name='language'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Language</FormLabel>
										<Select disabled={!isEditing} onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Your language' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='kg'>Kyrgyz</SelectItem>
												<SelectItem value='usa'>English</SelectItem>
												<SelectItem value='ru'>Russia</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='timeZone'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Time Zone</FormLabel>
										<Select disabled={!isEditing} onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Your Time Zone' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='GMT+6'>GMT+6</SelectItem>
												<SelectItem value='GMT-4'>GMT-4</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='mt-7'>
							<h4 className='font-semibold text-md mb-3'>My email Address</h4>

							{emails.map((item, index) =>
								isEditing ? (
									<div key={index} className='flex gap-4 mt-2 '>
										<FormField
											control={form.control}
											name={`email.${index}.email`}
											rules={{ required: 'Email is required' }}
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input placeholder='Enter email address' {...field} disabled={!isEditing} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										{isEditing && (
											<Button
												type='button'
												variant='outline'
												onClick={() => remove(index)}
												className='h-11 w-11 flex items-center justify-center'
											>
												-
											</Button>
										)}
									</div>
								) : (
									<div key={item.email} className='flex gap-4 mt-1'>
										<div className='rounded-full h-10 w-10 flex justify-center items-center bg-primary-100'>
											<Sms />
										</div>
										<div>
											<h5 className='font-semibold text-sm'>{item.email}</h5>
											<h6 className='text-sm text-opacity-50'>{calculateTimeSince(item.time)}</h6>
										</div>
									</div>
								)
							)}

							{
								<Button
									className='bg-primary-100 text-primary hover:bg-primary-100 hover:opacity-80 mt-4'
									type='button'
									onClick={() => {
										if (!isEditing) setIsEditing(true);
										append({ email: '', time: new Date() });
									}}
								>
									+ Add Email Address
								</Button>
							}
						</div>
					</form>
				</div>
			</div>
		</Form>
	);
};
