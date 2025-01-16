'use client';
import NavBar from '@/components/NavBar';
import { useAuth } from '@/components/AuthProvider';
import { useEffect } from 'react';
import { NavArrowsCreateHabit } from '@/components/CreateHabits/NavArrowsCreateHabits';
import HabitCreationForm from '@/components/CreateHabits/HabitCreationForm';

export default function Page() {
	const auth = useAuth();

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
					<h1 className='text-2xl font-bold mb-6'>Create a New Habit</h1>
					<HabitCreationForm />
				</div>
			</div>
			<NavArrowsCreateHabit />
		</>
	);
}
