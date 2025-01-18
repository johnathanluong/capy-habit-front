'use client';
import { useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/lib/apiFetch';
import { useAuth } from '@/components/AuthProvider';

import NavBar from '@/components/NavBar';
import LevelBar from '@/components/LevelBar';
import { HabitList } from '@/components/Dashboard/HabitList';
import { CapybaraStack } from '@/components/Dashboard/CapybaraStack';
import { FriendsButton } from '@/components/Dashboard/FriendButton';
import { AccessorizeButton } from '@/components/Dashboard/AccessorizeButton';
import { NavArrowsDashboard } from '@/components/Dashboard/NavArrowsDashboard';
import { Habit } from '../interfaces/model';
import { useToast } from '@/hooks/use-toast';
import { deleteHabitAPI, updateHabitAPI } from '../api/habits/[habit.id]/api';

const dummyXP = {
	xp: 20,
	xpTotal: 80,
	level: 3,
	coins: 40
};

export default function Dashboard() {
	const auth = useAuth();
	const { toast } = useToast();

	const {
		data: habits,
		error: habitError,
		isLoading: habitLoading
	} = useSWR('http://127.0.0.1:8000/api/habits/', fetcher, {
		revalidateOnFocus: false, // Reduce unnecessary revalidations
		revalidateOnReconnect: false,
		dedupingInterval: 5000 // Dedupe requests within 5 seconds
	});

	const {
		data: user,
		error: userError,
		isLoading: userLoading
	} = useSWR('http://127.0.0.1:8000/api/me', fetcher, {
		revalidateOnFocus: false, // Reduce unnecessary revalidations
		revalidateOnReconnect: false,
		dedupingInterval: 5000 // Dedupe requests within 5 seconds
	});

	useEffect(() => {
		if (!auth?.isAuthenticated) {
			auth?.loginRequiredRedirect();
		}
	}, [auth]);

	async function updateHabit(updatedHabit: Habit) {
		try {
			await updateHabitAPI(updatedHabit);
			toast({
				title: 'Success',
				description: 'Habit modified successfully'
			});
			mutate('http://127.0.0.1:8000/api/habits/');
		} catch (error) {
			console.error('Error updating habit frontend');
		}
	}

	const deleteHabit = async (habitId: number) => {
		try {
			await deleteHabitAPI(habitId);
			toast({
				title: 'Success',
				description: 'Habit deleted successfully'
			});
			mutate('http://127.0.0.1:8000/api/habits/');
		} catch (e) {
			console.error('Habit deleted failed frontend:', e);
		}
	};

	if (userLoading || habitLoading) return <div>Loading...</div>;
	if (userError || habitError) return <div>Error loading.</div>;

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
								<HabitList habits={habits} onUpdateHabit={updateHabit} onDeleteHabit={deleteHabit} />
							</div>
							<div className='h-full max-h-[35vh] md:max-h-full'>
								<CapybaraStack />
							</div>
						</div>
						<NavArrowsDashboard />
						<LevelBar user={user} />
					</div>
				</main>
			</div>
		</>
	);
}
