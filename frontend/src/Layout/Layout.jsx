/* v8 ignore start*/
/** CSS модуль */
import styles from './Layout.module.css';
/**
 * Компонент шапка приложения
 * Компонент диалоговое окно
 */
import { Header } from '../components';

function Layout({ children }) {
	// if (history.scrollRestoration) {
	//     history.scrollRestoration = 'manual';
	// }
	return (
		<div className={styles.block}>
			<Header />
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
		console.log('render layout');
		return (
			<Layout>
				<Component {...props} />
			</Layout>
		);
	};
}
