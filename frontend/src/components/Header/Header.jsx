import styles from './Header.module.css';
import cn from 'classnames';
import Logo from '../../assets/svg/logo_long.svg?react';
import { Link } from 'react-router-dom';
import { NavTools } from '../../components/NavTools/NavTools';
import { useMemo } from 'react';

/**
 * Компонент шапка приложения
 * @param {string} className Класс для стилизации
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function Header({ className, ...props }) {
	const nav = useMemo(() => <NavTools />, []);

	return (
		<header className={cn(className, styles.block)} {...props}>
			<Link to="/" className={cn('logotip', 'not_effect')}>
				<Logo className={styles.logo} />
			</Link>
			{nav}
		</header>
	);
}
