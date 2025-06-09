import { lazy, Suspense } from "solid-js";
import { QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import { Router, Route } from "@solidjs/router";
import { queryClient } from "./lib/query-client";
import "./styles/app.css";

const Home = lazy(() => import("~/routes/home"));
const Status = lazy(() => import("~/routes/status"));

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<SolidQueryDevtools />
			<Suspense fallback="sekunderl">
				<Router>
					<Route path="/" component={Home} />
					<Route path="/status/:id" component={Status} />
				</Router>
			</Suspense>
		</QueryClientProvider>
	);
}
