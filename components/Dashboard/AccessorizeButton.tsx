import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export function AccessorizeButton() {
	return (
		<Button asChild className='bg-accent-brown hover:bg-accent-brown/90 text-primary-white'>
			<Link href='/accessorize'>
				<Sparkles className='mr-2 h-4 w-4' /> Accessorize Capybara
			</Link>
		</Button>
	);
}
