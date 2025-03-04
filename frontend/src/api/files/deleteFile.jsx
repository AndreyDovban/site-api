/**
 * Запрос на удаление файла
 * @param {string} fileUid Uid удаляемого продукта
 * @param {function} setNote Функция изменения состояния объекта уведомления
 * @param {Promise<true | undefined>}
 */
export async function deleteFile(fileUid, setNote) {
	try {
		let res = await fetch(`/api/file/${fileUid}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (res.ok) {
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
