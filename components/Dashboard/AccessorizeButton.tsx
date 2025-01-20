import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { fetcher } from '@/lib/apiFetch';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { Habit, UserAccessory } from '@/app/interfaces/model';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { accessorizeHabitAPI } from '@/app/api/accessorizeCapybaras/api';

const INVENTORY_API_URL = '/api/getInventory';
const HABIT_API_URL = `/api/habits`;

interface AccessorizeButtonProps {
	habits: Habit[];
}

export function AccessorizeButton({ habits }: AccessorizeButtonProps) {
	const { data: inventoryData } = useSWR<{ data: UserAccessory[] }>(INVENTORY_API_URL, fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		dedupingInterval: 5000
	});

	const [open, setOpen] = useState(false);
	const [selectedHabit, setSelectedHabit] = useState<string>('');
	const [selectedAccessory, setSelectedAccessory] = useState<string>('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { toast } = useToast();

	const availableAccessories = inventoryData?.data.filter((item) => item.quantity > item.number_used) || [];

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			let accessoryID: number;

			if (selectedAccessory === 'remove') {
				accessoryID = -1;
			} else {
				const foundAccessory = await availableAccessories.find(
					(item) => item.accessory.name === selectedAccessory
				);
				if (!foundAccessory) {
					throw new Error('Accessory not found');
				}

				accessoryID = foundAccessory.accessory.id;
			}

			await accessorizeHabitAPI(parseInt(selectedHabit), accessoryID);

			toast({
				title: 'Success!',
				description: 'Your capybaras have been accessorized!'
			});

			await Promise.all([mutate(HABIT_API_URL), mutate(INVENTORY_API_URL)]);

			setOpen(false);
		} catch (error) {
			console.error('Error accessorizing capybaras:', error);
			toast({
				title: 'Error',
				description: 'Failed to accessorize capybaras. Please try again.',
				variant: 'destructive'
			});
		} finally {
			setIsSubmitting(false);
		}
	};

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

				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='space-y-2'>
						<Label htmlFor='habit-select' className='text-white'>
							Select Habit
						</Label>
						<Select onValueChange={setSelectedHabit} value={selectedHabit}>
							<SelectTrigger id='habit-select' className='w-full bg-accent-darkbrown text-white'>
								<SelectValue placeholder='Select a habit' />
							</SelectTrigger>
							<SelectContent className='bg-accent-darkbrown text-white'>
								{habits.map((habit) => (
									<SelectItem
										key={habit.id}
										value={habit.id.toString()}
										className='hover:bg-accent-brown'
									>
										{habit.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='accessory-select' className='text-white'>
							Select Accessory
						</Label>
						<Select onValueChange={setSelectedAccessory} value={selectedAccessory}>
							<SelectTrigger id='accessory-select' className='w-full bg-accent-darkbrown text-white'>
								<SelectValue placeholder='Select an accessory' />
							</SelectTrigger>
							<SelectContent className='bg-accent-darkbrown text-white'>
								{/* Option to remove accessory if the capybara has one on */}
								{selectedHabit && habits.find((h) => h.id.toString() === selectedHabit)?.accessory && (
									<SelectItem value='remove' className='hover:bg-accent-brown text-red-400'>
										Remove Current Accessory
									</SelectItem>
								)}

								{/* Available accessories to put on the capybaras */}
								{availableAccessories.map((item) => (
									<SelectItem
										key={item.accessory.name}
										value={item.accessory.name}
										className='hover:bg-accent-brown'
									>
										{item.accessory.name} ({item.quantity - item.number_used} available)
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<Button
						type='submit'
						className='w-full bg-primary-green hover:bg-primary-darkgreen text-text-primary'
						disabled={!selectedHabit || !selectedAccessory || isSubmitting}
					>
						{isSubmitting ? 'Accessorizing...' : 'Accessorize'}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
