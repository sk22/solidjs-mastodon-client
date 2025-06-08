import { produce, reconcile } from "solid-js/store";

export type MutableUpdater<TState extends object> =
	| ((state: TState) => void)
	| TState;

export const getModifier = <TState extends object>(
	updater: MutableUpdater<TState>,
) => (typeof updater === "function" ? produce(updater) : reconcile(updater));
