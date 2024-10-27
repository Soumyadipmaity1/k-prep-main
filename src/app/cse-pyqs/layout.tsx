"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { MdLooksOne, MdLooksTwo, MdLooks3 } from "react-icons/md";
import { FaBars, FaRegComment } from "react-icons/fa";
import Link from "next/link";
import dynamic from "next/dynamic";
import { denkOne } from "../font";
import { HomeIcon } from "@heroicons/react/24/solid";
import Navbar from "@/components/Menubar/Navbar/Navbar";
import { TbCalculator } from 'react-icons/tb';

const FirstYearModal = dynamic(() => import("@/components/Modal/1styearmodal"));
const SecondYearModal = dynamic(() => import("@/components/Modal/2ndyearModal"));
const ThirdYearModal = dynamic(() => import("@/components/Modal/3rdyearModal"));
const CalculatorModal = dynamic(() => import("@/components/Modal/calculatorModal"));

const CsePyqsLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const openModal = (modal: JSX.Element) => {
    setModalContent(modal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const getNavItemClass = (path: string) => {
    return pathname.startsWith(path)
      ? "border-t-4 sm:border-t-0 sm:text-white border-0 sm:border-l-4 border-white sm:border-[#d998ff]"
      : "hover:border-t-4 sm:hover:border-t-0 sm: sm:hover:border-l-4 border-white sm:border-[#d998ff]";
  };

  return (
    <div className={denkOne.className}>
      <Navbar />

      <div className={denkOne.className}>
        {/* Desktop Sidebar */}
        <div className="sm:flex hidden justify-between h-[79vh] mt-6 rounded-xl">
          <aside
            className={`bg-sidebar text-white rounded-xl transition-all duration-300 ${
              isOpen ? "w-56" : "w-20"
            } flex flex-col justify-between`}
          >
            <div>
              <div className="flex pl-6 cursor-pointer text-center items-center justify-between mt-10">
                <button
                  title="toggle"
                  onClick={toggleSidebar}
                  className="focus:outline-none"
                >
                  <FaBars size={32} />
                </button>
              </div>
              <nav className="mt-4">
                <div
                  className={`flex pl-6 cursor-pointer my-8 py-1 items-center space-x-2 ${getNavItemClass(
                    "/cse-pyqs/1st-year"
                  )}`}
                  onClick={() =>
                    openModal(
                      <FirstYearModal
                        isOpen={true}
                        onClose={closeModal}
                        title="First Year"
                        yearPath="/cse-pyqs/1st-year"
                      />
                    )
                  }
                >
                  <MdLooksOne size={32} />
                  {isOpen && <span className="text-xl">1st Year</span>}
                </div>
                <div
                  className={`flex pl-6 cursor-pointer my-8 py-1 items-center space-x-2 ${getNavItemClass(
                    "/cse-pyqs/2nd-year"
                  )}`}
                  onClick={() =>
                    openModal(
                      <SecondYearModal
                        isOpen={true}
                        onClose={closeModal}
                        title="Second Year"
                        yearPath="/cse-pyqs/2nd-year"
                      />
                    )
                  }
                >
                  <MdLooksTwo size={32} />
                  {isOpen && <span className="text-xl">2nd Year</span>}
                </div>
                <div
                  className={`flex pl-6 cursor-pointer my-8 py-1 items-center space-x-2 ${getNavItemClass(
                    "/cse-pyqs/3rd-year"
                  )}`}
                  onClick={() =>
                    openModal(
                      <ThirdYearModal
                        isOpen={true}
                        onClose={closeModal}
                        title="Third Year"
                        yearPath="/cse-pyqs/3rd-year"
                      />
                    )
                  }
                >
                  <MdLooks3 size={32} />
                  {isOpen && <span className="text-xl">3rd Year</span>}
                </div>
                {/* Add Calculator Button */}
                <div
                  className={`flex pl-6 cursor-pointer my-8 py-1 items-center space-x-2 ${getNavItemClass(
                    "/cse-pyqs/calculator"
                  )}`}
                  onClick={() =>
                    openModal(
                      <CalculatorModal
                        isOpen={true}
                        onClose={closeModal}
                        title="Calculator"
                        yearPath="/cse-pyqs/calculator"
                      />
                    )
                  }
                >
                  <TbCalculator size={32} />
                  {isOpen && <span className="text-xl">Calculator</span>}
                </div>
              </nav>
            </div>
            <div className="cursor-pointer flex hover:border-l-4 pl-6 border-white items-center mb-4">
              <Link href="https://google.com" target="_blank">
                <button
                  title="feedback"
                  className="focus:outline-none flex space-x-2"
                >
                  <FaRegComment size={32} />
                  {isOpen && <span className="text-xl">FeedBack</span>}
                </button>
              </Link>
            </div>
          </aside>
          <main className="flex-1 p-4 overflow-auto h-[calc(100vh-10rem)]">
            {children}
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="">
          <nav className="sm:hidden fixed bottom-0 left-0 w-full px-4 py-1.5 bg-sidebar text-white rounded-t-xl shadow-lg flex justify-around items-center z-50 border border-[#d998ff]">
            <div className="flex flex-col items-center cursor-pointer">
              <Link href="/">
                <HomeIcon width={26} height={26} className="mx-auto" />
                <span className="text-xs">Home</span>
              </Link>
            </div>

            <div
              className={`flex flex-col items-center cursor-pointer ${getNavItemClass(
                "/cse-pyqs/1st-year"
              )}`}
              onClick={() =>
                openModal(
                  <FirstYearModal
                    isOpen={true}
                    onClose={closeModal}
                    title="First Year"
                    yearPath="/cse-pyqs/1st-year"
                  />
                )
              }
            >
              <MdLooksOne size={28} />
              <span className="text-xs">1st Year</span>
            </div>
            <div
              className={`flex flex-col items-center cursor-pointer ${getNavItemClass(
                "/cse-pyqs/2nd-year"
              )}`}
              onClick={() =>
                openModal(
                  <SecondYearModal
                    isOpen={true}
                    onClose={closeModal}
                    title="Second Year"
                    yearPath="/cse-pyqs/2nd-year"
                  />
                )
              }
            >
              <MdLooksTwo size={28} />
              <span className="text-xs">2nd Year</span>
            </div>
            <div
              className={`flex flex-col items-center cursor-pointer ${getNavItemClass(
                "/cse-pyqs/3rd-year"
              )}`}
              onClick={() =>
                openModal(
                  <ThirdYearModal
                    isOpen={true}
                    onClose={closeModal}
                    title="Third Year"
                    yearPath="/cse-pyqs/3rd-year"
                  />
                )
              }
            >
              <MdLooks3 size={28} />
              <span className="text-xs">3rd Year</span>
            </div>
            {/* Add Calculator */}
            <div
              className={`flex flex-col items-center cursor-pointer ${getNavItemClass(
                "/cse-pyqs/calculator"
              )}`}
              onClick={() =>
                openModal(
                  <CalculatorModal
                    isOpen={true}
                    onClose={closeModal}
                    title="Calculator"
                    yearPath="/cse-pyqs/calculator"
                  />
                )
              }
            >
              <TbCalculator size={28} />
              <span className="text-xs">Calculator</span>
            </div>

            <div className="flex flex-col items-center cursor-pointer">
              <Link href="https://google.com" target="_blank">
                <FaRegComment size={24} className="mx-auto" />
                <span className="text-xs">Feedback</span>
              </Link>
            </div>
          </nav>

          {/* Mobile Content Section */}
          <main className="sm:hidden p-1 py-1 pt-3 h-[calc(100vh-14rem)] overflow-auto">
            {children}
          </main>

          {/* Modals */}
          {isModalOpen && modalContent}
        </div>
      </div>
    </div>
  );
};

export default CsePyqsLayout;