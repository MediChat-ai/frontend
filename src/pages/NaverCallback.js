import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const NaverCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const processNaverLogin = async () => {
      const queryParams = window.location.hash.substring(1).split("&");
      const params = {};

      queryParams.forEach((param) => {
        const [key, value] = param.split("=");
        params[key] = value;
      });

      try {
        const response = await axios.post(
          "http://localhost:3001/users/oauth/naver",
          params
        );

        if (response.data.status === "failure") {
          if (response.data.errorCode == "502") {
            alert("네이버 로그인 과정에서 오류가 발생했습니다.");
          }
        }
        localStorage.setItem('token', response.data.token);
        window.location.href = "/";
      } catch (error) {
        alert("네이버 로그인 과정에서 오류가 발생했습니다.");
      }
    };

    processNaverLogin();
  }, []);


  return <div>Redirecting...</div>;
};

export default NaverCallback;
