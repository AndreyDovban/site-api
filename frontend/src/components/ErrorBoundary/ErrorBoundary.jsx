import { Component } from 'react';
import styles from './ErrorBoundary.module.css';

/** Компонент - перехватчих ошибок */
export class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		// Обновить состояние с тем, чтобы следующий рендер показал запасной UI.

		return { hasError: true };
	}

	componentDidCatch(error, info) {
		// Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
		// logErrorToMyService(error, errorInfo);
		// console.log(error, info.componentStack);
	}

	render() {
		if (this.state.hasError) {
			// Можно отрендерить запасной UI произвольного вида
			return (
				<div className={styles.block}>
					<h2>Что-то пошло не так!</h2>
				</div>
			);
		}

		return this.props.children;
	}
}
