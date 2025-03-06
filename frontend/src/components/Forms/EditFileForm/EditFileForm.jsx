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
import Upload from '../../../assets/svg/upload.svg?react';

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
		setValue('file', null, { shouldValidate: true });
	}, [setValue, targetFile.description, targetFile.name]);

	/**  Обработчик отправки формы создания продукта */
	async function handlerEditProd(data) {
		if (await updateFile(targetFile.uid, data, () => {}, setNote)) {
			setTargetFile({});
			await getFiles(setFiles, setNote);
		}
	}

	function handlerReset() {
		reset();
		setTargetFile({});
	}

	function chooseFile(e) {
		const t = e.target.files;
		if (t.length > 0) {
			setTargetFile({ ...targetFile, name: t[0].name });
			setValue('name', t[0].name, { shouldValidate: true });
		} else {
			setTargetFile({ ...targetFile, name: '' });
		}
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
				<div>Редактирование файла</div>
				<div className={styles.inps_block}>
					<label className={styles.label}>
						<span>
							Название <span className={styles.star}>*</span>
						</span>
						<input
							className={styles.inp}
							{...register('name', {
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
								[styles.isError]: errors.description,
							})}
						>
							{errors.description && errors.description?.message}
						</span>
					</label>
				</div>
				<hr className={styles.hr} />
				<label className={styles.file_label} title="Выберите файл">
					<input
						type="file"
						onInput={chooseFile}
						className={styles.file}
						{...register('file', { required: 'Файл не выбран' })}
						accept=".lic, .deb, .pdf, .txt"
					/>
					{
						<span
							role="alert"
							className={cn({
								[styles.isError]: errors.file,
							})}
						>
							{errors.file && errors.file?.message}
						</span>
					}
					<Upload className={styles.upload} />
				</label>
				<hr className={styles.hr} />
				<Button type="submit" disabled={!isValid} className={styles.button}>
					Применить
				</Button>
				<Button type="button" className={cn(styles.button, styles.button_sec)} onClick={handlerReset}>
					Отмена
				</Button>
			</form>
		</>,
		portal,
	);
}
