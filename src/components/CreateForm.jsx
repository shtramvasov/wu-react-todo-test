import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { database, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

function CreateForm() {
	const initialState = {
		title: '',
		description: '',
		date: '',
		image: null,
    status: false
	};
	const todosCollection = collection(database, 'todos');

	const [data, setData] = useState(initialState);
  const [file, setFile] = useState(null);
	const { title, description, date, image } = data;

  useEffect(() => {
    const uploadToStorage = () => {
			const imageName = file.name + v4();
			const imageRef = ref(storage, imageName);

			uploadBytes(imageRef, file)
			.then(() => {
				getDownloadURL(imageRef)
        .then(url => setData(prev => ({...prev, image: url})))})
		}
    file && uploadToStorage()
  }, [file])

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  
  const reset = () => {
    setData(initialState);
    setFile(null);
  }

	const createTodo = async (e) => {
		e.preventDefault();
    await addDoc(todosCollection, data);
    reset()
	};

	return (
		<form
			onSubmit={createTodo}
			className='container flex self-center rounded shadow-xl gap-2 jcc mb-48'>
			<input
				type='text'
				name='title'
				value={title}
				onChange={handleChange}
				placeholder='Заголовок'
			/>
			<input
				type='text'
				name='description'
				value={description}
				onChange={handleChange}
				placeholder='Описание'
			/>
			<input type='date' name='date' value={date} onChange={handleChange} />
			<input
				type='file'
				onChange={(e) => setFile(e.target.files[0])}
				accept='.png, .jpg, .jpeg, .svg'
			/>
			<button type='submit'>Добавить запись</button>
		</form>
	);
}

export default CreateForm;
