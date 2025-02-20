/** Запрос на проверку состояния сервера */
export async function checkheals() {
	try {
		let res = await fetch('/api/checkhealth');
		res = await res.text();
		alert(res);
	} catch (error) {
		alert('ошибка соединение');
	}
}
