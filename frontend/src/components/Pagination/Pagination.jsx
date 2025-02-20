/** CSS модуль */
import styles from './Pagination.module.css';
/** Метод динамического управления классами */
import cn from 'classnames';
/**
 * Хукуправления атомом состояния
 * Хук получения значения атома состояния
 */
import { useRecoilState, useRecoilValue } from 'recoil';
/**
 * Атом состояния - колличество всех строк в ответе запроса к базе без учёта лимита и ствига
 * Атом состояния - текущая страница приложения
 * Атом состояния - коллчество строк в ответе запроса к базе
 */
import { countAllRowsState, numberPageState, countRowsState } from '../../store';
import { dataState } from '../../store';
import Arrow from '../../assets/svg/corner.svg?react';
import { v4 as uuid } from 'uuid';

/**
 * Компонент пагинация
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function Pagination({ ...props }) {
	const countRows = useRecoilValue(countRowsState);
	const data = useRecoilValue(dataState);
	const [numberPage, setNumberPage] = useRecoilState(numberPageState);
	const countAllRows = useRecoilValue(countAllRowsState);
	let lastPage = ~~(countAllRows / countRows);

	function changeNumberPage(e) {
		let t = e.currentTarget;
		if (t.getAttribute('data-dir') == '+' && countRows <= data.length) {
			setNumberPage(x => x + 1);
		} else if (t.getAttribute('data-dir') == '++' && countRows <= data.length) {
			setNumberPage(lastPage);
		} else if (t.getAttribute('data-dir') == '-' && numberPage > 0) {
			setNumberPage(x => x - 1);
		} else if (t.getAttribute('data-dir') == '--' && numberPage > 0) {
			setNumberPage(0);
		} else if (t.getAttribute('data-dir') == 'page') {
			setNumberPage(+t.getAttribute('data-num'));
		}
	}

	let pages = [];

	for (let i = 1; i < lastPage; i++) {
		if (i >= 0 && i >= numberPage - 4 && pages.length <= 4 && lastPage > 1) {
			pages.push(
				<button
					data-dir="page"
					data-num={i}
					className={cn(styles.page_but, {
						[styles.target_page]: numberPage === i,
					})}
					key={uuid()}
					onClick={changeNumberPage}
				>
					{i + 1}
				</button>,
			);
		}
	}

	return (
		<div className={styles.block} {...props}>
			<button data-dir="-" className={styles.but} onClick={changeNumberPage}>
				<Arrow className={cn(styles.icon, styles.prev)} />
			</button>
			<button
				data-dir="--"
				className={cn(styles.page_but, {
					[styles.target_page]: numberPage == 0,
				})}
				onClick={changeNumberPage}
			>
				{1}
				{numberPage > 5 ? '...' : ''}
			</button>
			{pages}
			<button
				data-dir="++"
				className={cn(styles.page_but, {
					[styles.target_page]: lastPage == numberPage,
				})}
				onClick={changeNumberPage}
			>
				{lastPage - 1 > numberPage && lastPage > 6 ? '...' : ''}
				{lastPage > 0 && lastPage + 1}
			</button>
			<button data-dir="+" className={styles.but} onClick={changeNumberPage}>
				<Arrow className={cn(styles.icon, styles.next)} />
			</button>
		</div>
	);
}
