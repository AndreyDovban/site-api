/**
 * Запрос на обновление файла
 * @param {Object} fileUid Uid обновляемого файла
 * @param {Object} data Объект с данными для создания файла
 * @param {function} reset Функция сброса заполненной формы
 * @param {function} setNote Функция управления состоянием обеъкта уведомления
 * @param {Promise<true | undefined>}
 */
export async function updateFile(fileUid, data, reset, setNote) {
	for (let key in data) {
		if (typeof data[key] === 'string') {
			data[key] = data[key].trim();
		}
	}
	try {
		let res = await fetch(`/api/file/${fileUid}`, {
			method: 'PATCH',
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
