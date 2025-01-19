import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formSchema, HabitFormData } from '@/app/interfaces/habitform';
import { mutate } from 'swr';

const CREATE_HABIT_URL = '/api/habits/';

export const categoryOptions = [
	{ value: 'health', label: 'Health' },
	{ value: 'productivity', label: 'Productivity' },
	{ value: 'personal', label: 'Personal' },
	{ value: 'finance', label: 'Finance' },
	{ value: 'other', label: 'Other' }
];

export const frequencyTypeOptions = [
	{ value: 'daily', label: 'Daily' },
	{ value: 'weekly', label: 'Weekly' },
	{ value: 'monthly', label: 'Monthly' }
];

export default function HabitCreationForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			description: '',
			category: undefined,
			frequency: 1,
			frequency_type: 'daily',
			grace_period: 0
		}
	});
	const router = useRouter();

	async function onSubmit(values: HabitFormData) {
		setIsSubmitting(true);
		try {
			const res = await fetch(CREATE_HABIT_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(values)
			});

			const data = await res.json();

			if (!res.ok) {
				toast({
					variant: 'destructive',
					title: 'Error creating habit',
					description: data.error || 'Something went wrong'
				});
				return;
			}

			await mutate(CREATE_HABIT_URL);

			toast({
				title: 'Success',
				description: 'Habit created successfully'
			});
			router.push('/dashboard');
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Error',
				description: 'Failed to create habit'
			});
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Habit Name</FormLabel>
								<FormControl>
									<Input placeholder='Name of your habit' {...field} />
								</FormControl>
								<FormDescription>This is the name of the habit</FormDescription>
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
									<FormControl>
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
								<FormDescription>Choose a category for your habit</FormDescription>
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
								<FormControl>
									<Input
										type='number'
										{...field}
										onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
									/>
								</FormControl>
								<FormDescription>How often do you want to perform this habit?</FormDescription>
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
									<FormControl>
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
								<FormDescription>Choose the frequency type for your habit</FormDescription>
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
								<FormControl>
									<Input
										type='number'
										{...field}
										onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
									/>
								</FormControl>
								<FormDescription>Number of days grace period (0 for no grace period)</FormDescription>
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
							<FormControl>
								<Textarea placeholder='Describe your habit' className='resize-none' {...field} />
							</FormControl>
							<FormDescription>Provide a brief description of your habit</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' disabled={isSubmitting}>
					{isSubmitting ? (
						<>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							Creating...
						</>
					) : (
						'Create Habit'
					)}
				</Button>
			</form>
		</Form>
	);
}
