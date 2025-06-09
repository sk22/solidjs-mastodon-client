import { createEffect, For } from "solid-js";
import { createWindowVirtualizer } from "@tanstack/solid-virtual";
import Status from "~/features/status/index";
import styles from "./Timeline.module.css";
import type { Entity } from "megalodon";

export default function Timeline(props: {
	data?: Entity.Status[];
	fetchNextPage?: () => void;
	hasNextPage?: boolean;
	isFetchingNextPage?: boolean;
}) {
	let instance: typeof virtualizer;
	const virtualizer = createWindowVirtualizer({
		count: props.data?.length ?? 0,
		estimateSize: () => 100,
		onChange(i) {
			if (instance === undefined) instance = i;
		},
	});

	createEffect(() => {
		// update count and notify virtualizer of change
		if (props.data && props.data.length !== virtualizer.options.count) {
			virtualizer.options.count = props.data.length;
			virtualizer.options.onChange(instance, virtualizer.isScrolling);
		}
	});

	createEffect(() => {
		// fetch next page once last virtualizer items are on screen
		const lastItem = virtualizer.getVirtualItems().at(-1);
		if (
			lastItem &&
			lastItem.index >= (props.data?.length ?? 0) - 20 &&
			props.hasNextPage &&
			!props.isFetchingNextPage
		) {
			props.fetchNextPage?.();
		}
	});

	return (
		<main
			class={styles.timeline}
			style={{ height: `${virtualizer.getTotalSize()}px` }}
		>
			<For each={virtualizer.getVirtualItems()}>
				{(row) => (
					<Status
						status={props.data![row.index]!}
						data-index={row.index}
						ref={(el) =>
							window.queueMicrotask(() => virtualizer.measureElement(el))
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
		</main>
	);
}
