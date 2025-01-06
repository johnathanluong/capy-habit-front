'use client';
import { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LOGIN_URL = '/api/login/';

export function LoginDialog() {
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
			console.error('Error logging in:', res);
			return;
		}

		auth?.login();
		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant='outline'
					className='px-4 py-1 bg-[#B1C29E] text-gray-800 rounded-md hover:bg-[#9FB08E] transition-colors'
				>
					Login
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle className='text-3xl font-bold text-center text-gray-900 dark:text-white mb-8'>
						Login
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='space-y-2'>
						<Label htmlFor='username'>Username</Label>
						<Input required id='username' name='username' placeholder='Username' />
					</div>
					<div className='space-y-2'>
						<Label htmlFor='password'>Password</Label>
						<Input required id='password' name='password' type='password' placeholder='Password' />
					</div>
					<Button type='submit' className='w-full'>
						Login
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
