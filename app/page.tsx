'use client';

import useDraw from '@/hooks/useDraw';
import { useState } from 'react';
import { ChromePicker } from 'react-color';

export default function Home() {
  const [color, setColor] = useState<string>('#000');
  const [lineWidth, setLineWidth] = useState<number>(5);
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

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
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <div className="flex flex-col gap-10 pr-10">
        <div className="flex flex-col gap-2">
          <label htmlFor="number">Line Width: </label>
          <input
            type="number"
            placeholder="5"
            className="p-2 rounded-md border-black"
            onChange={(e) => setLineWidth(parseInt(e.target.value))}
          />
        </div>
        <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
        <button
          type="button"
          onClick={clear}
          className="p-2 rounded-md border border-black "
        >
          Clear Canvas
        </button>
      </div>
      <canvas
        onMouseDown={onMouseDown}
        ref={canvasRef}
        width={600}
        height={600}
        className="border border-black rounded-md"
      />
    </div>
  );
}
