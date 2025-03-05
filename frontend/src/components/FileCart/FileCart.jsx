import styles from './FileCart.module.css';
import Delete from '../../assets/svg/delete.svg?react';
import Edite from '../../assets/svg/edite.svg?react';

/**
 * Компонент карточка файла
 * @param {Object} file Объект описывающий файл
 * @param {function} handlerEditFile Функция изменения состояния - объект изменяемый файл
 * @param {function} handlerDeleteFile Функция удаления файла
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function FileCart({ file, handlerEditFile, handlerDeleteFile, ...props }) {
	return (
		<div className={styles.block} {...props}>
			<span className={styles.name}>{file?.name}</span>
			<hr />
			<span>{file?.description}</span>
			<span className={styles.graw}></span>
			<button className={styles.but} onClick={handlerEditFile}>
				<Edite />
			</button>
			<button className={styles.but}>
				<Delete onClick={handlerDeleteFile} />
			</button>
		</div>
	);
}
