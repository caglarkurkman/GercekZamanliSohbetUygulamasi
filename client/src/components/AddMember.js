import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { toast } from "react-toastify";
import { Disclosure } from "@headlessui/react";

export default function AddMember({ user, groupId }) {
  const [query, setQuery] = useState("");
  const [friends, setFriends] = useState([]);
  const [selected, setSelected] = useState();

  const filteredPeople =
    query === ""
      ? friends
      : friends.filter((person) =>
          person.username
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const handleInvite = (e) => {
    e.preventDefault();

    console.log(selected.id);

    const data = {
      groupId: groupId,
      userId: selected.id,
    };

    axios
      .post(process.env.SERVER_URL + "/group/invite", data)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          toast.success("Katılan kişiye eklendi");
          fetchFriends(user.id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchFriends = (id) => {
    try {
      const serverUrl = process.env.SERVER_URL;
      const endPoint = "/group/withoutGroupMembers";
      axios
        .post(serverUrl + endPoint, {
          userId: id,
          groupId: groupId,
        })
        .then(
          // Axios isteği bittiğinde çalışan fonksiyon
          (response) => {
            if (response.data.status === "success") {
              const currentFriends = response.data.members;
              setFriends(currentFriends);
              setSelected(currentFriends[0]);
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

  useEffect(() => {
    user != null ? fetchFriends(user.id) : null;
  }, [user]);
  return (
    <Disclosure>
      <Disclosure.Button className="">
        <div className="flex items-center">
          <button
            type="button"
            className="flex flex-row space-x-2 items-center"
          >
            <div className="bg-blue-500 hover:bg-blue-600 transition duration-300 h-12 w-12 rounded-full inline-flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="h-8 w-8 text-white"
                viewBox="0 0 16 16"
              >
                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                <path
                  fillRule="evenodd"
                  d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
                />
              </svg>
            </div>
            <span
              className="font-medium "
              style={{ color: "#505050", marginLeft: "8px" }}
            >
              Üye ekle
            </span>
          </button>
        </div>
      </Disclosure.Button>
      <Disclosure.Panel className="text-gray-500">
        <form className="my-6">
          <Combobox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow focus:outline-0 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 outline-none"
                  displayValue={(person) => person.username}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-0 sm:text-sm">
                  {friends.length === 0 ? (
                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                      Arkadaş bulunamadı.
                    </div>
                  ) : (
                    filteredPeople.map((person) => (
                      <Combobox.Option
                        key={person.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-teal-600 text-white" : "text-gray-900"
                          }`
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {person.username}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-teal-600"
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>

          <button
            type="submit"
            onClick={handleInvite}
            className="bg-slate-700 text-white font-normal rounded py-2 px-4 mt-4"
          >
            Davet Et
          </button>
        </form>
      </Disclosure.Panel>
    </Disclosure>
  );
}
