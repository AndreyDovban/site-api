/**
 * Запрос за списком файлов
 * @param {function} setFiles Функция изменения состояния список файлов
 * @param {function} setNote Функция изменения состояния объекта уведомления
 * @param {Promise<void>}
 */
export async function getFiles(setFiles, setNote) {
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
		if (res.ok) {
			res = await res.json();
			setFiles(res);
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
