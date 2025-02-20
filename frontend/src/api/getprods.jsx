/** Запрос за списком продуктов и файлов к ним*/
export async function getprods(setProdList) {
	try {
		let res = await fetch('/api/getprods');
		res = await res.json();
		setProdList(res);
	} catch (error) {
		alert('ошибка соединение');
	}
}
