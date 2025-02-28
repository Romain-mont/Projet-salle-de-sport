import { create } from "zustand";

interface UserState {
	user: User | null;
	login: (username: string, jwtToken: string) => void;
	logout: () => void;
}

interface User {
	name: string;
	jwtToken: string;
}

export const useUserStore = create<UserState>((set) => ({
	user: null,
	login: (username: string, jwtToken: string) =>
		set({ user: { name: username, jwtToken: jwtToken } }),
	logout: () => set({ user: null }),
}));
