/** Запрос за списком ссылок */
export async function getlinks(setLinksList) {
	try {
		let res = await fetch('/api/links', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				limit: 100,
				columns: [
					'uid',
					'hash',
					'valid',
					'count',
					'product_name',
					'file_name',
					'client_name',
					'created_at',
					'updated_at',
				],
			}),
		});
		res = await res.json();
		setLinksList(res);
	} catch (error) {
		alert('ошибка соединения');
	}
}
