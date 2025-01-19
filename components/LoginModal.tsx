'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/AuthProvider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LOGIN_URL = '/api/login/';

export function LoginDialog() {
	const [message, setMessage] = useState('');
	const [open, setOpen] = useState(false);
	const auth = useAuth();

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

		const res = await fetch(LOGIN_URL, requestOptions);
		if (!res.ok) {
			setMessage('Incorrect login credentials, try again.');
			console.error('Error logging in:', res);
			return;
		}

		setMessage('Logging in...');
		auth?.login();
		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className='px-4 py-1 bg-primary-green text-gray-800 rounded-md hover:bg-[#9FB08E] transition-colors'>
					Login
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px] bg-primary-green'>
				<DialogHeader>
					<DialogTitle className='text-3xl font-bold text-center text-gray-900 dark:text-white mb-8'>
						Login
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='space-y-2'>
						<Label htmlFor='identifier'>Username or Email</Label>
						<Input
							required
							id='identifier'
							name='identifier'
							placeholder='Username or Email'
							className='border-primary-darkgreen focus:border-primary-darkgreen bg-primary-darkgreen'
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='password'>Password</Label>
						<Input
							required
							id='password'
							name='password'
							type='password'
							placeholder='Password'
							className='border-primary-darkgreen focus:border-primary-darkgreen bg-primary-darkgreen'
						/>
					</div>

					<h1 className='mt-1 font-thin'>{message}</h1>

					<Button type='submit' className='w-full'>
						Login
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
