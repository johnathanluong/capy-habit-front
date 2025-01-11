import { Metadata } from 'next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import NavBar from '@/components/NavBar';

export const metadata: Metadata = {
	title: 'FAQ | Capy Habits',
	description: 'Frequently Asked Questions about Capy Habits, your gamified habit tracker'
};

const faqs = [
	{
		question: 'What is Capy Habits?',
		answer: 'Capy Habits is a gamified habit tracker web app where users can log their habits, set completion goals, and earn points and exp for achieving them. Users can also collect and customize capybaras through a gacha-like system.'
	},
	{
		question: 'How do I create a habit?',
		answer: "To create a habit, go to the Dashboard and click on the 'Create Habit' button. You'll be able to set the habit name, category, and frequency of completion."
	},
	{
		question: 'What are points and exp used for?',
		answer: 'Points can be used in the gacha system to roll for accessories to decorate your capybaras or to get different colors and poses. Exp contributes to your overall level in the app.'
	},
	{
		question: 'How does the streak system work?',
		answer: "When you complete your habit goals in succession without breaking your set goal, you'll build a streak. Streaks award you with a greater number of points upon submitting a completion."
	},
	{
		question: 'What are capybara stacks?',
		answer: 'Capybara stacks form upon completion of your goals. Each completion adds a capybara to the stack. The appearance of the capybara depends on the habit category and frequency.'
	},
	{
		question: 'Can I interact with other users?',
		answer: 'Yes, you can add other users as friends to view their capybara stacks.'
	},
	{
		question: 'What technologies does Capy Habits use?',
		answer: "Capy Habits is built using Next.js, TypeScript, shadcn/ui, TailwindCSS, and integrates with a Django backend. It's deployed using Railway and Docker, with PostgreSQL as the database."
	},
	{
		question: 'How do I get started with Capy Habits?',
		answer: "To get started, register for an account, complete the onboarding tutorial, and create your first habit. You'll then be directed to your personalized dashboard."
	},
	{
		question: 'What can I do from the dashboard?',
		answer: 'From the dashboard, you can view your capybara stacks, manage your habits, access the gacha system, create new habits, view your profile, and customize your capybaras.'
	},
	{
		question: 'How do I customize my capybaras?',
		answer: 'You can customize your capybaras by using accessories and different colors/poses obtained through the gacha system. Access the customization screen from your dashboard.'
	}
];

export default function FAQPage() {
	return (
		<>
			<NavBar />
			<div className='min-h-screen bg-primary-white'>
				<div className='container mx-auto py-8 px-4 md:px-0'>
					<Card className='bg-background shadow-lg bg-primary-darkgreen'>
						<CardHeader className='bg-primary-dark rounded-t-lg'>
							<CardTitle className='text-3xl font-bold text-center mb-2 text-text-primary'>
								Frequently Asked Questions
							</CardTitle>
							<CardDescription className='text-center text-lg mb-6 text-text-secondary'>
								Everything you need to know about Capy Habits, your gamified habit tracker
							</CardDescription>
						</CardHeader>

						<CardContent className='bg-primary-green'>
							<Accordion type='single' collapsible className='w-full'>
								{faqs.map((faq, index) => (
									<AccordionItem
										value={`item-${index}`}
										key={index}
										className='border-b border-secondary-light'
									>
										<AccordionTrigger className='text-text-primary hover:text-secondary-accent'>
											{faq.question}
										</AccordionTrigger>
										<AccordionContent className='text-text-secondary'>
											{faq.answer}
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
}
