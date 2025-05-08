import { PrivateRouteGuard } from '@/guards/private-route.guard';
import { lazy } from 'react';
import { Route } from 'react-router';

const CompanyPage = lazy(() => import('@/components/pages/company/company'));
const CompanyDetailsPage = lazy(() => import('@/components/pages/company/company-details'));
const CompanyCreatePage = lazy(() => import('@/components/pages/company/company-create'));

export const CompanyRoutes = (
	<Route path='companies'>
		<Route index element={<CompanyPage />} />

		<Route element={<PrivateRouteGuard />}>
			<Route path='create' element={<CompanyCreatePage />} />
			<Route path=':id' index element={<CompanyDetailsPage />} />
		</Route>
	</Route>
);
