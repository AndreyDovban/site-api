import styles from './EditProdForm.module.css';
import cn from 'classnames';
import { useSetRecoilState } from 'recoil';
import { noteState } from '../../../store';
import { useForm } from 'react-hook-form';
import { Button } from '../..';
import { updateProd, getProds } from '../../../api';
import { prodsListState } from '../../../store';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const portal = document.querySelector('#portal');

/**
 * Компонент - форма изменения продукта
 * @param {Object} targetProd Состояние - объект изменяемй продукт
 * @param {function} setTargetProd Функция изменения состояния - объект изменяемй продукт
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function EditProdForm({ targetProd, setTargetProd, ...props }) {
	const setNote = useSetRecoilState(noteState);
	const setProds = useSetRecoilState(prodsListState);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isValid },
		reset,
	} = useForm({ mode: 'all' });

	useEffect(() => {
		setValue('name', targetProd.name, { shouldValidate: true });
		setValue('description', targetProd.description, { shouldValidate: true });
		setValue('mail_instruction', targetProd.mail_instruction, { shouldValidate: true });
		setValue('web_instruction', targetProd.web_instruction, { shouldValidate: true });
	}, [setValue, targetProd.description, targetProd.mail_instruction, targetProd.web_instruction, targetProd.name]);

	/**  Обработчик отправки формы создания продукта */
	async function handlerEditProd(data) {
		if (await updateProd(targetProd.uid, data, () => {}, setNote)) {
			await getProds(setProds, setNote);
		}
	}

	function handlerReset() {
		reset();
		setTargetProd({ mode: 'all' });
	}

	return createPortal(
		<>
			<div
				className={cn(styles.owerlay, {
					[styles.hide]: !targetProd.uid,
				})}
			></div>
			<form
				onSubmit={handleSubmit(handlerEditProd)}
				className={cn(styles.block, {
					[styles.hide]: !targetProd.uid,
				})}
				{...props}
			>
				<div>Редактирование продукта</div>
				<div className={styles.inps_block}>
					<label className={styles.label}>
						<span>
							Название <span className={styles.star}>*</span>
						</span>
						<input
							className={styles.inp}
							{...register('name', {
								maxLength: {
									value: 30,
									message: 'Превышено колличество символов 30',
								},
								required: 'Поле не заполнено',
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
									value: 100,
									message: 'Превышено колличество символов 100',
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
					<label className={styles.label}>
						<span>
							Примечание для письма <span className={styles.star}>*</span>
						</span>
						<input
							className={styles.inp}
							// defaultValue={'jon'}
							{...register('mail_instruction', {
								required: 'Поле не заполнено',
								maxLength: {
									value: 150,
									message: 'Превышено колличество символов 150',
								},
							})}
						/>
						<span
							role="alert"
							className={cn(styles.error, {
								[styles.isError]: errors.mail_instruction,
							})}
						>
							{errors.mail_instruction && errors.mail_instruction?.message}
						</span>
					</label>
					<label className={styles.label}>
						<span>
							Примечание для письма <span className={styles.star}>*</span>
						</span>
						<input
							className={styles.inp}
							// defaultValue={'jon'}
							{...register('web_instruction', {
								required: 'Поле не заполнено',
								maxLength: {
									value: 150,
									message: 'Превышено колличество символов 150',
								},
							})}
						/>
						<span
							role="alert"
							className={cn(styles.error, {
								[styles.isError]: errors.web_instruction,
							})}
						>
							{errors.web_instruction && errors.web_instruction?.message}
						</span>
					</label>
				</div>
				<hr className={styles.hr} />
				<hr className={styles.hr} />
				<Button type="submit" disabled={!isValid} className={styles.button}>
					Применить
				</Button>
				<Button type="button" className={cn(styles.button, styles.button_sec)} onClick={handlerReset}>
					Закрыть
				</Button>
			</form>
		</>,
		portal,
	);
}
