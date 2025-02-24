/** CSS модуль */
import styles from './Table.module.css';
/** Метод динамического управления классами */
import cn from 'classnames';
/**
 * Хук управления атомом состояния
 * Хук получения значения атома состояния
 * Хук изменения значения атома состояния
 */
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
/**
 * Атом состояния - колличество всех строк в ответе запроса к базе без учёта лимита и ствига
 * Атом состояния - текущая страница приложения
 * Атом состояния - коллчество строк в ответе запроса к базе
 * Атом состояния - назвение последнего изменяемого фильтра
 * Атом состояния - объект с фильтрами
 * Атом состояния - направление сортировки
 * Атом состояния - название колонки по которой идёт сортировка
 * Атом состояния - массив с названиями колонок
 * Атом состояния - объект с данными ответа запроса к базе
 */
import {
	countAllRowsState,
	numberPageState,
	countRowsState,
	lastFilterState,
	filtersState,
	sortDirectionState,
	sortNameState,
	columnsState,
	dataState,
} from '../../store';
/** метод получения случайной строки */
import { v4 as uuid } from 'uuid';
/** объект с названиями колонок */
import labels from '../../labels.json';
/**
 * Хук эффекта
 * Хук мемоизации
 */
import { useEffect, useMemo } from 'react';
/** Функция запроса к серверу за данными */
import { getdata } from '../../api';
/** Иконка стрелочка для сортировки */
import Sort from '../../assets/svg/sort-down-solid.svg?react';
/**
 * Компопнент текстовый фильтр
 * Компопнент фильтр даты-времени
 */
import { TextFilter, DatetimeFilter } from '..';

/**
 * Компонент таблица
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function TableOld({ ...props }) {
	const columns = useRecoilValue(columnsState);
	const [sortName, setSortName] = useRecoilState(sortNameState);
	const [sortDirection, setSortDirection] = useRecoilState(sortDirectionState);
	const [filters, setFilters] = useRecoilState(filtersState);
	const [lastFilter, setLastFilter] = useRecoilState(lastFilterState);
	const [data, setData] = useRecoilState(dataState);
	const countRows = useRecoilValue(countRowsState);
	const [numberPage, setNumberPage] = useRecoilState(numberPageState);
	const setCountAllRows = useSetRecoilState(countAllRowsState);
	// const [directionColumns, setDirectionColumns] = useRecoilState(directionColumnsState);

	// const dragElem = useRef('');
	// const dropElem = useRef('');

	useEffect(() => {
		getdata(columns, sortName, sortDirection, filters, countRows, numberPage, setData, setCountAllRows);
	}, [columns, sortName, sortDirection, filters, countRows, numberPage, setData, setCountAllRows]);

	function Head() {
		function changeSorting(el) {
			setSortName(el);
			setSortDirection(sortDirection === 'ASC' ? 'DESC' : 'ASC');
		}

		// function dragstartHandler(e) {
		// 	let t = e.target.getAttribute('data-col');
		// 	dragElem.current = t;
		// }

		// function dragoverHandler(e) {
		// 	let t = e.target.getAttribute('data-col');
		// 	dropElem.current = t;
		// }

		// function dropHandler() {
		// 	let obj = { ...directionColumns };
		// 	delete obj[dragElem.current];
		// 	setDirectionColumns(obj);
		// }

		return (
			<tr className={styles.tr}>
				{[...columns].map(el => {
					return (
						<th
							data-col={el}
							className={styles.th}
							key={uuid()}
							onClick={() => changeSorting(el)}
							// draggable="true"
							// onDragStart={dragstartHandler}
							// onDragOver={dragoverHandler}
							// onDragEnd={dropHandler}
							id={el}
						>
							{labels[el]}
							<Sort
								className={cn(styles.icon, styles.sort, {
									[styles.hide]: sortName !== el,
									[styles.up]: sortDirection === 'ASC',
								})}
							/>
						</th>
					);
				})}
			</tr>
		);
	}

	function Filters() {
		return (
			<tr key={uuid()}>
				{[...columns].map(el => {
					if (el == 'created_at') {
						return (
							<td key={uuid()} className={cn(styles.td, styles.td_filter)}>
								<DatetimeFilter
									columnName={el}
									filters={filters}
									setFilters={setFilters}
									setLastFilter={setLastFilter}
									lastFilter={lastFilter}
									// num={true}
								/>
							</td>
						);
					}
					return (
						<td key={uuid()} className={cn(styles.td, styles.td_filter)}>
							<TextFilter
								columnName={el}
								filters={filters}
								setFilters={setFilters}
								setLastFilter={setLastFilter}
								lastFilter={lastFilter}
								num={el == 'count' || el == 'valid'}
							/>
						</td>
					);
				})}
			</tr>
		);
	}

	function Body() {
		function changeFilters(column, value) {
			let obj = { ...filters };
			obj[column] = value;
			if (String(value).trim() === '') {
				clearFilters(column);
			} else {
				setNumberPage(0);
				setFilters(obj);
			}
		}

		function clearFilters(column) {
			let obj = { ...filters };
			delete obj[column];
			setFilters(obj);
		}

		return (
			<>
				{[...data].map(el => {
					return (
						<tr key={uuid()} className={styles.tr}>
							{el.map((elem, i) => {
								let cell_value = elem;
								if (columns[i] == 'created_at') {
									cell_value = new Date(elem * 1000);
									return (
										<td
											key={uuid()}
											className={styles.td}
											onClick={() => {
												console.log(elem);
												changeFilters(columns[i], elem);
											}}
										>
											{cell_value.toLocaleString()}
											{/* {elem} */}
										</td>
									);
								} else {
									return (
										<td
											key={uuid()}
											className={styles.td}
											onClick={() => changeFilters(columns[i], elem)}
										>
											{cell_value}
										</td>
									);
								}
							})}
						</tr>
					);
				})}
			</>
		);
	}

	return (
		<table className={styles.table} {...props}>
			<thead>
				{useMemo(
					() => (
						<Head />
					),
					// eslint-disable-next-line react-hooks/exhaustive-deps
					[columns, sortDirection, sortName],
				)}
			</thead>
			<tbody>
				{useMemo(
					() => (
						<Filters />
					),
					// eslint-disable-next-line react-hooks/exhaustive-deps
					[columns, filters],
				)}
				{useMemo(
					() => (
						<Body />
					),
					// eslint-disable-next-line react-hooks/exhaustive-deps
					[data],
				)}
			</tbody>
		</table>
	);
}
