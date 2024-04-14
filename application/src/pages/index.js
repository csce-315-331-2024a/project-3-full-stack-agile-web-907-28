import { useEffect } from 'react';
import { useSession } from 'next-auth/react'; // Import useSession hook from next-auth
import { useRouter } from 'next/router'; // Fix import path

import DefaultLayout from "@/layouts/default";

/**
 * This function is the home page.
 * @returns {JSX.Element} - The home page.
 */
const Home = () => {
	const { data: session, status } = useSession(); // Use useSession to check the session
	const router = useRouter();

	router.push('/menu');

	return <DefaultLayout />;
};

export default Home;
