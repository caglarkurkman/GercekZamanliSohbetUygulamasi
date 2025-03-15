import axios from "axios";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";


const GroupDescription = ({ user,groupId}) => {
    let [isOpen, setIsOpen] = useState(false);
  
  
    function closeModal() {
      setIsOpen(false);
    }
  
    function openModal() {
      setIsOpen(true);
    }
  
    async function onSubmit(e) {
      e.preventDefault();
  
      var groupData = {
        name: e.target.name.value,
        userId: user.id,
      };
  
      let serverUrl = process.env.SERVER_URL;
      let endpoint = "/group/create";
  
      axios
        .post(serverUrl + endpoint, groupData)
        .then((res) => {
          var response = JSON.parse(res.request.response);
          if (response.status === "success") {
            toast.success(response.message);
            closeModal();
            handleFetchGroups();
          }
        })
        .catch((res) => {
          var response = JSON.parse(res.request.response);
          response.details.body.forEach((bodyData) => {
            toast.error(bodyData.message);
          });
        });
    };
    return (
        <>
          <div className="">
              <button
                onClick={openModal}
                className="h-5 w-5 flex flex-row justify-center items-center mt-[-25px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
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
                        Grup Bilgisi
                      </Dialog.Title>                      
                      <div className="mt-2">
                        <div>
                          <div className="flex w-full border-2 rounded-md py-4  items-center">        
                              <div className="flex flex-col items-center px-32 text-center">                               
                                  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="none" stroke="#888" class="bi bi-people-fill" viewBox="0 0 16 16">
                                      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                                  </svg>
                                  <label className="font-normal " style={{ color: "#778899", marginTop:"10px", whiteSpace: "nowrap" }}>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  fill="none" stroke="#888" class="bi bi-card-text" viewBox="0 0 16 16">
                                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
                                <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"/>
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
                              <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-white-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                  Kaydet
                              </button>
                          </div>
                        </div>
                      </div>
                      <hr className="py-2 my-4"></hr>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="#888"  class="bi bi-bell" viewBox="0 0 16 16">
                              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
                          </svg>
                          <label className="font-medium " style={{ color: "#505050", marginLeft:"8px" }}>
                          Bildirimleri sessize al                                     
                          </label>
                        </div>
                          <label class="relative inline-flex mr-0 items-center cursor-pointer">
                              <input type="checkbox" value="" class="sr-only peer p-2"></input>
                              <div class="w-11 h-6 bg-gray-200 peer-focus:ring-4  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-gray after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                      </div> 
                      <div className="flex items-center py-2 my-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="#2F4F4F" class="bi bi-lock-fill" viewBox="0 0 16 16">
                              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
                          </svg>                          
                          <label className="font-medium " style={{ color: "#505050", marginLeft:"8px" }}>
                          <a href=" ">Şifreleme</a> 
                          </label>                                     
                      </div>
                      <p className="font-light" style={{ color: "#505050", marginLeft:"25px", marginTop: "-20px"}}>Mesajlar ve aramalar uçtan uca şifrelidir. Daha fazla bilgi için dokunun.</p>                                
                      <div className="flex items-center py-2 my-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="#888" class="bi bi-star" viewBox="0 0 16 16">
                              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                          </svg>
                          <label className="font-medium " style={{ color: "#505050", marginLeft:"8px" }}>
                          <a href=" ">Yıldızlı mesajlar </a>                                   
                          </label>
                      </div>
                      <div className="flex items-center py-2 my-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="#888" class="bi bi-trash3" viewBox="0 0 16 16">
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                          </svg>
                          <label className="font-medium " style={{ color: "#505050", marginLeft:"8px" }}>
                          <a href=" ">Sohbeti sil</a>                                   
                          </label>
                      </div>
                      <hr ></hr>                 
                          <div className="flex items-center py-2 my-3">        
                              <button onClick={openModal} className="bg-blue-600 rounded-full text-white hover:bg-blue-600 h-12 w-12 flex flex-row justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                                  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                  <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
                                </svg>
                              </button>
                              <a href="" className="font-medium " style={{ color: "#505050", marginLeft:"8px" }}>Üye ekle</a>
                          </div>
                          <div className="w-full flex items-center py-2 my-2">
                              <img src="/assets/4.jpg" alt=""className="h-12 w-12 rounded-full"/>
                              <div className="flex flex-col gap-1">
                                  <label className="font-medium " style={{ color: "#505050", marginLeft:"13px" }}>Siz</label>
                              </div> 
                          </div>
                          <div className="w-full flex items-center py-2 my-2">
                              <img src="/assets/7.jpg" alt=""className="h-12 w-12 rounded-full"/>
                              <div className="flex flex-col gap-1">
                                  <label className="font-medium " style={{ color: "#505050", marginLeft:"13px" }}>Saniye Ekinci</label>
                              </div> 
                          </div>
                          <div className="w-full flex items-center py-2 my-2">
                              <img src="/assets/6.jpg" alt=""className="h-12 w-12 rounded-full"/>
                              <div className="flex flex-col gap-1">
                                  <label className="font-medium " style={{ color: "#505050", marginLeft:"13px" }}>Revan Babayev</label>
                              </div> 
                          </div>
                          <div className="w-full flex items-center py-2 my-2">
                              <img src="/assets/3.jpg" alt=""className="h-12 w-12 rounded-full"/>
                              <div className="flex flex-col gap-1">
                                  <label className="font-medium " style={{ color: "#505050", marginLeft:"13px" }}>Metin Taş</label>
                              </div> 
                          </div>
                          <div className="w-full flex items-center py-2 my-2">
                              <img src="/assets/6.jpg" alt=""className="h-12 w-12 rounded-full"/>
                              <div className="flex flex-col gap-1">
                                  <label className="font-medium " style={{ color: "#505050", marginLeft:"13px" }}>Çağlar Kurkman </label>
                              </div> 
                          </div>
                          <div className="w-full flex items-center py-2 my-2">
                              <img src="/assets/3.jpg" alt=""className="h-12 w-12 rounded-full"/>
                              <div className="flex flex-col gap-1">
                                  <label className="font-medium " style={{ color: "#505050", marginLeft:"13px" }}>Enes ÖZtekin </label>
                              </div> 
                          </div>
                      <div className="flex items-center py-2 my-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="#CD5C5C" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                              <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                          </svg>
                          <label className="font-medium " style={{ color: "#CD5C5C", marginLeft:"8px" }}>
                          <a href=" ">Gruptan çık</a>                                   
                          </label>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </form>
            </Dialog>
          </Transition>
        </>
      )}  ;
      export default GroupDescription;