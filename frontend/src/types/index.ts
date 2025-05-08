import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number;
};

export type Status = 'SUCCESS' | 'FAILED' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'CONFLICT';

export type FetchApiResponse<T> = {
	status: Status;
	data?: T;
	errors?: Record<string, string[]>;
	errorCode?: number;
	message: string;
};
