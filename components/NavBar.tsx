'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../lib/AuthProvider';
import { LoginDialog } from './LoginModal';
import { Button } from './ui/button';
import { logoutAPI } from '@/app/api/logout/api';

export default function NavBar() {
	const auth = useAuth();
	const [isPathValid, setIsPathValid] = useState(true);

	const isAuthenticated = auth?.isAuthenticated;
	const path = auth?.path;

	useEffect(() => {
		const invalidPaths = ['/login', '/dashboard', '/create-habit'];
		if (!path) {
			return;
		}

		if (invalidPaths.includes(path)) {
			setIsPathValid(false);
		} else {
			setIsPathValid(true);
		}
	}, [path]);

	const handleLogout = async () => {
		await logoutAPI();
		auth?.logout();
	};

	return (
		<nav className='fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-50 bg-slate-400'>
			<div className='flex items-center gap-8'>
				<Link href='/' className='text-3xl font-bold text-text-primary'>
					Capy Habits
				</Link>
				<div className='flex gap-6'>
					<Link href='/' className='text-text-secondary hover:text-gray-900'>
						Home
					</Link>
					<Link href='/faq' className='text-text-secondary hover:text-gray-900'>
						FAQ
					</Link>
				</div>
			</div>
			{!isAuthenticated && isPathValid && <LoginDialog />}
			{isAuthenticated && isPathValid && (
				<Button
					asChild
					className='bg-primary-green px-4 py-1 text-gray-800 rounded-md hover:bg-[#9FB08E] transition-colors'
				>
					<Link href={'/dashboard'}>Dashboard</Link>
				</Button>
			)}
			{isAuthenticated && !isPathValid && (
				<Button
					onClick={handleLogout}
					className='bg-primary-green px-4 py-1 text-gray-800 rounded-md hover:bg-[#9FB08E] transition-colors'
				>
					Logout
				</Button>
			)}
		</nav>
	);
}
