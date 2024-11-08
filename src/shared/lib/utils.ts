import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const calculateTimeSince = (time: string | Date): string => {
	const currentTime = new Date();
	const createdTime = new Date(time);
	const timeDifference = currentTime.getTime() - createdTime.getTime(); // разница в миллисекундах

	const seconds = Math.floor(timeDifference / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days > 0) return `${days} day(s) ago`;
	if (hours > 0) return `${hours} hour(s) ago`;
	if (minutes > 0) return `${minutes} minute(s) ago`;
	return `${seconds} second(s) ago`;
};
