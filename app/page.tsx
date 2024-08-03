"use client";

import useDraw from "@/hooks/useDraw";
import { useState } from "react";
import { ChromePicker } from "react-color";

export default function Home() {
  const [color, setColor] = useState<string>("#000");
  const [lineWidth, setLineWidth] = useState<number>(5);
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);
  const [darkMode, setDarkMode] = useState(false);

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = color;
    const linewidth = lineWidth;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = linewidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  return (
    <div
      className={`w-screen h-screen flex justify-center items-center ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div
        className={`flex flex-col gap-10 p-10 rounded-md mr-2 h-[600px] ${
          darkMode ? "bg-gray-500" : "bg-gray-300"
        }`}
      >
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className={` bg-white rounded-md p-2 mb-2 ${
              !darkMode && " bg-gray-700  border border-black rounded-md"
            }`}
            onClick={() => {
              setDarkMode(!darkMode);
            }}
          >
            {darkMode ? "☀️ Light Mode" : "🌒 Dark Mode"}
          </button>
          <label htmlFor="number">Line Width: </label>
          <input
            type="number"
            placeholder="5"
            className="p-2 rounded-md border-black"
            onChange={(e) => {
              let lw = parseInt(e.target.value == "" ? "5" : e.target.value);
              if (lw > 15) {
                alert("Line width should be less than 15");
                return;
              }
              setLineWidth(lw);
            }}
          />
        </div>
        <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
        <button
          type="button"
          onClick={clear}
          className={`bg-gray-300 rounded-md p-2 ${
            !darkMode && "border border-black rounded-md"
          }`}
        >
          Clear Canvas
        </button>
      </div>
      <canvas
        onMouseDown={onMouseDown}
        ref={canvasRef}
        width={600}
        height={600}
        className={`border border-black rounded-md bg-white ${
          darkMode && "border-white bg-black"
        }`}
      />
    </div>
  );
}
