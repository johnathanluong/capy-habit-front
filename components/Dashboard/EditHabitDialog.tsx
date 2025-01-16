'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Habit } from '@/app/interfaces/model';
import { HabitFormData, formSchema } from '@/app/interfaces/habitform';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

interface EditHabitDialogProps {
	habit: Habit;
	onClose: () => void;
	onUpdate: (updatedHabit: Habit) => void;
	onDelete: (habitId: number) => void;
}

const DELETE_URL = '/api/habits/';

export function EditHabitDialog({ habit, onClose, onUpdate, onDelete }: EditHabitDialogProps) {
	const [isOpen, setIsOpen] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<HabitFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: habit.name,
			description: habit.description,
			category: habit.category,
			frequency: habit.frequency,
			frequency_type: habit.frequency_type as 'daily' | 'weekly' | 'monthly',
			grace_period: habit.grace_period
		}
	});

	const onSubmit = async (data: HabitFormData) => {
		setIsSubmitting(true);
		onUpdate({ ...habit, ...data });
		setIsSubmitting(false);
		setIsOpen(false);
	};

	const handleDelete = async () => {
		onDelete(habit.id);
	};

	const handleClose = () => {
		setIsOpen(false);
		onClose();
	};

	const categoryOptions = [
		{ value: 'health', label: 'Health' },
		{ value: 'productivity', label: 'Productivity' },
		{ value: 'personal', label: 'Personal' }
		// Add more categories as needed
	];

	const frequencyTypeOptions = [
		{ value: 'daily', label: 'Daily' },
		{ value: 'weekly', label: 'Weekly' },
		{ value: 'monthly', label: 'Monthly' }
	];

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className='bg-primary-green'>
				<DialogHeader>
					<DialogTitle>Edit Habit</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Habit Name</FormLabel>
										<FormControl className='border-primary-darkgreen focus:border-primary-darkgreen bg-primary-darkgreen'>
											<Input placeholder='Name of your habit' {...field} />
										</FormControl>
										<FormDescription className='text-slate-600'>
											This is the name of the habit
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='category'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Category</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl className='border-primary-darkgreen focus:border-primary-darkgreen bg-primary-darkgreen'>
												<SelectTrigger>
													<SelectValue placeholder='Select a category' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{categoryOptions.map((option) => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription className='text-slate-600'>
											Choose a category for your habit
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='frequency'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Frequency</FormLabel>
										<FormControl className='border-primary-darkgreen focus:border-primary-darkgreen bg-primary-darkgreen'>
											<Input
												type='number'
												{...field}
												onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
											/>
										</FormControl>
										<FormDescription className='text-slate-600'>
											How often do you want to perform this habit?
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='frequency_type'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Frequency Type</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl className='border-primary-darkgreen focus:border-primary-darkgreen bg-primary-darkgreen'>
												<SelectTrigger>
													<SelectValue placeholder='Select frequency type' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{frequencyTypeOptions.map((option) => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription className='text-slate-600'>
											Choose the frequency type for your habit
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='grace_period'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Grace Period</FormLabel>
										<FormControl className='border-primary-darkgreen focus:border-primary-darkgreen bg-primary-darkgreen'>
											<Input
												type='number'
												{...field}
												onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
											/>
										</FormControl>
										<FormDescription className='text-slate-600'>
											Number of days grace period (0 for no grace period)
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl className='border-primary-darkgreen focus:border-primary-darkgreen bg-primary-darkgreen'>
										<Textarea
											placeholder='Describe your habit'
											className='resize-none'
											{...field}
										/>
									</FormControl>
									<FormDescription className='text-slate-600'>
										Provide a brief description of your habit
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter className='gap-2 sm:justify-between'>
							<div>
								<Button
									className='bg-red-500 hover:bg-red-700 left-0'
									type='button'
									onClick={handleDelete}
								>
									Delete
								</Button>
							</div>
							<div className='gap-2 flex'>
								<Button type='button' variant='outline' onClick={handleClose}>
									Cancel
								</Button>
								<Button
									type='submit'
									disabled={isSubmitting}
									className='bg-accent-brown hover:bg-accent-darkbrown'
								>
									{isSubmitting ? (
										<>
											<Loader2 className='mr-2 h-4 w-4 animate-spin' />
											Updating...
										</>
									) : (
										'Update Habit'
									)}
								</Button>
							</div>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
