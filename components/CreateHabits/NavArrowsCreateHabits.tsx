import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function NavArrowsCreateHabit() {
	return (
		<div className='fixed top-[85%] md:top-1/2 left-0 right-0 flex justify-end px-4 -translate-y-1/2'>
			<div className='flex flex-col items-center'>
				<h1 className='mb-2 text-lg'>To Dashboard</h1>
				<Button
					asChild
					variant='outline'
					size='icon'
					className='h-12 w-12 rounded-full bg-primary-green hover:bg-primary-darkgreen text-text-primary'
				>
					<Link href='/dashboard'>
						<ChevronRight className='h-4 w-4' />
						<span className='sr-only'>Go to Dashboard</span>
					</Link>
				</Button>
			</div>
		</div>
	);
}
