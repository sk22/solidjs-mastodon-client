import type { Entity } from "megalodon";

export const getContentStatus = (status: Entity.Status) =>
	status.reblog ?? status;
