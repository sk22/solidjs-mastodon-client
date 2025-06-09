import { splitProps, type ComponentProps } from "solid-js";
import styles from "./Status.module.css";
import type { Entity } from "megalodon";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import { getContentStatus } from "../utils";

export default function Status(
	props: { status: Entity.Status } & ComponentProps<"article">,
) {
	const [statusProps, articleProps] = splitProps(props, ["status"]);
	const contentStatus = () => getContentStatus(statusProps.status);

	return (
		<article class={styles.status} {...articleProps}>
			<Header status={statusProps.status} />
			<Content status={contentStatus()} />
			<time class={styles.time}>
				<a href={contentStatus().url}>
					{new Date(contentStatus().created_at).toLocaleString()}
				</a>
			</time>
			<Footer status={contentStatus()} />
		</article>
	);
}
