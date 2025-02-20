/** CSS модуль */
import styles from './DatetimeFilter.module.css';
/** Метод динамического управления классами */
import cn from 'classnames';
/**
 * Хук состояния
 * Хук реф
 * Хук эффекта
 */
import { useState, useRef, useEffect } from 'react';
/** Иконка очистить */
import Delete from '../../assets/svg/delete-left-solid.svg?react';
/** Функция возврацает строку местного времени в ISO формате */
import { toISO } from '../../helpers';

/**
 * Компонент фильтрации даты-времени
 * @param {string} columnName Название колонки по которой идёт фильтрация
 * @param {Object} filters Объект с фильтрами
 * @param {function} setFilters Функция изменения объекта с фильтрами
 * @param {function} setLastFilter Функция изменения названия последнего изменяемого фильтра
 * @param {string} lastFilter Название последнего изменяемого фильтра
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function DatetimeFilter({ columnName, filters, setFilters, setLastFilter, lastFilter = '' }) {
	const [val, setVal] = useState(''); // Внутренне состояние компонента
	const debounceRef = useRef(); // Реферальная ссылка, будет использоваться для очистки таймаута
	const inpRef = useRef();

	/** В эффекте меняется внутренне состояние компонента при изменении приходящего пропса */
	useEffect(() => {
		let value = filters[columnName] !== undefined ? filters[columnName] : '';
		if (lastFilter === columnName) {
			inpRef.current.focus();
		}
		setVal(value);
	}, [columnName, filters, lastFilter]);

	function clearFilters(column) {
		let obj = { ...filters };
		delete obj[column];
		setLastFilter('');
		setFilters(obj);
	}

	/** Обработчик изменения значения в инпуте, задержка изменения значения для фильтрации по колонке, принимает значение инаута и задекжку в милисекундах */
	function debounceFilter(value, delay) {
		let t = new Date(value).getTime() / 1000;
		console.log(t);
		setVal(value);
		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}
		debounceRef.current = setTimeout(() => {
			let obj = { ...filters };
			obj[columnName] = +t;
			setLastFilter(columnName);
			setFilters(obj);
		}, delay);
	}

	return (
		<span className={styles.filter}>
			<input
				type="datetime-local"
				value={val !== '' ? toISO(val) : ''}
				onChange={e => debounceFilter(e.target.value, 500)}
				ref={inpRef}
			/>
			<Delete
				className={cn(styles.delete, {
					[styles.hide]: filters[columnName] == undefined,
				})}
				onClick={() => clearFilters(columnName)}
			/>
		</span>
	);
}
