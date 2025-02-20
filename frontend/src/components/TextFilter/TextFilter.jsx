/** CSS модуль */
import styles from './TextFilter.module.css';
/** Метод динамического управления классами */
import cn from 'classnames';
/**
 * Хук состояни
 * Хук реф
 * Хук эффекта
 */
import { useState, useRef, useEffect } from 'react';
/** Иконка очистить */
import Delete from '../../assets/svg/delete-left-solid.svg?react';

/**
 * Компонент текстовый фильтр
 * @param {string} Название колонки по которой идёт сортировка
 * @param {Object} Объект с фильтрами
 * @param {fuction} Функция изменения объекта с фильтрами
 * @param {function} Функция изменения полледнего применённого фильтра
 * @param {string} Название поледнего применённого фильтра
 * @param {boolean} Параметр указывающи, что поле ввода числовое
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function TextFilter({ columnName, filters, setFilters, setLastFilter, lastFilter = '', num = false }) {
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
		if (num) {
			if (isNaN(+value) && value) {
				return;
			}
		}
		setVal(value);
		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}
		debounceRef.current = setTimeout(() => {
			let obj = { ...filters };
			obj[columnName] = value;
			if (String(value).trim() === '') {
				clearFilters(columnName);
			} else {
				setLastFilter(columnName);
				setFilters(obj);
			}
		}, delay);
	}

	return (
		<span className={styles.filter}>
			<input
				type="text"
				value={String(val) || ''}
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
