import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import { AuthProvider } from '../components/AuthProvider';
import './globals.css';

const raleway = Raleway({
	variable: '--font-raleway-sans',
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
	title: {
		template: '%s | Capy Habits',
		default: 'Capy Habits'
	},
	description: 'Habit tracking with a capybara twist',
	metadataBase: new URL('http://localhost:3000')
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${raleway.variable} antialiased`}>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
