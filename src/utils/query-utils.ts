import { produce, reconcile } from "solid-js/store";

export type Updater<TState extends object> = ((state: TState) => void) | TState;
export const getModifier = <TState extends object>(updater: Updater<TState>) =>
	typeof updater === "function" ? produce(updater) : reconcile(updater);
