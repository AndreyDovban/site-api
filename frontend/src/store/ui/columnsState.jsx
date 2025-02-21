import { atom } from 'recoil';

/** Атом состояния - массив названий колонок */
export const columnsState = atom({
	key: 'columnsState',
	default: [
		'created_at',
		'valid',
		'client_mail',
		'client_name',
		'client_tel',
		'company',
		'count',
		'file_name',
		'product',
		'hash',
	],
});
