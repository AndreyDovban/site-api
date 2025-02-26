/**
 * Запрос за списком продуктов и файлов к ним
 * @param {function} setProds Функция изменения состояния список продуктов
 * @param {function} setNote Функция изменения состояния объекта уведомления
 * @param {void}
 */
export async function getProds(setProds, setNote) {
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
		if (res.ok) {
			res = await res.json();
			setProds(res);
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
