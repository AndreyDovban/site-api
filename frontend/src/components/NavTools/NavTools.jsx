import styles from './NavTools.module.css';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

/**
 * Компонент навигация
 * @param {string} className Класс для стилизации
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function NavTools({ className, ...props }) {
	return (
		<nav className={cn(className, styles.block)} {...props}>
			<NavLink
				to="/files"
				id="#files"
				className={styles.item}
				style={({ isActive }) => ({
					color: isActive && '#e2112e',
				})}
			>
				Продукты
			</NavLink>
			<NavLink
				to="/clients"
				id="#clients"
				className={styles.item}
				style={({ isActive }) => ({
					color: isActive && '#e2112e',
				})}
			>
				Клиенты
			</NavLink>
			<NavLink
				to="/links"
				id="#links"
				className={styles.item}
				style={({ isActive }) => ({
					color: isActive && '#e2112e',
				})}
			>
				Ссылки
			</NavLink>
			<NavLink
				to="/mail"
				id="#mail"
				className={styles.item}
				style={({ isActive }) => ({
					color: isActive && '#e2112e',
				})}
			>
				Отправить
			</NavLink>
		</nav>
	);
}
