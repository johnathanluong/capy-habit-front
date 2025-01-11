import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

export function FriendsButton() {
	return (
		<Button className='bg-secondary-light hover:bg-secondary-accent text-primary-white'>
			<Users className='mr-2 h-4 w-4' /> Friends
		</Button>
	);
}
