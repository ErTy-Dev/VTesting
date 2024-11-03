import Search from '@/shared/assets/search-normal.svg?react';
import Notification from '@/shared/assets/notification-bing.svg?react';
import { Button } from '@/shared/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import useUserStore from '@/entity/User/store';

const Header = () => {
	const currentDate = new Date();
	const formattedDate = currentDate.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: '2-digit' });
	const user = useUserStore(state => state.user);
	const fullName = user?.fullName.split(' ');
	return (
		<header className='flex  z-10 flex justify-between items-center max-sm:flex-col max-sm:justify-center  max-sm:gap-5 flex-grow-0 w-full'>
			<div className='flex flex-col gap-2'>
				<div className='font-semibold text-2xl'>Welcome, {fullName?.[0] || 'Your name'}</div>
				<div className='text-gray-text text-sm'>{formattedDate}</div>
			</div>

			<div className='flex gap-4'>
				<div className='flex gap-3 items-center p-3 bg-white rounded-xl max-w-80 flex-1'>
					<Search className='cursor-pointer' /> {/* Добавим отступ справа */}
					<input className='focus:outline-none w-full' placeholder='Search...' />
				</div>
				<Button className='bg-white hover:bg-primary text-gray-text hover:text-white h-12 rounded-xl'>
					<Notification />
				</Button>
				<Button variant='ghost' className='p-0 h-auto w-auto'>
					<Avatar className='rounded-xl h-12 w-12'>
						<AvatarImage src={user?.image} />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</Button>
			</div>
		</header>
	);
};

export default Header;
