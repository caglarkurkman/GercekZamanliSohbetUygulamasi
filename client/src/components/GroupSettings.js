import axios from "axios";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment, useEffect } from "react";
import { flushSync } from "react-dom";

import AddMember from "./AddMember";

const GroupSettings = ({ user, groupId, fetchGroups, setSelectedGroup }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [members, setMembers] = useState([]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function onSubmit(e) {
    e.preventDefault();
  }

  const fetchGroupMembers = (id) => {
    let serverUrl = process.env.SERVER_URL;
    let endpoint = "/group/members";

    try {
      axios
        .post(serverUrl + endpoint, {
          groupId: id,
        })
        .then((response) => {
          let status = response.data.status;
          if (status === "success") {
            let responseMembers = response.data.members;
            setMembers(responseMembers);
          } else {
            toast.error(JSON.stringify(response.data.message));
          }
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const leaveGroup = async () => {
    const serverUrl = process.env.SERVER_URL;
    const endpoint = "/group/leave";

    try {
      await axios
        .post(serverUrl + endpoint, {
          groupId: groupId,
          userId: user.id,
        })
        .then((response) => {
          if (response.data.status === "success") {
            closeModal();
            fetchGroups();
            setSelectedGroup(null);
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    groupId != null ? fetchGroupMembers(groupId) : null;
  }, [groupId]);

  return (
    <>
      <div className="">
        <button
          onClick={openModal}
          className="h-5 w-5 flex flex-row justify-center items-center mt-[-25px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-three-dots-vertical"
            viewBox="0 0 16 16"
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          </svg>
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <form
            onSubmit={onSubmit}
            method="post"
            className="fixed inset-0 overflow-y-auto"
          >
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 pb-4"
                  >
                    Grup Ayarları
                  </Dialog.Title>
                  <div className="mt-2">
                    <div>
                      <div className="flex w-full border-2 rounded-md py-4  items-center">
                        <div className="flex flex-col items-center px-32 text-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="35"
                            height="35"
                            fill="none"
                            stroke="#888"
                            class="bi bi-people-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                          </svg>
                          <label
                            className="font-normal "
                            style={{
                              color: "#778899",
                              marginTop: "10px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <a href=" ">Grup profili değiştir </a>
                          </label>
                        </div>
                      </div>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#888"
                            className="h-5 w-5 text-gray-400"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                          placeholder="Grup adı"
                        />
                      </div>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="#888"
                            class="bi bi-card-text"
                            viewBox="0 0 16 16"
                          >
                            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                            <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                          placeholder="Grup açıklaması"
                        />
                      </div>
                      <div className="mt-6 space-x-2">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-white-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Kaydet
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr className="py-2 my-4"></hr>
                  <div className="flex items-center py-2 my-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="#2F4F4F"
                      class="bi bi-lock-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                    </svg>
                    <label
                      className="font-medium "
                      style={{ color: "#505050", marginLeft: "8px" }}
                    >
                      <a href=" ">Şifreleme</a>
                    </label>
                  </div>
                  <p
                    className="font-normal"
                    style={{
                      color: "#505050",
                      marginLeft: "25px",
                      marginTop: "-20px",
                    }}
                  >
                    Mesajlar ve aramalar uçtan uca şifrelidir. Daha fazla bilgi
                    için dokunun.
                  </p>
                  <hr className="py-2 my-4" />

                  <div className="relative">
                    <AddMember user={user} groupId={groupId} />
                  </div>
                  {members.map((member) =>
                    member.user != null ? (
                      <div className="w-full flex items-center py-2 my-2">
                        <img
                          src={
                            member.user.picture != null
                              ? "assets/" + member.user.picture
                              : "assets/default.jpg"
                          }
                          alt=""
                          className="h-12 w-12 rounded-full"
                        />
                        <div className="flex flex-col gap-1">
                          <label
                            className="font-medium "
                            style={{ color: "#505050", marginLeft: "13px" }}
                          >
                            {member.user.id == user.id
                              ? "Siz"
                              : member.user.username}
                          </label>
                        </div>
                      </div>
                    ) : null
                  )}
                  <div className="flex items-center py-2 my-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="#CD5C5C"
                      class="bi bi-box-arrow-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                      />
                    </svg>
                    <label
                      className="font-medium "
                      style={{ color: "#CD5C5C", marginLeft: "8px" }}
                    >
                      <button onClick={leaveGroup}>Gruptan çık</button>
                    </label>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </form>
        </Dialog>
      </Transition>
    </>
  );
};
export default GroupSettings;
