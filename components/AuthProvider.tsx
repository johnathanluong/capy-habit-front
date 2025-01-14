'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createContext, useContext, ReactNode, useMemo, useState, useEffect, Suspense, useCallback } from 'react';

interface AuthContextType {
	isAuthenticated: boolean | undefined;
	login: () => void;
	logout: () => void;
	loginRequiredRedirect: () => void;
	path: string;
}

const LOGIN_REDIRECT = '/dashboard';
const LOGOUT_REDIRECT = '/';
const LOGIN_REQUIRED = '/login';
const AUTH_LOCAL_STORAGE_KEY = 'is-authenticated';
const REFRESH_URL = '/api/refresh/';
const REFRESH_INTERVAL = 540000; // 9 mins

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProviderWrapper({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
	const router = useRouter();
	const path = usePathname();
	const searchParams = useSearchParams();

	const login = useCallback(() => {
		setIsAuthenticated(true);
		localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, '1');

		// Get next url and cache it
		const nextURL = searchParams.get('next');
		const invalidURLs = ['/login', '/logout'];
		const isNextURLValid = nextURL && nextURL.startsWith('/') && !invalidURLs.includes(nextURL);

		// Redirects user to the url
		const redirectURL = isNextURLValid ? nextURL : LOGIN_REDIRECT;
		router.replace(redirectURL);
	}, [router, searchParams]);

	const logout = useCallback(() => {
		setIsAuthenticated(false);
		localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, '0');
		router.replace(LOGOUT_REDIRECT);
	}, [router]);

	const loginRequiredRedirect = useCallback(() => {
		setIsAuthenticated(false);
		localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, '0');

		const redirectPath = `${LOGIN_REQUIRED}?next=${encodeURIComponent(path)}`;
		router.replace(redirectPath);
	}, [router, path]);

	// Mounts the auth status
	useEffect(() => {
		const storedAuthStatus = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
		const authStatus = parseInt(storedAuthStatus ?? '0');
		setIsAuthenticated(authStatus === 1);
	}, []);

	// Handles refreshing the auth token using refresh token
	useEffect(() => {
		let isRefreshing = false;
		let refreshInterval: NodeJS.Timeout | undefined;

		const RefreshToken = async () => {
			if (isRefreshing) {
				return;
			}
			isRefreshing = true;
			let retryCount = 0;

			try {
				while (retryCount < 3) {
					try {
						const options = {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							}
						};
						const response = await fetch(REFRESH_URL, options);

						if (!response.ok) {
							throw response.status;
						}

						return;
					} catch (e) {
						if (e === 500 && retryCount < 2) {
							console.log(`500 error, retry attempt ${retryCount + 1} of 3...`);
							retryCount++;
							await new Promise((resolve) => setTimeout(resolve, 1000 * retryCount));
						} else if (e === 401) {
							console.error('Authentication failed', e);
							loginRequiredRedirect();
							return;
						} else {
							console.error('Unhandled error during refresh', e);
							return;
						}
					}
				}
			} finally {
				isRefreshing = false;
			}
		};

		if (isAuthenticated) {
			refreshInterval = setInterval(RefreshToken, REFRESH_INTERVAL);
		}

		return () => {
			if (refreshInterval) {
				clearInterval(refreshInterval);
			}
		};
	}, [isAuthenticated, loginRequiredRedirect, path]);

	const value = useMemo(
		() => ({ isAuthenticated, login, logout, loginRequiredRedirect, path }),
		[isAuthenticated, path, login, logout, loginRequiredRedirect]
	);

	if (isAuthenticated === undefined) {
		return <div>Loading...</div>;
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function AuthProvider({ children }: { children: ReactNode }) {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<AuthProviderWrapper>{children}</AuthProviderWrapper>
		</Suspense>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
