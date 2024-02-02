'use client'
import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext.js";

const Page = () => {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 20));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);


  return (
    <div className="p-10">
      {loading ? (
        <p>Loading....</p>
      ) : user ? (
        <>
          <p className="font-semibold "> Welcome, {user.displayName} - you are logged in to the profile</p>
        </>
      ) : (
        <p className="font-semibold text-red-500">** You must be logged in to view this page - protected route </p>
      )}
    </div>
  );
};

export default Page;
