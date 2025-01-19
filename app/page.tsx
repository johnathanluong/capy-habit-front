'use client';
import { GameController, MedalMilitary } from '@phosphor-icons/react';

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import RegisterForm from '@/components/RegisterForm';
import FeatureCard from '@/components/FeatureCard';

import PathSVG from '@/components/LandingPageCapybaras/PathSVG';
import Capybara1SVG from '@/components/LandingPageCapybaras/Capybara1SVG';
import Capybara2SVG from '@/components/LandingPageCapybaras/Capybara2SVG';
import Capybara3SVG from '../components/LandingPageCapybaras/Capybara3SVG';
import Image from 'next/image';

export default function Page() {
	return (
		<div className={`min-h-screen bg-[#E6EEF6] overflow-hidden}`}>
			{/* Navigation */}
			<NavBar />

			{/* Hero Section */}
			<section className='relative px-8 pt-12 pb-0 md:py-28'>
				<div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2'>
					<div className='relative'>
						<h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-6 relative z-20'>
							Build Your Habits,
							<br />
							Grow Your Stack.
						</h1>
						<p className='text-gray-600 mb-8 max-w-lg relative z-20'>
							Capy Habits is a fun and engaging way to track and achieve your goals. Log your daily
							habits, earn points, and level up your capybara collection! Every habit completed brings you
							closer to unlocking unique accessories and customizations for your capybara. Start tracking
							today and watch your stack grow as you grow!
						</p>
						<div className='z-10 absolute -translate-y-24 scale-[0.9] hidden md:block'>
							<Capybara1SVG />
						</div>
						<div className='absolute z-[1] scale-x-[2] scale-y-[0.6] translate-y-[-14rem] hidden md:block'>
							<PathSVG />
						</div>
					</div>
					<div className='flex justify-center z-10 md:justify-end'>
						<RegisterForm />
					</div>
					<div className='md:hidden scale-75 flex justify-center'>
						<Image src={'/images/MobileCapyStack.webp'} alt='3 capybaras' width={400} height={400} />
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className='px-8 py-[18rem] bg-[#B8C7D9] flex max-h-52 min-h-52'>
				<div className='mx-auto z-20 relative my-[-10rem]'>
					<h2 className='text-3xl font-bold text-gray-800 pl mb-12'>Gamify your life!</h2>
					<div className='flex flex-row gap-16'>
						<FeatureCard
							title='Stack Your Success'
							description='Capy Habits is all about growth. For every streak you complete, your capybara stack grows taller! Show off your achievements and keep climbing to the top.'
							icon={MedalMilitary}
						/>
						<FeatureCard
							title='Spend Points on Capybaras'
							description='Every habit completed earns you points to unlock adorable accessories and customizations for your virtual capybaras. Add hats, glasses, or even a cape to showcase your style and progress!'
							icon={GameController}
						/>
					</div>
				</div>
				<div className='relative translate-y-[-6.5rem] translate-x-[-6rem] scale-[0.55] z-20 hidden md:block'>
					<Capybara2SVG />
				</div>
			</section>

			<section className='px-8 py-[12rem] max-h-60 min-h-60 flex'>
				<div className='relative translate-x-[4rem] translate-y-[-14rem] scale-75 z-20 hidden md:block'>
					<Capybara3SVG />
				</div>
				<div className='relative z-20 max-w-6xl text-center my-[-7rem]'>
					<h2 className='text-3xl font-bold text-gray-800 mb-4 pr-8'>Join the Capy Family Today</h2>
					<p className='text-large text-gray-800'>
						Start your journey toward better habits with Capy Habits. Sign up now and grow your stack one
						habit at a time!
					</p>
				</div>
			</section>

			<Footer />
		</div>
	);
}
