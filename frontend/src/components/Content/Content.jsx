/** CSS модуль */
import styles from './Content.module.css';
/** Метод динамического управления классами */
// import cn from 'classnames';
/** Иконка стрелка */
// import Arrow from '../../assets/svg/corner.svg?react';
/** Хук эффекта */
// import { useEffect } from 'react';
/**
 * Компонент - форма
 * Компонент - таблица
 * Компонент - настройки таблицы
 * Компонент - пагинация
 * Компонент - блок изменения базы
 */
// import { Form, Table, TableOptions, Pagination, EditBase } from '..';

/**
 * Компонент с контентом главной страницы
 * @returns {JSXElement}
 */
export function Content() {
	/** Обрабоитчик скрытия/показа меню */
	// function openMenu(e) {
	// 	e.stopPropagation();
	// 	let t = e.currentTarget;
	// 	t.nextSibling.classList.toggle(styles.scale);
	// 	t.nextSibling.nextSibling.classList.toggle(styles.scale);
	// 	t.classList.toggle(styles.menu_icon_open);
	// }

	// useEffect(() => {
	// 	let menu = document.querySelector(`.${styles.menu}`); // Получаем основной блок
	// 	let resize = document.querySelector(`.${styles.resize}`); // Получаем блок для изменения размеров

	// 	let delta_w = 0; // Изменение по ширине

	// 	document.onmouseup = clearXY; // Ставим обработку на отпускание кнопки мыши
	// 	resize.onmousedown = saveWH; // Ставим обработку на нажатие кнопки мыши

	// 	function saveWH(e) {
	// 		menu.classList.remove(styles.trans);
	// 		let w_menu = menu.clientWidth; // Текущая ширина блока
	// 		delta_w = w_menu - e.pageX; // Измеряем текущую разницу между шириной и x-координатой мыши

	// 		document.onmousemove = resizeBlock;
	// 	}
	// 	/* Функция для измерения ширины окна */
	// 	function clientWidth() {
	// 		return document.documentElement.clientWidth == 0
	// 			? document.body.clientWidth
	// 			: document.documentElement.clientWidth;
	// 	}

	// 	/* При отпускании кнопки мыши отключаем обработку движения курсора мыши */
	// 	function clearXY() {
	// 		menu.classList.add(styles.trans);
	// 		document.onmousemove = null;
	// 	}

	// 	/* Функция для изменения ширины окна */
	// 	function resizeBlock(e) {
	// 		let new_menu_w = delta_w + e.pageX; // Изменяем новое приращение по ширине
	// 		menu.style.width = new_menu_w + 'px'; // Устанавливаем новую ширину блока
	// 		/* Если блок выходит за пределы экрана, то устанавливаем максимальные значения для ширины и высоты */
	// 		if (menu.offsetLeft + menu.clientWidth > clientWidth()) {
	// 			menu.style.width = clientWidth() - menu.offsetLeft + 'px';
	// 		}
	// 	}
	// }, []);

	return (
		<div className={styles.block}>
			{/* <div className={styles.left_panel}>
				<div onClick={openMenu} className={cn(styles.menuicon, styles.menu_icon_open)}>
					<Arrow className={styles.menu_icon} />
				</div>
				<div className={cn(styles.menu, styles.trans)}>
					<Form />
					<hr />
					<EditBase />
					<hr />
					<TableOptions />
				</div>
				<div className={styles.resize}></div>
			</div>
			<div className={styles.right_panel}>
				<Pagination />
				<Table />
			</div> */}
		</div>
	);
}
