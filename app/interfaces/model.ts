export interface Habit {
	name: string;
	description: string;
	category?: string;
	created: Date;
	modified: Date;
	frequency: number;
	frequency_type: string;
	grace_period: number;
	streak: number;
}

export interface SWRError extends Error {
	status: number;
	info: string;
}
