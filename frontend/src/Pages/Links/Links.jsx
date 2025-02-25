import styles from './Links.module.css';
import withLayout from '../../Layout/Layout';
import { getlinks } from '../../api';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { linksListState } from '../../store';
import { Table } from '../../components';

/**
 * Страница ссылки
 * @returns {JSXElement}
 */

function Links() {
	const [links, setLinks] = useRecoilState(linksListState);

	useEffect(() => {
		getlinks(setLinks);
	}, [setLinks]);

	return (
		<div className={styles.block}>
			<Table data={links} />
			{/* <pre>{JSON.stringify(links, 0, 4)}</pre> */}
		</div>
	);
}

export default withLayout(Links);
