import styles from './AddProdForm.module.css';
import cn from 'classnames';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { noteState } from '../../../store';
import { useForm } from 'react-hook-form';
import { Button, Note } from '../..';
import { addProd, getProds } from '../../../api';
import { prodsListState } from '../../../store';

/** Компонент - форма создания нового продукта */
export function AddProdForm() {
	const [note, setNote] = useRecoilState(noteState);
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
			await getProds(setProds, setNote);
		}
	}

	return (
		<form onSubmit={handleSubmit(handlerAddProd)} className={styles.block}>
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
				<label className={styles.label}>
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
			<Button disabled={!isValid} className={styles.button}>
				Создать продукт
			</Button>
			<Button className={cn(styles.button, styles.button_sec)}>Отмена</Button>
			<Note note={note} setNote={setNote} />
		</form>
	);
}
