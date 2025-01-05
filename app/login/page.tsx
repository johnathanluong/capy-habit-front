'use client';
import { useState, useEffect } from 'react';

// const LOGIN_URL = 'http://127.0.0.1:8000/api/token/pair';
const LOGIN_URL = '/api/login/';

export default function Page() {
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [darkMode]);

	async function handleSubmit(e: any) {
		e.preventDefault();

		const formData = new FormData(e.target);
		const objData = Object.fromEntries(formData);
		const data = JSON.stringify(objData);
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: data
		};

		const res = await fetch(LOGIN_URL, requestOptions);
		if (!res.ok) {
			console.error('Error logging in:', res.statusText, res.status);
			return;
		}

		const resData = await res.json();
		console.log(resData);
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200'>
			<div className='max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg relative'>
				<button
					onClick={() => setDarkMode(!darkMode)}
					className='absolute top-4 right-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
				>
					{darkMode ? '🌞' : '🌙'}
				</button>
				<h1 className='text-3xl font-bold text-center text-gray-900 dark:text-white mb-8'>Login</h1>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<input
						required
						type='text'
						name='username'
						placeholder='Username'
						className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                 outline-none transition placeholder-gray-500 dark:placeholder-gray-400'
					/>

					<input
						required
						type='password'
						name='password'
						placeholder='Password'
						className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                 outline-none transition placeholder-gray-500 dark:placeholder-gray-400'
					/>

					<button
						type='submit'
						className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 
                                 dark:hover:bg-blue-600 text-white font-semibold rounded-lg 
                                 transition duration-200 ease-in-out focus:outline-none 
                                 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
}
