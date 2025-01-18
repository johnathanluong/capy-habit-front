export interface Habit {
	id: number;
	name: string;
	description: string;
	category?: string;
	created: Date;
	modified: Date;
	frequency: number;
	frequency_type: string;
	grace_period: number;
	streak: number;
	progress: {
		completed: number;
		required: number;
	};
}

export interface User {
	username: string;
	display_name: string;
	level: number;
	points: number;
	experience_points: number;
	xp_for_level: number;
}

export interface SWRError extends Error {
	status: number;
	info: string;
}
