'use client';
import { IconWeight } from '@phosphor-icons/react';
import { ComponentType } from 'react';

interface FeatureCardProps {
	title: string;
	description: string;
	icon: ComponentType<{ size?: number; weight?: IconWeight }>;
}

export default function FeatureCard({ title, description, icon: IconComponent }: FeatureCardProps) {
	return (
		<div className='flex flex-col gap-2 max-w-64'>
			<div className='w-12 h-12 flex items-center justify-center border border-gray-700 rounded-lg text-gray-700'>
				<IconComponent size={30} weight='bold' />
			</div>
			<h3 className='font-medium text-xl text-gray-700'>{title}</h3>
			<p className='text-sm text-gray-600'>{description}</p>
		</div>
	);
}
