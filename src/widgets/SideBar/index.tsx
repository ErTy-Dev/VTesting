import Graph from '@/shared/assets/graph.svg?react';
import Main from '@/shared/assets/main.svg?react';
import MedalStar from '@/shared/assets/medal-star.svg?react';
import Message from '@/shared/assets/messages.svg?react';
import Settting from '@/shared/assets/setting.svg?react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip';
import { Button } from '@/shared/components/ui/button';

const navList = [
	{
		icon: <Main />,
		text: 'Главная',
		link: '/',
	},
	{
		icon: <Graph />,
		text: 'Графы',
		link: '/',
	},
	{
		icon: <MedalStar />,
		text: 'Очивки',
		link: '/',
	},
	{
		icon: <Message />,
		text: 'Сообщения',
		link: '/',
	},
	{
		icon: <Settting />,
		text: 'Настройки',
		link: '/',
	},
];

const SideBar = () => {
	return (
		<aside className='flex items-center max-sm:justify-center bg-white'>
			<nav className='flex flex-col max-sm:flex-row sm:w-20'>
				<TooltipProvider>
					{navList.map(item => (
						<Tooltip delayDuration={300} key={item.text}>
							<TooltipTrigger asChild>
								<Button variant={'ghost'} className='text-gray-ICON rounded-none hover:text-primary sm:hover:bg-custom-gradient-nav'>
									{item.icon}
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>{item.text}</p>
							</TooltipContent>
						</Tooltip>
					))}
				</TooltipProvider>
			</nav>
		</aside>
	);
};

export default SideBar;
