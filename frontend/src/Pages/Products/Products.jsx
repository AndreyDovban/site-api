import styles from './Products.module.css';
import withLayout from '../../Layout/Layout';
import { getProds, deleteProd } from '../../api';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { prodsListState, noteState } from '../../store';
// import { filesListState } from '../../store';
import { ProdCart, Button, AddProdForm, Note, EditProdForm } from '../../components';

/**
 * Страница продукты
 * @returns {JSXElement}
 */

function Products() {
	// const [files, setFiles] = useRecoilState(filesListState);
	const [prods, setProds] = useRecoilState(prodsListState);
	const [note, setNote] = useRecoilState(noteState);
	const [openForm, setOpenForm] = useState(false);

	useEffect(() => {
		getProds(setProds, setNote);
	}, [setNote, setProds]);

	async function handlerDeleteProd(prodUid) {
		if (await deleteProd(prodUid, setNote)) {
			await getProds(setProds, setNote);
		}
	}

	function openFormAddProd() {
		setOpenForm(prev => !prev);
	}

	return (
		<div className={styles.block}>
			<Note note={note} setNote={setNote} />
			<Button className={styles.add} onClick={openFormAddProd}>
				Add New Product
			</Button>
			<AddProdForm isOpen={openForm} setIsOpen={openFormAddProd} />
			<EditProdForm />
			{/* <Table data={prods} /> */}
			{prods?.data?.map((el, i) => {
				return <ProdCart key={i} product={el} handlerDeleteProd={handlerDeleteProd} />;
			})}
		</div>
	);
}

export default withLayout(Products);
