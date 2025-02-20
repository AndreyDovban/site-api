/** CSS модуль */
import styles from './TableOptions.module.css';
import { Checkbox } from '..';
import { useRecoilState, useRecoilValue } from 'recoil';
import { countRowsState, columnsState, directionColumnsState } from '../../store';
import labels from '../../labels.json';
import { v4 as uuid } from 'uuid';

/**
 * Компонент настройки таблицы
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function TableOptions({ ...props }) {
	const [columns, setColumns] = useRecoilState(columnsState);
	const [countRows, setCountRows] = useRecoilState(countRowsState);
	const directionColumns = useRecoilValue(directionColumnsState);

	function handleChange(e) {
		let t = e.target;
		let arr = [...columns];
		if (arr.includes(t.value)) {
			arr = arr.filter(el => el !== t.value);
		} else {
			arr.splice(directionColumns[t.value], 0, t.value);
		}

		setColumns(arr);
	}

	function changeCountRows(e) {
		setCountRows(e.target.value);
	}

	return (
		<div className={styles.block} {...props}>
			<ul className={styles.check_block}>
				{[...Object.keys(directionColumns)].map(el => {
					return (
						<li className={styles.li} key={uuid()}>
							<Checkbox
								value={el}
								checked={columns.includes(el)}
								onChange={handleChange}
								text={labels[el]}
							/>
						</li>
					);
				})}
			</ul>
			<div className={styles.range_block}>
				<div className={styles.count}>Строк на странице: {countRows}</div>
				<input
					type="range"
					className={styles.range}
					min={20}
					step={20}
					max={200}
					value={countRows}
					onChange={changeCountRows}
				/>
			</div>
		</div>
	);
}
