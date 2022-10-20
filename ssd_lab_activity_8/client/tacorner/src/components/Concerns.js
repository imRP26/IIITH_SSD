import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect,useState } from 'react';

const BACKEND_URI = "http://localhost:3005/";
const requestOptions = {
    credentials : 'include',
    method : 'GET',
    headers: {'Content-Type': 'application/json' }
}

function Concerns(props) {

    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
    }

    const navigateToDb = () => {
        navigate('/tas/queries');
    }

    const rollno = sessionStorage.getItem("curr_roll");
    const [ queries,setQueries ] = useState([])
    const [ isReadMore, setReadMore ] = useState(false)
    const [ comment,setComment ] = useState("")

    useEffect(()=>{
        fetch(BACKEND_URI + "queries/?type=ta&roll="+rollno, requestOptions).then(response => {
            if (response.status != 200){
                return {}
            }
            return response.json()
        })
        .then(queries => setQueries(queries.data))
    }, [])

    const handleChange = useCallback( e => {
        const {name,value} = e.target;
        setComment(value);
    })

    if(rollno == null) {
        return (<div className='text-center'>
            Please Login First. 
            <button onClick={navigateToLogin} className='btn btn-primary'> 
                Go To Login 
            </button>
        </div>)
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
        gridColumnEnd: '6'
    }

    const toggleMore = () => setReadMore(!isReadMore);

    return (
    <div>
        <header style={headerStyle}>
            <h2 className='text-center' style={htext}> Students' Concerns </h2>
            <button className='btn btn-primary m-4' onClick={async (e) =>  {
                var res = await fetch(BACKEND_URI + "api/logout", requestOptions);
                if(res.status == 200) {
                    sessionStorage.removeItem("curr_roll");
                    navigateToLogin();
                }
            }}>Logout</button>
        </header>
        <div className='text-center'>
        {queries?queries.map(element => 
                <table className='ta-item' key={element._id}><tbody>
                    <tr><td><h4>Student Roll No: </h4></td><td><strong>{element.std_roll}</strong></td></tr>
                    <tr><td><h4>Course Name: </h4></td><td><strong>{element.course_name}</strong></td></tr>
                    <tr><td><h4>Question No: </h4></td><td><strong>{element.question_number}</strong></td></tr>
                    <tr><td><h4>Student's Comment: </h4></td><td><div className="textarea">{ (element.std_comment.length<31) ? element.std_comment : <> {isReadMore?element.std_comment:element.std_comment.substring(0,31)} <span style={{color:'blue'}} onClick={toggleMore}> {isReadMore ? "Show less" : "...Read More"}</span></>}</div></td></tr>
                    <tr><td><h4>Your Response: </h4></td><td><textarea rows="2" onChange={handleChange} value={element.ta_comment}/>
                        </td><td>{(element.ta_comment.length==0) ? <button onClick={async (e) =>  {
                            var res = await fetch(BACKEND_URI + "queries/"+element._id, {credentials : 'include',
                                method : 'PUT',
                                headers: {'Content-Type': 'application/json' },
                                body:JSON.stringify({"ta_comment":comment})});
                            if(res.status == 200){
                                navigateToDb();
                                e.target.style.visibility = 'hidden'
                            }
                        }}>POST</button>:<button style={{visibility:'hidden'}}>POST</button>}</td></tr>
                </tbody></table>
        ):<div className='text-center'>
                No queries found!
            </div>}
        </div>
        
    </div>);
}

export default Concerns;