import { atom } from 'recoil';

/** Атом состояния - коллчество строк ответа запроса к базе без учёта лимита и сдвига */
export const countAllRowsState = atom({
	key: 'countAllRowsState',
	default: 0,
});
