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
	capybara_stack: {
		small: number;
		medium: number;
		large: number;
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

export interface Accessory {
	name: string;
	description: string;
	image_filename: string;
	rarity: string;
}

export interface UserAccessory {
	accessory: Accessory;
	quantity: number;
	number_used: number;
}
