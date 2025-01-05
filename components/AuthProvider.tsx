'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createContext, useContext, ReactNode, useMemo, useState, useEffect } from 'react';

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
const REFRESH_INTERVAL = 540000; // 9 mins

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const router = useRouter();
	const path = usePathname();

	const searchParams = useSearchParams();

	const login = () => {
		setIsAuthenticated(true);
		localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, '1');
		const nextURL = searchParams.get('next');
		const invalidURLS = ['/login', '/logout'];
		const isNextURLValid = nextURL && nextURL.startsWith('/') && !invalidURLS.includes(nextURL);

		router.replace(isNextURLValid ? nextURL : LOGIN_REDIRECT);
	};

	const logout = () => {
		setIsAuthenticated(false);
		localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, '0');
		router.replace(LOGOUT_REDIRECT);
	};

	const loginRequiredRedirect = () => {
		setIsAuthenticated(false);
		localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, '0');
		let loginWithNextURL = LOGIN_REQUIRED;

		if (LOGIN_REQUIRED !== path) {
			loginWithNextURL = `${LOGIN_REQUIRED}?next=${path}`;
		}

		router.replace(loginWithNextURL);
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
							'Application-Content': 'application/json'
						},
						body: ''
					};

					await fetch(REFRESH_URL, options);
				} catch (e) {
					console.error('Failed to refresh authToken', e);
					logout();
				}
			}, REFRESH_INTERVAL);
		}

		return () => {
			if (refreshInterval) {
				clearInterval(refreshInterval);
			}
		};
	}, []);

	const value = useMemo(() => ({ isAuthenticated, login, logout, loginRequiredRedirect }), [isAuthenticated]);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}
