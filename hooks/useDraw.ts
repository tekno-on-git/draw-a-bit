import { useEffect, useRef } from 'react';
export const useDraw = (
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      //   console.log(computePoint(e));
      const currentPt = computePoint(e);

      const ctx = canvasRef.current?.getContext('2d');

      if (!ctx || !currentPt) return;
    };

    const computePoint = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      return { x, y };
    };
    //Add event listeners
    const curCanvas = canvasRef.current;
    curCanvas?.addEventListener('mousemove', handler);

    //remove event listeners
    return () => curCanvas?.addEventListener('mousemove', handler);
  }, []);

  return { canvasRef };
};

export default useDraw;
