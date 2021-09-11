import { memo } from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className="shadow bg-green-400 text-white h-16 static px-3 w-full">
      <div className="text-3xl h-full flex items-center justify-center font-bold">
        DayPlanner
      </div>
    </div>
  );
};

export default memo(Header);
