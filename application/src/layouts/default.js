import Head from "./head";
import SiteHeader from "@/components/navigation/SiteHeader";


export default function DefaultLayout({
	children,
}) {
	return (
		<div className="relative flex flex-col h-screen">
			<Head />
			<SiteHeader />
			{children}
		</div>
	);
}
