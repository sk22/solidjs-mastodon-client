import { splitProps, type ComponentProps } from "solid-js";
import StarFilled from "@fluentui/svg-icons/icons/star_24_filled.svg?component-solid";
import StarRegular from "@fluentui/svg-icons/icons/star_24_regular.svg?component-solid";
import RepeatFilled from "@fluentui/svg-icons/icons/arrow_repeat_all_24_filled.svg?component-solid";
import RepeatRegular from "@fluentui/svg-icons/icons/arrow_repeat_all_24_regular.svg?component-solid";
import BookmarkFilled from "@fluentui/svg-icons/icons/bookmark_24_filled.svg?component-solid";
import BookmarkRegular from "@fluentui/svg-icons/icons/bookmark_24_regular.svg?component-solid";
import ChatMultipleRegular from "@fluentui/svg-icons/icons/chat_multiple_24_regular.svg?component-solid";
import ShareRegular from "@fluentui/svg-icons/icons/share_24_regular.svg?component-solid";
import {
	useMutationBookmark,
	useMutationFavorite,
	useMutationReblog,
} from "../query/mutations";
import styles from "./Footer.module.css";
import buttonStyles from "~/styles/buttons.module.css";
import type { Entity } from "megalodon";

export default function Footer(
	props: { status: Entity.Status } & ComponentProps<"footer">,
) {
	const [statusProps, footerProps] = splitProps(props, ["status"]);
	const favorite = useMutationFavorite();
	const reblog = useMutationReblog();
	const bookmark = useMutationBookmark();

	const lookFavorited = () =>
		favorite.isPending
			? favorite.variables[1]
			: statusProps.status.favourited;
	const lookReblogged = () =>
		reblog.isPending ? reblog.variables[1] : statusProps.status.reblogged;
	const lookBookmarked = () =>
		bookmark.isPending
			? bookmark.variables[1]
			: statusProps.status.bookmarked;

	return (
		<footer class={styles.footer} {...footerProps}>
			<button
				title="reply (not implemented)"
				class={buttonStyles.iconButton}
				disabled
			>
				<ChatMultipleRegular role="img" />
			</button>
			<button
				title={lookReblogged() ? "remove reblog" : "reblog"}
				class={buttonStyles.iconButton}
				onClick={() =>
					reblog.mutate([
						statusProps.status.id,
						!statusProps.status.reblogged,
					])
				}
			>
				<RepeatRegular role="img" />
				<RepeatFilled
					data-visible={lookReblogged()}
					class={styles.reblogged}
					role="img"
				/>
			</button>
			<button
				title={lookFavorited() ? "unfavorite" : "favorite"}
				class={buttonStyles.iconButton}
				onClick={() =>
					favorite.mutate([
						statusProps.status.id,
						!statusProps.status.favourited,
					])
				}
			>
				<StarRegular role="img" />
				<StarFilled
					data-visible={lookFavorited()}
					class={styles.favorited}
					role="img"
				/>
			</button>
			<button
				title={lookBookmarked() ? "remove bookmark" : "bookmark"}
				class={buttonStyles.iconButton}
				onClick={() =>
					bookmark.mutate([
						statusProps.status.id,
						!statusProps.status.bookmarked,
					])
				}
			>
				<BookmarkRegular role="img" />
				<BookmarkFilled
					data-visible={lookBookmarked()}
					class={styles.bookmarked}
					role="img"
				/>
			</button>
			<button
				title="share (not implemented)"
				class={buttonStyles.iconButton}
				disabled
			>
				<ShareRegular role="img" />
			</button>
		</footer>
	);
}
