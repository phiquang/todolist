import NewTask from './components/newTasks';
import ListTasks from './components/listTasks';
import './App.scss';

function App() {
  return (
    <div className="wrapper-container">
      <NewTask />
      <ListTasks />
    </div>
  );
}

export default App;
