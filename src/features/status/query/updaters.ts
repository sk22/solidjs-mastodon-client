import { queryClient } from "~/lib/query-client";
import type { Entity } from "megalodon";
import type { InfiniteDataTimeline } from "~/features/timeline/index";
import { modifyMutable } from "solid-js/store";
import { getModifier, Updater } from "~/utils/query-utils";

export const updateStatus = (id: string, updater: Updater<Entity.Status>) =>
	queryClient.setQueryData<InfiniteDataTimeline>(["timeline"], (data) => {
		if (!data) return undefined;
		const modifier = getModifier(updater);
		for (const page of data.pages) {
			const status = page.data[page.data.findIndex((s) => s.id === id)];
			if (status) modifyMutable(status, modifier);
		}
		return data;
	});
