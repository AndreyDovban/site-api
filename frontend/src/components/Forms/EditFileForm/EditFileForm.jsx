import styles from './EditFileForm.module.css';
import cn from 'classnames';
import { useSetRecoilState } from 'recoil';
import { noteState } from '../../../store';
import { useForm } from 'react-hook-form';
import { Button } from '../..';
import { updateFile, getFiles } from '../../../api';
import { filesListState } from '../../../store';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const portal = document.querySelector('#portal');

/**
 * Компонент - форма изменения файла
 * @param {boolean} targetFile Состояние - объект изменяемый файл
 * @param {function} setTargetFile Функция изменения состояния - объект изменяемый файл
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function EditFileForm({ targetFile, setTargetFile, ...props }) {
	const setNote = useSetRecoilState(noteState);
	const setFiles = useSetRecoilState(filesListState);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isValid },
		reset,
	} = useForm({ mode: 'all' });

	useEffect(() => {
		setValue('name', targetFile.name, { shouldValidate: true });
		setValue('description', targetFile.description, { shouldValidate: true });
	}, [setValue, targetFile.description, targetFile.name]);

	/**  Обработчик отправки формы создания продукта */
	async function handlerEditProd(data) {
		if (await updateFile(targetFile.uid, data, () => {}, setNote)) {
			await getFiles(setFiles, setNote);
		}
	}

	function handlerReset() {
		reset();
		setTargetFile({ mode: 'all' });
	}

	return createPortal(
		<>
			<div
				className={cn(styles.owerlay, {
					[styles.hide]: !targetFile.uid,
				})}
			></div>
			<form
				onSubmit={handleSubmit(handlerEditProd)}
				className={cn(styles.block, {
					[styles.hide]: !targetFile.uid,
				})}
				{...props}
			>
				<div className={styles.inps_block}>
					<label className={styles.label}>
						<span>
							Название <span className={styles.star}>*</span>
						</span>
						<input
							className={styles.inp}
							{...register('name', {
								required: true,
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
					<label className={cn(styles.label, styles.grow)}>
						<span>
							Описание <span className={styles.star}>*</span>
						</span>
						<input
							className={styles.inp}
							{...register('description', {
								maxLength: {
									value: 50,
									message: 'Превышено колличество символов 50',
								},
								required: 'Поле не заполнено',
							})}
						/>
						<span
							role="alert"
							className={cn(styles.error, {
								[styles.isError]: errors.telephone,
							})}
						>
							{errors.telephone && errors.telephone?.message}
						</span>
					</label>
				</div>
				<hr className={styles.hr} />
				<hr className={styles.hr} />
				<div className={styles.buttons_block}>
					<Button type="submit" disabled={!isValid} className={styles.button}>
						Применить
					</Button>
					<Button type="button" className={cn(styles.button, styles.button_sec)} onClick={handlerReset}>
						Отмена
					</Button>
				</div>
			</form>
		</>,
		portal,
	);
}
