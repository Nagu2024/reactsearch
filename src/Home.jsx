import React, { useRef, useState } from 'react'
import './App.css'
import { FaSearch } from "react-icons/fa";
import axios from 'axios'
import { useReducer } from 'react';

const Home = () => {
    const [inputref, setInputref] = useState('')
    const [data, setData] = useState([])
    const inputvalue = useRef('')
    const fetchdata = async (value) => {

        const response = await axios.get("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
                const result = res.data;
                const respdata = result.filter((item) => {

                    return value && item && item.name.toLowerCase().includes(value);
                })

                setData(respdata);
            }).catch((err) => {
                console.log(err)
            })

    }
    const searchhandler = (value) => {
        setInputref(value);
        fetchdata(value);
    }
    return (
        <div className='App'>
            <div className="search-bar-contianer">
                <div className="input-wraper">
                    <FaSearch id='search-icon' />
                    <input type="text" ref={inputvalue} value={inputref} placeholder='Type to search...' onChange={(e) => searchhandler(e.target.value)} />
                </div>
                {inputref && data && <div className='search-list'>

                    {data.map((item) => {
                        return <div className='search-item' onClick={() => { setInputref(item.name); setData(''); }} key={item.id}>{item.name}</div>
                    })}

                </div>}
            </div>
        </div>
    )
}

export default Home