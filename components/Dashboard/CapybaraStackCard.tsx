import { Habit } from '@/app/interfaces/model';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CapybaraStack from './CapybaraStack';

interface CapybaraStackCardProps {
	habits: Habit[];
}

export function CapybaraStackCard({ habits }: CapybaraStackCardProps) {
	return (
		<Card className='bg-primary-dark h-full'>
			<CardHeader>
				<CardTitle className='text-text-primary'>Your Capybara Stack</CardTitle>
			</CardHeader>
			<CardContent className='h-[calc(100%-4rem)] flex items-center justify-center bg-primary-green rounded-xl overflow-y-auto'>
				<div className='flex items-end gap-4 h-full w-full overflow-auto'>
					{habits &&
						habits.length > 0 &&
						habits.map((habit) => (
							<div key={habit.id} className='flex-grow'>
								<CapybaraStack habit={habit} />
							</div>
						))}
				</div>
			</CardContent>
		</Card>
	);
}
