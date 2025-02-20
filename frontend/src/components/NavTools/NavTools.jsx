/** CSS модуль */
import styles from './NavTools.module.css';
/** Метод динамического управления классами */
import cn from 'classnames';
/** Функция запроса проверки работоспособности приложения */
import { checkheals } from '../../api';

/**
 * Компонент ссылка-кнопка
 * @param {string} className Класс для стилизации
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function NavTools({ className, ...props }) {
	return <nav className={cn(className, styles.block)} {...props}></nav>;
}
