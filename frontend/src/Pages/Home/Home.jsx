/** CSS модуль */
import styles from './Home.module.css';
/** Шаблон приложения */
import withLayout from '../../Layout/Layout';
/** Хук эффекта */
// import { useEffect } from 'react';
/** Хук изменения значения атома состояния */
// import { useSetRecoilState } from 'recoil';
/** Атом состояния - список продуктов */
// import { prodsListState } from '../../store';
/** Запрос на получение списка продуктов */
// import { getprods } from '../../api';
/** Компонент контент */
import { Content } from '../../components';

/** Главная страница */
function Home() {
	// const setProdsList = useSetRecoilState(prodsListState);

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
