'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { ScrollArea } from '@radix-ui/react-scroll-area';

interface Habit {
	id: number;
	name: string;
	category: string;
	streak: number;
}
interface HabitListProps {
	habits: Habit[];
}

export function HabitList({ habits }: HabitListProps) {
	const [shownHabits, setShownHabits] = useState<Habit[]>(habits);

	const completeHabit = (id: number) => {
		// Logic to complete habit
		console.log(`Completed habit ${id}`);
	};

	const deleteHabit = (id: number) => {
		setShownHabits(habits.filter((shownHabits) => shownHabits.id !== id));
	};

	return (
		<Card className='flex flex-col h-full bg-primary-dark'>
			<CardHeader>
				<CardTitle className='text-text-primary'>Habits to Complete</CardTitle>
			</CardHeader>
			<CardContent className='overflow-y-auto max-h-[calc(60vh-6rem)] min-h-[calc(30vh-6rem)]'>
				<ScrollArea className='h-full w-full'>
					<div className='space-y-4 pr-4'>
						{shownHabits &&
							shownHabits.map((habit) => (
								<div
									key={habit.id}
									className='flex items-center justify-between p-4 bg-primary-light rounded-lg'
								>
									<div>
										<h3 className='font-semibold text-text-primary'>{habit.name}</h3>
										<p className='text-sm text-text-secondary'>
											Category: {habit.category} | Streak: {habit.streak}
										</p>
									</div>
									<div className='flex space-x-2'>
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
							))}
					</div>
				</ScrollArea>
			</CardContent>
			<CardFooter />
		</Card>
	);
}
