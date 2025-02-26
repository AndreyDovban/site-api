import styles from './Products.module.css';
import withLayout from '../../Layout/Layout';
import { getProds, deleteProd } from '../../api';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { prodsListState, noteState } from '../../store';
// import { filesListState } from '../../store';
import { ProdCart, Button, AddProdForm, Note } from '../../components';

/**
 * Страница продукты
 * @returns {JSXElement}
 */

function Products() {
	// const [files, setFiles] = useRecoilState(filesListState);
	const [prods, setProds] = useRecoilState(prodsListState);
	const [note, setNote] = useRecoilState(noteState);

	useEffect(() => {
		getProds(setProds, setNote);
	}, [setNote, setProds]);

	async function handlerDeleteProd(prodUid) {
		if (await deleteProd(prodUid, setNote)) {
			await getProds(setProds, setNote);
		}
	}

	function openFormAddProd() {}

	return (
		<div className={styles.block}>
			<Note note={note} setNote={setNote} />
			<Button className={styles.add} onClick={openFormAddProd}>
				Add New Product
			</Button>
			<AddProdForm />
			{/* <Table data={prods} /> */}
			{prods?.data?.map((el, i) => {
				return <ProdCart key={i} product={el} handlerDeleteProd={handlerDeleteProd} />;
			})}
		</div>
	);
}

export default withLayout(Products);
