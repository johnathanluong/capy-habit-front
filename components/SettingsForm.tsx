'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const settingsFormSchema = z.object({
	display_name: z.string().min(2, {
		message: 'Username must be at least 2 characters.'
	}),
	email: z.string().email({
		message: 'Please enter a valid email address.'
	}),
	timezone: z.string({
		required_error: 'Please select a timezone.'
	}),
	bio: z.string().max(160).optional()
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

const defaultValues: Partial<SettingsFormValues> = {
	display_name: '',
	email: '',
	timezone: '',
	bio: ''
};

export default function SettingsForm() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { toast } = useToast();

	const form = useForm<SettingsFormValues>({
		resolver: zodResolver(settingsFormSchema),
		defaultValues
	});

	async function onSubmit(data: SettingsFormValues) {
		setIsLoading(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		setIsLoading(false);
		toast({
			title: 'Settings updated',
			description: 'Your settings have been successfully updated.'
		});
		console.log(data);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8 bg-primary-white p-6 rounded-lg shadow-md'
			>
				<FormField
					control={form.control}
					name='display_name'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-text-primary'>Display Name</FormLabel>
							<FormControl>
								<Input
									placeholder='capybara_lover'
									{...field}
									className='border-secondary-accent focus:border-primary-green focus:ring-primary-green'
								/>
							</FormControl>
							<FormDescription className='text-text-secondary'>
								This is your public display name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-text-primary'>Email</FormLabel>
							<FormControl>
								<Input
									placeholder='capybara@example.com'
									{...field}
									className='border-secondary-accent focus:border-primary-green focus:ring-primary-green'
								/>
							</FormControl>
							<FormDescription className='text-text-secondary'>
								We will use this email for important notifications.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='timezone'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-text-primary'>Timezone</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className='border-secondary-accent focus:border-primary-green focus:ring-primary-green'>
										<SelectValue placeholder='Select your timezone' />
									</SelectTrigger>
								</FormControl>
								<SelectContent className='bg-primary-light border-secondary-accent'>
									<SelectItem value='utc' className='text-text-primary hover:bg-secondary-light'>
										UTC
									</SelectItem>
									<SelectItem value='est' className='text-text-primary hover:bg-secondary-light'>
										Eastern Time (ET)
									</SelectItem>
									<SelectItem value='cst' className='text-text-primary hover:bg-secondary-light'>
										Central Time (CT)
									</SelectItem>
									<SelectItem value='mst' className='text-text-primary hover:bg-secondary-light'>
										Mountain Time (MT)
									</SelectItem>
									<SelectItem value='pst' className='text-text-primary hover:bg-secondary-light'>
										Pacific Time (PT)
									</SelectItem>
								</SelectContent>
							</Select>
							<FormDescription className='text-text-secondary'>
								Choose your timezone for accurate habit tracking.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='bio'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-text-primary'>Bio</FormLabel>
							<FormControl>
								<Input
									placeholder='Tell us about yourself'
									{...field}
									className='border-secondary-accent focus:border-primary-green focus:ring-primary-green'
								/>
							</FormControl>
							<FormDescription className='text-text-secondary'>
								A short bio to display on your profile. Max 160 characters.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type='submit'
					disabled={isLoading}
					className='bg-primary-green hover:bg-secondary-light text-primary-white'
				>
					{isLoading ? 'Saving...' : 'Save Changes'}
				</Button>
			</form>
		</Form>
	);
}
