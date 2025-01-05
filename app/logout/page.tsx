'use client';
import { useState, useEffect } from 'react';
import { getAuthToken, getRefreshToken } from '../lib/auth';

const LOGOUT_URL = '/api/logout/';

export default function Page() {
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [darkMode]);

	async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: ''
		};

		const res = await fetch(LOGOUT_URL, requestOptions);
		if (!res.ok) {
			console.error('Error logging out:', res);
		}
	}

	async function tokens() {
		const authToken = await getAuthToken();
		const refreshToken = await getRefreshToken();

		console.log(authToken);
		console.log(refreshToken);
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200'>
			<div className='max-w-md w-full space-y-6 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg relative'>
				<div className='flex justify-center space-x-10'>
					<h1 className='my-auto text-l font-bold text-gray-900 dark:text-white'>
						Are you sure you want to logout?
					</h1>
					<button
						onClick={() => setDarkMode(!darkMode)}
						className='p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
					>
						{darkMode ? '🌞' : '🌙'}
					</button>
				</div>

				<button
					onClick={handleClick}
					className='w-full py-2 px-4 bg-red-600 hover:bg-red-700 dark:bg-red-500 
                                 dark:hover:bg-red-600 text-white font-semibold rounded-lg 
                                 transition duration-200 ease-in-out focus:outline-none 
                                 focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
				>
					Logout
				</button>
				<button onClick={tokens}>get tokens</button>
			</div>
		</div>
	);
}
