import React, { useRef } from "react";
import uncheck from "../assets/uncheck.png";
import tick from "../assets/tick.png";
import delete_icon from "../assets/delete_icon.png";

const Todoitems = ({ text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div className="flex items-center my-3 gap-2">
      <div
        onClick={() => {
          toggle(id);
        }}
        className="flex flex-1 items-center cursor-pointer"
      >
        <img className="w-7" src={isComplete ? tick : uncheck} alt="" />
        <p
          className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${
            isComplete ? "line-through" : ""
          }`}
        >
          {text}
        </p>
      </div>
      <img
        onClick={() => {
          deleteTodo(id); // delete function implementation
        }}
        className="w-3.5 cursor-pointer"
        src={delete_icon}
        alt=""
      />
    </div>
  );
};

export default Todoitems;
