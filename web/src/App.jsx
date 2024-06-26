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
import SelectQuantity from './pages/SelectQuantity';
import CheckOut from './pages/CheckOut';
import { useState } from 'react';
import { LocationContext } from './contexts/location.context';
import Thanks from './pages/Thanks';
import RegisterRole from './pages/RegisterRole';

function App() {

  const [location, setLocation] = useState(null);
  //const [ dark, setDark ] = useState(false);

  return (
    <>
      <NavBar />
      <main className=''>

      <LocationContext.Provider value={{ location, setLocation }}>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path='/register-role' element={<RegisterRole />} />
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
              <Route path='/invest/:id' element={<SelectQuantity />} />
              <Route path='/invest/:id/checkout' element={<CheckOut />} />
              <Route path='/invest/:id/thanks' element={<Thanks />} />
          </Routes>
      </LocationContext.Provider>
      </main>
    </>
  )
}

export default App;
