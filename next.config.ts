import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		deviceSizes: [640, 750, 828, 1080, 1200],
		formats: ['image/webp']
	}
};

export default nextConfig;
