"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BIODATA } from "@/data/biodata";
import { sounds } from "@/lib/soundEffects";
import { GithubIcon } from "@/components/ui/Icons";

export function LanyardCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Physics simulation state: Ultra-fast drop plunge with vy: 2600 px/s
  const physicsRef = useRef({
    x: 0,
    y: -350,
    vx: 0,
    vy: 2600, // Lightning fast initial plunge
    angle: 0.1,
    angularVelocity: 0,
    targetX: 0,
    targetY: 110,
    anchorX: 0,
    anchorY: -20,
    restLength: 110,
    dragOffset: { x: 0, y: 0 },
    lastPointer: { x: 0, y: 0, time: 0 },
    isPointerDown: false,
    tiltX: 0,
    tiltY: 0,
    hasSnappedOnce: false,
  });

  const [physicsState, setPhysicsState] = useState({
    x: 0,
    y: -350,
    angle: 5,
    tiltX: 0,
    tiltY: 0,
  });

  // High-precision Physics Simulation with Ultra-Fast Drop & Punchy Kepental Rebound
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const updatePhysics = (currentTime: number) => {
      const frameDelta = Math.min((currentTime - lastTime) / 1000, 0.033);
      lastTime = currentTime;

      const p = physicsRef.current;
      const subSteps = 5;
      const dt = frameDelta / subSteps;

      for (let step = 0; step < subSteps; step++) {
        if (p.isPointerDown) {
          // Direct, smooth spring follow when dragged
          const dx = p.targetX - p.x;
          const dy = p.targetY - p.y;

          p.vx = dx * 26;
          p.vy = dy * 26;

          p.x += p.vx * dt;
          p.y += p.vy * dt;

          const targetAngle = Math.max(
            -0.35,
            Math.min(0.35, (p.x - p.anchorX) / 220)
          );
          p.angle += (targetAngle - p.angle) * 18 * dt;
          p.angularVelocity = 0;
        } else {
          // Natural Harmonic Pendulum & Spring Mechanics
          const dx = p.x - p.anchorX;
          const dy = p.y - p.anchorY;
          const currentDist = Math.hypot(dx, dy);

          // Fast downward gravity acceleration
          const gravity = 2200;
          p.vy += gravity * dt;

          // Strong snappy spring tension launches the card upward ("kepental")
          if (dy > p.restLength) {
            const delta = currentDist - p.restLength;
            // High spring stiffness creates the lightning-fast bungee snap
            const tension = delta * 380;
            const nx = dx / currentDist;
            const ny = dy / currentDist;
            p.vx -= nx * tension * dt;
            p.vy -= ny * tension * dt;

            // Trigger sound & rotational kick on first snap impact
            if (!p.hasSnappedOnce && p.vy > 400) {
              p.hasSnappedOnce = true;
              p.angularVelocity = (Math.random() > 0.5 ? 6 : -6);
              sounds.playLanyardRelease();
            }
          }

          // Angle smoothly aligns with horizontal displacement
          const naturalAngle = Math.max(-0.35, Math.min(0.35, dx / 240));
          const angleDiff = naturalAngle - p.angle;
          p.angularVelocity += angleDiff * 75 * dt;
          p.angularVelocity *= Math.pow(0.92, dt * 60); // Angular damping
          p.angle += p.angularVelocity * dt;

          // Air damping for natural decay
          p.vx *= Math.pow(0.94, dt * 60);
          p.vy *= Math.pow(0.94, dt * 60);

          p.x += p.vx * dt;
          p.y += p.vy * dt;

          // 3D perspective tilt recovery
          p.tiltX += (0 - p.tiltX) * 14 * dt;
          p.tiltY += (0 - p.tiltY) * 14 * dt;
        }
      }

      setPhysicsState({
        x: p.x,
        y: p.y,
        angle: p.angle * (180 / Math.PI),
        tiltX: p.tiltX,
        tiltY: p.tiltY,
      });

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Pointer Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;

    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    const rect = container.getBoundingClientRect();
    const clientX = e.clientX - (rect.left + rect.width / 2);
    const clientY = e.clientY - rect.top;

    const p = physicsRef.current;
    p.isPointerDown = true;
    p.hasSnappedOnce = true;
    setIsDragging(true);
    sounds.playLanyardGrab();

    p.dragOffset = {
      x: p.x - clientX,
      y: p.y - clientY,
    };
    p.lastPointer = { x: clientX, y: clientY, time: performance.now() };
    p.targetX = clientX + p.dragOffset.x;
    p.targetY = Math.max(40, clientY + p.dragOffset.y);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const clientX = e.clientX - (rect.left + rect.width / 2);
    const clientY = e.clientY - rect.top;

    const p = physicsRef.current;

    if (p.isPointerDown) {
      p.targetX = clientX + p.dragOffset.x;
      p.targetY = Math.max(30, clientY + p.dragOffset.y);

      const now = performance.now();
      const dt = (now - p.lastPointer.time) / 1000;
      if (dt > 0.004) {
        p.tiltY = Math.max(-12, Math.min(12, (clientX - p.lastPointer.x) * 0.35));
        p.tiltX = Math.max(-12, Math.min(12, -(clientY - p.lastPointer.y) * 0.35));
        p.lastPointer = { x: clientX, y: clientY, time: now };
      }
    } else {
      // Subtle 3D perspective tilt on hover
      const dist = Math.hypot(clientX - p.x, clientY - p.y);
      if (dist < 260) {
        p.tiltY = ((clientX - p.x) / 100) * 5;
        p.tiltX = -((clientY - p.y) / 100) * 5;
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const p = physicsRef.current;
    if (p.isPointerDown) {
      p.isPointerDown = false;
      setIsDragging(false);
      sounds.playLanyardRelease();
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  // SVG Coordinates for Seamless Ribbon Lanyard
  const svgCenterX = 200;
  const topAnchorY = -30;
  const clipX = svgCenterX + physicsState.x;
  const clipY = physicsState.y;

  const midX = (svgCenterX + clipX) / 2;
  const midY = (topAnchorY + clipY) / 2 + Math.max(0, 10 - Math.abs(physicsState.x) * 0.05);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative w-[400px] h-[560px] select-none flex justify-center items-start touch-none overflow-visible mx-auto pt-0"
    >
      {/* Seamless Realistic Lanyard Ribbon & Swivel Clasp (SVG) */}
      <svg className="absolute -top-6 left-0 w-full h-[calc(100%+30px)] pointer-events-none overflow-visible z-10">
        <defs>
          <linearGradient id="lanyardFabricGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="30%" stopColor="#1e293b" />
            <stop offset="70%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="chromeClaspGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="30%" stopColor="#f8fafc" />
            <stop offset="60%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
        </defs>

        {/* Outer Ribbon Shadow */}
        <path
          d={`M ${svgCenterX} ${topAnchorY + 24} Q ${midX} ${midY + 24} ${clipX} ${clipY + 24}`}
          fill="none"
          stroke="rgba(0,0,0,0.4)"
          strokeWidth="20"
          strokeLinecap="round"
        />

        {/* Main Ribbon Strap (18px Woven Fabric Strap) */}
        <path
          d={`M ${svgCenterX} ${topAnchorY + 24} Q ${midX} ${midY + 24} ${clipX} ${clipY + 24}`}
          fill="none"
          stroke="url(#lanyardFabricGrad)"
          strokeWidth="18"
          strokeLinecap="round"
        />

        {/* Center Cyan Accent Thread Weave */}
        <path
          d={`M ${svgCenterX} ${topAnchorY + 24} Q ${midX} ${midY + 24} ${clipX} ${clipY + 24}`}
          fill="none"
          stroke="#00f2fe"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity="0.85"
        />

        {/* Metallic Crimp Ferrule at Strap Bottom */}
        <g transform={`translate(${clipX}, ${clipY + 16})`}>
          <rect
            x="-9"
            y="-4"
            width="18"
            height="8"
            rx="2"
            fill="url(#chromeClaspGrad)"
            stroke="#0f172a"
            strokeWidth="0.5"
          />
        </g>

        {/* Metal Swivel Clasp Connected Directly To Card Top Hole */}
        <g transform={`translate(${clipX}, ${clipY + 24})`}>
          {/* Swivel Ring */}
          <ellipse
            cx="0"
            cy="-2"
            rx="7"
            ry="3.5"
            fill="none"
            stroke="url(#chromeClaspGrad)"
            strokeWidth="2.5"
          />
          {/* Lobster Clip Hook Body */}
          <path
            d="M -3 -1 L -3 8 Q -3 11 0 11 Q 3 11 3 8 L 3 -1 Z"
            fill="url(#chromeClaspGrad)"
            stroke="#0f172a"
            strokeWidth="0.5"
          />
          {/* Hook Clasp Entering Card Hole */}
          <path
            d="M -3.5 7 L -1 16 L 1 16 L 3.5 7 Z"
            fill="url(#chromeClaspGrad)"
          />
        </g>
      </svg>

      {/* Crystal Clear Portrait Photo Nametag Card */}
      <div
        onPointerDown={handlePointerDown}
        style={{
          transform: `translate3d(${physicsState.x}px, ${physicsState.y}px, 0) rotateZ(${physicsState.angle}deg) rotateY(${physicsState.tiltY}deg) rotateX(${physicsState.tiltX}deg)`,
          transformOrigin: "top center",
          cursor: isDragging ? "grabbing" : "grab",
          transition: isDragging ? "none" : "transform 0.05s ease-out",
        }}
        className="absolute top-0 z-20 w-[275px] h-[395px] rounded-2xl bg-[#090d16] border border-slate-700/80 shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(0,242,254,0.15)] overflow-hidden flex flex-col justify-between select-none hover:border-cyan-400/60 transition-colors"
      >
        {/* Top Metallic Attachment Slot Bar */}
        <div className="relative w-full h-8 bg-[#0f172a] border-b border-slate-800 flex items-center justify-between px-3.5 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-[10px] font-mono font-bold text-white tracking-wider">
              DEVARA.SYS
            </span>
          </div>

          {/* Top Hole where Metal Hook penetrates */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-black rounded-full border border-slate-700 shadow-inner" />

          <span className="text-[8.5px] font-mono text-cyan-400 font-semibold uppercase tracking-wider">
            ID PASS
          </span>
        </div>

        {/* 100% Crystal Clear Full Portrait Photo */}
        <div className="relative flex-1 w-full bg-slate-950 overflow-hidden">
          <Image
            src="/assets/siganteng.jpg"
            alt="Muhammad Devara"
            fill
            className="object-cover object-center"
            priority
            sizes="275px"
          />
        </div>

        {/* Bottom Clean ID Details Bar */}
        <div className="w-full bg-[#090d16] border-t border-slate-800 p-3 flex flex-col gap-1 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold font-mono text-white leading-tight">
                {BIODATA.name}
              </h3>
              <p className="text-[10.5px] font-mono text-cyan-400 font-semibold">
                Backend Architect
              </p>
            </div>

            <a
              href={BIODATA.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors"
              title="GitHub Profile"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex items-center justify-between text-[8px] font-mono text-slate-500 pt-1 border-t border-slate-800/80">
            <span>ID: DVR-9902-SYS</span>
            <span className="text-emerald-400 font-bold">VERIFIED_STAFF</span>
          </div>
        </div>
      </div>

      {/* Helper drag indicator */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 text-[10px] font-mono text-slate-400 bg-slate-950/90 px-3 py-1 rounded-full border border-slate-800 shadow-md">
        Tarik & Goyang Nametag dengan Kursor
      </div>
    </div>
  );
}
