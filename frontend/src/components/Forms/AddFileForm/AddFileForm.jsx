import styles from './AddFileForm.module.css';
import cn from 'classnames';
import { useSetRecoilState } from 'recoil';
import { noteState } from '../../../store';
import { useForm } from 'react-hook-form';
import { Button } from '../..';
import { addFile, getFiles } from '../../../api';
import { filesListState } from '../../../store';
import { createPortal } from 'react-dom';

const portal = document.querySelector('#portal');

/**
 * Компонент - форма добавления файла
 * @param {Object} targetFile Состояние - объект изменяемый файл
 * @param {function} setTargetFile Функция изменения состояния объект изменяемый файл
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function AddFileForm({ targetFile, setTargetFile, ...props }) {
	const setNote = useSetRecoilState(noteState);
	const setFiles = useSetRecoilState(filesListState);

	const {
		register,
		handleSubmit,

		formState: { errors },
		reset,
	} = useForm({
		mode: 'all',
	});

	/**  Обработчик отправки формы добавления файла */
	async function handlerAddFile(prodUid, data) {
		if (await addFile(prodUid, data, reset, setNote)) {
			setTargetFile({});
			await getFiles(setFiles, setNote);
		}
	}

	function handlerReset() {
		reset();
		setTargetFile({});
	}

	return createPortal(
		<>
			<div
				className={cn(styles.owerlay, {
					[styles.hide]: !targetFile.prodUid,
				})}
			></div>
			<form
				onSubmit={handleSubmit(data => handlerAddFile(targetFile.prodUid, data))}
				className={cn(styles.block, {
					[styles.hide]: !targetFile.prodUid,
				})}
				{...props}
			>
				<div className={styles.inps_block}>
					!!!
					<label className={styles.label}>
						<span>
							Название <span className={styles.star}>*</span>
						</span>
						<input
							className={styles.inp}
							defaultValue={targetFile?.name}
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
							defaultValue={targetFile?.description}
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
					<Button className={styles.button}>Применить</Button>
					<Button type="button" className={cn(styles.button, styles.button_sec)} onClick={handlerReset}>
						Отмена
					</Button>
				</div>
			</form>
		</>,
		portal,
	);
}
