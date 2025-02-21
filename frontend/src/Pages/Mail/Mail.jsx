import styles from './Mail.module.css';
import withLayout from '../../Layout/Layout';
import { MailForm } from '../../components';

/**
 * Страница отправки запроса на получение выбранных продуктов
 * @returns {JSXElement}
 */

function Mail() {
	return (
		<div className={styles.block}>
			<MailForm />
			{/* <pre>{JSON.stringify(prods, 0, 4)}</pre> */}
		</div>
	);
}

export default withLayout(Mail);
