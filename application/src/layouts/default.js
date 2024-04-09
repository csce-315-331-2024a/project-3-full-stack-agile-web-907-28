import Head from "./head";
import SiteHeader from "@/components/navigation/SiteHeader";
import GoogleTranslate from "@/components/translation/translationComponent"


export default function DefaultLayout({
	children,
}) {
	return (
		<div className="relative flex flex-col h-screen">
			<Head />
			<SiteHeader />
			{children}
			<GoogleTranslate />
		</div>
	);
}
