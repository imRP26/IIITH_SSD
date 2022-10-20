import { useEffect,useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const BACKEND_URI = "http://localhost:3005/";
const requestOptions = {
    credentials : 'include',
    method : 'GET',
    headers: {'Content-Type': 'application/json' }
};
const rollno = sessionStorage.getItem("curr_roll");

function User() {
    const rollno = sessionStorage.getItem("curr_roll");
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
    }

    const navigateToAdd = () => {
        navigate('/student/addQuery');
    }

    const headerStyle = {
        margin: '2% 5%',
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto auto auto',
        gap: '10px',
        alignItems: 'center'
    };

    const htext = {
        gridColumnStart: '1',
        gridColumnEnd: '5'
    }

    if(rollno == null) {
        return (<div className='text-center'>
            Please Login First. 
            <button onClick={navigateToLogin} className='btn btn-primary'> 
                Go To Login 
            </button>
        </div>)
    }

    function toggleBack(){
        
    }
    return (
        <div>
            <header style={headerStyle}>
                <h2 className='text-center' style={htext}> Feedbacks </h2>
                <button className='btn btn-primary m-3' onClick={(e) =>  {
                        navigateToAdd();
                    }}>Add New Query</button>
                <button className='btn btn-primary m-4' onClick={async (e) =>  {
                    var res = await fetch(BACKEND_URI + "api/logout", requestOptions);
                    if(res.status == 200) {
                        sessionStorage.removeItem("curr_roll");
                        navigateToLogin();
                    }
                }}>Logout</button>
            </header>
            <Outlet />
        </div>
    );
}

function Feedback(props) {

    const [ queries,setQueries ] = useState([])
    const [ isReadMore, setReadMore ] = useState(false)
    const toggleMore = () => setReadMore(!isReadMore);

    useEffect(()=>{
        fetch(BACKEND_URI + "queries/?type=student&roll="+rollno, requestOptions).then(response => {
            if (response.status != 200){
                return {}
            }
            return response.json()
        })
        .then(queries => setQueries(queries.data))
    }, [])

    return (
            <div className='text-center'>
                {queries?queries.map(element => 
                    <div className='query-item' key={element._id}>
                        <h4>Exam Name: <strong>{element.exam_name}</strong></h4>
                        <h4 style={{textAlign:"end"}}>Course Name: <strong>{element.course_name}</strong></h4>
                        <h4>Question No: <strong>{element.question_number}</strong></h4>
                        <h4 style={{textAlign:"end"}}>TA's Roll: <strong>{element.ta_roll}</strong></h4>
                        <h4>Your Comment: </h4><div className="textarea">{ (element.std_comment.length<31) ? element.std_comment : <> {isReadMore?element.std_comment:element.std_comment.substring(0,31)} <span style={{color:'blue'}} onClick={toggleMore}> {isReadMore ? "Show less" : "...Read More"}</span></>}</div>
                        <h4>TA's Response: </h4><div className="textarea">{ (element.ta_comment.length<31) ? element.ta_comment : <> {isReadMore?element.ta_comment:element.ta_comment.substring(0,31)} <span style={{color:'blue'}} onClick={toggleMore}> {isReadMore ? "Show less" : "...Read More"}</span></>}</div>
                    </div>
                ):<div className='text-center'>
                             No queries found!
                </div>}
            </div>
    );
    
}

function AddQuery() {
    // toggleBack()
    const [ tas,setTas ] = useState([])

    const navigate = useNavigate();
    const navigateToDb = () => {
        navigate('/student');
    }

    useEffect(()=>{
        fetch(BACKEND_URI + "api/", requestOptions).then(response => {
            if (response.status != 200){
                return {}
            }
            return response.json()
        })
        .then(tas => {
            setTas(tas.data)
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = {}
        let obj = new FormData(e.target)
        obj.forEach((val,key) => {
            data[key] = val;
        })
        var req = fetch(BACKEND_URI + "queries/", {
            credentials : 'include',
            method : 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        req.then(res => {
            console.log(res)
            if (res.status == 200)
                navigateToDb();
            else
                window.location.reload();
        })
    }

    return ({tas}?
        <form id="newQuery" onSubmit={handleSubmit}>
            <table><tbody>
                <tr>
                    <td><label htmlFor="exam_name"><strong>Exam Name: </strong></label></td>
                    <td><input type="text" placeholder="Which exam is it?" name="exam_name" required /></td>
                </tr>
                <tr>
                    <td><label htmlFor="course_name"><strong>Course Name: </strong></label></td>
                    <td><input type="text" placeholder="Which course is it?" name="course_name" required /></td>
                </tr>
                <tr>
                    <td><label htmlFor="question_number"><strong>Question No.:</strong></label></td>
                    <td><input type="number" placeholder="Enter Question no." name="question_number" required /></td>
                </tr>
                <tr>
                    <td><label htmlFor="ta_roll"><strong>TA's Name:</strong></label></td>
                    <td><select name="ta_roll" required>
                            {tas.map(element => 
                                <option value={element.rollno} key={element._id}>{element.rollno}</option>
                            )}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="comments"><strong>Comments:</strong></label></td>
                    <td><textarea rows="5" name="comments" /></td>
                </tr>
                <tr>
                    <td><span className="error"></span></td>
                    <td><button type="submit">Post</button></td>
                </tr>
            </tbody></table>
        </form>:<div className='text-center'>TA's need to sign up</div>
    );
}

export { User, Feedback, AddQuery };