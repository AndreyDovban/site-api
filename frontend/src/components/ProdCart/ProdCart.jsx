import styles from './ProdCart.module.css';
import Delete from '../../assets/svg/delete.svg?react';
import Edite from '../../assets/svg/edite.svg?react';

/**
 * Компонент карточка продукта
 * @param {Object} product Объект описывающий продукт
 * @param {Array} files Массив объектов файлов
 * @param {function} handlerDeleteProd Функция цдаления продукта
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
				<button className={styles.but} onClick={handlerEditProd}>
					<Edite />
				</button>
				<button className={styles.but}>
					<Delete onClick={handlerDeleteProd} />
				</button>
			</div>
			<hr />
			<button className={styles.add_file} onClick={handlerAddFile}>
				Добавить файл
			</button>
			{children.length ? <div className={styles.files}>{children}</div> : null}
		</div>
	);
}
