/** Запрос за списком сохранённых клиентов*/
export async function getclients(setClientList) {
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
		res = await res.json();
		setClientList(res);
	} catch (error) {
		alert('ошибка соединение');
	}
}
