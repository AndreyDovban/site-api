import styles from './Products.module.css';
import withLayout from '../../Layout/Layout';
import { getProds, deleteProd } from '../../api';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { prodsListState, noteState, confirmState, editedProdState } from '../../store';
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
	const setConfirm = useSetRecoilState(confirmState);
	const [openAddForm, setOpenAddForm] = useState(false);
	const [targetProd, setTargetProd] = useRecoilState(editedProdState);

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

	function handlerFormEditProd(prod) {
		setTargetProd(prod);
	}

	function handlerConfirmDeleted(prodUid, name) {
		setConfirm({ func: () => handlerDeleteProd(prodUid), text: `Удалить ${name}?`, isOpen: true });
	}

	const prodCarts = prods?.data?.map((el, i) => {
		return (
			<ProdCart
				key={i}
				product={el}
				handlerDeleteProd={() => handlerConfirmDeleted(el.uid, el.name)}
				handlerEditProd={() => handlerFormEditProd(el)}
			/>
		);
	});

	return (
		<div className={styles.block}>
			{/* <Note note={note} setNote={setNote} /> */}
			<Button className={styles.add} onClick={openFormAddProd}>
				Add New Product
			</Button>
			<AddProdForm isOpen={openAddForm} setIsOpen={openFormAddProd} />
			<EditProdForm targetProd={targetProd} setTargetProd={setTargetProd} />
			{/* <Table data={prods} /> */}
			{prodCarts}
		</div>
	);
}

export default withLayout(Products);
