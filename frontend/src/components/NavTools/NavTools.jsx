/** CSS модуль */
import styles from './NavTools.module.css';
/** Метод динамического управления классами */
import cn from 'classnames';
/** Функция запроса проверки работоспособности приложения */
// import { checkheals } from '../../api';
/** Компонент ссылка для СПА */
import { Link } from 'react-router-dom';

/**
 * Компонент ссылка-кнопка
 * @param {string} className Класс для стилизации
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function NavTools({ className, ...props }) {
	return (
		<nav className={cn(className, styles.block)} {...props}>
			<Link to="/products" id="#products" className={styles.item}>
				Продукты
			</Link>
			<Link to="/clients" id="#clients" className={styles.item}>
				Клиенты
			</Link>
			<Link to="/links" id="#links" className={styles.item}>
				Ссылки
			</Link>
			<Link to="/mail" id="#mail" className={styles.item}>
				Отправить
			</Link>
		</nav>
	);
}
