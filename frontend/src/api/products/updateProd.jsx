/**
 * Запрос на изменение продукта
 * @param {string} Uid изменяемого объекта
 * @param {Object} data Объект с данными для изменения продукта
 * @param {function} reset Функция сброса заполненной формы
 * @param {function} setNote Функция управления состоянием обеъкта уведомления
 * @returns {boolean | void}
 */
export async function updateProd(uid, data, reset, setNote) {
	for (let key in data) {
		if (typeof data[key] === 'string') {
			data[key] = data[key].trim();
		}
	}
	try {
		let res = await fetch(`/api/product/${uid}`, {
			method: 'patch',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (res.ok) {
			reset();
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
