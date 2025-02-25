import styles from './AddProdForm.module.css';
import cn from 'classnames';
import { useRecoilState } from 'recoil';
import { noteState } from '../../../store';
import { useForm } from 'react-hook-form';
import { Button, Note } from '../..';

/** Компонент - форма создания нового продукта */
export function AddProdForm() {
	const [note, setNote] = useRecoilState(noteState);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm({ mode: 'all' });

	async function onSubmit(data) {
		for (let key in data) {
			if (typeof data[key] === 'string') {
				data[key] = data[key].trim();
			}
		}

		console.log(data);
		try {
			let res = await fetch('/api/product', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			if (res.status === 200) {
				let mes = await res.json();
				console.log(mes);

				reset();
				if (mes.name) {
					setNote({
						text: `${mes.name} successful added`,
						isOpen: true,
						isSuccessful: true,
					});
				}
			} else {
				let mes = res.statusText + ', [' + res.status + ']';
				reset();
				setNote({
					text: mes,
					isOpen: true,
					isSuccessful: false,
				});
			}
		} catch (error) {
			setNote({
				text: error,
				isOpen: true,
				isSuccessful: false,
			});
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.block}>
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
