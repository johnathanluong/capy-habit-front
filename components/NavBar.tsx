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
	const invalidPaths = ['/login', '/dashboard'];

	useEffect(() => {
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
		<nav className='flex items-center justify-between px-8 py-4 z-50'>
			<div className='flex items-center gap-8'>
				<Link href='/' className='text-2xl font-bold text-gray-800'>
					Capy Habits
				</Link>
				<div className='flex gap-6'>
					<Link href='/' className='text-gray-600 hover:text-gray-800'>
						Home
					</Link>
					<Link href='/faq' className='text-gray-600 hover:text-gray-800'>
						FAQ
					</Link>
				</div>
			</div>
			{!isAuthenticated && isPathValid && <LoginDialog />}
		</nav>
	);
}
