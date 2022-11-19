import React from 'react'
import CreateForm from './components/CreateForm';
import TodoList from './components/TodoList'

function App() {
	return (
		<section className='app-wrapper'>
			<h1 className='center'>Заметки</h1>
      <CreateForm />
      <TodoList />
		</section>
	);
}

export default App;
