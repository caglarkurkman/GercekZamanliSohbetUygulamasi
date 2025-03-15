'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from 'next-client-cookies';


const isAuth = (WrappedComponent) => {
  const Auth = (props) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const cookie = useCookies();

    useEffect(() => {

      if (!cookie.get('token')) {
        router.push('/login');
      }

      const token = cookie.get('token');

      const verifyToken = async () => {
        try {
          if (token) {
            const response = await axios.post(
                "http://localhost:3005/auth/verifyToken",
                { token }
            );
            if (response.data.valid) {
              setUser(response.data.user);

              return;
            }
          }
          router.push('/login');
        } catch (error) {
          if (error.status != 200) {

            if (!cookie.get('refreshToken')) {
              router.push('/login');
            }

            const refreshToken = cookie.get('refreshToken');
            const refreshResponse = await axios.post(
                "http://localhost:3005/auth/refreshToken",
                { refreshToken }
            );
            if (refreshResponse.data.valid) {
              cookie.set("token", refreshResponse.data.accessToken, {
                sameSite: 'strict',
                httpOnly: true
              });

              setUser(refreshResponse.data.user);

              return;
            } else {
              console.error(
                  "Token verification error:",
                  refreshResponse.data.message
              );
              cookie.remove('token');
              cookie.remove('refreshToken');
              router.push("/login");
            }
          } else {
            console.error(
                "Token verification error:",
                refreshResponse.data.message
            );
            cookie.remove('token');
            router.push('/login');
          }
        }
      };

      verifyToken();
    }, []);

    return <WrappedComponent user={user} {...props} />;
  };

  return Auth;
};

export default isAuth;
