import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Todos = () => {
    useEffect(() => {
        item();
    }, []);
    const [title, setTitle] = useState("");
    const [updated, setUpdated] = useState("");
    const [data, setData] = useState([]);
    var xyz = [];

    const submitHandler = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:8000/add/${title}`);
        console.log(title);
        setTitle("");
        item();
    }

    const item = async () => {
        const result = await axios.get("http://localhost:8000/all");
        // setData(result.data.data);       
        xyz = result.data.data;
        setData(xyz);
    }

    const onDelete = async (id) => {
        console.log(id)
        const del = await axios.delete(`http://localhost:8000/delete/${id}`)
        // const newList = data.filter((item) => item.id !== id);
        item();
        // setData(newList);
        console.log(del)
    }

    const onUpdate = async (id) => {
        console.log(id)
        const up = await axios.put(`http://localhost:8000/update/${id}`)

        item();
        console.log(up);
    }


    const Display_data = () => {
        return (
            <>
                {data.map((value) => {
                    return (
                        <>
                            <ul>
                                <li key={value._id}> {value.work}</li>
                                <button className="btn btn-sm btn-danger" onClick={() => onDelete(value._id)}>Delete</button><br/><br/>
                                <input type="text" name="tasked" id="task" placeholder="enter" value={updated} onChange={(e) => setUpdated(e.target.value)}/>
                                <button className="btn btn-sm btn-danger" onClick={() => onUpdate(value._id)}>Update</button>
                            </ul>
                        </>
                    )
                })}

                
              
            </>
        )

    }
    return (
        <>
            <form onSubmit={submitHandler}>
                <input type="text" name="tasked" id="task" placeholder="enter" value={title} onChange={(e) => setTitle(e.target.value)} />
                <button type="submit" className="btn btn-primary mb-3">add</button>
            </form>
            {/* {
                (data) && data.map((i) => {
                    <h1>{i.work} jj</h1>
                })

            } */}
            <h1>List</h1>
            <Display_data />
        </>
    )
}

export default Todos

