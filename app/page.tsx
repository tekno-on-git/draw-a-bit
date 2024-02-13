'use client';

import useDraw from '@/hooks/useDraw';

export default function Home() {
  const { canvasRef } = useDraw();
  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="border border-black rounded-md"
      />
    </div>
  );
}
