import React from "react";
import styled from "@emotion/styled";
import Header from "../components/Header";
import UpdateProfileForm from "../components/UpdateProfileForm";
import { useSpring, animated, config } from "react-spring";

const FadeWrapper = styled.div({});

const FadedProfile = animated(FadeWrapper);

const MyProfilePage = () => {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 400,
    config: config.molasses,
  });
  return (
    <div>
      <Header title={"MY PROFILE"} />
      <FadedProfile style={fade}>
        <UpdateProfileForm />
      </FadedProfile>
    </div>
  );
};

export default MyProfilePage;
