import './App.css'
import NavBar from './components/ui/NavBar/navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import RegisterCompany from './pages/Register-Company';
import Projects from './pages/Projects';
import CreateProject from './pages/Create-Project';
import ProjectDetails from './pages/Project-Details';

function App() {

  return (
    <>
      <NavBar />
      <main className=''>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/register-company' element={<RegisterCompany />} />
          <Route path='/login' element={<Login />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/create-project' element={<CreateProject />} />
          <Route path='/projects/:id' element={<ProjectDetails />} />

        </Routes>
      </main>
    </>
  )
}

export default App;
