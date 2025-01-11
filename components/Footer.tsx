'use client';
import { AddressBook, GithubLogo, LinkedinLogo } from '@phosphor-icons/react';
import React from 'react';

export default function Footer() {
	return (
		<footer className='px-8 py-12 bg-[#B1C29E]'>
			<div className='max-w-7xl mx-auto'>
				<div className='text-center mb-8'>
					<h3 className='text-xl font-medium text-gray-800 mb-2'>Help Support John!</h3>
					<p className='text-gray-600'>Please support John&apos;s living by offering him a job!</p>
					<a className='text-gray-500' href='https://www.vecteezy.com/free-vector/capybara'>
						Capybara Vectors by Vecteezy
					</a>
				</div>
				<div className='flex items-center justify-end space-x-6'>
					<a
						target='_blank'
						href='https://linkedin.com/in/johnathan-luong/'
						className='text-gray-600 hover:text-gray-800'
					>
						<LinkedinLogo size={32} />
					</a>
					<a
						target='_blank'
						href='https://github.com/johnathanluong'
						className='text-gray-600 hover:text-gray-800'
					>
						<GithubLogo size={32} />
					</a>
					<a
						target='_blank'
						href='https://johnathanluong.github.io/react-portfolio/'
						className='text-gray-600 hover:text-gray-800'
					>
						<AddressBook size={32} />
					</a>
				</div>
			</div>
		</footer>
	);
}
