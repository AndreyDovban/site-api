import styles from './ProdCart.module.css';
import Delete from '../../assets/svg/delete.svg?react';
import Edite from '../../assets/svg/edite.svg?react';

/**
 * Компонент карточка продукта
 * @param {Object} product Объект описывающий продукт
 * @param {function} handlerDeleteProd Объект описывающий продукт
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function ProdCart({ product, handlerDeleteProd, ...props }) {
	return (
		<div className={styles.block} {...props}>
			<div className={styles.description}>
				<span className={styles.name}>{product?.name}</span>
				<hr />
				<span>{product?.description}</span>
				<span className={styles.graw}></span>
				<button className={styles.but}>
					<Edite />
				</button>
				<button className={styles.but}>
					<Delete onClick={() => handlerDeleteProd(product?.uid)} />
				</button>
			</div>
			<hr />
			<div className={styles.files}></div>
		</div>
	);
}
