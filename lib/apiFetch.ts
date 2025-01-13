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
