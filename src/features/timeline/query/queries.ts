import { InfiniteData, infiniteQueryOptions } from "@tanstack/solid-query";
import { client } from "~/lib/client";
import type { Entity } from "megalodon";

export type InfiniteDataTimeline = InfiniteData<
	Awaited<ReturnType<typeof client.getPublicTimeline>>
>;

async function prefetchAvatars(statuses: Entity.Status[]) {
	for (const s of statuses) {
		if (s.reblog) await fetch(s.reblog.account.avatar);
		await fetch(s.account.avatar);
	}
}

async function prefetchImages(statuses: Entity.Status[]) {
	prefetchAvatars(statuses);
	for (const s of statuses) {
		for (const att of (s.reblog ?? s).media_attachments) {
			if (att.type === "image") await fetch(att.preview_url ?? att.url);
		}
	}
}

export const infiniteQueryTimeline = infiniteQueryOptions({
	queryKey: ["timeline"],
	initialPageParam: {} as { max_id?: string; min_id?: string },
	staleTime: Infinity,
	queryFn: ({ pageParam }) =>
		client.getHomeTimeline({ ...pageParam }).then((res) => {
			prefetchImages(res.data);
			return res;
		}),
	select: (data) => data.pages.flatMap((page) => page.data),
	getNextPageParam: ({ data }) => ({ max_id: data.at(-1)?.id }),
	getPreviousPageParam: ({ data }) => ({ min_id: data[0]?.id }),
});
