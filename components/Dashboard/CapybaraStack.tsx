import { Habit } from '@/app/interfaces/model';
import Image from 'next/image';
import React from 'react';

interface CapybaraStackProps {
	habit: Habit;
}

const CAPYBARA_IMG_URL_PRE = '/images/capybaras/capy_';
const CAPYBARA_IMG_URL_POST = '.png';

export default function CapybaraStack({ habit }: CapybaraStackProps) {
	const { small, medium, large } = habit.capybara_stack;
	const total = small + medium * 10 + large * 100;

	const accessoryName = habit.accessory ? habit.accessory.name : 'base';

	return (
		<div className='flex flex-col items-center pb-3 min-w-max'>
			<div className='flex flex-col items-center'>
				{/* Small capybaras */}
				{Array.from({ length: small }).map((_, index) => (
					<Image
						key={`small-${index}`}
						src={`${CAPYBARA_IMG_URL_PRE}${accessoryName.toLowerCase()}${CAPYBARA_IMG_URL_POST}`}
						alt='small capybara'
						width={80}
						height={80}
					/>
				))}

				{/* Medium capybaras */}
				{Array.from({ length: medium }).map((_, index) => (
					<Image
						key={`medium-${index}`}
						src={`${CAPYBARA_IMG_URL_PRE}${accessoryName.toLowerCase()}${CAPYBARA_IMG_URL_POST}`}
						alt='medium capybara'
						width={120}
						height={120}
					/>
				))}

				{/* Large capybaras */}
				{Array.from({ length: large }).map((_, index) => (
					<Image
						key={`large-${index}`}
						src={`${CAPYBARA_IMG_URL_PRE}${accessoryName.toLowerCase()}${CAPYBARA_IMG_URL_POST}`}
						alt='large capybara'
						width={160}
						height={160}
					/>
				))}
			</div>
			<span className='text-sm text-gray-600 mt-2 text-center px-2'>
				{habit.name}: {total} {total <= 1 ? 'capybara' : 'capybaras'}
			</span>
		</div>
	);
}
