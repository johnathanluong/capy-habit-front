'use client';
import NavBar from '@/components/NavBar';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const VERIFY_URL = '/api/verifyemail/';

export default function Page() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [message, setMessage] = useState('');

	useEffect(() => {
		const verifyEmail = async () => {
			try {
				const email = searchParams.get('email');
				const token = searchParams.get('token');

				if (!email || !token) {
					console.error('Missing email or token');
					setMessage('Missing email or token');
					return;
				}

				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ email, token })
				};

				const response = await fetch(VERIFY_URL, options);
				if (!response.ok) {
					console.error('Verification failed');
					setMessage('Verification failed');
				}

				setMessage('Successfully verified email, redirecting to login...');
				setTimeout(() => router.push('/login'), 2000);
			} catch (e) {
				console.error('Error verifying email');
				setMessage('Error');
			}
		};

		verifyEmail();
	}, [searchParams, router]);
	return (
		<>
			<NavBar />
			<div className='flex justify-center align-middle'>
				<h1 className='text-lg'>{message}</h1>
			</div>
		</>
	);
}
