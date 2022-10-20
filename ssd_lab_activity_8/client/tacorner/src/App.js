import './App.css';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { User, Feedback, AddQuery } from './components/Feedback';
import Concerns from './components/Concerns';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LoginForm />}/>
          <Route path="signup" element={<SignUpForm />}/>
          <Route path="login" element={<LoginForm />}/>
          <Route path="student" element={<User />}>
            <Route index element={<Feedback />}/>
            <Route path='addQuery' element={<AddQuery />}/>
            <Route path='*' element={<Feedback />}/>
          </Route>
          <Route path="tas/queries" element={<Concerns />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
