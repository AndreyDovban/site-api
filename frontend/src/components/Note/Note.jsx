import { useEffect } from 'react';
import styles from './Note.module.css';

/**
 * Компонент уведомление
 * @param {string} text Текст уведомления
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function Note({ text, ...props }) {
	useEffect(() => {
		setTimeout(() => {
			document.querySelector('#notefiction')?.classList.add(styles.active);
		}, 2000);
	}, [text]);

	return (
		<div className={styles.block} {...props} id="notefiction">
			{text}
		</div>
	);
}
