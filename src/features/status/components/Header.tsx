import { Match, Show, splitProps, Switch, type ComponentProps } from "solid-js";
import styles from "./Header.module.css";
import RepeatFilled from "@fluentui/svg-icons/icons/arrow_repeat_all_16_filled.svg?component-solid";
import ReplyFilled from "@fluentui/svg-icons/icons/arrow_reply_16_filled.svg?component-solid";
import type { Entity } from "megalodon";

export default function Header(
	props: { status: Entity.Status } & ComponentProps<"header">,
) {
	const [statusProps, headerProps] = splitProps(props, ["status"]);

	const status = statusProps.status.reblog ?? statusProps.status;

	const isThreadReply = () =>
		statusProps.status.in_reply_to_account_id ===
		statusProps.status.account.id;
	const replyToAccount = () =>
		statusProps.status.mentions.find(
			(m) => m.id === statusProps.status.in_reply_to_account_id,
		);

	return (
		<header class={styles.header} {...headerProps}>
			<Show
				when={
					statusProps.status.reblog !== null ||
					statusProps.status.in_reply_to_account_id !== null
				}
			>
				<div class={styles.above}>
					<Show when={statusProps.status.in_reply_to_id !== null}>
						<ReplyFilled class={styles.reblogIcon} role="img" />
						<span class={styles.reblogUsername}>
							<Switch>
								<Match when={isThreadReply()}>in thread</Match>
								<Match when={replyToAccount() !== undefined}>
									@{replyToAccount()?.acct}
								</Match>
							</Switch>
						</span>
					</Show>
					<Show when={statusProps.status.reblog !== null}>
						<RepeatFilled class={styles.reblogIcon} role="img" />
						<img
							class={styles.reblogAvatar}
							src={statusProps.status.account.avatar}
						/>
						<span class={styles.reblogUsername}>
							@{statusProps.status.account.acct}
						</span>
					</Show>
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
