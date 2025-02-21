import styles from './ProdCart.module.css';

/**
 * Компонент карточка продукта
 * @param {any} Product Объект описывающий продукт
 * @param {...any} props Неопределённое количество прараметров для работы с HTML элементами
 * @returns {JSXElement}
 */
export function ProdCart({ Product, ...props }) {
	return (
		<div className={styles.block} {...props}>
			<div className={styles.description}>
				<span className={styles.name}>{Product?.name}</span>
				<hr />
				<span>{Product?.description}</span>
			</div>
			<hr />
			<div className={styles.files}></div>
		</div>
	);
}
