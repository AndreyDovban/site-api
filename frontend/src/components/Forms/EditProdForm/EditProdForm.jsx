import styles from './EditProdForm.module.css';
import cn from 'classnames';
import { useSetRecoilState } from 'recoil';
import { noteState } from '../../../store';
import { useForm } from 'react-hook-form';
import { Button } from '../..';
import { updateProd, getProds } from '../../../api';
import { prodsListState } from '../../../store';

/**
 * Компонент - форма изменения продукта
 * @param {boolean} isOpen Состояние - скрыть/показать форму
 * @param {function} setIsOpen Функция изменения состояния скрыть/показать форму
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function EditProdForm({ targetProd, setTargetProd, ...props }) {
	const setNote = useSetRecoilState(noteState);
	const setProds = useSetRecoilState(prodsListState);

	const {
		register,
		handleSubmit,

		formState: { errors, isValid },
		reset,
	} = useForm({
		mode: 'all',
	});

	/**  Обработчик отправки формы создания продукта */
	async function handlerEditProd(uid, data) {
		if (await updateProd(uid, data, reset, setNote)) {
			await getProds(setProds, setNote);
		}
	}

	function handlerReset() {
		reset();
		setTargetProd({});
	}

	return (
		<form
			onSubmit={handleSubmit(data => handlerEditProd(targetProd.uid, data))}
			className={cn(styles.block, {
				[styles.hide]: !targetProd.uid,
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
						defaultValue={targetProd?.name}
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
						defaultValue={targetProd?.description}
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
				<Button type="button" className={cn(styles.button, styles.button_sec)} onClick={handlerReset}>
					Отмена
				</Button>
			</div>
		</form>
	);
}
