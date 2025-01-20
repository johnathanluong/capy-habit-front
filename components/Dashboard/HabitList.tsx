'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Settings } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Habit } from '@/app/interfaces/model';
import { EditHabitDialog } from './EditHabitDialog';
import ProgressBar from './ProgressBar';
import { mutate } from 'swr';
import { completeHabitAPI } from '@/app/api/habits/[habit.id]/api';

const HABIT_API_URL = `/api/habits`;
const ME_API_URL = `/api/me`;

interface HabitListProps {
	habits: Habit[];
	onUpdateHabit: (updatedHabit: Habit) => void;
	onDeleteHabit: (habitId: number) => void;
}

export function HabitList({ habits, onUpdateHabit, onDeleteHabit }: HabitListProps) {
	const [shownHabits, setShownHabits] = useState<Habit[]>(
		habits.filter((habit) => habit.progress?.completed < habit.progress?.required)
	);
	const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

	const completeHabit = async (id: number) => {
		await completeHabitAPI(id);

		// Removes the habit if on the next completion it would satisfy the requirement
		setShownHabits(
			(prevHabits) =>
				prevHabits
					.map((habit) => {
						if (habit.id === id) {
							const newCompleted = (habit.progress.completed || 0) + 1;
							if (newCompleted >= habit.progress.required) {
								return null;
							}
							return {
								...habit,
								progress: {
									...habit.progress,
									completed: newCompleted
								}
							};
						}
						return habit;
					})
					.filter(Boolean) as Habit[]
		);

		await Promise.all([mutate(HABIT_API_URL), mutate(ME_API_URL)]);
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
												{habit.frequency > 1 && (
													<div>
														<ProgressBar
															progress={habit.progress.completed}
															required={habit.progress.required}
															type='habit'
														/>
													</div>
												)}
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
