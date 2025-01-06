interface FeatureCardProps {
	title: string;
	description: string;
}

export default function FeatureCard({ title, description }: FeatureCardProps) {
	return (
		<div className='flex flex-col gap-2'>
			<div className='w-12 h-12 flex items-center justify-center border border-gray-200 rounded-lg'>
				<div className='w-6 h-6 bg-gray-800' />
			</div>
			<h3 className='font-medium'>{title}</h3>
			<p className='text-sm text-gray-600'>{description}</p>
		</div>
	);
}
