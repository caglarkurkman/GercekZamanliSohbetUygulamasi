
"use client";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import isAuth from "@/middleware/isAuth";
import Header from "@/components/Header";
import { Bars3Icon } from "@heroicons/react/24/outline";
import MyFriendCard from "@/components/MyFriendCard";

import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


const Friends = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [myFriends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [sidebarInitiallyClosed, setSidebarInitiallyClosed] = useState(false);
  const [shouldCloseSidebar, setShouldCloseSidebar] = useState(false);
  

  const fetchFriends = (id) => {
    try {
      const serverUrl = process.env.SERVER_URL;
      const endPoint = "/friend/friends";
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

  const fetchUsers = (id) => {
    try {
      const serverUrl = process.env.SERVER_URL;
      const endPoint = "/friend/withoutFriends";
      axios
        .post(serverUrl + endPoint, {
          userId: id,
        })
        .then(
          // Axios isteği bittiğinde çalışan fonksiyon
          (response) => {
            if (response.data.status === "success") {
              const currentUsers = response.data.users;
              setUsers(response.data.users);
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
  const addFriend = (id) => () => {
    var data = {
      userId: user.id, // Bizim id'miz
      id: id, // Istek atacagimiz kullanicinin id'si
    };

    axios
      .post("http://localhost:3005/friend/add", data)
      .then((response) => {
        if (response.data.status === "success") {
          toast.success(response.data.message);
        }

        console.log("Arkadas: ", response.data.friend);

        setUsers(users.filter((user) => user.id !== id));
        fetchFriends(user.id);
      })
      .catch((response) => {
        response.details.body.forEach((bodyData) => {
          toast.error(bodyData.message);
        });
      });
  };

  useEffect(() => {
    user != null ? fetchFriends(user.id) : null;
    user != null ? fetchUsers(user.id) : null;
  }, [user]);

  
  useEffect(() => {
    setSidebarOpen(true);
    setSidebarInitiallyClosed(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newIsSmallScreen = window.innerWidth < 768;
      if (newIsSmallScreen && sidebarInitiallyClosed && sidebarOpen && !shouldCloseSidebar) {
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


  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('mybutton').addEventListener('click', function(){
      document.getElementById('mymodal').classList.remove('hidden');
    });
  
    document.getElementById('mymodal').addEventListener('click',function(event) {
      if (event.target === this) {
        this.classList.add('hidden');
        window.location.href=''
      }
    });
  });
  

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

        <main className="xl:pl-96 hidden lg:block">
        {!isSmallScreen && (
          <div className="px-4 py-4">
            <span className="text-xl text-slate-700 font-medium">
              Daha fazla kişi tanış
            </span>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-8">
              {users.map((user) => (
                <div className="bg-white border border-slate-300 rounded flex flex-col justify-center items-center py-4">
                  <Image
                    src={`/assets/` + user.picture}
                    className="rounded-full"
                    width="64"
                    height="64"
                    alt=""
                  />

                  <span className="font-medium py-2">@{user.username}</span>

                  <button
                    className="py-1 px-2 bg-lime-500 hover:bg-lime-600 transition duration-300 rounded"
                    onClick={addFriend(user.id)}
                  >
                    <span className="text-sm text-white">+ Arkadaş Ekle</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        </main>
      </div>
      {sidebarOpen && (
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
                onSelectFriend={() => setSelectedFriend(friend)}
              />
            ))}
          </div>
          <div className="bg-gray-200 flex items-center justify-center ">
              <div id="mybutton2" className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer">Keşfet
                <div id="mymodal" className="fixed top-0 left-0 w-full h-full items-center justify-center bg-black bg-opacity-50 hidden">
                  <div className="bg-white p-8 rounded">
                    <p>dasdas</p>
                    <button id="mybutton" className="mt-4 bg-red-500 text-white py-2 px-4 rounded">Kapat</button>
                    
                  </div>

                </div>

              </div>
          
          
          </div>
        </div>
        <div className="flex flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8"></div>
      </aside>
      )}
    </div>
    
  );
};

export default isAuth(Friends);