'use client';
import { useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/apiFetch';
import { useAuth } from '@/components/AuthProvider';

import NavBar from '@/components/NavBar';
import LevelBar from '@/components/LevelBar';
import { HabitList } from '@/components/Dashboard/HabitList';
import { CapybaraStack } from '@/components/Dashboard/CapybaraStack';
import { FriendsButton } from '@/components/Dashboard/FriendButton';
import { AccessorizeButton } from '@/components/Dashboard/AccessorizeButton';
import { NavArrowsDashboard } from '@/components/Dashboard/NavArrowsDashboard';

const dummyXP = {
	xp: 20,
	xpTotal: 80,
	level: 3,
	coins: 40
};

export default function Dashboard() {
	const auth = useAuth();

	const { data: habits, error, isLoading } = useSWR('http://127.0.0.1:8000/api/habits/', fetcher);

	useEffect(() => {
		if (!auth?.isAuthenticated) {
			auth?.loginRequiredRedirect();
		}
	}, [auth]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading habits</div>;

	return (
		<>
			<NavBar />
			<div className='flex flex-col min-h-screen bg-primary-light'>
				<NavBar />
				<main className='flex-1 p-6 pt-20 overflow-hidden'>
					<div className='max-w-7xl mx-auto h-full flex flex-col space-y-6'>
						<div className='flex justify-between items-center'>
							<h2 className='text-3xl font-bold text-text-primary'>Dashboard</h2>
							<div className='space-x-4'>
								<FriendsButton />
								<AccessorizeButton />
							</div>
						</div>
						<div className='grid grid-rows-2 md:grid-rows-none md:grid-cols-2 gap-6 h-[70vh] md:min-h-[30vh] md:max-h-[60vh] '>
							<div className='h-full max-h-[35vh] md:max-h-full'>
								<HabitList habits={habits} />
							</div>
							<div className='h-full max-h-[35vh] md:max-h-full'>
								<CapybaraStack />
							</div>
						</div>
						<NavArrowsDashboard />
						<LevelBar {...dummyXP} />
					</div>
				</main>
			</div>
		</>
	);
}
