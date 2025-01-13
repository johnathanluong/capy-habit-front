'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { LoginDialog } from './LoginModal';

export default function NavBar() {
	const auth = useAuth();
	const [isPathValid, setIsPathValid] = useState(true);

	const isAuthenticated = auth?.isAuthenticated;
	const path = auth?.path;

	useEffect(() => {
		const invalidPaths = ['/login', '/dashboard'];
		if (!path) {
			return;
		}

		if (invalidPaths.includes(path)) {
			setIsPathValid(false);
		} else {
			setIsPathValid(true);
		}
	}, [path]);

	return (
		<nav className='fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-4 z-50 bg-slate-400'>
			<div className='flex items-center gap-8'>
				<Link href='/' className='text-2xl font-bold text-text-primary'>
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
		</nav>
	);
}
