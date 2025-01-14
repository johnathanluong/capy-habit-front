import React from 'react';

interface LevelBarProps {
	xp: number;
	xpTotal: number;
	level: number;
	coins: number;
}

export default function LevelBar({ xp, xpTotal, level, coins }: LevelBarProps) {
	const progress = (xp / xpTotal) * 100;

	return (
		<div className='fixed bottom-8 left-20 right-20 flex flex-col'>
			<div className='flex justify-between items-center mb-1'>
				<h1 className='font-semibold text-lg'>Level {level}</h1>
				<h1 className='font-semibold text-lg'>Coins: {coins}</h1>
				<span className='text-sm'>
					{xp} / {xpTotal} XP
				</span>
			</div>
			<div className='border-gray-300 border-2 rounded-full w-full h-6 bg-gray-100 overflow-hidden'>
				<div
					className='h-full bg-green-600 transition-all duration-300 ease-out rounded-lg'
					style={{ width: `${progress}%` }}
				>
					<div className='h-full w-full bg-green-400 animate-pulse rounded-lg'></div>
				</div>
			</div>
		</div>
	);
}
