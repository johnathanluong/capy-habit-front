import { LoaderCircle } from 'lucide-react';
import React from 'react';

export default function Loading() {
	return (
		<div className='bg-primary-light min-h-screen w-full fixed inset-0'>
			<div className='flex items-center justify-center h-full'>
				<LoaderCircle className='h-12 w-12 animate-spin text-primary-darkgreen' />
			</div>
		</div>
	);
}
