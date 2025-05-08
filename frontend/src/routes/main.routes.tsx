import { useInitApp } from '@/hooks/use-init-app';
import { lazy } from 'react';
import { Route, Routes } from 'react-router';
import { NotFound } from '../components/pages/not-found';
import { AuthRoutes } from './auth.routes';
import { CompanyRoutes } from './company.routes';
import { InventoryRoutes } from './inventory.routes';
import { ProductRoutes } from './product.routes';

const MainLayout = lazy(() => import('@/components/templates/main-layout'));
const HomePage = lazy(() => import('@/components/pages/home/homepage'));

export const MainRoutes = () => {
	useInitApp();

	return (
		<Routes>
			<Route element={<MainLayout />}>
				{AuthRoutes}
				{CompanyRoutes}
				{ProductRoutes}
				{InventoryRoutes}
				<Route index element={<HomePage />} />
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	);
};
