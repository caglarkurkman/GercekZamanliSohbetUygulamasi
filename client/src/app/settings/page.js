"use client";
import { Children, Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  UserCircleIcon,
  BellAlertIcon,
  ClockIcon,
  LockClosedIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import SettingsNavigation from "@/components/SettingNavigation";
import isAuth from "@/middleware/isAuth";
import ChangePassword from "@/components/ChangePasword"
const Home = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [mail, setMail] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  
  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    closeDialog();
  };

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setMail(user.email || "");
    }
  }, [user])


  const handleUsernameChange = (e) => {
    const inputText = e.target.value;
    setFullName(inputText);
  };

  const handleEmailChange = (e) => {
    const inputText = e.target.value;
    setMail(inputText);
  };

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

        <main className="md:pl-96 sm:block">
          <div className="mt-8 px-6 max-w-3xl mx-auto">
            <h3 className="font-semibold text-lg py-3">Hesap Ayarları</h3>
            <div className="max-w-3xl bg-white rounded-lg px-8 py-6 mb-8 block">
              <span className="text-gray-500 text-sm">
                Yalnızca Adınız kullanıcılar tarafından görülür.
              </span>
              <form className="mt-5">
                <div class="mb-5 flex items-center">
                  <label for="fullname" class="mb-2 w-24 text-sm font-medium">
                    Ad Soyad:
                  </label>
                  <input
                    type="text"  // type'ı text olarak güncellendi
                    name="fullname"
                    className="shadow-sm flex-1 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-sm p-2.5 ml-2"
                    value={fullName}
                    onChange={handleUsernameChange}
                    required
                  />
                </div>

                <hr className="py-2"></hr>
                <span className="text-gray-500 text-sm py-2">
                  E-postanız size bildirim göndermek için kullanılır.
                  Ziyaretçileriniz tarafından görülmez.
                </span>
                <div class="mb-5 flex items-center py-3">
                  <label for="name" class="mb-2 w-24 text-sm font-medium">
                    E-posta*
                  </label>
                  <input
                    type="lastname"
                    class="shadow-sm flex-1 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-sm p-2.5 ml-2"
                    value={mail}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <hr className="py-2"></hr>

                <hr className="py-2"></hr>
                <div class="col-span-full">
                  <label
                    for="cover-photo"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Profil Resmi
                  </label>
                  <div class="mt-2 w-full h-36 flex items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div class="text-center">
                      <svg
                        class="mx-auto h-12 w-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <div class="mt-4 flex text-sm justify-center leading-6 text-gray-600">
                        <label
                          for="file-upload"
                          class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Resim yükle</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            class="sr-only"
                          />
                        </label>
                      </div>
                      <p class="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF maks 10MB
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="py-2 my-3"></hr>

                <hr className="py-2 my-3"></hr>
                <div class="mb-5 flex items-center py-3">
                  <label for="name" class="mb-2 w-24 text-sm font-medium">
                    Şifre
                  </label>
                  <button
                    type="button"
                    className="bg-blue-600 px-3 py-2 text-sm text-white font-semibold rounded-sm hover:bg-blue-500"
                    onClick={openDialog}
                  >
                    Şifre Değiştir
                  </button>
                </div>
                <ChangePassword
                  isOpen={isDialogOpen}
                  closeModal={closeDialog}
                  onSubmit={handleSubmit}
                />

                {/* ... (remaining code) */}
                <hr className="py-2 my-3"></hr>
                <div class="mb-5 flex items-center py-3">
                  <label
                    for="name"
                    class="mb-2 w-24 text-sm text-gray-500 font-medium"
                  >
                    2 Faktörlü
                  </label>
                  <div className="block max-sm:text-xs">
                    <button className="bg-blue-300 max-sm:text-xs px-3 block py-2 text-sm text-white font-semibold rounded-sm hover:bg-blue-400">
                      İki Faktörlü kimlik doğrulamayı etkinleştir
                    </button>
                    <span className="text-xs font-medium text-gray-500">
                      2.Adım için bir telefon numarası gereklidir.
                    </span>
                  </div>
                </div>
                <hr className="py-1 my-3"></hr>
                <div class="mb-5 flex items-center py-3">
                  <div className="block">
                    <span className="text-sm text-gray-500">
                      Hesabınızı kaldırmak mı istiyorsunuz?{" "}
                    </span>
                    <span>
                      <a href="#">
                        <i>
                          <u>Hesabımı sil</u>
                        </i>
                      </a>
                    </span>
                  </div>
                </div>
                <hr className="py-2 my-3"></hr>
                <div class="mb-5 flex items-center max-sm:text-xs py-3">
                  <div className="block">
                    <button className="bg-green-600 px-3 block py-2 text-sm max-sm:text-xs text-white font-semibold rounded-sm hover:bg-green-800"
                      onClick={
                        console.log("")
                      }
                    >
                      Değişiklikleri Kaydet
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>

      <SettingsNavigation />
    </div>
  );
};

export default isAuth(Home);
