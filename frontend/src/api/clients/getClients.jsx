/**
 * Запрос за списком сохранённых клиентов
 * @param {function} setClients Функция изменения состояни список клментов
 * @param {function} setNote Функция изменения состояния объекта уведомления
 * @returns {void}
 */
export async function getClients(setClients, setNote) {
	try {
		let res = await fetch('/api/clients', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				limit: 100,
				columns: ['name', 'telephone', 'mail', 'company', 'created_at', 'updated_at'],
			}),
		});

		if (res.ok) {
			res = await res.json();
			setClients(res);
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
