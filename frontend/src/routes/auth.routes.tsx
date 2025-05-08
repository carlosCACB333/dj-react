import AuthLayout from '@/components/templates/auth-layout';
import { PublicRouteGuard } from '@/guards/public-route.guard';
import { lazy } from 'react';
import { Route } from 'react-router';

const SignInPage = lazy(() => import('@/components/pages/auth/sign-in'));
const SignUpPage = lazy(() => import('@/components/pages/auth/sign-up'));

export const AuthRoutes = (
	<Route path='auth' element={<AuthLayout />}>
		<Route element={<PublicRouteGuard />}>
			<Route path='sign-in' element={<SignInPage />} />
			<Route path='sign-up' element={<SignUpPage />} />
		</Route>
	</Route>
);
