export interface IUsers {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	role: string;
}
export interface UserState {
	user: User | null;
	login: (username: string, jwtToken: string) => void;
	logout: () => void;
}

export interface User {
	name: string;
	jwtToken: string;
}
export type Subscription = {
	id: number;
	type: string;
	price: number;
};
export interface Course {
	id?: number;
	title: string;
	description: string;
	date: string | Date;
	time: string;
	duration: {
		hours: number;
	};
	max_participants: number;
	teacher_id: number;
	created_at?: string;
	updated_at?: string | null;
}

export type AuthState = {
	isComingFromSignup: boolean;
	setIsComingFromSignup: (value: boolean) => void;
	// État du processus d'inscription
	currentStep: number;
	userId: number | null;
	teacherId: number | null;
	error: string;
	success: string;
	role: string;
	profil: IUsers | null;

	// État des abonnements
	subscriptions: Subscription[];
	course: Course[];
	teacherCourse: Course[];
	selectedSubscription: Subscription | null;

	// État des modales
	showInscriptionModal: boolean;
	showSubscriptionModal: boolean;

	// Actions
	setCurrentStep: (step: number) => void;
	setUserId: (id: number | null) => void;
	setTeacherId: (id: number | null) => void;
	setError: (error: string) => void;
	setSuccess: (success: string) => void;
	setSubscriptions: (subscriptions: Subscription[]) => void;
	selectSubscription: (subscription: Subscription | null) => void;
	setShowInscriptionModal: (show: boolean) => void;
	setShowSubscriptionModal: (show: boolean) => void;
	setRole: (role: string) => void;
	setProfil: (profil: IUsers | null) => void;

	// Actions API
	fetchProfil: (token: string) => Promise<void>;
	fetchSubscriptions: () => Promise<void>;
	subscribeUser: () => Promise<void>;
	fetchCourse: () => Promise<void>;
	fetchTeacherCourse: () => Promise<void>;
	reset: () => void;
};
