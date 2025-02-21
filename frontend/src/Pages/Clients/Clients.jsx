import styles from './Clients.module.css';
import withLayout from '../../Layout/Layout';
import { getclients } from '../../api';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { clientListState } from '../../store';

/**
 * Страница клиены
 * @returns {JSXElement}
 */

function Clients() {
	const [clients, setClients] = useRecoilState(clientListState);

	useEffect(() => {
		getclients(setClients);
	}, [setClients]);

	return (
		<div className={styles.block}>
			<pre>{JSON.stringify(clients, 0, 4)}</pre>
		</div>
	);
}

export default withLayout(Clients);
