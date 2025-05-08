import { User } from '@/interfaces/user';

export interface LoginRes {
	refresh: string;
	access: string;
	user: User;
}
