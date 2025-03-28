import { create } from "zustand";
import type { AuthState, UserState } from "../@types/types";

// actions pour gérer le login

export const useUserStore = create<UserState>((set) => ({
	user: null,
	login: (username: string, jwtToken: string) =>
		set({ user: { name: username, jwtToken: jwtToken } }),
	logout: () => set({ user: null }),
}));

const initialState = {
	currentStep: 0,
	userId: null,
	teacherId: null,
	error: "",
	success: "",
	course: [],
	teacherCourse: [],
	subscriptions: [],
	selectedSubscription: null,
	showInscriptionModal: false,
	showSubscriptionModal: false,
	isComingFromSignup: false,
	role: "",
	profil: null,
};

// Création du store
const useAuthStore = create<AuthState>((set, get) => ({
	// État initial
	...initialState,

	// Implémentation des actions
	setCurrentStep: (step) => set({ currentStep: step }),

	setUserId: (id) => set({ userId: id }),
	setTeacherId: (id) => set({ teacherId: id }),

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
			console.error("Erreur lors de la récupération des cours", error);
			set({ error: "Erreur de connexion au serveur" });
		}
	},

	fetchTeacherCourse: async () => {
		try {
			const { teacherId } = get();
			console.log("teacher", teacherId);

			if (!teacherId) {
				set({ error: "L'identifiant de l'enseignant est manquant" });
				return;
			}

			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/teacher/${teacherId}/course`,
			);
			const data = await response.json();

			if (response.ok) {
				set({ teacherCourse: data });
			} else {
				console.error("Erreur API : ", data);
				set({ error: data.message || "Impossible de charger les cours" });
			}
		} catch (error) {
			console.error("Erreur lors de la récupération des cours :", error);
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
	setProfil: (profil) => set({ profil }),
	fetchProfil: async (token) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/myProfile`,
				{
					method: "GET",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				},
			);

			if (!response.ok) {
				throw new Error("Erreur lors de la récupération du profil");
			}

			const data = await response.json();
			set({
				profil: data,
				role: data.role,
			});

			return data;
		} catch (error) {
			console.error("Erreur:", error);
			throw error;
		}
	},
}));

export default useAuthStore;
