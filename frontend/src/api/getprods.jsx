/** Запрос за списком продуктов и файлов к ним*/
export async function getprods(setProdList) {
	try {
		let res = await fetch('/api/products', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				limit: 100,
				columns: ['name', 'description', 'created_at', 'updated_at', 'uid'],
			}),
		});
		res = await res.json();
		setProdList(res);
	} catch (error) {
		alert('ошибка соединение');
	}
}
