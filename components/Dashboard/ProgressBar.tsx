import React from 'react';

interface ProgressBarProps {
	progress: number;
	required: number;
	type: 'habit' | 'level';
}
export default function ProgressBar({ progress, required, type = 'level' }: ProgressBarProps) {
	const baseStyles = 'border-gray-300 border-2 rounded-full h-6 bg-gray-100 overflow-hidden';
	const variantStyles = {
		habit: 'w-32', // Fixed width for habit progress
		level: 'w-full' // Full width for level bar
	};

	return (
		<div className={`${baseStyles} ${variantStyles[type]}`}>
			<div
				className='h-full bg-green-600 transition-all duration-300 ease-out rounded-lg'
				style={{ width: `${(progress / required) * 100}%` }}
			>
				<div className='h-full w-full bg-green-400 animate-pulse rounded-lg'></div>
			</div>
		</div>
	);
}
