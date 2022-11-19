import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import TodoItem from './TodoItem';

function TodoList() {
	const todosCollection = collection(database, 'todos');
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		const getTodos = async () => {
			const response = await getDocs(todosCollection);
			setTodos(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getTodos();
	}, [todosCollection]);

	return (
    <ul className='container flex self-center rounded shadow-xl gap-2 jcc'>
			{todos.map((todo) => (
				<TodoItem todo={todo} key={todo.id} />
			))}
		</ul>
	);
}

export default TodoList