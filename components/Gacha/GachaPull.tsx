'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { mutate } from 'swr';
import { Accessory, User } from '@/app/interfaces/model';

const PULL_COST = 50;
const GACHA_PULL_API_URL = '/api/pull';
const ME_API_URL = '/api/me';

interface GachaPullProps {
	user: User;
}

interface APIResponse {
	data: {
		accessory: Accessory;
	};
}

const rarityColors = {
	common: 'bg-gray-200',
	rare: 'bg-blue-200',
	epic: 'bg-purple-200',
	legendary: 'bg-yellow-300'
};

export function GachaPull({ user }: GachaPullProps) {
	const [isPulling, setIsPulling] = useState(false);
	const [pullResult, setPullResult] = useState<Accessory | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handlePull = async () => {
		if (!user || user.points < PULL_COST) {
			setError('Not enough points to pull!');
			return;
		}

		setIsPulling(true);
		setError(null);
		setPullResult(null);

		try {
			const response = await fetch(GACHA_PULL_API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error('Failed to pull');
			}

			// Revalidate user data to update points
			mutate(ME_API_URL);

			const result: APIResponse = await response.json();
			setPullResult(result.data.accessory);
		} catch (err) {
			setError(`An error occurred while pulling. Please try again. ${(err as Error).message}`);
		} finally {
			setIsPulling(false);
		}
	};

	return (
		<div className='bg-white p-6 rounded-lg shadow-md'>
			<h2 className='text-xl font-bold mb-4'>Gacha Pull</h2>
			<p className='mb-4'>Cost to pull: {PULL_COST} points</p>
			{user && <p className='mb-4'>Your points: {user.points}</p>}
			<button
				onClick={handlePull}
				disabled={isPulling || !user || user.points < PULL_COST}
				className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed'
			>
				{isPulling ? 'Pulling...' : 'Pull'}
			</button>
			{error && <p className='text-red-500 mt-4'>{error}</p>}
			{pullResult && (
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
					className={`mt-4 p-4 ${rarityColors[pullResult.rarity as keyof typeof rarityColors]} rounded-lg`}
				>
					<p className='text-center font-bold'>You got: {pullResult.name}!</p>
				</motion.div>
			)}
		</div>
	);
}
