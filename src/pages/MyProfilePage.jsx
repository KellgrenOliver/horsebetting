import React from "react";
import Header from "../components/Header";
import UpdateProfileForm from "../components/UpdateProfileForm";

const MyProfilePage = () => {
  return (
    <div>
      <Header title={"MY PROFILE"} />
      <UpdateProfileForm />
    </div>
  );
};

export default MyProfilePage;
