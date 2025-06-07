import { createEffect, For, Match, Switch } from "solid-js";
import { useInfiniteQuery } from "@tanstack/solid-query";
import { createWindowVirtualizer } from "@tanstack/solid-virtual";
import Status from "~/features/status/index";
import { infiniteQueryTimeline } from "../query/queries";

export default function Timeline() {
	const query = useInfiniteQuery(() => infiniteQueryTimeline);
	let instance: typeof virtualizer;
	const virtualizer = createWindowVirtualizer({
		count: query.data?.length ?? 0,
		estimateSize: () => 100,
		onChange(i) {
			if (instance === undefined) instance = i;
		},
	});

	createEffect(() => {
		// update count and notify virtualizer of change
		if (query.data && query.data.length !== virtualizer.options.count) {
			virtualizer.options.count = query.data.length;
			virtualizer.options.onChange(instance, virtualizer.isScrolling);
		}
	});

	createEffect(() => {
		// fetch next page once last virtualizer items are on screen
		const lastItem = virtualizer.getVirtualItems().at(-1);
		if (
			lastItem &&
			lastItem.index >= (query.data?.length ?? 0) - 20 &&
			query.hasNextPage &&
			!query.isFetchingNextPage
		) {
			query.fetchNextPage();
		}
	});

	return (
		<main
			style={{
				position: "relative",
				overflow: "hidden",
				height: `${virtualizer.getTotalSize()}px`,
				"margin-inline": "auto",
				"max-width": "80ch",
			}}
		>
			<Switch>
				<Match when={query.isPending}>momenterl</Match>
				<Match when={query.isError}>
					<p>Error: {query.error!.message}</p>
				</Match>
				<Match when={query.isSuccess}>
					<For each={virtualizer.getVirtualItems()}>
						{(row) => (
							<Status
								status={query.data![row.index]!}
								data-index={row.index}
								ref={(el) =>
									window.queueMicrotask(() =>
										virtualizer.measureElement(el),
									)
								}
								style={{
									position: "absolute",
									top: "0px",
									"inset-inline": "0px",
									translate: `0 ${row.start}px`,
								}}
							/>
						)}
					</For>
				</Match>
			</Switch>
		</main>
	);
}
