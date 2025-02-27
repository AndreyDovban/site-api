import styles from './Links.module.css';
import withLayout from '../../Layout/Layout';
import { getLinks } from '../../api';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect, useMemo } from 'react';
import { linksListState, noteState } from '../../store';
import { Table } from '../../components';

/**
 * Страница ссылки
 * @returns {JSXElement}
 */

function Links() {
	const [links, setLinks] = useRecoilState(linksListState);
	const setNote = useSetRecoilState(noteState);

	const table = useMemo(() => <Table data={links} />, [links]);

	useEffect(() => {
		getLinks(setLinks, setNote);
	}, [setNote, setLinks]);

	return <div className={styles.block}>{table}</div>;
}

export default withLayout(Links);
