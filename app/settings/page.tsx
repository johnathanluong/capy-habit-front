import { Metadata } from 'next';
import SettingsForm from '@/components/SettingsForm';
import NavBar from '@/components/NavBar';

export const metadata: Metadata = {
	title: 'Settings | Capy Habits',
	description: 'Manage your Capy Habits account settings and preferences.'
};

export default function SettingsPage() {
	return (
		<>
			<NavBar />
			<div className='container mx-auto py-10 px-4 sm:px-6 lg:px-8'>
				<h1 className='font-bold text-5xl text-center'>Settings</h1>
				<SettingsForm />
			</div>
		</>
	);
}
