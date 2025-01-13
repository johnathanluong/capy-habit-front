'use client';
import { useAuth } from '@/components/AuthProvider';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LOGIN_URL = '/api/login/';

export default function Page() {
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
	}

	return (
		<>
			<NavBar />
			<div className='min-h-screen flex items-center justify-center bg-primary-white dark:bg-gray-800 transition-colors duration-200'>
				<div className='max-w-md w-full space-y-8 p-8 bg-primary-green rounded-xl shadow-lg relative sm:max-w-[425px]'>
					<h1 className='text-3xl font-bold text-center text-gray-800 mb-8'>Login</h1>
					<form onSubmit={handleSubmit} className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='username'>Username</Label>
							<Input
								required
								id='username'
								name='username'
								placeholder='Username'
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
						<Button type='submit' className='w-full'>
							Login
						</Button>
					</form>
				</div>
			</div>
		</>
	);
}
