/**
 * Запрос на добавление файла к продукту
 * @param {Object} prodUid Uid продукта к которому добавляется файл
 * @param {Object} data Объект с данными для создания файла
 * @param {function} reset Функция сброса заполненной формы
 * @param {function} setNote Функция управления состоянием обеъкта уведомления
 * @param {Promise<true | undefined>}
 */
export async function addFile(prodUid, data, reset, setNote) {
	data['product_uid'] = prodUid;

	const form = new FormData();

	for (let key in data) {
		if (typeof data[key] === 'string') {
			data[key] = data[key].trim();
		}

		if (key === 'file' && data[key]) {
			form.append('file', data[key][0]);
		} else {
			form.append(key, data[key]);
		}
	}

	try {
		let res = await fetch('/api/file', {
			method: 'POST',
			headers: {
				'Enc-Type': 'multipart/form-data',
			},
			body: form,
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
