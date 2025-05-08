import { Company } from './company';

export interface Product {
	id: number;
	code: string;
	name: string;
	features: string;
	price_usd: string;
	price_eur: string;
	price_pen: string;
	company: Company;
	company_id?: string;
}
