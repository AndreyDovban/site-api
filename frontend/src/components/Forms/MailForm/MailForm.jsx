import styles from './MailForm.module.css';
import cn from 'classnames';
import { getProds } from '../../../api';
import { useRecoilState } from 'recoil';
import { choosedProdsState, prodsListState, noteState } from '../../../store';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Note } from '../..';
import { v4 as uuid } from 'uuid';

export function MailForm() {
	const [choosedProds, setChoosedProds] = useRecoilState(choosedProdsState);
	const [prods, setProds] = useRecoilState(prodsListState);
	const [note, setNote] = useRecoilState(noteState);

	useEffect(() => {
		getProds(setProds, setNote);
	}, [setProds, setNote]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ mode: 'all' });

	function handleChange(e) {
		let t = e.target.value;
		let arr = [...choosedProds];
		if (arr.includes(t)) {
			arr = arr.filter(el => el !== t);
		} else {
			arr.push(t);
		}
		setChoosedProds(arr);
	}

	async function onSubmit(data) {
		for (let key in data) {
			if (typeof data[key] === 'string') {
				data[key] = data[key].trim();
			}
		}

		data.product_uids = choosedProds;

		try {
			let res = await fetch('/api/mail', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			if (res.status === 200) {
				let mes = await res.json();
				reset();
				setNote({
					text: mes,
					isOpen: true,
					isSuccessful: true,
				});
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
			console.log(error);
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
						Имя <span className={styles.star}>*</span>
					</span>
					<input
						className={styles.inp}
						defaultValue={'jon'}
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
					Телефон
					<input
						className={styles.inp}
						defaultValue={'98002000888'}
						{...register('telephone', {
							maxLength: {
								value: 20,
								message: 'Превышено колличество символов 20',
							},
							pattern: {
								value: /\d+/i,
								message: 'Некорректное значение',
							},
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
						Электронная почта <span className={styles.star}>*</span>
					</span>
					<input
						type="mail"
						className={styles.inp}
						defaultValue={'dovban@mdis.ru'}
						{...register('mail', {
							required: 'Поле не заполнено',
							maxLength: {
								value: 30,
								message: 'Превышено колличество символов 30',
							},
							pattern: {
								value: /.+@.+\..+/i,
								message: 'Не действительный email',
							},
						})}
					/>
					<span
						role="alert"
						className={cn(styles.error, {
							[styles.isError]: errors.mail,
						})}
					>
						{errors.mail && errors.mail?.message}
					</span>
				</label>
				<label className={styles.label}>
					<span>
						Компания <span className={styles.star}>*</span>
					</span>
					<input
						className={styles.inp}
						defaultValue={'Mids'}
						{...register('company', {
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
							[styles.isError]: errors.company,
						})}
					>
						{errors.company && errors.company?.message}
					</span>
				</label>
			</div>
			<hr className={styles.hr} />
			<div className={styles.check_block}>
				{[...prods.data].map(el => {
					return (
						<label key={uuid()} className={styles.item}>
							<input
								type="checkbox"
								value={el.uid}
								className={styles.checkbox}
								checked={choosedProds.includes(el.uid)}
								onChange={handleChange}
							/>
							{el.name}
						</label>
					);
				})}
			</div>
			<hr className={styles.hr} />
			<Button className={styles.but} disabled={!choosedProds.length}>
				Отправить
			</Button>
			<Note note={note} setNote={setNote} />
		</form>
	);
}
