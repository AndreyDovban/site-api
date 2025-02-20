/** CSS модуль */
import styles from './Checkbox.module.css';
/** Метод динамического управления классами */
import cn from 'classnames';

/**
 * Компонент чекбокс
 * @param {boolean} value Значение чекбокса
 * @param {boolean} checked Состояние вкл/выкл чекбокса
 * @param {function} onChange Функция изменения значения
 * @param {string} text Текст для лэйбла
 * @param {boolean} disabled Параметр указывающий отключена/включена кнопка
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function Checkbox({ value, checked, onChange, text, disabled, ...props }) {
	return (
		<label
			className={cn(styles.block, {
				[styles.dis]: disabled,
			})}
			{...props}
		>
			<input value={value} checked={checked} onChange={onChange} className={styles.input} type="checkbox" />
			{text}
		</label>
	);
}
