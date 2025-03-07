/**
 * Запрос на добавление продукта
 * @param {string} prodUid
 * @param {function} reset Функция сброса заполненной формы
 * @param {function} setNote Функция управления состоянием обеъкта уведомления
 * @param {Promise<true | undefined>}
 */
export async function addProd(data, reset, setNote) {
	for (let key in data) {
		if (typeof data[key] === 'string') {
			data[key] = data[key].trim();
		}
	}
	try {
		let res = await fetch('/api/product', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (res.ok) {
			reset();
			let text = await res.json();
			let mes = res.statusText + ', ' + res.status + (text ? ', ' + text : '');
			setNote({
				text: mes,
				isSuccessful: true,
				isOpen: true,
			});
			return true;
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
