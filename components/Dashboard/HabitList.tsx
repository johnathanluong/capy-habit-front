'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, Settings } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Habit } from '@/app/interfaces/model';
import { EditHabitDialog } from './EditHabitDialog';

interface HabitListProps {
	habits: Habit[];
	onUpdateHabit: (updatedHabit: Habit) => void;
	onDeleteHabit: (habitId: number) => void;
}

export function HabitList({ habits, onUpdateHabit, onDeleteHabit }: HabitListProps) {
	const [shownHabits, setShownHabits] = useState<Habit[]>(habits);
	const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

	const completeHabit = (id: number) => {
		// Logic to complete habit
		console.log(`Completed habit ${id}`);
	};

	const deleteHabit = (id: number) => {
		setShownHabits(habits.filter((shownHabit) => shownHabit.id !== id));
	};

	const openEditDialog = (habit: Habit) => {
		setEditingHabit(habit);
	};

	const closeEditDialog = () => {
		setEditingHabit(null);
	};

	const handleUpdateHabit = (updatedHabit: Habit) => {
		onUpdateHabit(updatedHabit);
		setShownHabits(shownHabits.map((habit) => (habit.id === updatedHabit.id ? updatedHabit : habit)));
		closeEditDialog();
	};

	const handleDeleteHabit = async (habitId: number) => {
		onDeleteHabit(habitId);
		setShownHabits(habits.filter((habit) => habit.id !== habitId));
		closeEditDialog();
	};

	return (
		<Card className='flex flex-col h-full bg-primary-dark'>
			<CardHeader>
				<CardTitle className='text-text-primary'>Habits to Complete</CardTitle>
			</CardHeader>
			<CardContent className='overflow-y-auto max-h-[calc(60vh-6rem)] min-h-[calc(30vh-6rem)]'>
				<ScrollArea className='h-full w-full'>
					<div className='space-y-4 pr-4'>
						{shownHabits && shownHabits?.length > 0 ? (
							shownHabits.map((habit) => (
								<TooltipProvider key={habit.id}>
									<Tooltip>
										<TooltipTrigger asChild>
											<div className='flex items-center justify-between p-4 bg-primary-light rounded-lg'>
												<div>
													<h3 className='font-semibold text-text-primary'>{habit.name}</h3>
													<p className='text-sm text-text-secondary'>
														{habit.category ? `Category: ${habit.category} |` : ''} Streak:{' '}
														{habit.streak}
													</p>
												</div>
												<div className='flex space-x-2'>
													<Button
														size='sm'
														onClick={() => openEditDialog(habit)}
														className='bg-gray-500 hover:bg-gray-700 text-primary-white'
													>
														<Settings className='w-4 h-4' />
													</Button>
													<Button
														size='sm'
														onClick={() => completeHabit(habit.id)}
														className='bg-secondary-light hover:bg-secondary-accent text-primary-white'
													>
														<Check className='w-4 h-4' />
													</Button>
													<Button
														size='sm'
														variant='destructive'
														onClick={() => deleteHabit(habit.id)}
														className='bg-destructive hover:bg-destructive/90 text-destructive-foreground'
													>
														<X className='w-4 h-4' />
													</Button>
												</div>
											</div>
										</TooltipTrigger>
										<TooltipContent className='bg-primary-darkgreen'>
											<p>{habit.description}</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							))
						) : (
							<div className='flex text-center px-24'>
								You have no upcoming habits to complete. Go to the habit creation screen to make more!
							</div>
						)}
					</div>
				</ScrollArea>
			</CardContent>
			<CardFooter />
			{editingHabit && (
				<EditHabitDialog
					habit={editingHabit}
					onClose={closeEditDialog}
					onUpdate={handleUpdateHabit}
					onDelete={handleDeleteHabit}
				/>
			)}
		</Card>
	);
}
