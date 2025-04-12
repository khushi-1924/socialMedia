import React, { useState, useContext } from "react";
import userContext from "../contexts/users/UserContext";

const EditCard = () => {
  const context1 = useContext(userContext);
  const {
    user,
    selectedFont,
    selectedColor,
    selectedText,
    setSelectedFont,
    setSelectedColor,
    setSelectedText,
    savePreferences,
  } = context1;

  const fontOptions = [
    { name: "Bungee Tint", value: "Bungee Tint" },
    { name: "DynaPuff", value: "DynaPuff" },
    {
      name: "Special Gothic Expanded One",
      value: "Special Gothic Expanded One",
    },
    { name: "Inria Sans", value: "Inria Sans" },
    { name: "Underdog", value: "Underdog" },
    { name: "Winky Rough", value: " Winky Rough" },
  ];

  const bgColorOptions = [
    "#FFB6C1",
    "#ADD8E6",
    "#90EE90",
    "#FFFACD",
    "#D3D3D3",
    "#D3C0E2",
    "#A188BD",
  ];

  const handleSave = () => {
    localStorage.setItem("selectedFont", selectedFont);
    localStorage.setItem("selectedColor", selectedColor);
    localStorage.setItem("selectedText", selectedText);
    savePreferences(selectedFont, selectedColor, selectedText);
    alert("changes made successfully!")
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div
        className="w-full h-40 flex flex-col items-center justify-center"
        style={{
          backgroundColor: selectedColor,
          fontFamily: selectedFont,
        }}
      >
        <p className=" font-bold text-2xl">{selectedText}</p>
      </div>

      {/* font selection */}
      <div className="w-1/2 grid grid-cols-2 mt-4">
      <h2 className="my-2 text-lg font-semibold text-white">Choose Font</h2>
      <select
        className="p-2 rounded bg-sky-50 text-black"
        value={selectedFont}
        onChange={(e) => setSelectedFont(e.target.value)}
      >
        {fontOptions.map((font) => (
          <option
            key={font.value}
            value={font.value}
            style={{ fontFamily: font.value }}
          >
            {font.name}
          </option>
        ))}
      </select>
      </div>

      {/* bg colour selection */}
      <div className="w-1/2 grid grid-cols-2 mt-4">
      <h2 className="my-2 text-lg font-semibold text-white">
        Choose Background
      </h2>
      <div className="flex space-x-2">
        {bgColorOptions.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className="w-10 h-10 rounded-full border-2"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      </div>

      {/* text input */}
      <div className="w-1/2 grid grid-cols-2 mt-4">
      <h2 className="text-lg font-semibold text-white">Your text</h2>
      <input
        type="text"
        placeholder="enter text"
        className="p-2 px-5 rounded-full text-lg font-semibold text-white outline-none border border-white"
        value={selectedText}
        onChange={(e) => setSelectedText(e.target.value)}
      /></div>
      

      <button
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSave}
      >
        save changes
      </button>
    </div>
  );
};

export default EditCard;
