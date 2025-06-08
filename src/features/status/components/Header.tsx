import { Show, splitProps, type ComponentProps } from "solid-js";
import styles from "./Header.module.css";
import RepeatFilled from "@fluentui/svg-icons/icons/arrow_repeat_all_16_filled.svg?component-solid";
import type { Entity } from "megalodon";

export default function Header(
	props: { status: Entity.Status } & ComponentProps<"header">,
) {
	const [statusProps, headerProps] = splitProps(props, ["status"]);

	const status = statusProps.status.reblog ?? statusProps.status;

	return (
		<header class={styles.header} {...headerProps}>
			<Show when={statusProps.status.reblog !== null}>
				<div class={styles.above}>
					<RepeatFilled class={styles.reblogIcon} role="img" />
					<img
						class={styles.reblogAvatar}
						src={statusProps.status.account.avatar}
					/>
					<span class={styles.reblogUsername}>
						@{statusProps.status.account.acct}
					</span>
				</div>
			</Show>
			<a class={styles.avatarLink} href={status.account.url}>
				<img
					class={styles.avatar}
					src={status.account.avatar}
					alt={status.account.acct}
				/>
			</a>
			<span class={styles.displayName}>
				{status.account.display_name}
			</span>
			<span class={styles.username}>@{status.account.acct}</span>
		</header>
	);
}
