'use client';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useAuth } from '@/components/AuthProvider';
import { SWRError } from '../interfaces/model';
import Notepad from '@/components/Notepad';

const fetcher = async (url: string) => {
	const res = await fetch(url);

	if (!res.ok) {
		const error = new Error('An error occurred while fetching the data.') as SWRError;
		error.info = await res.json();
		error.status = res.status;
		throw error;
	}

	return res.json();
};
const HABIT_API_URL = '/api/habits/';

export default function Page() {
	const { data, isLoading, error } = useSWR<string, SWRError>(HABIT_API_URL, fetcher);
	const [darkMode, setDarkMode] = useState(true);
	const auth = useAuth();

	useEffect(() => {
		if (error?.status === 401) {
			auth?.loginRequiredRedirect();
		}
	}, [auth, error]);
	
	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [darkMode]);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200'>
			<div className='max-w-max w-full space-y-6 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-gray-700 dark:text-white'>
				<div className='flex justify-center space-x-10'>
					{JSON.stringify(data)}
					<button
						onClick={() => setDarkMode(!darkMode)}
						className='p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
					>
						{darkMode ? '🌞' : '🌙'}
					</button>
				</div>
			</div>
			<Notepad />
		</div>
	);
}
