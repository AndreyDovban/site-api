/* v8 ignore start*/
import styles from './Layout.module.css';
import { Header } from '../components';
import { useMemo } from 'react';
import { noteState, confirmState } from '../store';
import { ErrorBoundary, Note, Comfirm } from '../components';
import { useRecoilState } from 'recoil';

function Layout({ children }) {
	// if (history.scrollRestoration) {
	//     history.scrollRestoration = 'manual';
	// }
	const [note, setNote] = useRecoilState(noteState);
	const [confirm, setConfirm] = useRecoilState(confirmState);

	const header = useMemo(() => <Header />, []);

	return (
		<div className={styles.block}>
			{header}
			<ErrorBoundary>
				<main className={styles.content}>{children}</main>
			</ErrorBoundary>
			<Note note={note} setNote={setNote} />
			<Comfirm confirm={confirm} setConfirm={setConfirm} />
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
