import { Match, Switch } from "solid-js";
import styles from "./Attachments.module.css";
import type { Entity } from "megalodon";

const getWidth = (att: Entity.Attachment) =>
	att.meta?.small?.width ??
	att.meta?.original?.width ??
	att.meta?.width ??
	undefined;

const getHeight = (att: Entity.Attachment) =>
	att.meta?.small?.height ??
	att.meta?.original?.height ??
	att.meta?.height ??
	undefined;

const getAspect = (att: Entity.Attachment) =>
	att.meta?.original?.aspect ??
	att.meta?.aspect ??
	(getWidth(att) !== undefined && getHeight(att) !== undefined
		? getWidth(att)! / getHeight(att)!
		: undefined);

export default function Attachments(props: { status: Entity.Status }) {
	return (
		<div class={styles.attachments}>
			{props.status.media_attachments.map((att) => (
				<Switch>
					<Match when={att.type === "image"}>
						<img
							src={att.preview_url ?? att.url}
							alt={att.description ?? undefined}
							title={att.description ?? undefined}
							width={getWidth(att)}
							style={{ "--_aspect-ratio": getAspect(att) }}
						/>
					</Match>
					<Match when={att.type === "video" || att.type === "gifv"}>
						<video
							src={att.url}
							controls={att.type === "video"}
							autoplay={att.type === "gifv"}
							loop={att.type === "gifv"}
							title={att.description ?? undefined}
							aria-description={att.description ?? undefined}
							width={getWidth(att)}
							style={{ "--_aspect-ratio": getAspect(att) }}
						/>
					</Match>
					<Match when={att.type === "audio"}>
						<audio
							src={att.url}
							title={att.description ?? undefined}
							aria-description={att.description ?? undefined}
						/>
					</Match>
				</Switch>
			))}
		</div>
	);
}
