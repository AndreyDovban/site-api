import styles from './ProdCart.module.css';
import Delete from '../../assets/svg/delete.svg?react';
import Edite from '../../assets/svg/edite.svg?react';
import AddFile from '../../assets/svg/add-file.svg?react';

/**
 * Компонент карточка продукта
 * @param {Object} product Объект описывающий продукт
 * @param {Array} files Массив объектов файлов
 * @param {function} handlerDeleteProd Функция удаления продукта
 * @param {function} handlerAddFile Функция изменения состояния - объект изменяемый файл
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function ProdCart({ product, handlerDeleteProd, handlerEditProd, handlerAddFile, children, ...props }) {
	return (
		<div className={styles.block} {...props}>
			<div className={styles.description}>
				<span className={styles.name}>{product?.name}</span>
				<hr />
				<span>{product?.description}</span>
				<span className={styles.graw}></span>
				<button className={styles.but} title="Редактировать продукт" onClick={handlerEditProd}>
					<Edite />
				</button>
				<button className={styles.but} title="Добавить файл" onClick={handlerAddFile}>
					<AddFile />
				</button>
				<button className={styles.but} title="Удалить продукт" onClick={handlerDeleteProd}>
					<Delete />
				</button>
			</div>
			<hr />

			{children.length ? <div className={styles.files}>{children}</div> : null}
		</div>
	);
}
