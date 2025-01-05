import React from 'react';
import Notepad from './Notepad';

export default function RegisterForm() {
	return (
		<div className='relative'>
			<Notepad />

			<style>{`
				input:-webkit-autofill,
				input:-webkit-autofill:hover,
				input:-webkit-autofill:focus {
					-webkit-box-shadow: 0 0 0px 1000px transparent inset;
					transition: background-color 5000s ease-in-out 0s;
					-webkit-text-fill-color: inherit;
				}
			`}</style>

			<form className='absolute top-[120px] left-[40px] w-[400px] z-40 flex flex-col gap-y-[50px]'>
				<input
					className='bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 w-full px-2 h-8 pb-1'
					type='text'
					placeholder='Username'
				/>
				<input
					className='bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 w-full px-2 h-8'
					type='email'
					placeholder='Email'
				/>
				<input
					className='bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 w-full px-2 h-8'
					type='password'
					placeholder='Password'
				/>
				<input
					className='bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 w-full px-2 h-8 pt-1'
					type='password'
					placeholder='Confirm Password'
				/>
				<button
					type='submit'
					className='bg-gray-800 text-white px-4 rounded-md hover:bg-[#B1C29E] hover:text-[#333333] transition-colors mt-0 w-32 ml-auto mr-6'
				>
					Register
				</button>
			</form>
		</div>
	);
}
