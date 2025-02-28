import { createPortal } from 'react-dom';
import styles from './Comfirm.module.css';
import cn from 'classnames';
import Alarm from '../../assets/svg/alarm.svg?react';

const portal = document.querySelector('#portal');

/**
 * Компонент запрос подтверждения
 * @param {string} text Текст уведомления
 * @param {{text:string, isOpen:boolean, func: function}} confirm Состояние объекта уведомление
 * @param {function} setConfirm Изменение состояния объекта уведомление
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function Comfirm({ confirm, setConfirm, ...props }) {
	function handlerExecFunction() {
		confirm.func();
		setConfirm({ ...confirm, isOpen: false, func: null });
	}

	return createPortal(
		<div
			className={cn(styles.block, {
				[styles.hide]: !confirm.isOpen,
			})}
			{...props}
		>
			<div className={styles.text_block}>
				<Alarm className={styles.icon} />
				<span className={styles.text}>{confirm.text}</span>
			</div>
			<div className={styles.buttons_block}>
				<button className={styles.button} onClick={handlerExecFunction}>
					yes
				</button>
				<button
					className={cn(styles.button, styles.button_sec)}
					onClick={() => setConfirm({ ...confirm, isOpen: false, func: null })}
				>
					no
				</button>
			</div>
		</div>,
		portal,
	);
}
