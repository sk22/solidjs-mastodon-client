import { lazy, Suspense } from "solid-js";
import { QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import { queryClient } from "./lib/query-client";
import "./styles/app.css";

const Timeline = lazy(() => import("./features/timeline/index"));

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<SolidQueryDevtools />
			<Suspense fallback="sekunderl">
				<Timeline />
			</Suspense>
		</QueryClientProvider>
	);
}
