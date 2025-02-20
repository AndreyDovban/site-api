/**
 * Функция возврацает строку местного времени в ISO формате
 * @param {number} Время в timestamp формате
 * @returns {string}
 */
export function toISO(t) {
	let d = new Date(t * 1000);
	let f = num => {
		let str = String(num);
		if (str.length < 2) {
			return `0${str}`;
		}
		return str;
	};
	return `${f(d.getFullYear())}-${f(d.getMonth() + 1)}-${f(d.getDate())}T${f(d.getHours())}:${f(d.getMinutes())}`;
}
