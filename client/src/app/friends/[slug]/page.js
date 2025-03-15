"use client";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import isAuth from "@/middleware/isAuth";
import Header from "@/components/Header";
import { Bars3Icon } from "@heroicons/react/24/outline";
import MyFriendCard from "@/components/MyFriendCard";
import { toast } from "react-toastify";

import axios from "axios";
import io from "socket.io-client";
import MessageBubble from "@/components/MessageBubble";

const Page = ({ params, user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [myFriends, setFriends] = useState([]);
  const [socket, setSocket] = useState(null);
  const [friend, setFriend] = useState(null);
  //   const [message, setMessage] = useState(null);
  const [messages, setMessages] = useState([]);

  const fetchFriends = (id) => {
    try {
      const serverUrl = process.env.SERVER_URL;
      const endPoint = "/friend/acceptedFriends";
      axios
        .post(serverUrl + endPoint, {
          userId: id,
        })
        .then(
          // Axios isteği bittiğinde çalışan fonksiyon
          (response) => {
            if (response.data.status === "success") {
              const currentFriends = response.data.friends;
              console.log("Arkadas: ", currentFriends);
              setFriends(currentFriends);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFriend = (slug) => {
    try {
      const serverUrl = process.env.SERVER_URL;
      const endPoint = "/friend/friend";
      axios
        .post(serverUrl + endPoint, {
          friendId: slug,
          userId: user.id,
        })
        .then(
          (response) => {
            if (response.data.status === "success") {
              const currentUser = response.data.user;
              setFriend(currentUser);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {}
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    try {
      socket.emit(
        "message",
        e.target.message.value,
        { username: user.username, picture: user.picture },
        friend.username
      );
      setMessages([
        ...messages,
        { message: e.target.message.value, from: user.username },
      ]);

      e.target.message.value = "";
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    user != null ? fetchFriends(user.id) : null;

    user != null ? fetchFriend(params.slug) : null;

    const serverUrl = "http://localhost:3005";
    const newSocket = io(serverUrl);

    newSocket.on("connect", () => {
      console.log("Socket.IO bağlantısı başarılı.");
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket.IO bağlantı hatası:", error);
    });

    setSocket(newSocket);

    user != null ? newSocket.emit("join", user.username) : null;

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket != null) {
      socket.on("messages", (message, from) => {
        setMessages([...messages, { message: message, from: from }]);
      });
    }
  });

  return (
    <div>
      <Navigation />
      <div className="lg:pl-20">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div
            className="h-6 w-px bg-gray-900/10 lg:hidden"
            aria-hidden="true"
          />

          <Header user={user} />
        </div>

        <main className="xl:pl-96 hidden lg:block">
          <div className="relative w-full overflow-hidden">
            <div className="p-4 bg-white border-b border-gray-100 lg:p-6">
              <div className="grid items-center grid-cols-12">
                <div className="col-span-8 sm:col-span-4">
                  <div className="flex items-center space-x-2">
                    <div className="col-span-3 flex items-center justify-center">
                      <div className="h-14 w-14 bg-red-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">S</span>
                      </div>
                    </div>
                    <div className="flex-grow overflow-hidden">
                      <h5 className="mb-0">
                        <a href="#" className="text-gray-800">
                          {friend != null ? friend.username : null}
                        </a>
                        <i className="text-green-500 ri-record-circle-fill text-10"></i>
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-span-4 sm:col-span-8">
                  <ul className="flex items-center justify-end lg:gap-4">
                    <li className="mr-4">
                      <button className="text-gray-400 hover:text-gray-600">
                        <i className="ri-settings-4-fill"></i>
                      </button>
                    </li>
                    <li>
                      <button className="text-gray-400 hover:text-gray-600">
                        <i className="ri-more-2-fill"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div id="chat-container">
              <div className="flex flex-col">
                <div className="px-4 py-10 sm:px-6 lg:px-6 lg:py-4">
                  {messages.map((msg, index) => (
                    <MessageBubble
                      key={index}
                      message={msg.message}
                      sender={msg.from.username}
                      isSender={msg.from === user.username}
                      senderPicture={msg.from.picture}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="z-40 w-full fixed bottom-0 p-6 bg-white border-t lg:mb-1 border-gray-50">
              <div className="flex gap-2">
                <form className="flex-grow" onSubmit={handleSendMessage}>
                  <input
                    type="text"
                    name="message"
                    className="w-full border-transparent rounded h-10 bg-gray-50 placeholder:text-14 text-14"
                    placeholder="Enter Message..."
                  />
                </form>
                <div>
                  <div>
                    <ul className="mb-0">
                      <li className="inline-block" title="Emoji">
                        {/* Emoji button */}
                      </li>
                      <li className="inline-block" title="Attached File">
                        {/* Attached File button */}
                      </li>
                      <li className="inline-block">
                        <button
                          type="submit"
                          className="text-white border-transparent btn group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500 group-data-[theme-color=violet]:hover:bg-violet-600 group-data-[theme-color=green]:hover:bg-green-600"
                        >
                          <i className="ri-send-plane-2-fill"></i>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <aside className="fixed bottom-0 lg:left-20 top-16 w-96 overflow-y-auto border-r border-gray-200 bg-white">
        <div className="flex flex-row justify-between items-center py-6 px-4 sm:px-6 lg:px-8">
          <div className="w-full">
            <span className="font-semibold text-lg text-slate-900">
              Arkadaşlarım
            </span>
            {myFriends.map((friend) => (
              <MyFriendCard
                friend={friend}
                userId={user.id}
                fetchFriends={fetchFriends}
              />
            ))}
          </div>
          <div></div>
        </div>
        <div className="flex flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8"></div>
      </aside>
    </div>
  );
};

export default isAuth(Page);
