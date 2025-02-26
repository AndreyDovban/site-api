/** CSS модуль */
import styles from './EditBase.module.css';
/** Хук для управления формой */
import { useForm } from 'react-hook-form';
/** Компонент кнопка */
import { Button } from '..';
/** Иконка загрузить файл */
import Upload from '../../assets/svg/upload.svg?react';
/** Хук управления атомом сотояния */
import { useRecoilState } from 'recoil';
/**  Атом состояния - массив продуктов */
import { prodsListState } from '../../store';
/** Метод для динамического управления классами */
import cn from 'classnames';
/**
 * Хук состояния
 * Хук эффекта
 */
import { useState, useEffect } from 'react';
/** Метод получения случайной строки */
import { v4 as uuid } from 'uuid';
/** Запрос на получение списка продуктов */
import { getProds } from '../../api';

/**
 * Компонент блок изменения базы
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function EditBase({ ...props }) {
	const [prodsList, setProdsList] = useRecoilState(prodsListState);

	const [files, setFiles] = useState([]); // Внутреннее состояние компонента массив названий добавленных файлов
	const [mod, setMod] = useState(true); // Внутреннее состояния компонента режим работы выбрать/добавить
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		// reset,
	} = useForm({ mode: 'all' });

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name == 'file') {
				setFiles(value?.file);
			}
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	async function onSubmit(data) {
		const form = new FormData();
		for (let key in data) {
			if (typeof data[key] === 'string') {
				data[key] = data[key].trim();
			}
			// console.log(key, data[key]);
			if (key === 'file') {
				for (let i = 0; i < data[key].length; i++) {
					console.log('!!!!', data[key][i]);
					form.append(data[key][i].name, data[key][i]);
				}
			} else {
				form.append(key, data[key]);
			}
		}

		try {
			let res = await fetch('/api/setfiles', {
				method: 'post',
				headers: {
					'Enc-Type': 'multipart/form-data',
				},
				body: form,
			});
			if (res.status === 200) {
				res = await res.text();
				getProds(setProdsList);
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className={styles.form} {...props}>
			<button className={styles.but} type="button" onClick={() => setMod(!mod)}>
				{mod ? 'Добавить продукт' : 'Выбрать продукт'}
			</button>
			{mod && (
				<label className={styles.label}>
					<span>
						Выберите продукт<span className={styles.star}>*</span>
					</span>
					<select
						className={styles.inp}
						{...register('prod', {
							required: 'Продукт не выбран',
							maxLength: {
								value: 30,
								message: 'Превышено колличество символов 30',
							},
						})}
					>
						{[...prodsList].map(el => {
							return <option key={uuid()}>{el[1]}</option>;
						})}
					</select>
				</label>
			)}
			{!mod && (
				<label className={styles.label}>
					<span>
						Новый продукт<span className={styles.star}>*</span>
					</span>
					<input
						className={styles.inp}
						defaultValue={''}
						{...register('prod', {
							required: 'Поле не заполнено',
							maxLength: {
								value: 120,
								message: 'Превышено колличество символов 120',
							},
						})}
					/>
					<span
						role="alert"
						className={cn(styles.error, {
							[styles.isError]: errors.prod,
						})}
					>
						{errors.prod && errors.prod?.message}
					</span>
				</label>
			)}
			<label className={styles.label}>
				<span>
					Описание продукта<span className={styles.star}>*</span>
				</span>
				<textarea
					className={styles.textarea}
					defaultValue={''}
					{...register('description', {
						maxLength: {
							value: 120,
							message: 'Превышено колличество символов 120',
						},
					})}
				/>
				<span
					role="alert"
					className={cn(styles.error, {
						[styles.isError]: errors.description,
					})}
				>
					{errors.description && errors.description?.message}
				</span>
			</label>
			<label className={styles.file_label}>
				<input type="file" className={styles.file} {...register('file')} accept=".lic, .deb, .pdf, .txt" />
				{errors.file ? (
					<span
						role="alert"
						className={cn(styles.error, {
							[styles.isError]: errors.file,
						})}
					>
						{errors.file?.message}
					</span>
				) : (
					'Выберите файлы'
				)}
				<Upload
					className={cn(styles.upload, {
						[styles.isError]: errors.file,
					})}
				/>
			</label>
			<label className={styles.label}>
				<span>
					Описание файла<span className={styles.star}>*</span>
				</span>
				<textarea
					className={styles.textarea}
					defaultValue={''}
					{...register('file_desc', {
						maxLength: {
							value: 60,
							message: 'Превышено колличество символов 60',
						},
					})}
				/>
				<span
					role="alert"
					className={cn(styles.error, {
						[styles.isError]: errors.file_desc,
					})}
				>
					{errors.file_desc && errors.file_desc?.message}
				</span>
			</label>
			<Button className={cn()}>Сохранить</Button>
			<ul
				className={cn(styles.ul, {
					[styles.hide]: ![...files].length,
				})}
			>
				<span className={styles.list_file_label}>Файлы&nbsp;будут&nbsp;добавленны:</span>
				{[...files].map(el => {
					return <li key={uuid()}>{el?.name}</li>;
				})}
			</ul>
		</form>
	);
}
