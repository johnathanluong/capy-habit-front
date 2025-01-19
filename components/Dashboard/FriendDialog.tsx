'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function FriendButton() {
	const [open, setOpen] = useState(false);

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
						Friends
					</DialogTitle>
				</DialogHeader>
				Stuff
			</DialogContent>
		</Dialog>
	);
}
