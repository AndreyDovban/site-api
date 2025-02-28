import { createPortal } from 'react-dom';
import styles from './Note.module.css';
import cn from 'classnames';
import Alarm from '../../assets/svg/alarm.svg?react';

const portal = document.querySelector('#portal');

/**
 * Компонент уведомление
 * @param {{text:string, isOpen:boolean, isSuccessful: boolean}} note Состояние объекта уведомление
 * @param {function} setNote Изменение состояния объекта уведомление
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function Note({ note, setNote, ...props }) {
	return createPortal(
		<div
			className={cn(styles.block, {
				[styles.hide]: !note.isOpen,
				[styles.good]: note.isSuccessful == true,
				[styles.bad]: note.isSuccessful == false,
			})}
			onClick={() => setNote({ ...note, isOpen: false })}
			{...props}
		>
			<Alarm
				className={cn(styles.icon, {
					[styles.good]: note.isSuccessful == true,
					[styles.bad]: note.isSuccessful == false,
				})}
			/>
			<span>{note.text}</span>
		</div>,
		portal,
	);
}
