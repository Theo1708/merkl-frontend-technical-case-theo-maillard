import {
	json,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import "./tailwind.css";
import dappkitStyles from "dappkit/src/style.css?url";
import { DAppProvider } from "dappkit";
import wagmi from "./config/wagmi";
import theme from "./config/theme";
import sizing from "./config/sizing";
import { MerklApi } from "@merkl/api";

export const links: LinksFunction = () => [
	{
		rel: "stylesheet",
		href: dappkitStyles,
		as: "style",
	},
];

export async function loader(args: LoaderFunctionArgs) {
	const { data: chains } = await MerklApi(
		"https://api.merkl.xyz/",
	).v4.chains.index.get({ query: {} });

	if (!chains) throw "Could not load chains";

	return { chains };
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	const { chains } = useLoaderData<typeof loader>();

	return (
		<DAppProvider
			config={wagmi}
			themes={theme}
			modes={["dark"]}
			sizing={sizing}
			chains={chains}
		>
			<div className="bg-main-1 min-h-[100vh]">
				<Outlet />
			</div>
		</DAppProvider>
	);
}
