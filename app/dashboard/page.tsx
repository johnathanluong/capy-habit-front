'use client';
import { useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/lib/apiFetch';
import { useAuth } from '@/lib/AuthProvider';

import NavBar from '@/components/NavBar';
import LevelBar from '@/components/Dashboard/LevelBar';
import { HabitList } from '@/components/Dashboard/HabitList';
import { CapybaraStackCard } from '@/components/Dashboard/CapybaraStackCard';
import { AccessorizeButton } from '@/components/Dashboard/AccessorizeButton';
import { NavArrowsDashboard } from '@/components/Dashboard/NavArrowsDashboard';
import { Habit } from '../interfaces/model';
import { useToast } from '@/hooks/use-toast';
import { deleteHabitAPI, updateHabitAPI } from '../api/habits/[habit.id]/api';
import Loading from '@/components/Loading';

const HABIT_API_URL = `/api/habits`;
const ME_API_URL = `/api/me`;

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
	} = useSWR(HABIT_API_URL, fetcher, {
		revalidateOnFocus: false, // Reduce unnecessary revalidations
		revalidateOnReconnect: false,
		dedupingInterval: 5000 // Dedupe requests within 5 seconds
	});

	const {
		data: user,
		error: userError,
		isLoading: userLoading
	} = useSWR(ME_API_URL, fetcher, {
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
			mutate(HABIT_API_URL);
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
			mutate(ME_API_URL);
		} catch (e) {
			console.error('Habit deleted failed frontend:', e);
		}
	};

	if (userLoading || habitLoading) return <Loading />;
	if (userError || habitError) {
		auth?.loginRequiredRedirect();
		return <div>Reauthenticating...</div>;
	}

	return (
		<>
			<NavBar />
			<div className='flex flex-col min-h-screen bg-primary-light'>
				<main className='flex-1 p-6 pt-20 overflow-hidden'>
					<div className='max-w-7xl mx-auto h-full flex flex-col space-y-6'>
						<div className='flex justify-between items-center'>
							<h2 className='text-3xl font-bold text-text-primary'>Dashboard</h2>
							<div className='space-x-4'>
								<AccessorizeButton />
							</div>
						</div>
						<div className='grid grid-rows-2 md:grid-rows-none md:grid-cols-2 gap-6 h-[70vh] md:min-h-[30vh] md:max-h-[60vh] '>
							<div className='h-full max-h-[35vh] md:max-h-full'>
								{habits && (
									<HabitList
										habits={habits.data}
										onUpdateHabit={updateHabit}
										onDeleteHabit={deleteHabit}
									/>
								)}
							</div>
							<div className='h-full max-h-[35vh] md:max-h-full'>
								{habits && <CapybaraStackCard habits={habits?.data} />}
							</div>
						</div>
						<NavArrowsDashboard />

						{user && <LevelBar user={user?.data} />}
					</div>
				</main>
			</div>
		</>
	);
}
