import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';

export function AccessorizeButton() {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className='px-4 py-1 bg-accent-brown text-white rounded-md hover:bg-accent-darkbrown transition-colors'>
					<Sparkles className='mr-2 h-4 w-4' /> Accessorize Capybara
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px] bg-accent-brown text-white border-gray-700'>
				<DialogHeader>
					<DialogTitle className='text-3xl font-bold text-center text-white mb-8'>Accessorize</DialogTitle>
				</DialogHeader>
				Stuff
			</DialogContent>
		</Dialog>
	);
}
