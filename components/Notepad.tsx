import React from 'react';

export default function Notepad() {
	return (
		<div className='relative w-[458px] h-[537px]'>
			{/* Background */}
			<svg
				className='absolute top-2 left-1 z-10'
				width='458'
				height='537'
				viewBox='0 0 458 537'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M446.5 1.2259L456.826 6.10308V536H4.50011L1.5 523.5H446.5V1.2259Z'
					fill='#E6CD91'
					stroke='#C2B699'
				/>
			</svg>

			{/* Lines */}
			<div className='absolute top-[100px] left-[6px] z-20 flex flex-col gap-[40px]'>
				{[...Array(10)].map((_, i) => (
					<svg
						key={i}
						width='445'
						height='2'
						viewBox='0 0 445 2'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path d='M445 1H0' stroke='#00A0A0' />
					</svg>
				))}
			</div>

			{/* Top bar */}

			<svg
				className='absolute top-2 left-[2px] z-30'
				width='453'
				height='64'
				viewBox='0 0 453 64'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<g filter='url(#filter0_d_1014_62)'>
					<path d='M449 56H4V29V0H449V56Z' fill='#8A6B5A' />
				</g>
				<defs>
					<filter
						id='filter0_d_1014_62'
						x='0'
						y='0'
						width='453'
						height='64'
						filterUnits='userSpaceOnUse'
						colorInterpolationFilters='sRGB'
					>
						<feFlood floodOpacity='0' result='BackgroundImageFix' />
						<feColorMatrix
							in='SourceAlpha'
							type='matrix'
							values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
							result='hardAlpha'
						/>
						<feOffset dy='4' />
						<feGaussianBlur stdDeviation='2' />
						<feComposite in2='hardAlpha' operator='out' />
						<feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
						<feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_1014_62' />
						<feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_1014_62' result='shape' />
					</filter>
				</defs>
			</svg>

			{/* Red line */}
			<svg
				className='absolute top-[64px] left-[30px] z-20'
				width='2'
				height='467'
				viewBox='0 0 2 467'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path d='M1.5 0.5L0.997847 467' stroke='#C23B22' strokeOpacity='0.9' />
			</svg>

			{/* Paper background */}
			<svg
				className='absolute top-[64px] left-[6px] z-15'
				width='445'
				height='467'
				viewBox='0 0 445 467'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path d='M0 467V0H445V467H0Z' fill='#FFE6A9' />
			</svg>
		</div>
	);
}
