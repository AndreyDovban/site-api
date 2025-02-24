import styles from './Products.module.css';
import withLayout from '../../Layout/Layout';
// import { getprods } from '../../api';
import { getfiles } from '../../api';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
// import { prodsListState } from '../../store';
import { filesListState } from '../../store';
// import { ProdCart } from '../../components';

/**
 * Страница продукты
 * @returns {JSXElement}
 */

function Products() {
	const [prods, setProds] = useRecoilState(filesListState);

	useEffect(() => {
		getfiles(setProds);
	}, [setProds]);

	return (
		<div className={styles.block}>
			<pre>{JSON.stringify(prods, 0, 4)}</pre>
			{/* {prods.products.map((el, i) => {
				return <ProdCart key={i} Product={el} />;
			})} */}
		</div>
	);
}

export default withLayout(Products);
