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
    var data1 = {
        work: "",
    }

    const onInputChange = e => {
        data1 = { ...data1, [e.target.name]: e.target.value }
        console.log(data1);
    }

    const onUpdate = async (id, e) => {
        console.log(id);
        console.log(e.target.work);
        const up = await axios.put(`http://localhost:8000/update/${id}/${data1.work}`)
        // item();
        console.log(up);
    }


    const Display_data = () => {
        return (
            <>
                {data.map((ii) => {
                    return (
                        <>
                            <ul>
                                <li key={ii._id}> {ii.work}</li>
                                <button className="btn btn-sm btn-danger" onClick={() => onDelete(ii._id)}>Delete</button><br /><br />
                                <form onSubmit={(e) => onUpdate(ii._id, e)}><input type="text" name="work" placeholder="enter" onChange={e => onInputChange(e)} defaultValue={ii.work} />
                                    <button className="btn btn-sm btn-danger">Update</button></form>

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
                <input type="text" name="tasked" id="task" placeholder="enter" ii={title} onChange={(e) => setTitle(e.target.ii)} />
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

