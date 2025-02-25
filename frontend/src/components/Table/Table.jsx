import styles from './Table.module.css';
import { v4 as uuid } from 'uuid';

/**
 * Компонент таблица
 * @param {Object} data Данне для отрисовки таблицы
 * @param {string}
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function Table({ data, ...props }) {
	let header = [];
	let body = [];

	for (const el of data.columns) {
		header.push(
			<th key={el} className={styles.th}>
				{el}
			</th>,
		);
	}

	if (data.data) {
		for (const el of data.data) {
			if (typeof el == 'object') {
				let row = [];
				for (const key in el) {
					if (key == 'created_at' || key == 'updated_at') {
						row.push(
							<td key={key} className={styles.td}>
								{new Date(el[key]).toLocaleString()}
							</td>,
						);
						continue;
					}
					row.push(
						<td key={key} className={styles.td}>
							{el[key]}
						</td>,
					);
				}
				body.push(
					<tr key={uuid()} className={styles.tr}>
						{row}
					</tr>,
				);
			}
		}
	}

	return (
		<div className={styles.block}>
			{data?.count}
			<table className={styles.table} {...props}>
				<thead className={styles.thead}>
					<tr className={styles.tr}>{header}</tr>
				</thead>
				<tbody className={styles.body}>{body}</tbody>
			</table>
		</div>
	);
}
