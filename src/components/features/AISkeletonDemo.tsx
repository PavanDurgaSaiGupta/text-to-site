import { useState, useEffect } from 'react';

export const AISkeletonDemo = () => {
  const [tick, setTick] = useState(0);
  const [exercise, setExercise] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 50);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setExercise(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getCoords = () => {
    const t = tick * 0.2;
    let head = { x: 50, y: 30 };
    let neck = { x: 50, y: 40 };
    let spine = { x: 50, y: 60 };
    let lShoulder, rShoulder, lElbow, rElbow, lHand, rHand;
    let lHip, rHip, lKnee, rKnee, lFoot, rFoot;

    if (exercise === 0) {
      // Jumping Jacks
      const jump = Math.abs(Math.sin(t));
      const armAngle = jump * Math.PI * 0.8;
      const legSpread = jump * 15;
      head.y = 30 - jump * 5;
      neck.y = 40 - jump * 5;
      spine.y = 60 - jump * 5;
      lShoulder = { x: 40, y: neck.y };
      rShoulder = { x: 60, y: neck.y };
      lElbow = { x: 40 - 15 * Math.cos(armAngle), y: neck.y - 15 * Math.sin(armAngle) };
      rElbow = { x: 60 + 15 * Math.cos(armAngle), y: neck.y - 15 * Math.sin(armAngle) };
      lHand = { x: lElbow.x - 10 * Math.cos(armAngle), y: lElbow.y - 10 * Math.sin(armAngle) };
      rHand = { x: rElbow.x + 10 * Math.cos(armAngle), y: rElbow.y - 10 * Math.sin(armAngle) };
      lHip = { x: 45, y: spine.y };
      rHip = { x: 55, y: spine.y };
      lKnee = { x: 45 - legSpread / 2, y: spine.y + 15 };
      rKnee = { x: 55 + legSpread / 2, y: spine.y + 15 };
      lFoot = { x: 45 - legSpread, y: 90 - jump * 5 };
      rFoot = { x: 55 + legSpread, y: 90 - jump * 5 };
    } else if (exercise === 1) {
      // Squats
      const squat = (Math.sin(t) + 1) / 2;
      const depth = squat * 20;
      head.y = 30 + depth;
      neck.y = 40 + depth;
      spine.y = 60 + depth;
      lShoulder = { x: 40, y: neck.y };
      rShoulder = { x: 60, y: neck.y };
      lElbow = { x: 35, y: neck.y + 10 };
      rElbow = { x: 65, y: neck.y + 10 };
      lHand = { x: 45, y: neck.y + 5 };
      rHand = { x: 55, y: neck.y + 5 };
      lHip = { x: 45, y: spine.y };
      rHip = { x: 55, y: spine.y };
      lKnee = { x: 35, y: spine.y + 15 };
      rKnee = { x: 65, y: spine.y + 15 };
      lFoot = { x: 45, y: 90 };
      rFoot = { x: 55, y: 90 };
    } else {
      // Lunges
      const lunge = Math.abs(Math.sin(t));
      const depth = lunge * 15;
      head.y = 30 + depth;
      neck.y = 40 + depth;
      spine.y = 60 + depth;
      lShoulder = { x: 40, y: neck.y };
      rShoulder = { x: 60, y: neck.y };
      lElbow = { x: 35, y: neck.y + 10 };
      rElbow = { x: 65, y: neck.y + 10 };
      lHand = { x: 42, y: spine.y - 5 };
      rHand = { x: 58, y: spine.y - 5 };
      lHip = { x: 45, y: spine.y };
      rHip = { x: 55, y: spine.y };
      lKnee = { x: 35, y: spine.y + 15 };
      rKnee = { x: 65, y: spine.y + 15 };
      lFoot = { x: 35, y: 90 };
      rFoot = { x: 65, y: 85 };
    }

    return { head, neck, spine, lShoulder, rShoulder, lElbow, rElbow, lHand, rHand, lHip, rHip, lKnee, rKnee, lFoot, rFoot };
  };

  const coords = getCoords();
  const scanY = (Math.sin(tick * 0.1) + 1) * 50;

  const Bone = ({ p1, p2 }: { p1: { x: number; y: number }; p2: { x: number; y: number } }) => (
    <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#39ff14" strokeWidth="3" strokeLinecap="round" />
  );

  const Joint = ({ p }: { p: { x: number; y: number } }) => (
    <circle cx={p.x} cy={p.y} r="2.5" fill="#ff3333" />
  );

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-[#0a0a0a] overflow-hidden border-4 border-gray-800">
      {/* Grid */}
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#1a4d1a 1px, transparent 1px)', backgroundSize: '15px 15px', opacity: 0.5 }} />

      {/* Scan Line */}
      <div className="absolute w-full h-[2px] bg-red-500 opacity-80 shadow-[0_0_15px_#ff0000] z-20" style={{ top: `${scanY}%` }} />

      {/* Recording Badge */}
      <div className="absolute top-4 left-4 text-xs font-mono text-red-500 font-bold flex items-center gap-2 z-20">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        REC [AI_ACTIVE]
      </div>

      {/* FPS Counter */}
      <div className="absolute top-4 right-4 text-xs font-mono text-red-500 border border-red-500 px-2 py-1 z-20">
        FPS: 60
      </div>

      {/* Skeleton */}
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible relative z-10 p-8">
        {/* Body */}
        <Bone p1={coords.head} p2={coords.neck} />
        <Bone p1={coords.neck} p2={coords.spine} />

        {/* Arms */}
        <Bone p1={coords.neck} p2={coords.lShoulder} />
        <Bone p1={coords.lShoulder} p2={coords.lElbow} />
        <Bone p1={coords.lElbow} p2={coords.lHand} />
        <Bone p1={coords.neck} p2={coords.rShoulder} />
        <Bone p1={coords.rShoulder} p2={coords.rElbow} />
        <Bone p1={coords.rElbow} p2={coords.rHand} />

        {/* Legs */}
        <Bone p1={coords.spine} p2={coords.lHip} />
        <Bone p1={coords.lHip} p2={coords.lKnee} />
        <Bone p1={coords.lKnee} p2={coords.lFoot} />
        <Bone p1={coords.spine} p2={coords.rHip} />
        <Bone p1={coords.rHip} p2={coords.rKnee} />
        <Bone p1={coords.rKnee} p2={coords.rFoot} />

        {/* Head */}
        <circle cx={coords.head.x} cy={coords.head.y} r="5" stroke="#39ff14" strokeWidth="2" fill="none" />

        {/* Joints */}
        <Joint p={coords.neck} />
        <Joint p={coords.lShoulder} />
        <Joint p={coords.rShoulder} />
        <Joint p={coords.lElbow} />
        <Joint p={coords.rElbow} />
        <Joint p={coords.lHand} />
        <Joint p={coords.rHand} />
        <Joint p={coords.spine} />
        <Joint p={coords.lHip} />
        <Joint p={coords.rHip} />
        <Joint p={coords.lKnee} />
        <Joint p={coords.rKnee} />
        <Joint p={coords.lFoot} />
        <Joint p={coords.rFoot} />
      </svg>

      {/* Status */}
      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-red-500 leading-tight z-20">
        MODE: {exercise === 0 ? 'JUMPING_JACKS' : exercise === 1 ? 'SQUAT_ANALYSIS' : 'LUNGE_TRACKING'}
        <br />
        CONFIDENCE: 98%
        <br />
        CALIBRATED: YES
      </div>
    </div>
  );
};
