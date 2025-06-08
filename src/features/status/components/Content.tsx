import { createSignal, Show, splitProps } from "solid-js";
import Attachments from "./Attachments";
import styles from "./Content.module.css";
import type { Entity } from "megalodon";

export default function Content(props: { status: Entity.Status }) {
	const [statusProps] = splitProps(props, ["status"]);

	return (
		<>
			{statusProps.status.spoiler_text.length ? (
				<details class={styles.details}>
					<summary class={styles.spoiler}>
						{statusProps.status.spoiler_text}
					</summary>
					<Inner status={statusProps.status} />
				</details>
			) : (
				<Inner status={statusProps.status} />
			)}
		</>
	);
}

function Inner(props: { status: Entity.Status }) {
	const [statusProps] = splitProps(props, ["status"]);

	return (
		<>
			<div
				lang={statusProps.status.language ?? undefined}
				class={styles.content}
				innerHTML={statusProps.status.content}
			/>
			<Show when={statusProps.status.media_attachments.length > 0}>
				<Attachments status={statusProps.status} />
			</Show>
		</>
	);
}
