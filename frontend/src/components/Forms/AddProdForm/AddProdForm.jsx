import styles from './AddProdForm.module.css';
import cn from 'classnames';
import { useSetRecoilState } from 'recoil';
import { noteState } from '../../../store';
import { useForm } from 'react-hook-form';
import { Button } from '../..';
import { addProd, getProds } from '../../../api';
import { prodsListState } from '../../../store';
import { createPortal } from 'react-dom';

const portal = document.querySelector('#portal');

/**
 * Компонент - форма создания нового продукта
 * @param {boolean} isOpen Состояние - скрыть/показать форму
 * @param {function} setIsOpen Функция изменения состояния скрыть/показать форму
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function AddProdForm({ isOpen, setIsOpen, ...props }) {
	const setNote = useSetRecoilState(noteState);
	const setProds = useSetRecoilState(prodsListState);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm({ mode: 'all' });

	/**  Обработчик отправки формы создания продукта */
	async function handlerAddProd(data) {
		if (await addProd(data, reset, setNote)) {
			setIsOpen(false);
			await getProds(setProds, setNote);
		}
	}

	return createPortal(
		<>
			<div
				className={cn(styles.owerlay, {
					[styles.hide]: !isOpen,
				})}
			></div>
			<form
				onSubmit={handleSubmit(handlerAddProd)}
				className={cn(styles.block, {
					[styles.hide]: !isOpen,
				})}
				{...props}
			>
				<div>Создание нового продукта</div>
				<div className={styles.inps_block}>
					<label className={styles.label}>
						<span>
							Название <span className={styles.star}>*</span>
						</span>
						<input
							className={styles.inp}
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
						<span>
							Описание <span className={styles.star}>*</span>
						</span>
						<input
							className={styles.inp}
							{...register('description', {
								maxLength: {
									value: 150,
									message: 'Превышено колличество символов 150',
								},
								required: 'Поле не заполнено',
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
				</div>
				<hr className={styles.hr} />
				<hr className={styles.hr} />
				<Button disabled={!isValid} className={styles.button}>
					Создать продукт
				</Button>
				<Button type="button" className={cn(styles.button, styles.button_sec)} onClick={setIsOpen}>
					Отмена
				</Button>
			</form>
		</>,
		portal,
	);
}
