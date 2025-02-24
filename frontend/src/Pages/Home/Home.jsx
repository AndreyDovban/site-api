import styles from './Home.module.css';
import withLayout from '../../Layout/Layout';
// import { useEffect } from 'react';
// import { useSetRecoilState } from 'recoil';
// import { prodsListState } from '../../store';
// import { getprods } from '../../api';
import { Content } from '../../components';

/** Главная страница */
function Home() {
	// const setProdsList = useSetRecoilState(prodsListState)
	// useEffect(() => {
	// 	getprods(setProdsList);
	// }, [setProdsList]);

	return (
		<div className={styles.block}>
			<Content />
		</div>
	);
}

export default withLayout(Home);
