/** CSS модуль */
import styles from './Form.module.css';
/** Метод динамического управления классами */
import cn from 'classnames';
/**
 * Хук управления атомом состояния
 * Хук получения значения атома состояния
 * Хук изменения значения атома состояния
 */
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
/**
 * Атом состояния - колличество строк в ответе запроса к базе без учёта лимита и сдвига
 * Атом состояния - номер текущей страницы
 * Атом состояния - колличество строк в ответе запроса к базе
 * Атом состояния - объект с фильтрами
 * Атом состояния - направление сортировки
 * Атом состояния - название колонки по которой идёт сортировака
 * Атом состояния - объект данных ответа запроса к базе
 * Атом состояния - массив с колонками
 * Атом состояния - выбранные пользователем продукты
 */
import {
	countAllRowsState,
	numberPageState,
	countRowsState,
	filtersState,
	sortDirectionState,
	sortNameState,
	dataState,
	columnsState,
	choosedProdsState,
	prodsListState,
} from '../../store';
/** Хук для управления формой */
import { useForm } from 'react-hook-form';
/** Хук состояния */
import { useState } from 'react';
/**
 * Компоненты - кнопка
 * Компоненты - чекбокс
 */
import { Button, Checkbox } from '..';
/** Функция запроса данных на сервере */
import { getdata } from '../../api';
/** Метод получения случайной строки */
import { v4 as uuid } from 'uuid';

export function Form() {
	const [choosedProds, setChoosedProds] = useRecoilState(choosedProdsState);
	const [, setSucces] = useState(false);
	const setData = useSetRecoilState(dataState);
	const columns = useRecoilValue(columnsState);
	const sortName = useRecoilValue(sortNameState);
	const sortDirection = useRecoilValue(sortDirectionState);
	const filters = useRecoilValue(filtersState);
	const countRows = useRecoilValue(countRowsState);
	const numberPage = useRecoilValue(numberPageState);
	const setCountAllRows = useSetRecoilState(countAllRowsState);
	const prodsList = useRecoilValue(prodsListState);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ mode: 'all' });

	function handleChange(e) {
		let t = e.target.value;
		let arr = [...choosedProds];
		if (arr.includes(t)) {
			arr = arr.filter(el => el !== t);
		} else {
			arr.push(t);
		}
		setChoosedProds(arr);
	}

	async function onSubmit(data) {
		for (let key in data) {
			if (typeof data[key] === 'string') {
				data[key] = data[key].trim();
			}
		}

		let y = Object.values(data);
		y.splice(4, 0, choosedProds);
		try {
			let res = await fetch('/api/mail', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(y),
			});
			if (res.status === 200) {
				getdata(columns, sortName, sortDirection, filters, countRows, numberPage, setData, setCountAllRows);
				reset();
				setSucces(true);
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<div className={styles.inps_block}>
				<label className={styles.label}>
					<span>
						Имя <span className={styles.star}>*</span>
					</span>
					<input
						className={styles.inp}
						defaultValue={'jon'}
						{...register('name', {
							required: 'Поле не заполнено',
							maxLength: {
								value: 30,
								message: 'Превышено колличество символов 30',
							},
						})}
					/>
					<span
						role="alert"
						className={cn(styles.error, {
							[styles.isError]: errors.name,
						})}
					>
						{errors.name && errors.name?.message}
					</span>
				</label>
				<label className={styles.label}>
					Телефон
					<input
						className={styles.inp}
						defaultValue={'98002000888'}
						{...register('tel', {
							maxLength: {
								value: 20,
								message: 'Превышено колличество символов 20',
							},
							pattern: {
								value: /\d+/i,
								message: 'Некорректное значение',
							},
						})}
					/>
					<span
						role="alert"
						className={cn(styles.error, {
							[styles.isError]: errors.tel,
						})}
					>
						{errors.tel && errors.tel?.message}
					</span>
				</label>
				<label className={styles.label}>
					<span>
						Электронная почта <span className={styles.star}>*</span>
					</span>
					<input
						type="mail"
						className={styles.inp}
						// defaultValue={'jonsokol@mail.ru'}
						// defaultValue={'dovban2@devzone.mdis.corp'}
						// defaultValue={'granulex@yandex.ru'}
						defaultValue={'dovban@mdis.ru'}
						// defaultValue={'dedechko.av@gmail.com'}
						// defaultValue={'baryshevqa@gmail.com'}
						// defaultValue={'baryshev@mdis.ru'}
						// defaultValue={'dovban.andreyy@rambler.ru'}
						{...register('mail', {
							required: 'Поле не заполнено',
							maxLength: {
								value: 30,
								message: 'Превышено колличество символов 30',
							},
							pattern: {
								value: /.+@.+\..+/i,
								message: 'Не действительный email',
							},
						})}
					/>
					<span
						role="alert"
						className={cn(styles.error, {
							[styles.isError]: errors.mail,
						})}
					>
						{errors.mail && errors.mail?.message}
					</span>
				</label>
				<label className={styles.label}>
					<span>
						Компания <span className={styles.star}>*</span>
					</span>
					<input
						className={styles.inp}
						defaultValue={'Mids'}
						{...register('company', {
							required: 'Поле не заполнено',
							maxLength: {
								value: 30,
								message: 'Превышено колличество символов 30',
							},
						})}
					/>
					<span
						role="alert"
						className={cn(styles.error, {
							[styles.isError]: errors.company,
						})}
					>
						{errors.company && errors.company?.message}
					</span>
				</label>
				<ul className={styles.ul}>
					{[...prodsList].map(el => {
						return (
							<li key={uuid()}>
								<Checkbox
									value={el[0]}
									text={el[1]}
									checked={choosedProds.includes(el[0])}
									onChange={handleChange}
									// disabled={true}
								/>
							</li>
						);
					})}
					{/* <li>
						<Checkbox value="0" text="Granulex" checked={choosedProds[0]} onChange={handleChange} />
					</li>
					<li>
						<Checkbox
							value="1"
							text="Granulex-Viewer"
							checked={choosedProds[1]}
							onChange={handleChange}
							// disabled={true}
						/>
					</li>
					<li>
						<Checkbox
							value="2"
							text="Granulex-Insight"
							checked={choosedProds[2]}
							onChange={handleChange}
							// disabled={true}
						/>
					</li> */}
				</ul>
			</div>
			<div className={styles.button_block}>
				<Button>Отправить</Button>
			</div>
		</form>
	);
}
