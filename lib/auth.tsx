'use server';
import { cookies } from 'next/headers';

const MAX_AUTH_TOKEN_AGE = 10 * 60; // 10 min
const MAX_REFRESH_TOKEN_AGE = 14 * 24 * 60 * 60; // 14 days

export async function getAuthToken() {
	const authCookies = await cookies();
	const authToken = authCookies.get('auth-token');
	return authToken?.value;
}

export async function getRefreshToken() {
	const authCookies = await cookies();
	const refreshToken = authCookies.get('refresh-token');
	return refreshToken?.value;
}

// Called on login
export async function setAuthToken(authToken: string) {
	const authCookies = await cookies();
	authCookies.set({
		name: 'auth-token',
		value: authToken,
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV !== 'development',
		maxAge: MAX_AUTH_TOKEN_AGE
	});
}

// Called on login
export async function setRefreshToken(refreshToken: string) {
	const authCookies = await cookies();
	authCookies.set({
		name: 'refresh-token',
		value: refreshToken,
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV !== 'development',
		maxAge: MAX_REFRESH_TOKEN_AGE
	});
}

// Called on logout
export async function deleteTokens() {
	const authCookies = await cookies();
	authCookies.delete('auth-token');
	authCookies.delete('refresh-token');
}
