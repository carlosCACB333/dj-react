import { PrivateRouteGuard } from '@/guards/private-route.guard';
import { lazy } from 'react';
import { Route } from 'react-router';

const InventoryPage = lazy(() => import('@/components/pages/inventory/inventory'));

export const InventoryRoutes = (
	<Route path='inventory' element={<PrivateRouteGuard />}>
		<Route index element={<InventoryPage />} />
	</Route>
);
