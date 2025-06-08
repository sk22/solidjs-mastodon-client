import { useMutation } from "@tanstack/solid-query";
import { updateStatus } from "./updaters";
import { client } from "~/lib/client";

export function useMutationFavorite() {
	return useMutation(() => ({
		mutationFn: ([id, favourite]: [id: string, favourite: boolean]) =>
			favourite
				? client.favouriteStatus(id)
				: client.unfavouriteStatus(id),
		onSuccess(status, [id]) {
			updateStatus(id, status.data);
		},
	}));
}

export function useMutationReblog() {
	return useMutation(() => ({
		mutationFn: ([id, reblog]: [id: string, reblog: boolean]) =>
			reblog ? client.reblogStatus(id) : client.unreblogStatus(id),
		onSuccess(status, [id, reblog]) {
			if (reblog) updateStatus(id, status.data.reblog!);
			else updateStatus(id, status.data);
		},
	}));
}

export function useMutationBookmark() {
	return useMutation(() => ({
		mutationFn: ([id, bookmark]: [id: string, bookmark: boolean]) =>
			bookmark ? client.bookmarkStatus(id) : client.unbookmarkStatus(id),
		onSuccess(status, [id]) {
			updateStatus(id, status.data);
		},
	}));
}
