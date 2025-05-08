import { IconSvgProps } from '@/types';
import * as React from 'react';

export const MoonIcon: React.FC<IconSvgProps> = ({ size = 24, height, ...props }) => (
	<svg
		height={size || height}
		width={size || height}
		stroke='currentColor'
		strokeLinecap='round'
		strokeLinejoin='round'
		strokeWidth='2'
		data-darkreader-inline-stroke=''
		data-darkreader-inline-fill=''
		xmlns='http://www.w3.org/2000/svg'
		fill='currentColor'
		viewBox='0 0 24 24'
		{...props}
	>
		<path d='M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z'></path>
	</svg>
);
