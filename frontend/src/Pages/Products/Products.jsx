import styles from './Products.module.css';
import withLayout from '../../Layout/Layout';
// import { getprods } from '../../api';
// import { getfiles } from '../../api';
import { getprods, deleteprod } from '../../api';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { prodsListState, noteState } from '../../store';
// import { filesListState } from '../../store';
import { ProdCart, Button, AddProdForm, Note } from '../../components';
// import { Table } from '../../components';

/**
 * Страница продукты
 * @returns {JSXElement}
 */

function Products() {
	// const [files, setFiles] = useRecoilState(filesListState);
	const [prods, setProds] = useRecoilState(prodsListState);
	const [note, setNote] = useRecoilState(noteState);

	useEffect(() => {
		getprods()
			.then(res => {
				console.log(res);
				setProds(res);
			})
			.catch(err => {
				console.log(err);
				setNote({
					text: err,
					isSuccessful: false,
					isOpen: true,
				});
			});
	}, [setNote, setProds]);

	function handlerDeleteProd(prodUid) {
		deleteprod(prodUid)
			.then(res => {
				console.log(res);
				getprods()
					.then(res => {
						console.log(res);
						setProds(res);
					})
					.catch(err => {
						console.log(err);
						setNote({
							text: err,
							isSuccessful: false,
							isOpen: true,
						});
					});
			})
			.catch(err => {
				console.log(err);
				setNote({
					text: err,
					isSuccessful: false,
					isOpen: true,
				});
			});
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
			{prods.data.map((el, i) => {
				return <ProdCart key={i} product={el} handlerDeleteProd={handlerDeleteProd} />;
			})}
		</div>
	);
}

export default withLayout(Products);
