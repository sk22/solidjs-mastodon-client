import { Entity } from "megalodon";
import { Match, Switch } from "solid-js";
import styles from "./Attachments.module.css";

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
							width={
								att.meta?.small?.width ??
								att.meta?.original?.width ??
								att.meta?.width ??
								undefined
							}
							style={{
								"--_aspect-ratio":
									att.meta?.original?.aspect ??
									att.meta?.aspect ??
									undefined,
							}}
						/>
					</Match>
					<Match when={att.type === "video" || att.type === "gifv"}>
						<video
							src={att.url}
							aria-description={att.description ?? undefined}
						/>
					</Match>
					<Match when={att.type === "audio"}>
						<audio
							src={att.url}
							aria-description={att.description ?? undefined}
						/>
					</Match>
				</Switch>
			))}
		</div>
	);
}
