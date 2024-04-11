import Head from "./head";
import SiteHeader from "@/components/navigation/SiteHeader";
import {CartContextProvider} from "@/contexts/CartContext";
import {MenuContextProvider} from "@/contexts/MenuContext";


export default function DefaultLayout({
	children,
}) {
	return (
		<MenuContextProvider>
			<CartContextProvider>
				<div className="relative flex flex-col h-screen">
					<Head/>
					<SiteHeader/>
					{children}
				</div>
			</CartContextProvider>
		</MenuContextProvider>
	);
}
