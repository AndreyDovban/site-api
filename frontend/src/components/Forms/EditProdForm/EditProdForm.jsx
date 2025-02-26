import styles from './EditProdForm.module.css';
import cn from 'classnames';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { noteState } from '../../../store';
import { useForm } from 'react-hook-form';
import { Button, Note } from '../..';
import { updateProd, getProds } from '../../../api';
import { prodsListState } from '../../../store';

/**
 * Компонент - форма изменения продукта
 * @param {boolean} isOpen Состояние - скрыть/показать форму
 * @param {function} setIsOpen Функция изменения состояния скрыть/показать форму
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function EditProdForm({ uid, isOpen, setIsOpen, ...props }) {
	const [note, setNote] = useRecoilState(noteState);
	const setProds = useSetRecoilState(prodsListState);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm({ mode: 'all' });

	/**  Обработчик отправки формы создания продукта */
	async function handlerAddProd(uid, data) {
		if (await updateProd(uid, data, reset, setNote)) {
			await getProds(setProds, setNote);
		}
	}

	return (
		<form
			onSubmit={handleSubmit(data => handlerAddProd(uid, data))}
			className={cn(styles.block, {
				[styles.hide]: !isOpen,
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
						// defaultValue={'jon'}
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
				<Button disabled={!isValid} className={styles.button}>
					Применить
				</Button>
				<Button type="button" className={cn(styles.button, styles.button_sec)} onClick={setIsOpen}>
					Отмена
				</Button>
			</div>
			<Note note={note} setNote={setNote} />
		</form>
	);
}
