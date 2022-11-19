import React, { useState } from 'react'
import { database } from '../firebase'
import { updateDoc, collection, doc } from 'firebase/firestore'


function EditModal({ todo, visible, setVisible }) {
  const todosCollection = collection(database, 'todos');
  const todoRef = doc(todosCollection, todo.id);
  const [data, setData] = useState(todo);
  const { title, description } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    await updateDoc(todoRef, { title: title, description: description });
    setVisible(false);
  }

	return (
		<div className={`${visible && 'visible'} modal`}>
			<div className='modal__content flex cols gap-2 rounded'>
				<label className='flex cols gap-1' htmlFor='title'>
					Изменить заголовок
					<input
						type='text'
						name='title'
						value={title}
						onChange={handleChange}
					/>
				</label>
				<label className='flex cols gap-1' htmlFor='description'>
					Изменить описание
					<input
						type='text'
						name='description'
						value={description}
						onChange={handleChange}
					/>
				</label>
				<button onClick={submitEdit}>Сохранить изменения</button>
			</div>
		</div>
	);
}

export default EditModal;
