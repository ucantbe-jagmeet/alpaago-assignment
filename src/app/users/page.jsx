"use client"
import FormRow from "@/components/FormRow";
import FormRowSelect from "@/components/FormRowSelect";
import React, { useEffect, useState } from "react";
import { userDb } from "../firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";

const Page = () => {
  const [details, setDetails] = useState({
    username: "",
    status: "active"
  });
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(userDb, 'users')

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name
    const value = e.target.value
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  }

  const handleSubmit = async () => {
    try {
      console.log('details', details);
      await addDoc(usersCollectionRef, details);
    } catch (error) {
      console.log(error);
    }
  }

  const getData = async () => {
    try {
      const data = await getDocs(usersCollectionRef)
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setUsers(filteredData)
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    getData()
  }, []);

  return <main className="px-10 py-7">
    <h2 className="text-[--primary-blue] text-3xl font-serif">
      Add User
    </h2>
    <form onSubmit={handleSubmit} className="p-4 grid grid-cols-6 justify-evenly w-full gap-5 border-2 bg-[--primary-blue] rounded-xl ">

      <FormRow
        type="text"
        name="username"
        value={details.username}
        labelText="Username"
        handleChange={handleChange}
        wrapperClass="lg:col-span-2 md:col-span-3 col-span-6"
      />
      <FormRowSelect
        name="status"
        labelText="Status"
        value={details.status}
        handleChange={handleChange}
        list={['active', 'inactive']}
        wrapperClass="lg:col-span-2 md:col-span-3 col-span-6"
      />
      <div className="lg:mt-[23px]  lg:col-span-2 md:col-span-6   row-span-1 flex space-x-5 col-span-6">
        <button className="flex-1 bg-white rounded" type="submit">Save</button>
        <button className="flex-1 bg-white rounded" type="button">Clear</button>
      </div>
    </form>

    <div>
      {
        users.map((user) => {
          return <div key={user.id}>
            <h2> {user.username}</h2>
            <p> {user.status}</p>
          </div>
        })
      }
    </div>
  </main>;
};

export default Page;
