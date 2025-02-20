/** CSS модуль */
import styles from './Button.module.css';
/** Метод динамического управления классами */
import cn from 'classnames';

/**
 * Компонент ссылка-кнопка
 * @param {JSXElement} children Дочерний элемент
 * @param {string} className Класс для стилизации
 * @param {boolean} disabled Параметр указывающий отключена/включена кнопка
 * @param {boolean} fake Параметр указывающий компонент это кнопка или ссылка
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function Button({ children, className, disabled = false, fake = false, ...props }) {
	if (fake) {
		return (
			<div
				className={cn(className, styles.block, {
					[styles.disabled]: disabled === true,
				})}
				{...props}
			>
				{children}
			</div>
		);
	}
	return (
		<button
			className={cn(className, styles.block, {
				[styles.disabled]: disabled === true,
			})}
			{...props}
		>
			{children}
		</button>
	);
}
