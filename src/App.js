import styles from './App.module.css';
import { useState } from 'react';

export const App = () => {
	const [value, setValue] = useState('');
	const [error, setError] = useState('');
	const [list, setList] = useState([]);
	const [isValueValid, setIsValueValid] = useState(false);

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение');
		if (promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
		} else {
			setValue(promptValue);
			setError('');
			setIsValueValid(true);
		}
	};

	const onAddButtonClick = () => {
		if (value) {
			const date = new Date();
			const addedAt = `${date.toString().slice(8, 10)}.${date.getMonth() + 1}.${date.getFullYear()} ${date.toString().slice(16, 24)}`;
			const newItem = { id: Date.now(), value: value, addedAt: addedAt };
			setList([...list, newItem]);
			console.log(`|+|Added: ${JSON.stringify(newItem)}`);
			setValue('');
			setError('');
			setIsValueValid(false);
		}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles.pageHeading}>Ввод значения</h1>
			<p className={styles.noMarginText}>
				Текущее значение <code>value</code>: "
				<output className={styles.currentValue}>{value}</output>"
			</p>

			{error && <div className={styles.error}>{error}</div>}

			<div className={styles.buttonsContainer}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					disabled={!isValueValid}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles.listContainer}>
				<h2 className={styles.listHeading}>Список:</h2>
				{!list.length ? (
					<p className={styles.noMarginText}>Нет добавленных элементов</p>
				) : (
					<ul className={styles.list}>
						{list.map(({ id, value }) => (
							<li className={styles.item} key={id}>
								{value}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
