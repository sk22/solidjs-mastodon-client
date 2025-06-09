import { Match, Show, Switch } from "solid-js";
import RepeatFilled from "@fluentui/svg-icons/icons/arrow_repeat_all_16_filled.svg?component-solid";
import ReplyFilled from "@fluentui/svg-icons/icons/arrow_reply_16_filled.svg?component-solid";
import ReplyAllFilled from "@fluentui/svg-icons/icons/arrow_reply_all_16_filled.svg?component-solid";
import { getContentStatus } from "../utils";
import styles from "./HeaderLine.module.css";
import type { Entity } from "megalodon";

export default function HeaderLine(props: { status: Entity.Status }) {
	const contentStatus = () => getContentStatus(props.status);
	const isThreadReply = () =>
		contentStatus().in_reply_to_account_id === contentStatus().account.id;
	const replyToAccount = () =>
		contentStatus().mentions.find(
			(m) => m.id === contentStatus().in_reply_to_account_id,
		);

	return (
		<div class={styles.line}>
			<Show when={contentStatus().in_reply_to_id !== null}>
				<span class={styles.reblogWrapper}>
					<span class={styles.reblogAvatarWrapper}>
						{isThreadReply() ? (
							<ReplyAllFilled
								class={styles.reblogIcon}
								role="img"
							/>
						) : (
							<ReplyFilled class={styles.reblogIcon} role="img" />
						)}
					</span>
					<span class={styles.reblogUsername}>
						<Switch>
							<Match when={isThreadReply()}>in thread</Match>
							<Match when={replyToAccount() !== undefined}>
								@{replyToAccount()?.acct}
							</Match>
						</Switch>
					</span>
				</span>
			</Show>
			<Show when={props.status.reblog !== null}>
				<a class={styles.reblogWrapper} href={props.status.account.url}>
					<span class={styles.reblogAvatarWrapper}>
						<img
							class={styles.reblogAvatar}
							src={props.status.account.avatar}
						/>
						<RepeatFilled class={styles.reblogIcon} role="img" />
					</span>
					<span class={styles.reblogUsername}>
						@{props.status.account.acct}
					</span>
				</a>
			</Show>
		</div>
	);
}
