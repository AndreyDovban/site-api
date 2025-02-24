import styles from './Clients.module.css';
import withLayout from '../../Layout/Layout';
import { getclients } from '../../api';
import { useRecoilState } from 'recoil';
import { useEffect, useMemo } from 'react';
import { clientListState } from '../../store';
import { Table } from '../../components';

/**
 * Страница клиены
 * @returns {JSXElement}
 */

function Clients() {
	const [clients, setClients] = useRecoilState(clientListState);

	const table = useMemo(() => <Table data={clients} />, [clients]);

	useEffect(() => {
		getclients(setClients);
	}, [setClients]);

	return <div className={styles.block}>{table}</div>;
}

export default withLayout(Clients);
