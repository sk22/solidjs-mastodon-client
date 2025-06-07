import { Show, splitProps, type ComponentProps } from "solid-js";
import styles from "./Status.module.css";
import type { Entity } from "megalodon";
import Header from "./Header";
import Footer from "./Footer";
import Attachments from "./Attachments";

export default function Status(
	props: { status: Entity.Status } & ComponentProps<"article">,
) {
	const [statusProps, articleProps] = splitProps(props, ["status"]);

	const status = statusProps.status.reblog ?? statusProps.status;

	return (
		<article class={styles.status} {...articleProps}>
			<Header status={statusProps.status} />
			<div
				lang={status.language ?? undefined}
				class={styles.content}
				innerHTML={status.content}
			/>
			<Show when={status.media_attachments.length > 0}>
				<Attachments status={status} />
			</Show>
			<time class={styles.time}>
				<a href={statusProps.status.url}>
					{new Date(statusProps.status.created_at).toLocaleString()}
				</a>
			</time>
			<Footer status={statusProps.status} />
		</article>
	);
}
