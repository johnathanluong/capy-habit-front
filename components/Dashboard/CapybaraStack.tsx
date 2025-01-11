import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CapybaraStack() {
	return (
		<Card className='bg-primary-light'>
			<CardHeader>
				<CardTitle className='text-text-primary'>Your Capybara Stack</CardTitle>
			</CardHeader>
			<CardContent className='h-64 flex items-center justify-center bg-primary-green'>
				<p className='text-primary-white'>Capybara Stack Visualization Here</p>
			</CardContent>
		</Card>
	);
}
