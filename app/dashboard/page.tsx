'use client';
import { HabitList } from '@/components/Dashboard/HabitList';
import { CapybaraStack } from '@/components/Dashboard/CapybaraStack';
import { FriendsButton } from '@/components/Dashboard/FriendButton';
import { NavigationArrows } from '@/components/Dashboard/NavArrows';
import { AccessorizeButton } from '@/components/Dashboard/AccessorizeButton';
import NavBar from '@/components/NavBar';
import { useAuth } from '@/components/AuthProvider';
import { useEffect } from 'react';

export default function Dashboard() {
	const auth = useAuth();

	useEffect(() => {
		if (!auth?.isAuthenticated) {
			auth?.loginRequiredRedirect();
		}
	}, [auth]);

	return (
		<>
			<NavBar />
			<div className='flex h-screen bg-primary-light'>
				<main className='flex-1 p-6 overflow-auto'>
					<div className='max-w-4xl mx-auto space-y-6'>
						<div className='flex justify-between items-center'>
							<h2 className='text-3xl font-bold text-text-primary'>Dashboard</h2>
							<div className='space-x-4'>
								<FriendsButton />
								<AccessorizeButton />
							</div>
						</div>
						<div className='grid md:grid-cols-2 gap-6'>
							<HabitList />
							<CapybaraStack />
						</div>
					</div>
					<NavigationArrows />
				</main>
			</div>
		</>
	);
}
