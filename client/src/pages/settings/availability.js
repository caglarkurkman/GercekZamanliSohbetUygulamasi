"use client";
import { Children, Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
    Bars3Icon,
} from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import SettingsNavigation from "@/components/SettingNavigation";
export default function availability() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col bg-slate-100 h-full">
            <script src="https://cdn.tailwindcss.com"></script>
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

                    <Header />
                </div>

                <main className="md:pl-96 py-10 sm:block">
                    <div className="mt-8 max-w-3xl px-8 mb-10 mx-auto">
                        <h3 className="font-semibold text-lg py-3">Kullanılabilirlik Ayarları</h3>
                        <div className="max-w-3xl bg-white rounded-lg px-8 py-6 block">
                            <span className="text-gray-500 block py-2">Günleri ve saatleri(Saat diliminizde) yapılandırarak programınıza hazır olun. Ziyaretçiler sizi planlanan saatler dışında görürler, ancak yine de mesaj gönderebilirler.</span>
                            <span className="text-gray-500 font-medium">Web siteniz için atadığınız operatör sayısı birden fazlaysa, Canlı destek'in çevrimiçi olması için en az bir operatörünüzün etkin olması yeterlidir. Tüm operatörleriniz uzaktayken Canlı Destek de çevrimdışı olarak gözükecektir.</span>
                            <span className="w-full px-0 mt-5 h-11 flex items-center font-bold bg-lime-100">
                                Şu anda şu şekil görünüyorsunuz: <span className="text-green-600 font-bold">Çevrimiçi</span>
                            </span>
                            <form className="mt-5">
                                <div className="flex justify-between">
                                    <label className="font-medium text-gray-400">
                                        Çevrimdışı olmaya zorla(görünmez mod)
                                    </label>
                                    <label class="relative inline-flex  items-center cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer"></input>
                                        <div class="w-11 h-6 bg-gray-200 peer-focus:ring-4  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-gray after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                    </label>
                                </div>
                                <hr className="py-2 my-5"></hr>
                                <div className="flex justify-between">
                                    <label className="font-medium">
                                        Uygulamayı kullanırken beni erişebilir yap
                                    </label>
                                    <label class="relative inline-flex  items-center cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer"></input>
                                        <div class="w-11 h-6 bg-gray-200 peer-focus:ring-4  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-gray after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                    </label>
                                </div>
                                <hr className="py-2 my-5"></hr>
                            </form>
                        </div>
                    </div>
                </main>
            </div>

            <SettingsNavigation />

        </div>
    );
}
