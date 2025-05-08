export interface User {
	id: number;
	last_login: null;
	is_superuser: boolean;
	is_staff: boolean;
	is_active: boolean;
	date_joined: Date;
	email: string;
	password?: string;
	role: 'admin' | 'external';
	first_name: string;
	last_name: string;
	groups: any[];
	user_permissions: any[];
}
