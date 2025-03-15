import React, { useEffect, useState } from "react";
import axios from "axios";
import Tippy from "@tippyjs/react";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";
import Hashids from "hashids";

const MyFriendCard = ({ group, userId, fetchGroups }) => {
  let firstLetter = "";
  const groupName = group.group.name;
  if (groupName != undefined) {
    firstLetter = groupName[0];
  }

  const groupAccept = (id) => () => {
    try {
      const serverUrl = process.env.SERVER_URL;
      const endPoint = "/group/accept/";
      const data = {
        queryId: id,
      };
      axios
        .post(serverUrl + endPoint, data)
        .then((response) => {
          if (response.data.status == "success") {
            toast.success(response.data.message);
            fetchGroups(id);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };
  const groupDecline = (id) => () => {
    try {
      const serverUrl = process.env.SERVER_URL;
      const endPoint = "/group/decline/";
      const data = {
        queryId: id,
      };
      axios
        .post(serverUrl + endPoint, data)
        .then((response) => {
          if (response.data.status == "success") {
            toast.info(response.data.message);
            fetchGroups(id);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {}
  };
  const handleMsgClick = () => {};
  return (
    <div className="bg-slate-100 my-5 p-3 rounded-lg">
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-row items-center justify-between space-x-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-full p-5 bg-amber-600 text-white font-bold uppercase">
            {firstLetter}
          </span>
          <span>{groupName}</span>
        </div>
        {group.joinedAt == null ? (
          <div className="inline-flex space-x-1 ml-auto">
            <Tippy content="Kabul et">
              <button
                className="bg-lime-500 p-2 rounded-lg text-white text-base"
                onClick={groupAccept(group.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="M416 128L192 384l-96-96"
                  ></path>
                </svg>
              </button>
            </Tippy>

            <Tippy content="Reddet">
              <button
                className="bg-red-500 p-2 rounded-lg text-white text-base"
                onClick={groupDecline(group.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="M368 368L144 144m224 0L144 368"
                  ></path>
                </svg>
              </button>
            </Tippy>
          </div>
        ) : (
          <Tippy content="Mesaj gönder">
            <Link href={`/groups/${group.groupId}`} className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 ml-auto mr-3 cursor-pointer"
                onClick={handleMsgClick}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
            </Link>
          </Tippy>
        )}
      </div>
    </div>
  );
};

export default MyFriendCard;
