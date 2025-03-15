"use client";
import { useEffect, useState, useReducer } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";
import GroupCard from "@/components/GroupCard";
import MessageCard from "@/components/MessageCard";
import Chat from "@/components/Chat";
import Header from "@/components/Header";
import isAuth from "@/middleware/isAuth";
import GroupCreateModal from "@/components/GroupCreateModal";
import axios from "axios";
import { Icons, toast } from "react-toastify";
import { flushSync } from "react-dom";
import io from "socket.io-client";

const Home = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setGroup] = useState(null);
  const [socket, setSocket] = useState(null);
  const number = 0;
  const [sidebarInitiallyClosed, setSidebarInitiallyClosed] = useState(false);
  const [shouldCloseSidebar, setShouldCloseSidebar] = useState(false);

  async function fetchGroups() {
    let serverUrl = process.env.SERVER_URL;
    let endpoint = "/group/all";

    if (user != null) {
      try {
        await axios
          .post(serverUrl + endpoint, {
            userId: user.id,
          })
          .then((response) => {
            let status = response.data.status;
            if (status === "success") {
              let responseGroups = response.data.groups;

              //Eğer gruplar geldiyse, groups listesine atıyoruz.
              responseGroups = responseGroups.map((group) => {
                return {
                  ...group,
                  latestMsg:
                    group.messages.length > 0 ? group.messages[0].message : "",
                  latestSender:
                    group.messages.length > 0
                      ? group.messages[0].user.username
                      : "",
                  latestMsgTime:
                    group.messages.length > 0
                      ? group.messages[0].createdAt
                      : "",
                };
              });
              flushSync(() => setGroups(responseGroups));
            } else {
              toast.error(JSON.stringify(response.data.message));
            }
          });
      } catch (error) {
        toast.error(error.message);
      }
    }
  }

  useEffect(() => {
    fetchGroups();
  }, [user]);

  useEffect(() => {
    const serverUrl = "http://localhost:3005";
    const newSocket = io(serverUrl);

    newSocket.on("connect", () => {
      console.log("Socket.IO bağlantısı başarılı.");
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket.IO bağlantı hatası:", error);
    });

    setSocket(newSocket);

    if (groups.length > 0) {
      groups.forEach((group) => {
        group != null ? newSocket.emit("joinRoom", group.groupId) : null;
      });
    }

    return () => {
      newSocket.disconnect();
    };
  }, [groups]);

  useEffect(() => {
    if (socket != null) {
      // Yeni bir mesaj varsa grupları tekrar çeksin. Bu sayede grubun son mesajına göre gruplar yeniden listelenecek.
      socket.on("groupMessage", () => {
        fetchGroups();
      });
    }
  }, [socket]);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768); // Adjust the breakpoint as needed

  useEffect(() => {
    setSidebarOpen(true);
    setSidebarInitiallyClosed(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newIsSmallScreen = window.innerWidth < 768;
      if (
        newIsSmallScreen &&
        sidebarInitiallyClosed &&
        sidebarOpen &&
        !shouldCloseSidebar
      ) {
        setSidebarOpen(false);
        setSidebarInitiallyClosed(false);
      }

      setIsSmallScreen(newIsSmallScreen);
    };

    window.addEventListener("resize", handleResize);

    // Sayfa yüklendiğinde boyutu kontrol et
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sidebarOpen, sidebarInitiallyClosed, shouldCloseSidebar]);

  useEffect(() => {
    if (shouldCloseSidebar) {
      setSidebarOpen(false);
      setShouldCloseSidebar(false);
    }
  }, [shouldCloseSidebar]);

  const toggleSidebar = () => {
    setSidebarOpen((prevSidebarOpen) => !prevSidebarOpen);
  };

  return (
    <div>
      <Navigation />
      <div className="lg:pl-20">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button onClick={toggleSidebar}>
            <span className="sr-only">Toggle sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div
            className="h-6 w-px bg-gray-900/10 lg:hidden"
            aria-hidden="true"
          />

          <Header user={user} />
        </div>

        <main className="h-100">
          { selectedGroup ? (
            <Chat
              className="ml-0"
              user={user}
              groupId={selectedGroup.id}
              setSelectedGroup={setGroup}
              chatTitle={selectedGroup.name}
              fetchGroups={fetchGroups}
              sidebarOpen={sidebarOpen}
            />
          ) : null}
        </main>
      </div>
      {sidebarOpen && (
        <aside className="fixed bottom-0 lg:left-20 top-16 w-96 overflow-y-auto border-r border-gray-200 bg-white">
          <div className="flex flex-row justify-between items-center bg-slate-100 py-6 px-4 sm:px-6 lg:px-8">
            <div>
              <span className="font-semibold text-lg text-slate-900">Akış</span>
            </div>
            <div>
              <GroupCreateModal user={user} fetchGroups={fetchGroups} />
            </div>
          </div>
          <div className="flex flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8">
            {groups.map((group) => (
              <GroupCard
                key={group.groupId}
                group={group.group}
                latestSender={group.latestSender}
                latestMsg={group.latestMsg}
                latestMsgTime={group.latestMsgTime}
                handleSettingGroup={setGroup}
              />
            ))}
          </div>
        </aside>
      )}
    </div>
  );
};

export default isAuth(Home);
