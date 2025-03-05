import styles from './Products.module.css';
import withLayout from '../../Layout/Layout';
import { getProds, deleteProd, getFiles, deleteFile } from '../../api';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { prodsListState, filesListState, noteState, confirmState, targetProdState, targetFileState } from '../../store';
import AddProd from '../../assets/svg/add-package.svg?react';
import { ProdCart, AddProdForm, EditProdForm, FileCart, AddFileForm, EditFileForm } from '../../components';

/**
 * Страница продукты
 * @returns {JSXElement}
 */

function Products() {
	// const [files, setFiles] = useRecoilState(filesListState);
	const [prods, setProds] = useRecoilState(prodsListState);
	const [files, setFiles] = useRecoilState(filesListState);
	const setNote = useSetRecoilState(noteState);
	const setConfirm = useSetRecoilState(confirmState);
	const [openAddForm, setOpenAddForm] = useState(false);
	const [targetProd, setTargetProd] = useRecoilState(targetProdState);
	const [targetFile, setTargetFile] = useRecoilState(targetFileState);

	useEffect(() => {
		getProds(setProds, setNote);
		getFiles(setFiles, setNote);
	}, [setNote, setFiles, setProds]);

	async function handlerDeleteProd(prodUid) {
		if (await deleteProd(prodUid, setNote)) {
			await getProds(setProds, setNote);
		}
	}

	async function handlerDeleteFile(fileUid) {
		if (await deleteFile(fileUid, setNote)) {
			await getFiles(setFiles, setNote);
		}
	}

	function openFormAddProd() {
		setOpenAddForm(prev => !prev);
	}

	function handlerChooseProdForAddFile(prodUid) {
		setTargetFile({ prodUid: prodUid });
	}

	function handlerFormEditProd(prod) {
		setTargetProd(prod);
	}

	function handlerFormEditFile(file) {
		setTargetFile(file);
	}

	function handlerConfirmDeletedProd(prodUid, name) {
		setConfirm({ func: () => handlerDeleteProd(prodUid), text: `Удалить ${name}?`, isOpen: true });
	}

	function handlerConfirmDeleteFile(prodUid, name) {
		setConfirm({ func: () => handlerDeleteFile(prodUid), text: `Удалить ${name}?`, isOpen: true });
	}

	const prodCarts = prods?.data?.map((el, i) => {
		let filesObjects = [];
		for (let elem of files.data) {
			if (el.uid == elem.product_uid) {
				filesObjects.push(elem);
			}
		}
		return (
			<ProdCart
				key={i}
				product={el}
				files={filesObjects}
				handlerDeleteProd={() => handlerConfirmDeletedProd(el.uid, el.name)}
				handlerEditProd={() => handlerFormEditProd(el)}
				handlerAddFile={() => handlerChooseProdForAddFile(el.uid)}
			>
				{filesObjects.map((elem, i) => {
					return (
						<FileCart
							key={i}
							file={elem}
							handlerEditFile={() => handlerFormEditFile(elem)}
							handlerDeleteFile={() => handlerConfirmDeleteFile(elem.uid, elem.name)}
						/>
					);
				})}
			</ProdCart>
		);
	});

	return (
		<div className={styles.block}>
			<button title="Создать продукт" className={styles.but} onClick={openFormAddProd}>
				<AddProd />
			</button>
			<AddProdForm isOpen={openAddForm} setIsOpen={openFormAddProd} />
			<EditProdForm targetProd={targetProd} setTargetProd={setTargetProd} />
			<AddFileForm targetFile={targetFile} setTargetFile={setTargetFile} />
			<EditFileForm targetFile={targetFile} setTargetFile={setTargetFile} />
			{prodCarts}
		</div>
	);
}

export default withLayout(Products);
