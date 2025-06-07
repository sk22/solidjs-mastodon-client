import { InfiniteData, infiniteQueryOptions } from "@tanstack/solid-query";
import { client } from "~/lib/client";

export type InfiniteDataTimeline = InfiniteData<
	Awaited<ReturnType<typeof client.getPublicTimeline>>
>;

export const infiniteQueryTimeline = infiniteQueryOptions({
	queryKey: ["timeline"],
	initialPageParam: {} as { max_id?: string; min_id?: string },
	staleTime: Infinity,
	queryFn: ({ pageParam }) => client.getHomeTimeline({ ...pageParam }),
	select: (data) => data.pages.flatMap((page) => page.data),
	getNextPageParam: ({ data }) => ({ max_id: data.at(-1)?.id }),
	getPreviousPageParam: ({ data }) => ({ min_id: data[0]?.id }),
});
