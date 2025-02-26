/**
 * Запрос на удаление продукта
 * @param {string} prodUid Uid удаляемогог продукта
 * @param {function} setNote Функция изменения состояния объекта уведомление
 * @returns {void}
 */
export async function deleteProd(prodUid, setNote) {
	try {
		let res = await fetch(`/api/product/${prodUid}`, {
			method: 'delete',
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
