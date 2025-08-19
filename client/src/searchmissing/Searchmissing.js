import React, { useState } from "react";
import Table from "./Table";
import NavbarUser from "../NavbarUser";

const Searchmissing = () => {

    const [pdata, sdata] = useState({
        property: "",
        value: ""


    });
    const adddata = (e) => {
        const { name, value } = e.target;
        sdata(() => {
            return {
                ...pdata,
                [name]: value
            }
        })
    }




    const [users, setUsers] = useState([])



    const fetchUserData = async (e) => {
        e.preventDefault();
        const { property, value } = pdata

        await fetch(`http://localhost:5000/api/police/getmissing?${property}=${value}`)
            .then(response => {
                return response.json()

            })
            .then(data => {
                setUsers(data.myMissingPerson)
            })
    }

    // useEffect(() => {
    //     fetchUserData()
    // }, [])


    return (

        <div className="relative w-full h-screen  backdrop-blur">
        <NavbarUser/>
            <div className='flex justify-center items-center '>
                <form className='max-w-[600px] w-full max-h-[900px] mx-auto bg-white p-8 mt-8 mb-8'>
                    <h2 className='text-4xl font-bold text-center py-4'>Search Missing Person</h2>
                    <div className='flex flex-col mb-4'>
                        <label>Property</label>
                        <input className='border relative bg-gray-100 p-2' placeholder='Search by property' type="text" onChange={adddata} value={pdata.property} name="property" />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label>Value</label>
                        <input className='border relative bg-gray-100 p-2' placeholder='Search by value' type="text" onChange={adddata} value={pdata.value} name="value" />
                    </div>
                    <button className='w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white' onClick={ fetchUserData} >Search</button>
                </form>
            </div>
            {
                users.length !== 0 && <Table data={users} />
            }
            {/* {users.length > 0 && (
                <ul>

                    {users.map(user => (
                        <div className=" flex justify-center items-center">
                        <li key={user.id} className="text-white float-left mr-8" >{user.name}</li>
                        <li key={user.id} className="text-white float-left mr-8" >{user.age}</li>
                        <li key={user.id} className="text-white float-left mr-8" >{user.place}</li>
                        </div>
                    ))}
                </ul>


                
            )} */}

        </div>
    );
}

export default Searchmissing;