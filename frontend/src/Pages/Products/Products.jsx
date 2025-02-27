import styles from './Products.module.css';
import withLayout from '../../Layout/Layout';
import { getProds, deleteProd } from '../../api';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { prodsListState, noteState } from '../../store';
// import { filesListState } from '../../store';
import { ProdCart, Button, AddProdForm, EditProdForm } from '../../components';

/**
 * Страница продукты
 * @returns {JSXElement}
 */

function Products() {
	// const [files, setFiles] = useRecoilState(filesListState);
	const [prods, setProds] = useRecoilState(prodsListState);
	const setNote = useSetRecoilState(noteState);
	const [openAddForm, setOpenAddForm] = useState(false);
	const [openEditForm, setOpenEditForm] = useState(false);

	useEffect(() => {
		getProds(setProds, setNote);
	}, [setNote, setProds]);

	async function handlerDeleteProd(prodUid) {
		if (await deleteProd(prodUid, setNote)) {
			await getProds(setProds, setNote);
		}
	}

	function openFormAddProd() {
		setOpenAddForm(prev => !prev);
	}

	function openFormEditProd() {
		setOpenEditForm(prev => !prev);
	}

	const prodCarts = prods?.data?.map((el, i) => {
		return (
			<ProdCart key={i} product={el} handlerDeleteProd={handlerDeleteProd} openFormEditProd={openFormEditProd} />
		);
	});

	return (
		<div className={styles.block}>
			{/* <Note note={note} setNote={setNote} /> */}
			<Button className={styles.add} onClick={openFormAddProd}>
				Add New Product
			</Button>
			<AddProdForm isOpen={openAddForm} setIsOpen={openFormAddProd} />
			<EditProdForm uid={''} isOpen={openEditForm} setIsOpen={openFormEditProd} />
			{/* <Table data={prods} /> */}
			{prodCarts}
		</div>
	);
}

export default withLayout(Products);
