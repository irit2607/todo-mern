import React, {useState} from 'react'
import axios from "axios";

const TodoForm = () => {
    const [title, setTitle] = useState("");

    const submitHandler = async  (e) => {
        e.preventDefault();
        if (!title) {
            alert("Title cannot be blank")
        }
        else {
            await axios.get("/add/:work", title);
            setTitle("");
        }
    }
    return (
        <>
            <form onSubmit={submitHandler}>
                <input type="text" name="tasked" id="task" placeholder="enter" value={title} onChange={(e) => setTitle(e.target.value)} />
                <button type="submit" className="btn btn-primary mb-3">add</button>
            </form>

            {/* <% for(var tasks of data){ %> */}
            <form action='/delete' method="POST">
                <h4>
                    {/* <%= tasks.work %> */}
                </h4>
                <input name="id" value="" type="hidden" />
                <input name="comp" placeholder="update" />
                <button type="submit" class="btn btn-m btn-success" formaction="/update">Update</button>

                <button type="submit" class="btn btn-m btn-danger">Delete</button> <br />
            </form>



            <form />

        </>
    )
}

export default TodoForm
