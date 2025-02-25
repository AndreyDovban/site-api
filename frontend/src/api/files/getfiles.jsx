/** Запрос за списком файлов и соответствующих продуктов */
export async function getfiles(setProdList) {
	try {
		let res = await fetch('/api/files', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				limit: 100,
				columns: ['name', 'description', 'product_name', 'created_at', 'updated_at', 'product_uid'],
			}),
		});
		res = await res.json();
		setProdList(res);
	} catch (error) {
		alert('ошибка соединения');
	}
}
