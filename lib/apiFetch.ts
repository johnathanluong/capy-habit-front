import { getAuthToken } from './auth';

// Generic fetch with error handling
export async function apiFetch(url: string, options: RequestInit) {
	try {
		const res = await fetch(url, options);

		if (!res.ok) {
			const error = await res.json();
			throw new Error(error?.detail || 'API request failed');
		}

		return await res.json();
	} catch (err) {
		if (err instanceof Error) {
			console.error('API Fetch Error:', err.message);
		} else {
			console.error('API Fetch Error:', err);
		}
		throw err;
	}
}

// Used for SWR fetching for GET on page load
export const fetcher = async (url: string) => {
	const authToken = await getAuthToken(); // Get token
	if (!authToken) {
		throw new Error('No auth token found');
	}

	const res = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		}
	});

	if (!res.ok) {
		throw new Error('Failed to fetch habits');
	}

	return res.json();
};
