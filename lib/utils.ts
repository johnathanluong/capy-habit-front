import { HabitFormData } from '@/app/interfaces/habitform';
import { Habit } from '@/app/interfaces/model';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const convertHabiToFormData = (habit: Habit): HabitFormData => {
	return {
		name: habit.name,
		description: habit.description,
		category: habit.category,
		frequency: habit.frequency,
		frequency_type: habit.frequency_type as 'daily' | 'weekly' | 'monthly',
		grace_period: habit.grace_period
	};
};
