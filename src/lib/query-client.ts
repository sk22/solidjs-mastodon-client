import { QueryClient } from "@tanstack/solid-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			throwOnError: true,
		},
		mutations: {
			onError: (err) => console.error(err),
		},
	},
});
