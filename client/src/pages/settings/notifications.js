"use client";
import {useState} from "react";
import {
    Bars3Icon,
} from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import SettingsNavigation from "@/components/SettingNavigation";
export default function notifications() {
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

                <main className="sm:pl-96 sm:block">
                    <div className="mt-8 max-w-3xl mx-auto max-sm:mx-8 mb-10">
                        <h3 className="font-semibold text-lg py-3">Bildirim Ayarları</h3>
                        <div className="max-w-3xl bg-white rounded-lg px-8 py-6 block">
                            <span className="text-sm block my-2 text-gray-500">Bildirimleriniz nasıl yönetmek istediğinizi seçin</span>
                            <span className="text-sm font-medium text-gray-600">Yeni mesaj aldığınızda bildirim alamayacağınız için bunları devre dışı bırakmanız önerilmez.</span>
                            <form className="mt-5">
                                <div className="flex justify-between">
                                    <label className="font-medium text-gray-400">
                                        Tüm bildirimleri devre dışı bırak
                                    </label>
                                    <label class="relative inline-flex  items-center cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer"></input>
                                        <div class="w-11 h-6 bg-gray-200 peer-focus:ring-4  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-gray after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                    </label>
                                </div>
                                <h3 className="mt-10 mb-10 font-bold">Anlık Bildirimler</h3>
                                <div className="flex justify-between">
                                    <label className="font-medium">
                                        Çevrimiçi olduğumda bildirim gönder
                                    </label>
                                    <label class="relative inline-flex mr-0 items-center cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer p-2"></input>
                                        <div class="w-11 h-6 bg-gray-200 peer-focus:ring-4  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-gray after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                    </label>
                                </div>
                                <hr className="py-2 my-5"></hr>
                                <div className="flex justify-between">
                                    <label className="font-medium">
                                        Çevrimdışıyken bildirim gönder
                                    </label>
                                    <label class="relative inline-flex mr-0 items-center cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer p-2"></input>
                                        <div class="w-11 h-6 bg-gray-200 peer-focus:ring-4  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-gray after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                    </label>
                                </div>
                                <hr className="py-2 my-5"></hr>
                                <div className="flex justify-between">
                                    <label className="font-medium text-gray-400">
                                        Bir ziyaretçi profilime göz atarken bana bildir
                                    </label>
                                    <label class="relative inline-flex mr-0 items-center cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer p-2"></input>
                                        <div class="w-11 h-6 bg-gray-200 peer-focus:ring-4  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-gray after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                    </label>
                                </div>
                                <hr className="py-2 my-5"></hr>
                                <div className="flex justify-between">
                                    <label className="font-medium">
                                        Bildirim seslerini çal
                                    </label>
                                    <label class="relative inline-flex mr-0 items-center cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer p-2"></input>
                                        <div class="w-11 h-6 bg-gray-200 peer-focus:ring-4  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-gray after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                    </label>
                                </div>
                                <hr className="py-2 my-5"></hr>
                                <h3 className="mt-10 mb-10 font-bold">E-posta bildirimleri</h3>
                                <div className="flex justify-between">
                                    <label className="font-medium">
                                        Okunmamış mesajları bana e-postayla gönder
                                    </label>
                                    <label class="relative inline-flex mr-0 items-center cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer p-2"></input>
                                        <div class="w-11 h-6 bg-gray-200 peer-focus:ring-4  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-gray after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                    </label>
                                </div>
                                <hr className="py-2 my-5"></hr>
                                <div className="flex justify-between">
                                    <label className="font-medium text-gray-400">
                                        Görüşme içeriklerini bana e-postayla gönder
                                    </label>
                                    <label class="relative inline-flex mr-0 items-center cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer p-2"></input>
                                        <div class="w-11 h-6 bg-gray-200 peer-focus:ring-4  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-gray after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                    </label>
                                </div>
                                <hr className="py-2 my-5"></hr>
                                <div className="flex justify-between">
                                    <label className="font-medium">
                                        Kullanıcıların değerlendirmelerini bana e-postayla gönder
                                    </label>
                                    <label class="relative inline-flex mr-0 items-center cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer p-2"></input>
                                        <div class="w-11 h-6 bg-gray-200 peer-focus:ring-4  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-gray after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                    </label>
                                </div>
                                <hr className=" my-5"></hr>
                                <div className="flex text-right justify-between">
                                    <label className="font-medium flex-1 text-right mr-0">
                                        <u><a href="#" className="text-blue-400">yardım</a></u>
                                    </label>
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
