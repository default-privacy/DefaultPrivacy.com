import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export const LogoBlueprint = ({ className, ...props }: ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 380.6 382.3"
    role="img"
    aria-label="Logo Blueprint"
    className={cn("h-full w-full text-primary", className)}
    {...props}
  >
    <defs>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="glowStrong" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <pattern id="gridBlueprint" width="19" height="19" patternUnits="userSpaceOnUse">
        <path
          d="M 19 0 L 0 0 0 19"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.25"
        />
      </pattern>

      <pattern id="gridFineBlueprint" width="4.75" height="4.75" patternUnits="userSpaceOnUse">
        <path
          d="M 4.75 0 L 0 0 0 4.75"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.25"
          opacity="0.12"
        />
      </pattern>
    </defs>

    <style>{`
      .blueprint-line {
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .construction-line {
        stroke-dasharray: 4 4;
        opacity: 0.35;
      }
      .guide-line {
        opacity: 0.2;
      }
      .anchor-point {
        fill: none;
        stroke: currentColor;
        opacity: 0.5;
      }
      .main-shape {
        opacity: 0.6;
        transition: opacity 0.5s ease, filter 0.5s ease;
      }
      .prohibition-shape {
        opacity: 0.85;
        transition: opacity 0.5s ease, filter 0.5s ease;
      }

      @keyframes drawLine {
        from { stroke-dashoffset: 2000; }
        to { stroke-dashoffset: 0; }
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 0.85; }
      }

      @keyframes pulse {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 0.9; }
      }

      @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .animate-draw {
        stroke-dasharray: 2000;
        stroke-dashoffset: 2000;
        animation: drawLine 2.5s ease-out forwards;
      }

      .animate-draw-delayed {
        stroke-dasharray: 2000;
        stroke-dashoffset: 2000;
        animation: drawLine 2s ease-out 0.5s forwards;
      }

      .animate-fade {
        opacity: 0;
        animation: fadeIn 1s ease-out 1s forwards;
      }

      .animate-pulse {
        animation: pulse 3s ease-in-out infinite;
      }

      .animate-rotate {
        transform-origin: 176px 191px;
        animation: rotate 90s linear infinite;
      }

      svg:hover .main-shape {
        opacity: 0.85;
        filter: url(#glow);
      }
      svg:hover .prohibition-shape {
        opacity: 1;
        filter: url(#glowStrong);
      }
      svg:hover .anchor-point {
        opacity: 0.9;
      }
    `}</style>

    <rect width="380.6" height="382.3" fill="url(#gridFineBlueprint)" />
    <rect width="380.6" height="382.3" fill="url(#gridBlueprint)" />

    <g className="animate-rotate" style={{ opacity: 0.15 }}>
      <circle
        cx="176"
        cy="191"
        r="200"
        className="blueprint-line construction-line"
        strokeWidth="0.5"
      />
      <circle
        cx="176"
        cy="191"
        r="195"
        className="blueprint-line construction-line"
        strokeWidth="0.5"
      />
    </g>

    <circle
      cx="176.1"
      cy="191.2"
      r="131.3"
      className="blueprint-line main-shape animate-draw"
      strokeWidth="1.5"
    />

    <circle
      cx="176.1"
      cy="191.2"
      r="87.4"
      className="blueprint-line construction-line animate-draw-delayed"
      strokeWidth="0.75"
    />
    <circle cx="176.1" cy="191.2" r="95" className="blueprint-line guide-line" strokeWidth="0.5" />

    <line
      x1="176.1"
      y1="0"
      x2="176.1"
      y2="382.3"
      className="blueprint-line guide-line"
      strokeWidth="0.5"
    />
    <line
      x1="0"
      y1="191.2"
      x2="380.6"
      y2="191.2"
      className="blueprint-line guide-line"
      strokeWidth="0.5"
    />

    <line
      x1="54"
      y1="69"
      x2="298"
      y2="313"
      className="blueprint-line guide-line"
      strokeWidth="0.5"
    />
    <line
      x1="298"
      y1="69"
      x2="54"
      y2="313"
      className="blueprint-line guide-line"
      strokeWidth="0.5"
    />

    <path
      d="M170.8,0H0v382.3h171.4c119.8,0,209.2-69.3,209.2-191.4S291.2,0,170.8,0ZM176.1,322.5c-72.5,0-131.3-58.8-131.3-131.3S103.6,59.8,176.1,59.8s131.3,58.8,131.3,131.3-58.8,131.3-131.3,131.3Z"
      className="blueprint-line main-shape animate-draw"
      strokeWidth="1.5"
    />

    <path
      d="M176.1,103.7c-17.1,0-33.1,5-46.5,13.6l120.4,120.3c8.5-13.4,13.5-29.3,13.5-46.5,0-48.2-39.2-87.4-87.4-87.4Z"
      className="blueprint-line prohibition-shape animate-draw-delayed"
      strokeWidth="2"
      filter="url(#glow)"
    />

    <path
      d="M176.1,278.6c17.1,0,33.1-5,46.5-13.6l-120.4-120.3c-8.5,13.4-13.5,29.3-13.5,46.5,0,48.2,39.2,87.4,87.4,87.4Z"
      className="blueprint-line prohibition-shape animate-draw-delayed"
      strokeWidth="2"
      filter="url(#glow)"
    />

    <g className="guide-line" style={{ opacity: 0.25 }}>
      <line x1="-10" y1="0" x2="30" y2="0" className="blueprint-line" strokeWidth="0.5" />
      <line x1="0" y1="-10" x2="0" y2="30" className="blueprint-line" strokeWidth="0.5" />

      <line x1="-10" y1="382.3" x2="30" y2="382.3" className="blueprint-line" strokeWidth="0.5" />
      <line x1="0" y1="352" x2="0" y2="392" className="blueprint-line" strokeWidth="0.5" />

      <line x1="370" y1="191" x2="390" y2="191" className="blueprint-line" strokeWidth="0.5" />
    </g>

    <g className="anchor-point animate-pulse">
      <circle cx="176.1" cy="59.8" r="4" strokeWidth="1.5" />
      <circle cx="176.1" cy="59.8" r="1.5" fill="currentColor" />

      <circle cx="176.1" cy="322.5" r="4" strokeWidth="1.5" />
      <circle cx="176.1" cy="322.5" r="1.5" fill="currentColor" />

      <circle cx="44.8" cy="191.2" r="4" strokeWidth="1.5" />
      <circle cx="44.8" cy="191.2" r="1.5" fill="currentColor" />

      <circle cx="307.4" cy="191.2" r="4" strokeWidth="1.5" />
      <circle cx="307.4" cy="191.2" r="1.5" fill="currentColor" />
    </g>

    <g className="anchor-point" style={{ opacity: 0.4 }}>
      <circle cx="129.6" cy="117.3" r="3" strokeWidth="1" />
      <circle cx="222.6" cy="265" r="3" strokeWidth="1" />
      <circle cx="176.1" cy="103.7" r="3" strokeWidth="1" />
      <circle cx="176.1" cy="278.6" r="3" strokeWidth="1" />
    </g>

    <g className="guide-line" style={{ opacity: 0.3 }}>
      <line x1="0" y1="365" x2="380" y2="365" className="blueprint-line" strokeWidth="0.5" />
      <line x1="0" y1="358" x2="0" y2="372" className="blueprint-line" strokeWidth="0.5" />
      <line x1="380" y1="358" x2="380" y2="372" className="blueprint-line" strokeWidth="0.5" />

      <line x1="365" y1="0" x2="365" y2="382" className="blueprint-line" strokeWidth="0.5" />
      <line x1="358" y1="0" x2="372" y2="0" className="blueprint-line" strokeWidth="0.5" />
      <line x1="358" y1="382" x2="372" y2="382" className="blueprint-line" strokeWidth="0.5" />
    </g>

    <g className="anchor-point" style={{ opacity: 0.35 }}>
      <circle cx="0" cy="0" r="2.5" strokeWidth="1" />
      <circle cx="0" cy="382.3" r="2.5" strokeWidth="1" />
      <circle cx="170.8" cy="0" r="2.5" strokeWidth="1" />
      <circle cx="171.4" cy="382.3" r="2.5" strokeWidth="1" />
    </g>
  </svg>
)
