"use client";
import { Children, Fragment, useState } from "react";
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
export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <Navigation />

      <div className="sm:pl-20">
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

          <Header />
        </div>

        <main className="sm:pl-96 hidden sm:block">
          <div className="mt-8 max-w-3xl mx-auto mb-10">
            <h3 className="font-semibold text-lg py-3">Hesap Ayarları</h3>
            <div className="max-w-3xl bg-white rounded-lg py-6 mb-8 block">
              <span className="text-gray-500 text-sm">Yalnızca Adınız kullanıcılar tarafından görülür.</span>
              <form className="mt-5">
                <div class="mb-5 flex items-center">
                  <label for="name" class="mb-2 w-24 text-sm font-medium">Ad*</label>
                  <input type="lastname" class="shadow-sm flex-1 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-sm p-2.5 ml-2" placeholder="Metin" required />
                </div>
                <div class="mb-5 flex items-center">
                  <label for="name" class="mb-2 w-24 text-sm font-medium">Soyad*</label>
                  <input type="lastname" class="shadow-sm flex-1 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-sm p-2.5 ml-2" placeholder="TAŞ" required />
                </div>
                <hr className="py-2"></hr>
                <span className="text-gray-500 text-sm py-2">E-postanız size bildirim göndermek için kullanılır. Ziyaretçileriniz tarafından görülmez.</span>
                <div class="mb-5 flex items-center py-3">
                  <label for="name" class="mb-2 w-24 text-sm font-medium">E-posta*</label>
                  <input type="lastname" class="shadow-sm flex-1 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-sm p-2.5 ml-2" placeholder="metintas@gmail.com" required />
                </div>
                <hr className="py-2"></hr>
                <span className="text-gray-500 text-sm py-2">Bir telefon numarası hesap kurtarma amacıyla kullanılabilir. İki Faktörlü kimlik doğrulama için gereklidir.</span>
                <div class="mb-5 flex items-center py-3">
                  <label for="name" class="mb-2 w-24 text-sm font-medium">Telefon</label>
                  <input type="lastname" class="shadow-sm flex-1 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-sm p-2.5 ml-2" placeholder="Telefon numaranızı yazın (örn+901111111111)" required />
                </div>
                <hr className="py-2"></hr>
                <div className="flex w-1/3 border-2 rounded-md py-4 px-3 items-center">
                  <div className="w-2/3">
                    <span className="block font-semibold text-sm">Profil Resmi</span>
                    <span className="text-gray-500 text-sm">Görsel, max 5MB</span>
                  </div>
                  <div className="flex items-center w-1/3">
                    <UserCircleIcon className="h-12 w-12 text-gray-600"></UserCircleIcon>
                    <CloudArrowUpIcon class="h-6 w-6 text-gray-500" />
                  </div>
                </div>
                <hr className="py-2 my-3"></hr>
                <div class="mb-5 flex items-center py-3">
                  <label for="name" class="mb-2 w-24 text-sm font-medium">Dil</label>
                  <select className="shadow-sm flex-1 border-2 text-sm rounded-sm p-2.5 ml-2">
                    <option>Otomatik Algıla</option>
                    <option>Türkçe</option>
                    <option>İngilizce</option>
                  </select>
                </div>
                <hr className="py-2 my-3"></hr>
                <div class="mb-5 flex items-center py-3">
                  <label for="name" class="mb-2 w-24 text-sm font-medium">Şifre</label>
                  <button className="bg-blue-600 px-3 py-2 text-sm text-white font-semibold rounded-sm hover:bg-blue-500">Şifre Değiştir</button>
                </div>
                <hr className="py-2 my-3"></hr>
                <div class="mb-5 flex items-center py-3">
                  <label for="name" class="mb-2 w-24 text-sm text-gray-500 font-medium">2 Faktörlü</label>
                  <div className="block">
                    <button className="bg-blue-300 px-3 block py-2 text-sm text-white font-semibold rounded-sm hover:bg-blue-400">İki Faktörlü kimlik doğrulamayı etkinleştir</button>
                    <span className="text-xs font-medium text-gray-500">2.Adım için bir telefon numarası gereklidir.</span>
                  </div>
                </div>
                <hr className="py-1 my-3"></hr>
                <div class="mb-5 flex items-center py-3">
                  <div className="block">
                    <span className="text-sm text-gray-500">Hesabınızı kaldırmak mı istiyorsunuz? </span><span><a href="#"><i><u>Hesabımı sil</u></i></a></span>
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
}
