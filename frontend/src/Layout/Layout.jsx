/* v8 ignore start*/
import styles from './Layout.module.css';
import { Header } from '../components';
import { useMemo } from 'react';

function Layout({ children }) {
	// if (history.scrollRestoration) {
	//     history.scrollRestoration = 'manual';
	// }
	const header = useMemo(() => <Header />, []);

	return (
		<div className={styles.block}>
			{header}
			<main className={styles.content}>{children}</main>
		</div>
	);
}

/** Возврат компонента высшего порядка принимающего в параметр компонент и возвращающий этот компонент обёрнутый в шаблон */
export default function withLayout(Component) {
	// window.addEventListener('scroll', () => {
	//     console.log(window.scrollY);
	// });

	return function withLauoutComponent(props) {
		return (
			<Layout>
				<Component {...props} />
			</Layout>
		);
	};
}
