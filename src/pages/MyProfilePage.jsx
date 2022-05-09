import React from "react";
import Header from "../components/Headers/Header";
import UpdateProfileForm from "../components/ProfileForm/UpdateProfileForm";
import { useSpring, animated, config } from "react-spring";
import { useAuthContext } from "../contexts/AuthContext";
import PageNotFound from "./PageNotFound";

const FadeWrapper = animated.div;

const MyProfilePage = () => {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 400,
    config: config.molasses,
  });

  const { user } = useAuthContext();

  return (
    <>
      {user ? (
        <>
          <Header title={"MY PROFILE"} />
          <FadeWrapper style={fade}>
            <UpdateProfileForm />
          </FadeWrapper>
        </>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default MyProfilePage;
