import { queryClient } from "~/lib/query-client";
import type { Entity } from "megalodon";
import {
	queryKeyAllTimelines,
	type InfiniteDataTimeline,
} from "~/features/timeline/index";
import { modifyMutable } from "solid-js/store";
import { getModifier, type MutableUpdater } from "~/utils/query-utils";
import {
	DataStatus,
	DataStatusContext,
	queryStatus,
	queryStatusContext,
} from "./queries";

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
	queryClient.setQueriesData<DataStatus>(
		{
			queryKey: queryStatus.queryKeyAll,
			predicate: ({ queryKey }) =>
				queryKey.length === queryStatus.queryKey("").length,
		},
		(data) => {
			if (!data) return undefined;
			const status =
				// the updated status might be hidden in a reblog
				data.data.id === id ? data.data
				: data.data.reblog?.id === id ? data.data.reblog
				: undefined;
			if (status) modifyMutable(status, getModifier(updater));
		},
	);
	queryClient.setQueriesData<DataStatusContext>(
		{
			queryKey: queryStatus.queryKeyAll,
			predicate: ({ queryKey }) =>
				queryKey.length === queryStatusContext.queryKey("").length,
		},
		(data) => {
			if (!data) return undefined;
			const modifier = getModifier(updater);
			for (const status of [...data.data.ancestors, ...data.data.descendants]) {
				const s =
					status.id === id ? status
					: status.reblog?.id === id ? status.reblog
					: undefined;
				if (s) {
					modifyMutable(s, modifier);
					break;
				}
			}
		},
	);
	queryClient.setQueriesData<InfiniteDataTimeline>(
		{ queryKey: queryKeyAllTimelines },
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
