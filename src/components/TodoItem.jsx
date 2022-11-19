import React, { useState } from 'react';
import dayjs from 'dayjs';
import { database } from '../firebase';
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import EditModal from './EditModal';
require('dayjs/locale/ru');

function TodoItem({ todo }) {
	const todosCollection = collection(database, 'todos');
	const todoRef = doc(todosCollection, todo.id);
  const [visible, setVisible] = useState(false);

	const deleteTodo = async () => {
		await deleteDoc(todoRef);
	};
	const completeTodo = async () => {
		await updateDoc(todoRef, { status: true });
	};

  const openModal = async () => {
    setVisible(true);
  }

	return (
		<>
			<li className={`${todo.status && 'completed'} list-item flex cols  rounded gap-2 shadow-sm mb-24`}>
				<div>
					<h2>{todo.title}</h2>
					<p>{todo.description}</p>
					{todo.date 
          ? (<p className='description'>Сделать до:{' '}<b>{dayjs(todo.date).locale('ru').format('D MMMM, dddd')}</b></p>) 
          : null}
					{todo.image 
          ? <img src={todo.image} alt={todo.title} /> 
          : null}
				</div>
				<div className='flex gap-2'>
					<div onClick={openModal} className='btn flex jcc vcenter'>🖊️</div>
					{!todo.status 
          ? (<div onClick={completeTodo} className='btn flex jcc vcenter'>✔️</div>) 
          : null}
					<div onClick={deleteTodo} className='btn flex jcc vcenter'>❌</div>
				</div>
			</li>
			<EditModal todo={todo} visible={visible} setVisible={setVisible} />
		</>
	);
}

export default TodoItem;
