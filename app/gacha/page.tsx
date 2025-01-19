'use client';
import NavBar from '@/components/NavBar';
import { useAuth } from '@/lib/AuthProvider';
import { useEffect } from 'react';
import { NavArrowsGacha } from '@/components/Gacha/NavArrowsGacha';
import { fetcher } from '@/lib/apiFetch';
import useSWR from 'swr';
import { AccessoryShowcase } from '@/components/Gacha/AccessoryShowcase';
import { GachaPull } from '@/components/Gacha/GachaPull';
import LevelBar from '@/components/Dashboard/LevelBar';

const GACHA_API_URL = '/api/getpulls';
const GACHA_PULL_API_URL = '/api/pull';
const ME_API_URL = '/api/me';

export default function Page() {
	const auth = useAuth();

	const { data: items } = useSWR(GACHA_API_URL, fetcher, {
		revalidateOnFocus: false, // Reduce unnecessary revalidations
		revalidateOnReconnect: false,
		dedupingInterval: 5000 // Dedupe requests within 5 seconds
	});

	const { data: user } = useSWR(ME_API_URL, fetcher, {
		revalidateOnFocus: false, // Reduce unnecessary revalidations
		revalidateOnReconnect: false,
		dedupingInterval: 5000 // Dedupe requests within 5 seconds
	});

	useEffect(() => {
		if (!auth?.isAuthenticated) {
			auth?.loginRequiredRedirect();
		}
	}, [auth]);

	return (
		<>
			<NavBar />
			<div className='pt-24 px-8 min-h-screen bg-primary-light'>
				<div className='max-w-4xl mx-auto'>
					<h1 className='text-2xl font-bold mb-6'>Gacha</h1>
					{user && <GachaPull user={user.data} />}
					{items && <AccessoryShowcase accessories={items.data} />}
				</div>
			</div>
			{user && <LevelBar user={user.data} />}
			<NavArrowsGacha />
		</>
	);
}
