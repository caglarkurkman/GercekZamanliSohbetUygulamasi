"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

export default function Login() {
  const router = useRouter();
  const cookie = useCookies();

  async function onSubmit(e) {
    e.preventDefault();

    var action = e.target.action;

    var userData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    axios
      .post("http://localhost:3005/auth/login", userData)
      .then((res) => {
        var response = JSON.parse(res.request.response);
        if (response.status === "success") {
          toast.success(response.message);
        }

        cookie.set("token", response.accessToken);
        cookie.set("refreshToken", response.refreshToken);

        router.push("/");
      })
      .catch((res) => {
        var response = JSON.parse(res.request.response);
        response.details.body.forEach((bodyData) => {
          toast.error(bodyData.message);
        });
      });
  }

  return (
    <div className="flex min-h-full flex-col bg-white justify-center  items-center">
      ,
      <div className="flex min-h-full flex-1 justify  items-center  ">
        <div
          className="  absolute left-60 top-10 transform -translate-x-3 -translate-y-1/5 hidden lg:block  w-66 h-66 rounded-full animate-bounce duration-200"
          style={{
            overflow: "hidden",
          }}
        >
          <img
            src="/assets/1.jpg"
            alt="Circular Image"
            className="w-full h-full object-cover rounded-full"
            style={{
              width: "80px", // İstenilen genişlik değeri
              height: "80px", // İstenilen yükseklik değeri
            }}
          />
        </div>

        <div
          className="absolute left-80 top-1/3 transform -translate-x-1/2 -translate-y-1/5 w-35 h-35 hidden lg:block rounded-full animate-bounce duration-200"
          style={{
            overflow: "hidden",
          }}
        >
          <img
            src="/assets/2.jpg"
            alt="Circular Image"
            className="w-full h-full object-cover rounded-full"
            style={{
              width: "70px", // İstenilen genişlik değeri
              height: "70px", // İstenilen yükseklik değeri
            }}
          />
        </div>
        <div
          className="absolute left-20 right-1/4 top-96 transform -translate-x-1/2 -translate-y-1/5 z-10 hidden lg:block w-30 h-30 rounded-full animate-bounce duration-200"
          style={{
            overflow: "hidden",
          }}
        >
          <img
            src="/assets/3.jpg"
            alt="Circular Image"
            className="w-full h-full object-cover rounded-full"
            style={{
              width: "90px",
              height: "90px",
            }}
          />
        </div>
        <div
          className="absolute left-60 bottom-10 transform -translate-x-1/2 -translate-y-1/5 hidden lg:block w-27 h-27 rounded-full animate-bounce duration-200"
          style={{
            overflow: "hidden",
          }}
        >
          <img
            src="/assets/4.jpg"
            alt="Circular Image"
            className=" lg:w-18 lg:h-18 sm:w-0 sm:h-0 m:w-0 m:h-0 object-cover rounded-full"
            style={{
              width: "60px",
              height: "60px",
            }}
          />
        </div>
        <div className="absolute right-60 bottom-10 transform -translate-x-1/2 -translate-y-1/5 hidden lg:block w-27 h-27 rounded-full animate-bounce duration-200">
          <img
            src="/assets/5.jpg"
            alt="Circular Image"
            className="w-full h-full object-cover rounded-full"
            style={{
              width: "80px", // İstenilen genişlik değeri
              height: "80px", // İstenilen yükseklik değeri
            }}
          />
        </div>

        <div className="absolute right-40 top-10 transform -translate-x-1/2 -translate-y-1/5 hidden lg:block w-27 h-27 rounded-full animate-bounce duration-200">
          <img
            src="/assets/6.jpg"
            alt="Circular Image"
            className="w-full h-full object-cover rounded-full"
            style={{
              width: "70px", // İstenilen genişlik değeri
              height: "70px", // İstenilen yükseklik değeri
            }}
          />
        </div>

        <div className="absolute right-72 top-60 transform -translate-x-1/2 -translate-y-1/5 hidden lg:block w-27 h-27 rounded-full animate-bounce duration-200">
          <img
            src="/assets/7.jpg"
            alt="Circular Image"
            className="w-full h-full object-cover rounded-full"
            style={{
              width: "90px", // İstenilen genişlik değeri
              height: "90px", // İstenilen yükseklik değeri
            }}
          />
        </div>

        <div className="absolute right-20 top-96 transform -translate-x-1/2 -translate-y-1/5 hidden lg:block w-27 h-27 rounded-full animate-bounce duration-200">
          <img
            src="/assets/8.jpg"
            alt="Circular Image"
            className="w-full h-full object-cover rounded-full"
            style={{
              width: "70px", // İstenilen genişlik değeri
              height: "70px", // İstenilen yükseklik değeri
            }}
          />
        </div>
        <div className="z-10 bg-white mx-auto  w-96 ">
          <div>
            <img
              className="h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=blue&amp;shade=600"
              alt="Your Company"
            />
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Hesabınıza giriş yapın
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500 space-x-2">
              <span>Hesabınız yok mu?</span>
              <Link
                href={"register"}
                className="font-semibold text-blue-600 hover:text-blue-500"
              >
                kaydol
              </Link>
            </p>
          </div>

          <div className="mt-10">
            <div>
              <form onSubmit={onSubmit} method="POST" className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    E-posta adresi yada Kullanıcı adı
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="text"
                      autoComplete="email"
                      required=""
                      className="block w-full rounded-md border-0 py-1.5 px-3 outline-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Şifre
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required=""
                      className="block w-full rounded-md border-0 py-1.5 px-3 outline-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-3 block text-sm leading-6 text-gray-700"
                    >
                      Beni hatırla
                    </label>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Oturum aç
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
       
    </div>
  );
}
