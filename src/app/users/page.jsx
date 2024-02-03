"use client"
import FormRow from "@/components/FormRow";
import FormRowSelect from "@/components/FormRowSelect";
import React, { useState } from "react";

const Page = () => {
  const [details, setDetails] = useState({
    username: "",
    status: ""
  });
  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name
    const value = e.target.value
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    console.log(details);
  }
  return <main className="px-10 py-7">
    <h2 className="text-[--primary-blue] text-3xl font-serif">
      Add User
    </h2>
    <form className="p-4 grid grid-cols-6 justify-evenly w-full gap-5 border-2 bg-[--primary-blue] rounded-xl ">

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
  </main>;
};

export default Page;
