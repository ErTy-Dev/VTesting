export interface IUser {
	fullName: string;
	nickName: string;
	gender: string;
	country: string;
	language: string;
	timeZone: string;
	email: Iemail[];
	image: string;
}

interface Iemail {
	email: string;
	time: Date;
}
