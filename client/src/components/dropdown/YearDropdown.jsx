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
    <div className=" w-52 text-right">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
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
        >
          <MenuItems
            anchor="bottom end"
            className="w-40  origin-top-right bg-gray-700 rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
          >
            {years.map((year) => (
              <MenuItem key={year}>
                <button
                  onClick={() => handleYear(year)}
                  className="group flex w-full  items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
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
