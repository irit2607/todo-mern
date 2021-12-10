import React, { useState, useEffect } from 'react'
import axios from "axios";
import TodoItem from './todoItem';

const TodoForm = () => {
    const [title, setTitle] = useState("");

    const [mydata, setData] = useState([]);
    
    useEffect(() => {
        item();
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault();

        
            console.log(title);
            await axios.post(`http://localhost:8000/add/${title}`);
            console.log(title);
            setTitle("");
        
        item();
    }
    const inputChange = e =>{
        setTitle(...title, e.target.value)
    }

    const item = async () => {
        const result = await axios.get("http://localhost:8000/all");
        setData(result.data);
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <input type="text" name="tasked" id="task" placeholder="enter" value={title} onChange={(e) =>setTitle(e.target.value)} />
                <button type="submit" className="btn btn-primary mb-3">add</button>
            </form>

           {mydata.map((j) => {
               <p>{j.work}</p>
           })}

         


            
            {/* <% for(var tasks of data){ %> */}
            {/* <form action='/delete' method="POST">
                <h4> */}
                    {/* <%= tasks.work %> */}
                {/* </h4>
                <input name="id" value="" type="hidden" />
                <input name="comp" placeholder="update" />
                <button type="submit" class="btn btn-m btn-success" formaction="/update">Update</button>

                <button type="submit" class="btn btn-m btn-danger">Delete</button> <br />
            </form> */}



            <form />

        </>
    )
}

export default TodoForm
