import { Show, splitProps, type ComponentProps } from "solid-js";
import { cx } from "~/utils/functions";
import { getContentStatus } from "../utils";
import HeaderLine from "./HeaderLine";
import styles from "./Header.module.css";
import textStyles from "~/styles/text.module.css";
import type { Entity } from "megalodon";

export default function Header(
	props: { status: Entity.Status } & ComponentProps<"header">,
) {
	const [statusProps, headerProps] = splitProps(props, ["status"]);
	const contentStatus = () => getContentStatus(statusProps.status);

	return (
		<header class={styles.header} {...headerProps}>
			<Show
				when={
					statusProps.status.reblog !== null ||
					contentStatus().in_reply_to_id !== null
				}
			>
				<HeaderLine status={statusProps.status} />
			</Show>
			<a class={styles.avatarLink} href={contentStatus().account.url}>
				<img
					class={styles.avatar}
					src={contentStatus().account.avatar}
					alt={contentStatus().account.acct}
				/>
			</a>
			<span class={cx(styles.displayName, textStyles.ellipsis)}>
				{contentStatus().account.display_name}
			</span>
			<span class={cx(styles.username, textStyles.ellipsis)}>
				@{contentStatus().account.acct}
			</span>
		</header>
	);
}
