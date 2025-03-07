/**
 * Запрос на обновление файла
 * @param {Object} fileUid Uid обновляемого файла
 * @param {Object} data Объект с данными для создания файла
 * @param {function} reset Функция сброса заполненной формы
 * @param {function} setNote Функция управления состоянием обеъкта уведомления
 * @param {Promise<true | undefined>}
 */
export async function updateFile(fileUid, data, reset, setNote) {
	const form = new FormData();

	// console.log('DATA', data);

	for (let key in data) {
		if (typeof data[key] === 'string') {
			data[key] = data[key].trim();
		}

		if (key === 'file') {
			// console.log('1 Key "file" is exist');

			if (data['file']) {
				// console.log('1.1 Object "file" not null', data['file']);
				// console.log('1.2 Length', data['file'].length);
				// console.log('2 ');
				form.append('file', data['file'][0]);
			} else {
				// console.log('3 Object "file" is null');
				delete data['file'];
			}
		} else {
			form.append(key, data[key]);
		}
	}

	// console.log('DATA2', data);

	try {
		let res = await fetch(`/api/file/${fileUid}`, {
			method: 'PATCH',
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
