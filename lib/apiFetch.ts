import { getAuthToken } from './auth';

export const BACKEND_URL = '127.0.0.1:8000';

// Generic fetch with error handling
export async function apiFetch<T>(url: string, options: RequestInit): Promise<T> {
	try {
		const res = await fetch(url, {
			...options,
			credentials: 'include',
			headers: {
				...options.headers,
				Accept: 'application/json'
			}
		});

		// Handle non-JSON responses
		const contentType = res.headers.get('content-type');
		if (!contentType?.includes('application/json')) {
			throw new Error(`Expected JSON response but received ${contentType}`);
		}

		if (!res.ok) {
			const error = await res.json();
			throw new Error(error?.detail || `API request failed: ${res.status}`);
		}

		return (await res.json()) as T;
	} catch (err) {
		if (err instanceof Error) {
			console.error('API Fetch Error:', {
				message: err.message,
				url,
				options
			});
		}
		throw err;
	}
}

// Used for SWR fetching for GET on page load
export const fetcher = async (url: string) => {
	try {
		const authToken = await getAuthToken(); // Get token
		if (!authToken) {
			throw new Error('No auth token found');
		}

		const res = await fetch(url, {
			cache: 'no-store',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`
			}
		});

		if (!res.ok) {
			throw new Error('Failed to fetch habits');
		}

		return res.json();
	} catch (error) {
		console.error('Fetch SWR error:', error);
		throw error;
	}
};
