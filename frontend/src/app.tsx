import { HeroUIProvider } from '@heroui/system';
import { ToastProvider } from '@heroui/toast';
import { Provider as StoreProvider } from 'react-redux';
import { NavigateOptions, useHref, useNavigate } from 'react-router';
import { MainRoutes } from './routes/main.routes.tsx';
import { store } from './store/store.ts';

declare module '@react-types/shared' {
	interface RouterConfig {
		routerOptions: NavigateOptions;
	}
}

export const App = () => {
	const navigate = useNavigate();

	return (
		<>
			<HeroUIProvider navigate={navigate} useHref={useHref} locale='es-PE'>
				<StoreProvider store={store}>
					<ToastProvider />
					<MainRoutes />
				</StoreProvider>
			</HeroUIProvider>
		</>
	);
};
