'use client';
import NavBar from '@/components/NavBar';
import { useAuth } from '@/components/AuthProvider';
import { useEffect } from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
	habit_name: z.string().min(1, 'Habit name is required').max(100)
});

export default function Page() {
	const auth = useAuth();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			habit_name: ''
		}
	});

	useEffect(() => {
		if (!auth?.isAuthenticated) {
			console.log('redirect');
			auth?.loginRequiredRedirect();
		}
	}, [auth]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<>
			<NavBar />
			<div className='pt-24 px-8 flex h-screen bg-primary-light'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name='habit_name'
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
					</form>
				</Form>
			</div>
		</>
	);
}
