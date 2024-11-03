import { create } from 'zustand';
import { IUser } from '../types';

interface UserStore {
	user: IUser;
	setUser: (user: IUser) => void;
	clearUser: () => void;
}

const initialState = {
	image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXIiPjxwYXRoIGQ9Ik0xOSAyMXYtMmE0IDQgMCAwIDAtNC00SDlhNCA0IDAgMCAwLTQgNHYyIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ii8+PC9zdmc+',
	fullName: '',
	nickName: '',
	gender: '',
	country: '',
	language: '',
	timeZone: '',
	email: [],
};

const useUserStore = create<UserStore>(set => ({
	user: initialState, // Изначально пользователь может быть null
	setUser: user => set({ user }),
	clearUser: () => set({ user: initialState }),
}));

export const setUser = (user: IUser) => {
	useUserStore.setState({ user });
};

export default useUserStore;
