/** Запрос на удаление продукта */
export async function deleteprod(prodUid) {
	console.log(prodUid);

	try {
		let res = await fetch(`/api/product/${prodUid}`, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		res = await res.json();
		return res;
	} catch (error) {
		return error;
	}
}
