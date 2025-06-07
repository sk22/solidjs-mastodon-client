import generator, { Response } from "megalodon";

export const client = generator(
	"mastodon",
	import.meta.env.VITE_CLIENT_URL,
	import.meta.env.VITE_CLIENT_TOKEN,
);

export const unwrap = <T>(res: Response<T>) => res.data;
