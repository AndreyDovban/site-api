import styles from './Links.module.css';
import withLayout from '../../Layout/Layout';
import { getLinks } from '../../api';
import { useRecoilState } from 'recoil';
import { useEffect, useMemo } from 'react';
import { linksListState, noteState } from '../../store';
import { Table, Note } from '../../components';

/**
 * Страница ссылки
 * @returns {JSXElement}
 */

function Links() {
	const [links, setLinks] = useRecoilState(linksListState);
	const [note, setNote] = useRecoilState(noteState);

	const table = useMemo(() => <Table data={links} />, [links]);

	useEffect(() => {
		getLinks(setLinks, setNote);
	}, [setNote, setLinks]);

	return (
		<div className={styles.block}>
			{table}
			<Note note={note} setNote={setNote} />
		</div>
	);
}

export default withLayout(Links);
