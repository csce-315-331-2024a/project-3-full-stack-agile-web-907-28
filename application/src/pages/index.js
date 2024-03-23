import { useEffect } from 'react';
import { useSession } from 'next-auth/react'; // Import useSession hook from next-auth
import { useRouter } from 'next/router'; // Fix import path

const Home = () => {
    const { data: session, status } = useSession(); // Use useSession to check the session
    const router = useRouter();

    useEffect(() => {
        // Ensure effect runs only after confirming the session status
        const fetchCredentialsAndRedirect = async () => {
            if (status === 'authenticated') {
                try {
                    const res = await fetch('/api/onboarding/getCred');
                    if (res.ok) {
                        const { credentials } = await res.json();
                        // Redirect based on the credentials (role)
                        switch (credentials) {
                            case 'Manager':
                                router.push('/manager');
                                break;
                            case 'Customer':
                                router.push('/customer');
                                break;
                            case 'Cashier':
                                router.push('/customer'); // Assuming you meant to redirect cashiers here as well
                                break;
                            default:
                                // Handle unknown credentials, perhaps redirect to a default or error page
                                router.push('/menu');
                        }
                    } else {
                        console.error('Failed to fetch credentials');
                        // Handle error, perhaps by redirecting to an error page or showing a message
                    }
                } catch (error) {
                    console.error('Error fetching credentials:', error);
                    // Handle exception, perhaps by redirecting to an error page or showing a message
                }
            } else if (status === 'unauthenticated') {
                // If there's no session, redirect to sign-in page or stay on home
                router.push('/menu');
            }
            router.push('/menu');
            // If session status is still loading, do nothing or show a loader
        };

        fetchCredentialsAndRedirect();
    }, [status, router]);

    return <></>;
};

export default Home;
