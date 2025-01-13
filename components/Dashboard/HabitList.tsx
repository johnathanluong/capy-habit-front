'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';

interface Habit {
	id: number;
	name: string;
	category: string;
	streak: number;
}

export function HabitList() {
	const [habits, setHabits] = useState<Habit[]>([
		{ id: 1, name: 'Morning Run', category: 'Exercise', streak: 3 },
		{ id: 2, name: 'Read a Book', category: 'Education', streak: 5 },
		{ id: 3, name: 'Meditate', category: 'Wellness', streak: 2 }
	]);

	const completeHabit = (id: number) => {
		// Logic to complete habit
		console.log(`Completed habit ${id}`);
	};

	const deleteHabit = (id: number) => {
		setHabits(habits.filter((habit) => habit.id !== id));
	};

	return (
		<Card className='bg-primary-dark'>
			<CardHeader>
				<CardTitle className='text-text-primary'>Habits to Complete</CardTitle>
			</CardHeader>
			<CardContent>
				{habits.map((habit) => (
					<div
						key={habit.id}
						className='flex items-center justify-between p-2 border-b border-primary-green last:border-b-0'
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
			</CardContent>
		</Card>
	);
}
