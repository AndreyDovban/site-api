/** CSS модуль */
import styles from './Preloader.module.css';
/** SVG элемент */
import SVG from '../../assets/svg/logo_long.svg?react';

/**
 * Компонент проелоадер
 * @returns {JSXElement}
 */
export function Preloader() {
	return <SVG className={styles.block} />;
}
