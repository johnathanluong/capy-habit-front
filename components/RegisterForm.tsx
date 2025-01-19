'use client';
import React, { useState } from 'react';
import Notepad from './Notepad';

const REGISTER_URL = '/api/register/';

export default function RegisterForm() {
	const [message, setMessage] = useState('');
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const objData = Object.fromEntries(formData);
		const body = JSON.stringify(objData);
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: body
		};

		const response = await fetch(REGISTER_URL, requestOptions);
		if (!response.ok) {
			setMessage('Unable to register, try again.');
			console.error('Error fetching registering', response.status);
		}

		setMessage('An email was sent to you, please verify your email...');
		await response.json();
	}

	return (
		<div className='relative'>
			<Notepad />

			<style jsx={true}>{`
				input:-webkit-autofill,
				input:-webkit-autofill:hover,
				input:-webkit-autofill:focus {
					-webkit-box-shadow: 0 0 0px 1000px transparent inset;
					transition: background-color 5000s ease-in-out 0s;
					-webkit-text-fill-color: inherit;
				}
			`}</style>

			<h1 className='absolute z-40 top-[20px] left-[115px] text-gray-800 text-xl font-extrabold bg-slate-200 w-[230px] rounded-md text-center'>
				Sign Up For Free!
			</h1>

			<form
				className='absolute top-[120px] left-[40px] w-[400px] z-40 flex flex-col gap-y-[50px]'
				onSubmit={handleSubmit}
			>
				<input
					className='bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 w-full px-2 h-8 pb-1'
					type='text'
					name='username'
					placeholder='Username'
					required
				/>
				<input
					className='bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 w-full px-2 h-8'
					type='email'
					name='email'
					placeholder='Email'
					required
				/>
				<input
					className='bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 w-full px-2 h-8'
					type='password'
					name='password'
					placeholder='Password'
					required
				/>
				<input
					className='bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 w-full px-2 h-8 pt-1'
					type='password'
					name='confirmPassword'
					placeholder='Confirm Password'
					required
				/>
				<button
					type='submit'
					className='bg-gray-600 text-white px-4 rounded-md hover:bg-gray-700 transition-colors mt-0 w-32 ml-auto mr-6'
				>
					Register
				</button>
				<h1 className='relative mt-[-2rem] ml-auto mr-28'>{message}</h1>
			</form>
		</div>
	);
}
