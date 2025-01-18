'use server';

import { deleteTokens } from '@/lib/auth';

export async function logoutAPI() {
	await deleteTokens();
}
