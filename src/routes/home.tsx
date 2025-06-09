import { useInfiniteQuery } from "@tanstack/solid-query";
import { Match, Switch } from "solid-js";
import Timeline, { infiniteQueryHomeTimeline } from "~/features/timeline";

export default function Home() {
	const query = useInfiniteQuery(() => infiniteQueryHomeTimeline);

	return (
		<Switch>
			<Match when={query.isPending}>momenterl</Match>
			<Match when={query.isSuccess}>
				<Timeline
					data={query.data}
					fetchNextPage={query.fetchNextPage}
					hasNextPage={query.hasNextPage}
					isFetchingNextPage={query.isFetchingNextPage}
				/>
			</Match>
		</Switch>
	);
}
