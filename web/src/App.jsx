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
import MyProfile from './pages/My-Profile';
import HostProfile from './pages/HostProfile';
import CreateRequest from './pages/Create-Request';
import RequestsHost from './pages/Requests-Host';
import RequestsCompany from './pages/Requests-Company';

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
          <Route path='/MyProfile' element={<MyProfile />} />
          <Route path='/user/:id' element={<HostProfile />} />
          <Route path='/create-request' element={<CreateRequest />} />
          <Route path='/requests' element={<RequestsHost />} />
          <Route path='/received-requests' element={<RequestsCompany />} />

        </Routes>
      </main>
    </>
  )
}

export default App;
