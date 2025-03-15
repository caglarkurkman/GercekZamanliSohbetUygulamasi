import React, { useEffect, useState } from "react";
import axios from "axios";
import Tippy from "@tippyjs/react";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";
import Hashids from "hashids";

const MyFriendCard = ({ friend, userId, fetchFriends }) => {
  const [newFriend, setNewFriend] = useState("");

  const handleFetchFriends = () => {
    if (newFriend !== "") {
      fetchFriends();
      setNewFriend("");
    }
  };
  const friendAccept = (id) => () => {
    var data = {
      //userId: userId, // Bizim id'miz
      id: id, // Istek atacagimiz kullanicinin id'si
    };

    axios
      .post("http://localhost:3005/friend/accept", data)
      .then((response) => {
        if (response.data.status === "success") {
          fetchFriends(userId);

          toast.success(response.data.message);
        }
      })
      .catch((response) => {
        response.details.body.forEach((bodyData) => {
          toast.error(bodyData.message);
        });
      });
  };

  const friendDecline = (id) => () => {
    var data = {
      //userId: userId, // Bizim id'miz
      id: id, // Istek atacagimiz kullanicinin id'si
    };

    axios
      .post("http://localhost:3005/friend/decline", data)
      .then((response) => {
        if (response.data.status === "success") {
          fetchFriends(userId);

          toast.info(response.data.message);
        }
      })
      .catch((response) => {
        response.details.body.forEach((bodyData) => {
          toast.error(bodyData.message);
        });
      });
  };

  const hashids = new Hashids(process.env.HASHIDS_SALT, 10);

  const handleMsgClick = () => {};
  let user1Id = friend.user1Id;
  return (
    <div className="bg-slate-100 my-5 p-3 rounded-lg">
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-row space-x-2 items-center">

          <Image
              src={`/assets/` + friend.picture}
              className="rounded-full"
              width="48"
              height="48"
              alt=""
          />
          <div className="flex flex-col gap-1">
            <span className="text-sm text-slate-700 font-bold">
              @
              {friend.username}
            </span>
          </div>
        </div>
        <div>
          {friend.status === 0 ? (
            friend.user1Id === userId ? (
              <span className="text-slate-500 text-sm">İstek gönderildi</span>
            ) : (
              <div className="inline-flex space-x-1">
                <Tippy content="Kabul et">
                  <button
                    className="bg-lime-500 p-2 rounded-lg text-white text-base"
                    onClick={friendAccept(friend.id)}
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
                    onClick={friendDecline(friend.id)}
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
            )
          ) : (
            <Tippy content="Mesaj gönder">
              <Link href={`/friends/${friend.id}`} className="">
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
    </div>
  );
};

export default MyFriendCard;
