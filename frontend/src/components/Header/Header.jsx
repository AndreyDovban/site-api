/** CSS модуль */
import styles from './Header.module.css';
/** Метод динамического управления классами */
import cn from 'classnames';
/** Иконка логотип */
import Logo from '../../assets/svg/logo_long.svg?react';
/** Компонент ссылка для СПА */
import { Link } from 'react-router-dom';
/** Компонент панель навигации */
import { NavTools } from '../../components/NavTools/NavTools';

/**
 * Компонент шапка приложения
 * @param {string} className Класс для стилизации
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function Header({ className, ...props }) {
	return (
		<header className={cn(className, styles.block)} {...props}>
			<Link to="/" className={cn('logotip', 'not_effect')}>
				<Logo className={styles.logo} />
			</Link>
			<NavTools />
		</header>
	);
}
