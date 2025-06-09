import { queryOptions } from "@tanstack/solid-query";
import { client } from "~/lib/client";

export type DataStatus = Awaited<ReturnType<typeof client.getStatus>>;
export function queryStatus(id: string) {
  return queryOptions({
    queryKey: queryStatus.queryKey(id),
    queryFn: () => client.getStatus(id),
  });
}
queryStatus.queryKeyAll = ["status"] as const;
queryStatus.queryKey = (id: string) =>
  [...queryStatus.queryKeyAll, id] as const;

export type DataStatusContext = Awaited<
  ReturnType<typeof client.getStatusContext>
>;
export function queryStatusContext(id: string) {
  return queryOptions({
    queryKey: queryStatusContext.queryKey(id),
    queryFn: () => client.getStatusContext(id),
  });
}
queryStatusContext.queryKey = (id: string) =>
  [...queryStatus.queryKey(id), "context"] as const;
