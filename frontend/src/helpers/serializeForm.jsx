/**
 * Функция сериализации объекта формы
 * @param {JSXTlemevt} formNode Форма
 * @returns {Object}
 */
export function serializeForm(formNode) {
	const { elements } = formNode;

	const data = new FormData();

	Array.from(elements)
		.filter(item => !!item.name)
		.forEach(element => {
			const { name, type } = element;
			const value = type === 'checkbox' ? element.checked : element.value;

			data.append(name, value);
		});

	return data;
}
