import { User } from '@/app/interfaces/model';
import React from 'react';
import ProgressBar from './ProgressBar';

interface LevelBarProps {
	user: User;
}

export default function LevelBar({ user }: LevelBarProps) {
	const { experience_points, xp_for_level, level, points } = user;

	return (
		<div className='fixed bottom-8 left-20 right-20 flex flex-col'>
			<div className='flex justify-between items-center mb-1'>
				<h1 className='font-semibold text-lg'>Level {level}</h1>
				<h1 className='font-semibold text-lg'>Coins: {points}</h1>
				<span className='text-sm'>
					{experience_points} / {xp_for_level} XP
				</span>
			</div>
			<ProgressBar progress={experience_points} required={xp_for_level} type='level' />
		</div>
	);
}
