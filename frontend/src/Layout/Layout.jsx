/* v8 ignore start*/
import styles from './Layout.module.css';
import { useRecoilValue } from 'recoil';
import { noteMessageState } from '../store';
import { Header, Note } from '../components';

function Layout({ children }) {
	const noteMessage = useRecoilValue(noteMessageState);
	// if (history.scrollRestoration) {
	//     history.scrollRestoration = 'manual';
	// }

	return (
		<div className={styles.block}>
			<Note text={noteMessage} />
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
		return (
			<Layout>
				<Component {...props} />
			</Layout>
		);
	};
}
