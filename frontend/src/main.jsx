/* v8 ignore start*/
import './style/style.css';
import { Preloader } from './components';
import { RecoilRoot } from 'recoil';
import { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './Pages/Error/Error';

const Home = lazy(() => import('./Pages/Home/Home'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		errorElement: <Error />,
	},
]);

/**
 * Корневой элемент реакт приложения
 */
ReactDOM.createRoot(document.getElementById('root')).render(
	<Suspense fallback={<Preloader />}>
		<RecoilRoot>
			<RouterProvider router={router} />
		</RecoilRoot>
	</Suspense>,
);
