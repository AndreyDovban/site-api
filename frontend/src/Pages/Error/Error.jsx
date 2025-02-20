/** Хук обработки ошибки роутинга */
import { useRouteError } from 'react-router-dom';
/** Шаблон приложения */
import withLayout from '../../Layout/Layout';
/** CSS модуль */
import styles from './Error.module.css';

/** Страница 404 */
function Error() {
	const error = useRouteError();

	return (
		<div className={styles.block}>
			<h1>404</h1>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
}

export default withLayout(Error);
