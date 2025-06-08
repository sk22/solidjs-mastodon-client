import { queryClient } from "~/lib/query-client";
import type { Entity } from "megalodon";
import type { InfiniteDataTimeline } from "~/features/timeline/index";
import { modifyMutable } from "solid-js/store";
import { getModifier, type MutableUpdater } from "~/utils/query-utils";

export const updateStatus = (
	id: string,
	updater: MutableUpdater<Entity.Status>,
) => {
	if (!updater) throw new Error("updateStatus: updater is " + updater);
	if (typeof updater !== "function" && updater.id !== id) {
		throw new Error(
			"updateStatus: id of updater object doesn't match the specified id",
		);
	}
	return queryClient.setQueryData<InfiniteDataTimeline>(
		["timeline"],
		(data) => {
			if (!data) return undefined;
			const modifier = getModifier(updater);
			for (const page of data.pages) {
				const status =
					// the updated status might be hidden in a reblog
					page.data.find((s) => s.reblog?.id === id)?.reblog ??
					page.data.find((s) => s.id === id);
				if (status) modifyMutable(status, modifier);
			}
			return data;
		},
	);
};
