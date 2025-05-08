import { LOCAL_STORAGE_ACCESS_TOKEN } from '@/config/constants';
import { tokenVerifyApi } from '@/store/features/auth/auth-api';
import { setIsChecking } from '@/store/features/auth/auth-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLocalStorage } from '@/utils/localstorage';
import { Spinner } from '@heroui/spinner';
import { lazy, useEffect } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router';
import { NotFound } from '../components/pages/not-found';

const MainLayout = lazy(() => import('@/components/templates/main-layout'));
const AuthLayout = lazy(() => import('@/components/templates/auth-layout'));

const SignInPage = lazy(() => import('@/components/pages/sign-in'));
const SignUpPage = lazy(() => import('@/components/pages/sign-up'));
const HomePage = lazy(() => import('@/components/pages/homepage'));

const CompanyPage = lazy(() => import('@/components/pages/company'));
const CompanyDetailsPage = lazy(() => import('@/components/pages/company-details'));
const CompanyCreatePage = lazy(() => import('@/components/pages/company-create'));

const ProductPage = lazy(() => import('@/components/pages/product'));
const ProductDetailsPage = lazy(() => import('@/components/pages/product-details'));
const ProductCreatePage = lazy(() => import('@/components/pages/product-create'));

const InventoryPage = lazy(() => import('@/components/pages/inventory'));

export const MainRoutes = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const token = getLocalStorage<string>(LOCAL_STORAGE_ACCESS_TOKEN);
		if (!token) {
			dispatch(setIsChecking(false));
			return;
		}

		dispatch(tokenVerifyApi(token));
	}, []);

	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path='auth' element={<AuthLayout />}>
					<Route path='sign-in' element={<SignInPage />} />
					<Route path='sign-up' element={<SignUpPage />} />
				</Route>

				<Route path='companies'>
					<Route index element={<CompanyPage />} />
					<Route path='create' element={<ProtectedRoutes />}>
						<Route index element={<CompanyCreatePage />} />
					</Route>
					<Route path=':id' element={<ProtectedRoutes />}>
						<Route index element={<CompanyDetailsPage />} />
					</Route>
				</Route>

				<Route path='products'>
					<Route index element={<ProductPage />} />
					<Route path='create' element={<ProtectedRoutes />}>
						<Route index element={<ProductCreatePage />} />
					</Route>

					<Route path=':id' element={<ProtectedRoutes />}>
						<Route index element={<ProductDetailsPage />} />
					</Route>
				</Route>

				<Route path='inventory' element={<ProtectedRoutes />}>
					<Route index element={<InventoryPage />} />
				</Route>

				<Route index element={<HomePage />} />
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	);
};

const ProtectedRoutes = () => {
	const { isChecking, user } = useAppSelector((state) => state.auth);
	if (isChecking) return <Spinner label='Verificando sesión' />;
	if (!user) {
		return <Navigate to='/auth/sign-in' />;
	}
	return <Outlet />;
};
