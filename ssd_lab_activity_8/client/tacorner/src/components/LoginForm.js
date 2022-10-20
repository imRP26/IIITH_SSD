// import "../common.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const BACKEND_URI = "http://localhost:3005/api/";

// functional component
function LoginForm(props) {
    const [rollno, setRoll] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("TA");

    const navigate = useNavigate();

    const navigateToConcerns = () => {
        navigate('/tas/queries');
    }

    const navigateToFeedback = () => {
        navigate('/student');
    }

    return (
    <div className="center-div">
        <h1 className='text-center'>Login</h1>
        <form className='form-group'>
            <label className='m-2 form-label'>Roll No : </label>
            <br/>
            <input className='m-2 form-control' type="text" name="rollno" value={rollno} onChange={(e) => setRoll(e.target.value)}/>
            <br/>
            <label className='m-2 form-label'>Password : </label>
            <br/>
            <input className='m-2 form-control' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <br/>
            <label className='m-2 form-label'>Role : </label>
            <br/>
            <select className='m-2 form-control' name="role" onChange={(e) => setRole(e.target.value)}>
                <option value="TA">TA</option>
                <option value="Student">Student</option>
            </select>
            <br/>  
        </form>
        <button className='btn btn-primary position-relative start-50 translate-middle-x' onClick={async (e) =>  {
                const requestOptions = {
                    credentials : 'include',
                    method : 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body : JSON.stringify({ rollno : rollno, password : password, role : role })
                };

                var res = await fetch(BACKEND_URI + "login", requestOptions);
                alert((await res.json())["msg"]);
                setRoll("");
                setPassword("");
                setRole("TA")
                if(res.status == 200) {
                    sessionStorage.setItem("curr_roll", rollno);
                    sessionStorage.setItem("curr_role", role);
                    if (role=="TA")
                        navigateToConcerns();
                    else
                        navigateToFeedback();
                }
            }}>Login</button>
            <br/>
            <p className='m-4'>Do not have an account? <Link to='/signup'> Sign Up Here</Link> </p> 
    </div>);
}

export default LoginForm;