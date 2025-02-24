import { createPortal } from 'react-dom';
import styles from './Note.module.css';
import cn from 'classnames';
import Alarm from '../../assets/svg/alarm.svg?react';

const portal = document.querySelector('#portal');

/**
 * Компонент уведомление
 * @param {string} text Текст уведомления
 * @param {boolean} isOpen Состояние показать/скрыть блок
 * @param {function} setIsOpen Изменение состояния показать/скрыть
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function Note({ text, isOpen, setIsOpen, ...props }) {
	return createPortal(
		<div
			className={cn(styles.block, {
				[styles.hide]: !isOpen,
			})}
			onClick={() => setIsOpen(false)}
			{...props}
		>
			<span>{text}</span>
			<Alarm className={cn(styles.icon, styles.bad)} />
		</div>,
		portal,
	);
}
