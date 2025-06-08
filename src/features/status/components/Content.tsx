import { createSignal, Show, splitProps } from "solid-js";
import Attachments from "./Attachments";
import styles from "./Content.module.css";
import type { Entity } from "megalodon";

export default function Content(props: { status: Entity.Status }) {
	const [statusProps] = splitProps(props, ["status"]);
	const [truncated, setTruncated] = createSignal(false);

	return (
		<>
			<div
				lang={statusProps.status.language ?? undefined}
				class={styles.content}
				innerHTML={statusProps.status.content}
				data-truncated={truncated()}
			/>
			{/* <button onClick={() => setTruncated((t) => !t)}>boop</button> */}
			<Show when={statusProps.status.media_attachments.length > 0}>
				<Attachments status={statusProps.status} />
			</Show>
		</>
	);
}
