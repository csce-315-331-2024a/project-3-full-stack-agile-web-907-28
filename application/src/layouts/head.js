import React from "react";
import NextHead from "next/head";
import { siteConfig } from "@/config/site";

/**
 * This component is the head component for the application. It uses the next/head library for the head.
 * @returns {JSX.Element} - The head component.
 */
export default function Head() {
	return (
		<NextHead>
			<title>{siteConfig.name}</title>
			<meta key="title" content={siteConfig.name} property="og:title" />
			<meta content={siteConfig.description} property="og:description" />
			<meta content={siteConfig.description} name="description" />
			<meta
				key="viewport"
				content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
				name="viewport"
			/>
			<link href="/favicon.ico" rel="icon" />
		</NextHead>
	);
};
