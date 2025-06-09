import { useParams } from "@solidjs/router";
import { useQuery } from "@tanstack/solid-query";
import { Match, Show, Switch } from "solid-js";
import {
	queryStatus,
	queryStatusContext,
} from "~/features/status/query/queries";
import Timeline from "~/features/timeline";

export default function Status() {
	const params = useParams();
	const statusQuery = useQuery(() => queryStatus(params.id!));
	const contextQuery = useQuery(() => queryStatusContext(params.id!));
	const data = () =>
		!statusQuery.data ? undefined : (
			[
				...(contextQuery.data?.data.ancestors ?? []),
				statusQuery.data.data,
				...(contextQuery.data?.data.descendants ?? []),
			]
		);

	return (
		<Show when={params.id} keyed>
			<Switch>
				<Match when={statusQuery.isPending}>momenterl</Match>
				<Match when={statusQuery.isSuccess}>
					<Timeline data={data()} />
				</Match>
			</Switch>
		</Show>
	);
}
