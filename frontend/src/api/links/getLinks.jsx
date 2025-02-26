/**
 * Запрос за списком ссылок
 * @param {*} setLinks Функци изменения состояния список ссылок
 * @param {*} setNote  Функция изменения состояния объекта уведомления
 * @param {void}
 */
export async function getLinks(setLinks, setNote) {
	try {
		let res = await fetch('/api/links', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				limit: 5000,
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
		if (res.ok) {
			res = await res.json();
			setLinks(res);
		} else {
			let text = await res.text();
			let mes = res.statusText + ', ' + res.status + (text ? ', ' + text : '');
			setNote({
				text: mes,
				isSuccessful: false,
				isOpen: true,
			});
		}
	} catch (err) {
		setNote({
			text: err.message,
			isSuccessful: false,
			isOpen: true,
		});
	}
}
