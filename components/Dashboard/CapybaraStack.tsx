import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CapybaraStack() {
	return (
		<Card className='bg-primary-dark h-full'>
			<CardHeader>
				<CardTitle className='text-text-primary'>Your Capybara Stack</CardTitle>
			</CardHeader>
			<CardContent className='h-[calc(100%-4rem)] flex items-center justify-center bg-primary-green rounded-xl'>
				<p className='text-primary-white'>Capybara Stack Visualization Here</p>
			</CardContent>
		</Card>
	);
}
