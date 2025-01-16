'use client';
import { useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import { fetcher, apiFetch } from '@/lib/apiFetch';
import { useAuth } from '@/components/AuthProvider';
import { getAuthToken } from '@/lib/auth';

import NavBar from '@/components/NavBar';
import LevelBar from '@/components/LevelBar';
import { HabitList } from '@/components/Dashboard/HabitList';
import { CapybaraStack } from '@/components/Dashboard/CapybaraStack';
import { FriendsButton } from '@/components/Dashboard/FriendButton';
import { AccessorizeButton } from '@/components/Dashboard/AccessorizeButton';
import { NavArrowsDashboard } from '@/components/Dashboard/NavArrowsDashboard';
import { Habit } from '../interfaces/model';
import { useToast } from '@/hooks/use-toast';
import { convertHabiToFormData } from '@/lib/utils';

const dummyXP = {
	xp: 20,
	xpTotal: 80,
	level: 3,
	coins: 40
};

const BACKEND_HABIT_URL = 'http://127.0.0.1:8000/api/habits';

interface Response {
	id: number;
	name: string;
	description: string;
	category?: string;
	frequency: number;
	frequency_type: string;
	grace_period: number;
	streak: number;
	created: string; // ISO datetime string
	modified: string; // ISO datetime string
}

export default function Dashboard() {
	const auth = useAuth();
	const { toast } = useToast();

	const {
		data: habits,
		error,
		isLoading
	} = useSWR('http://127.0.0.1:8000/api/habits/', fetcher, {
		revalidateOnFocus: false, // Reduce unnecessary revalidations
		revalidateOnReconnect: false,
		dedupingInterval: 5000 // Dedupe requests within 5 seconds
	});

	useEffect(() => {
		if (!auth?.isAuthenticated) {
			auth?.loginRequiredRedirect();
		}
	}, [auth]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading habits</div>;

	async function updateHabit(updatedHabit: Habit) {
		const authToken = await getAuthToken();
		if (!authToken) {
			console.error('No auth token found');
		}

		if (!updatedHabit.id) {
			console.error('Habit ID not passed');
		}

		try {
			const requestData = convertHabiToFormData(updatedHabit);

			const options = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${authToken}`
				},
				body: JSON.stringify(requestData)
			};

			await apiFetch<Response>(`${BACKEND_HABIT_URL}/${updatedHabit.id}`, options);

			toast({
				title: 'Success',
				description: 'Habit modified successfully'
			});
			mutate('http://127.0.0.1:8000/api/habits/');
		} catch (e) {
			console.error('Habit modification failed:', e);
		}
	}

	const deleteHabit = async (habitId: number) => {
		const authToken = await getAuthToken();
		if (!authToken) {
			console.error('No auth token found');
		}
		if (!habitId) {
			console.error('Habit ID not passed');
		}

		try {
			const options = {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${authToken}`
				}
			};

			await apiFetch<Response>(`${BACKEND_HABIT_URL}/${habitId}`, options);

			toast({
				title: 'Success',
				description: 'Habit deleted successfully'
			});
			mutate('http://127.0.0.1:8000/api/habits/');
		} catch (e) {
			console.error('Habit deleted failed:', e);
		}
	};

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
						<LevelBar {...dummyXP} />
					</div>
				</main>
			</div>
		</>
	);
}
