import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import PropTypes from "prop-types";
import documentStatusList from "../../constants/documentStatusList";

export default function Status({ handleFilter }) {
  const [selectOption, setSelectOption] = useState("Document Status");

  return (
    <div className="text-right ">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-blue-600 hover:bg-blue-700 py-1.5 px-2 text-sm/6 font-semibold text-white ">
          {selectOption}
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
            className="min-w-40 text-gray-700 origin-top-right bg-gray-700  rounded-xl  p-1 text-sm/6"
          >
            <MenuItem>
              <button
                onClick={() => {
                  setSelectOption("Document Status");
                  handleFilter("Document Status");
                }}
                className="group flex w-full hover:bg-gray-300 items-center justify-start gap-2 rounded-lg py-1.5 px-3 "
              >
                Document Status
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => {
                  setSelectOption("incoming");
                  handleFilter(documentStatusList.incoming);
                }}
                className="group flex w-full hover:bg-gray-300 items-center justify-start gap-2 rounded-lg py-1.5 px-3 "
              >
                incoming
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => {
                  setSelectOption("received");
                  handleFilter(documentStatusList.delayed);
                }}
                className="group flex w-full hover:bg-gray-300 items-center justify-start gap-2 rounded-lg py-1.5 px-3 "
              >
                received
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => {
                  setSelectOption("delayed");
                  handleFilter(documentStatusList.received);
                }}
                className="group flex w-full hover:bg-gray-300 items-center justify-start gap-2 rounded-lg py-1.5 px-3 "
              >
                delayed
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}

Status.propTypes = {
  // data: PropTypes.array,
  // option: PropTypes.any,
  handleFilter: PropTypes.func,
};
