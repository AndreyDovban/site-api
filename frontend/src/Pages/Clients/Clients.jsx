import styles from './Clients.module.css';
import withLayout from '../../Layout/Layout';
import { getClients } from '../../api';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect, useMemo } from 'react';
import { clientListState, noteState } from '../../store';
import { Table } from '../../components';

/**
 * Страница клиены
 * @returns {JSXElement}
 */

function Clients() {
	const [clients, setClients] = useRecoilState(clientListState);
	const setNote = useSetRecoilState(noteState);

	const table = useMemo(() => <Table data={clients} />, [clients]);

	useEffect(() => {
		getClients(setClients, setNote);
	}, [setClients, setNote]);

	return <div className={styles.block}>{table}</div>;
}

export default withLayout(Clients);
