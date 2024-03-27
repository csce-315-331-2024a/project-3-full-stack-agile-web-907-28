import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { fontSans, fontMono } from "@/config/fonts";
import { useRouter } from "next/router";
import "@/styles/globals.css";

import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  const router = useRouter();

	return (
		<NextUIProvider navigate={router.push}>
			<NextThemesProvider>
				<SessionProvider>
					<Component {...pageProps} />
					< div id="modal-root" />
				</SessionProvider>
			</NextThemesProvider>
		</NextUIProvider>
	);
}

export const fonts = {
	sans: fontSans.style.fontFamily,
	mono: fontMono.style.fontFamily,
};
