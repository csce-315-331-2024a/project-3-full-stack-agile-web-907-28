import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Home = () => {
	const router = useRouter();

	useEffect(() => {
		router.push('/menu');
	}, []);

	return <></>;
};

export default Home;