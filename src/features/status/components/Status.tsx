import { splitProps, type ComponentProps } from "solid-js";
import styles from "./Status.module.css";
import type { Entity } from "megalodon";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

export default function Status(
	props: { status: Entity.Status } & ComponentProps<"article">,
) {
	const [statusProps, articleProps] = splitProps(props, ["status"]);

	const status = statusProps.status.reblog ?? statusProps.status;

	return (
		<article class={styles.status} {...articleProps}>
			<Header status={statusProps.status} />
			<Content status={status} />
			<time class={styles.time}>
				<a href={status.url}>
					{new Date(status.created_at).toLocaleString()}
				</a>
			</time>
			<Footer status={status} />
		</article>
	);
}
