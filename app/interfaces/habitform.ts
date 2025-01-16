import { z } from 'zod';

export interface HabitFormData {
	name: string;
	description: string;
	category?: string;
	frequency: number;
	frequency_type: 'daily' | 'weekly' | 'monthly';
	grace_period: number;
}

export const formSchema = z.object({
	name: z.string().min(1, 'Habit name is required').max(100),
	description: z.string().min(1, 'Describe your habit!').max(1000),
	category: z.string().optional(),
	frequency: z.number().int().min(1).default(1),
	frequency_type: z.enum(['daily', 'weekly', 'monthly']).default('daily'),
	grace_period: z.number().int().min(0).default(0)
});
