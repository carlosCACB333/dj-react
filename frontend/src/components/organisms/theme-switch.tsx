import { Switch } from '@heroui/switch';
import { useTheme } from '@heroui/use-theme';
import { useIsSSR } from '@react-aria/ssr';
import { MoonIcon, SunIcon } from 'lucide-react';

export const ThemeSwitch = () => {
	const { theme, setTheme } = useTheme();
	const isSSR = useIsSSR();

	const onChange = () => (theme === 'light' ? setTheme('dark') : setTheme('light'));
	const isSelected = theme === 'light' || isSSR;

	return (
		<Switch
			size='sm'
			endContent={<SunIcon />}
			isSelected={isSelected}
			startContent={<MoonIcon />}
			onChange={onChange}
		/>
	);
};
