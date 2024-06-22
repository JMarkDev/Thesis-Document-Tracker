import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

export default function Dropdown() {
  const [selectedYear, setSelectedYear] = useState("");
  const years = [2024, 2025, 2026, 2027];

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setSelectedYear(currentYear);
  }, []);

  const handleYear = (year) => {
    setSelectedYear(year);
  };
  return (
    <div className="text-right">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-blue-600 hover:bg-blue-700 py-1.5 px-4 text-sm/6 font-semibold text-white ">
          {selectedYear}
          <ChevronDownIcon className="size-4 fill-white/60" />
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className="bg-white"
        >
          <MenuItems
            anchor="bottom end"
            className="w-40 text-gray-700 origin-top-right bg-gray-700  rounded-xl  p-1 text-sm/6"
          >
            {years.map((year) => (
              <MenuItem key={year}>
                <button
                  onClick={() => handleYear(year)}
                  className="group flex w-full hover:bg-gray-300 items-center justify-center gap-2 rounded-lg py-1.5 px-3 "
                >
                  {year}
                </button>
              </MenuItem>
            ))}
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}
