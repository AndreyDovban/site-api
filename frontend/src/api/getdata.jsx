/**
 * Запрос на получение данных с сервера
 * @param {Array} columns Занчение атома состояния - массив названий колонок
 * @param {string} sortName Занчение атома состояния - название колонки по которой выполняется сортировка
 * @param {string} sortDirection Занчение атома состояния - напрвление сортировки
 * @param {Object} filters Занчение атома состояния - объект с фильтрами
 * @param {number} countRows Занчение атома состояния - число строк в ответе сервера
 * @param {number} numberPage Занчение атома состояния - номе текущей страницы
 * @param {function} setData Функция изменения значения атома состояния - данные для отрисовки таблицы
 * @param {function} setCountAllRows Функция изменения значения атома состояния - полное колличество строк без учёта фильтрации и сдвига
 * @returns {void}
 */
export async function getdata(
	columns,
	sortName,
	sortDirection,
	filters,
	countRows,
	numberPage,
	setData,
	setCountAllRows,
) {
	try {
		let res = await fetch('/api/getdata', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				columns: columns,
				sortName: sortName,
				sortDirection: sortDirection,
				filters: filters,
				countRows: countRows,
				numberPage: numberPage,
			}),
		});
		res = await res.json();
		setCountAllRows(res.count_rows);
		setData(res.data);
	} catch (error) {
		alert('ошибка соединение');
	}
}
