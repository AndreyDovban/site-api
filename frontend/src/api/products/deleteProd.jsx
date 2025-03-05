/**
 * Запрос на удаление продукта
 * @param {string} prodUid Uid удаляемого продукта
 * @param {function} setNote Функция изменения состояния объекта уведомление
 * @returns {Promise<true | undefined>}
 */
export async function deleteProd(prodUid, setNote) {
	try {
		let res = await fetch(`/api/product/${prodUid}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (res.ok) {
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
