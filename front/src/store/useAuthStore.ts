import { create } from "zustand";

// actions pour gérer le login

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

type Subscription = {
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

type AuthState = {
	isComingFromSignup: boolean;
	setIsComingFromSignup: (value: boolean) => void;
	// État du processus d'inscription
	currentStep: number;
	userId: number | null;
	error: string;
	success: string;
	role: string;

	// État des abonnements
	subscriptions: Subscription[];
	course: Course[];
	selectedSubscription: Subscription | null;

	// État des modales
	showInscriptionModal: boolean;
	showSubscriptionModal: boolean;

	// Actions
	setCurrentStep: (step: number) => void;
	setUserId: (id: number | null) => void;
	setError: (error: string) => void;
	setSuccess: (success: string) => void;
	setSubscriptions: (subscriptions: Subscription[]) => void;
	selectSubscription: (subscription: Subscription | null) => void;
	setShowInscriptionModal: (show: boolean) => void;
	setShowSubscriptionModal: (show: boolean) => void;
	setRole: (role: string) => void;

	// Actions API
	fetchSubscriptions: () => Promise<void>;
	subscribeUser: () => Promise<void>;
	fetchCourse: () => Promise<void>;
	reset: () => void;
};
const initialState = {
	currentStep: 0,
	userId: null,
	error: "",
	success: "",
	course: [],
	subscriptions: [],
	selectedSubscription: null,
	showInscriptionModal: false,
	showSubscriptionModal: false,
	isComingFromSignup: false,
	role: "",
};

// Création du store
const useAuthStore = create<AuthState>((set, get) => ({
	// État initial
	...initialState,

	// Implémentation des actions
	setCurrentStep: (step) => set({ currentStep: step }),

	setUserId: (id) => set({ userId: id }),

	setError: (error) => set({ error }),

	setSuccess: (success) => set({ success }),

	setSubscriptions: (subscriptions) => set({ subscriptions }),

	selectSubscription: (subscription) =>
		set({
			selectedSubscription: subscription,
			showSubscriptionModal: subscription !== null,
		}),

	setShowInscriptionModal: (show) => set({ showInscriptionModal: show }),

	setShowSubscriptionModal: (show) => set({ showSubscriptionModal: show }),

	fetchSubscriptions: async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/subscription`,
			);
			const data = await response.json();
			if (response.ok) {
				set({ subscriptions: data });
			} else {
				set({ error: "Impossible de charger les abonnements" });
			}
		} catch (error) {
			console.error("Erreur lors de la récupération des abonnements:", error);
			set({ error: "Erreur de connexion au serveur" });
		}
	},
	fetchCourse: async () => {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/course`);
			const data = await response.json();
			console.log("response", data);
			if (response.ok) {
				set({ course: data });
			} else {
				set({ error: "Impossible de charger les abonnements" });
			}
		} catch (error) {
			console.error("Erreur lors de la récupération des abonnements:", error);
			set({ error: "Erreur de connexion au serveur" });
		}
	},

	subscribeUser: async () => {
		const { userId, selectedSubscription, setError, setSuccess } = get();

		if (!selectedSubscription || !userId) {
			setError("Informations d'abonnement incomplètes");
			return;
		}

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/users/${userId}/subscription/${selectedSubscription.id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			const result = await response.json();

			if (response.ok) {
				set({
					showSubscriptionModal: false,
					selectedSubscription: null,
				});
				setSuccess("Abonnement souscrit avec succès !");
			} else {
				setError(
					result.message || "Erreur lors de la souscription à l'abonnement",
				);
			}
		} catch (error) {
			console.error("Erreur de connexion:", error);
			setError("Une erreur est survenue lors de la connexion au serveur");
		}
	},
	setIsComingFromSignup: (value) => set({ isComingFromSignup: value }),
	reset: () => set(initialState),
	setRole: (role) => set({ role }),
}));

export default useAuthStore;
