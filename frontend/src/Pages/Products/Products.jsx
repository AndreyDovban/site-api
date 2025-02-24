import styles from './Products.module.css';
import withLayout from '../../Layout/Layout';
// import { getprods } from '../../api';
import { getfiles } from '../../api';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
// import { prodsListState } from '../../store';
import { filesListState } from '../../store';
// import { ProdCart } from '../../components';
import { Table } from '../../components';

/**
 * Страница продукты
 * @returns {JSXElement}
 */

function Products() {
	const [files, setFiles] = useRecoilState(filesListState);

	useEffect(() => {
		getfiles(setFiles);
	}, [setFiles]);

	return (
		<div className={styles.block}>
			<Table data={files} />
			{/* {prods.products.map((el, i) => {
				return <ProdCart key={i} Product={el} />;
			})} */}
		</div>
	);
}

export default withLayout(Products);
