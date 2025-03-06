import styles from './AddFileForm.module.css';
import cn from 'classnames';
import { useSetRecoilState } from 'recoil';
import { noteState } from '../../../store';
import { useForm } from 'react-hook-form';
import { Button } from '../..';
import { addFile, getFiles } from '../../../api';
import { filesListState } from '../../../store';
import { createPortal } from 'react-dom';
import Upload from '../../../assets/svg/upload.svg?react';

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
		setValue,
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
				<div>Добавление файла в продукт</div>
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
							Описание файла <span className={styles.star}>*</span>
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
				<Button className={styles.button}>Применить</Button>
				<Button type="button" className={cn(styles.button, styles.button_sec)} onClick={handlerReset}>
					Отмена
				</Button>
			</form>
		</>,
		portal,
	);
}
