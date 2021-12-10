import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Todos = () => {
    useEffect(() => {
        item();
    }, []);
    const [title,setTitle] = useState("");
    const [data, setData] = useState([]);

    const submitHandler = async(e) =>{
        e.preventDefault();
        await axios.post(`http://localhost:8000/add/${title}`);
        console.log(title);
        setTitle("");
        item();
    }

    const item = async() => {
        const result = await axios.get("http://localhost:8000/all");
        setData(result.data);
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <input type="text" name="tasked" id="task" placeholder="enter" value={title} onChange={(e) => setTitle( e.target.value) } />
                <button type="submit" className="btn btn-primary mb-3">add</button>
            </form>

            {data.map((i) => {
                <p>{i.work}</p>
            })

            }
        </>
    )
}

export default Todos
