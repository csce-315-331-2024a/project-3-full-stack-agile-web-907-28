import Head from "./head";
import SiteHeader from "@/components/navigation/SiteHeader";
import {CartContextProvider} from "@/contexts/CartContext";


export default function DefaultLayout({
	children,
}) {
	return (
		<CartContextProvider>
			<div className="relative flex flex-col h-screen">
				<Head/>
				<SiteHeader/>
				{children}
			</div>
		</CartContextProvider>
	);
}
