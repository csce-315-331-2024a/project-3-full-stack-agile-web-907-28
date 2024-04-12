import Head from "./head";
import SiteHeader from "@/components/navigation/SiteHeader";
import {CartContextProvider} from "@/contexts/CartContext";
import {MenuContextProvider} from "@/contexts/MenuContext";

/**
 * This layout is the default layout for the application. It uses the nextui-org library for the disclosure.
 * @param {JSX.Element} children - The children of the layout.
 * @returns {JSX.Element} - The default layout.
 */
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
