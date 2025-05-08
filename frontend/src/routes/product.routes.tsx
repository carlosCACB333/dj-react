import { PrivateRouteGuard } from '@/guards/private-route.guard';
import { lazy } from 'react';
import { Route } from 'react-router';

const ProductPage = lazy(() => import('@/components/pages/product/product'));
const ProductDetailsPage = lazy(() => import('@/components/pages/product/product-details'));
const ProductCreatePage = lazy(() => import('@/components/pages/product/product-create'));

export const ProductRoutes = (
	<Route path='products'>
		<Route index element={<ProductPage />} />

		<Route element={<PrivateRouteGuard />}>
			<Route path='create' index element={<ProductCreatePage />} />
			<Route path=':id' index element={<ProductDetailsPage />} />
		</Route>
	</Route>
);
