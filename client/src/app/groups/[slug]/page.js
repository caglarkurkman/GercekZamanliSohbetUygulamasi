"use client";
import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import isAuth from "@/middleware/isAuth";
import Header from "@/components/Header";
import { Bars3Icon } from "@heroicons/react/24/outline";
import MyGroupCard from "@/components/MyGroupCard";
import { toast } from "react-toastify";
import Chat from "@/components/Chat";

import GroupSettings from "@/components/GroupSettings";

import axios from "axios";
import io from "socket.io-client";
import MessageBubble from "@/components/MessageBubble";

const Page = ({ params, user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [myGroups, setMyGroups] = useState([]);
  const [group, setGroup] = useState(null);

  const fetchGroups = async () => {
    try {
      const serverUrl = process.env.SERVER_URL;
      const endPoint = "/group/myGroups";
      const data = {
        userId: user.id,
      };
      axios.post(serverUrl + endPoint, data).then((response) => {
        if (response.data.status === "success") {
          setMyGroups(response.data.groups);
        }
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchGroup = async (id) => {
    try {
      const serverUrl = process.env.SERVER_URL;
      const endPoint = "/group/group";
      const data = {
        groupId: parseInt(id),
      };
      axios.post(serverUrl + endPoint, data).then((response) => {
        if (response.data.status === "success") {
          setGroup(response.data.group);
        }
      });
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    user != null ? fetchGroups(user.id) : null;
    user != null ? fetchGroup(params.slug) : null;
    console.log(myGroups);
  }, [user]);

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
          {group != null ? (
            <Chat
              user={user}
              groupId={group.id}
              chatTitle={group.name}
              fetchGroups={fetchGroups}
            />
          ) : null}
        </main>
      </div>

      <aside className="fixed bottom-0 lg:left-20 top-16 w-96 overflow-y-auto border-r border-gray-200 bg-white">
        <div className="flex flex-row justify-between items-center py-6 px-4 sm:px-6 lg:px-8">
          <div className="w-full">
            <span className="font-semibold text-lg text-slate-900">
              Gruplarım
            </span>
            {myGroups.map((group) => (
              <MyGroupCard
                group={group}
                userId={user.id}
                fetchGroups={fetchGroups}
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
