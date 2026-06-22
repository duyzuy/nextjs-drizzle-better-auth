export const ENDPOINTS = {
	tours: {
		list: "/tours",
		detail: (id: string) => `/tours/${id}`,
		schedules: (tourId: string) => `/tours/${tourId}/schedules`,
	},
	bookings: {
		list: "/bookings",
		detail: (id: string) => `/bookings/${id}`,
		cancel: (id: string) => `/bookings/${id}/cancel`,
		create: "/bookings",
	},
	users: {
		me: "/users/me",
		detail: (id: string) => `/users/${id}`,
	},
	auth: {
		signin: "/auth/signin",
		signup: "/auth/signup",
		signout: "/auth/signout",
		me: "/auth/me",
		refresh: "/auth/refresh",
	},
} as const;
