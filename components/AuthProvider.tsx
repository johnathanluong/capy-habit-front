'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createContext, useContext, ReactNode, useMemo, useState, useEffect, Suspense } from 'react';

interface AuthContextType {
	isAuthenticated: boolean;
	login: () => void;
	logout: () => void;
	loginRequiredRedirect: () => void;
}

const LOGIN_REDIRECT = '/';
const LOGOUT_REDIRECT = '/login';
const LOGIN_REQUIRED = '/login';
const AUTH_LOCAL_STORAGE_KEY = 'is-authenticated';
const REFRESH_URL = '/api/refresh/';
const REFRESH_INTERVAL = 50000; // 9 mins

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProviderWrapper({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const router = useRouter();
	const path = usePathname();
	const searchParams = useSearchParams();

	const login = () => {
		setIsAuthenticated(true);
		localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, '1');

		// Get the next URL and validate it
		const nextURL = searchParams.get('next');
		const invalidURLs = ['/login', '/logout'];
		const isNextURLValid = nextURL && nextURL.startsWith('/') && !invalidURLs.includes(nextURL);

		// Use validated next URL or default redirect
		const redirectURL = isNextURLValid ? nextURL : LOGIN_REDIRECT;
		router.replace(redirectURL);
	};

	const logout = () => {
		setIsAuthenticated(false);
		localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, '0');
		router.replace(LOGOUT_REDIRECT);
	};

	const loginRequiredRedirect = () => {
		setIsAuthenticated(false);
		localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, '0');

		const redirectPath = `${LOGIN_REQUIRED}?next=${encodeURIComponent(path)}`;
		router.replace(redirectPath);
	};

	useEffect(() => {
		const storedAuthStatus = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
		const authStatus = parseInt(storedAuthStatus ?? '0');
		setIsAuthenticated(authStatus === 1);

		let refreshInterval: NodeJS.Timeout | undefined;

		if (authStatus === 1) {
			refreshInterval = setInterval(async () => {
				try {
					const options = {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						}
					};

					const response = await fetch(REFRESH_URL, options);
					if (!response.ok) {
						throw new Error('Refresh failed.');
					}
				} catch (e) {
					console.error('Failed to refresh authToken', e);
					loginRequiredRedirect();
				}
			}, REFRESH_INTERVAL);
		}

		return () => {
			if (refreshInterval) {
				clearInterval(refreshInterval);
			}
		};
	}, [logout]);

	const value = useMemo(() => ({ isAuthenticated, login, logout, loginRequiredRedirect }), [isAuthenticated]);
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
