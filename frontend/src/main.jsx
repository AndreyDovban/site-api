/* v8 ignore start*/
import './style/style.css';
import { Preloader } from './components';
import { RecoilRoot } from 'recoil';
import { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './Pages/Error/Error';

const Home = lazy(() => import('./Pages/Home/Home'));
const Products = lazy(() => import('./Pages/Products/Products'));
const Clients = lazy(() => import('./Pages/Clients/Clients'));
const Links = lazy(() => import('./Pages/Links/Links'));
const Mail = lazy(() => import('./Pages/Mail/Mail'));

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <Home />,
			errorElement: <Error />,
		},
		{
			path: '/files',
			element: <Products />,
		},
		{
			path: '/clients',
			element: <Clients />,
		},
		{
			path: '/links',
			element: <Links />,
		},
		{
			path: '/mail',
			element: <Mail />,
		},
	],
	{
		future: {
			v7_relativeSplatPath: true, // Enables relative paths in nested routes
			v7_fetcherPersist: true, // Retains fetcher state during navigation
			v7_normalizeFormMethod: true, // Normalizes form methods (e.g., POST or GET)
			v7_partialHydration: true, // Supports partial hydration for server-side rendering
			v7_skipActionErrorRevalidation: true, // Prevents revalidation when action errors occur
		},
	},
);

/**
 * Корневой элемент реакт приложения
 */
ReactDOM.createRoot(document.getElementById('root')).render(
	<Suspense fallback={<Preloader />}>
		<RecoilRoot>
			<RouterProvider future={{ v7_startTransition: true }} router={router} />
		</RecoilRoot>
	</Suspense>,
);
