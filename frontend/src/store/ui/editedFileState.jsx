import { atom } from 'recoil';

/** Атом состояния - объект изменяемый файл */
export const editedFileState = atom({
	key: 'editedFileState',
	default: { prodUid: '' },
});
