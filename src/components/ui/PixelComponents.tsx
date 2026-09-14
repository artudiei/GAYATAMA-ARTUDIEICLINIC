import React from 'react';
import { HOTSLevel } from '../../types/game';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'terracotta' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const PixelButton: React.FC<PixelButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  let variantStyles = 'bg-[#FFB22C] text-[#000000] hover:bg-[#FFC45E] border-[#854836]';
  
  if (variant === 'terracotta') {
    variantStyles = 'bg-[#854836] text-[#F7F7F7] hover:bg-[#9F5742] border-[#5E2F22]';
  } else if (variant === 'secondary') {
    variantStyles = 'bg-[#3D2E27] text-[#F7F7F7] hover:bg-[#523E35] border-[#854836]';
  } else if (variant === 'danger') {
    variantStyles = 'bg-[#9A342D] text-[#F7F7F7] hover:bg-[#B5423B] border-[#591B16]';
  } else if (variant === 'ghost') {
    variantStyles = 'bg-transparent text-[#F7F7F7] hover:bg-[#221B17] border-[#854836]';
  }

  let sizeStyles = 'px-4 py-2 text-sm';
  if (size === 'sm') sizeStyles = 'px-2.5 py-1 text-xs';
  if (size === 'lg') sizeStyles = 'px-6 py-3 text-base';

  return (
    <button
      className={`
        relative font-sans font-bold uppercase tracking-wider
        border-[3px] rounded-none cursor-pointer transition-all duration-75
        active:translate-y-0.5 active:shadow-none
        shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${variantStyles} ${sizeStyles} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

interface PixelBadgeProps {
  hots?: HOTSLevel;
  text?: string;
  variant?: 'c4' | 'c5' | 'c6' | 'default' | 'accent' | 'warning';
}

export const PixelBadge: React.FC<PixelBadgeProps> = ({ hots, text, variant }) => {
  let bg = 'bg-[#3D2E27] text-[#F7F7F7] border-[#854836]';
  let label = text || '';

  if (hots === 'C4' || variant === 'c4') {
    bg = 'bg-[#2E2018] text-[#FFC45E] border-[#FFB22C]';
    label = label || 'C4 ANALYZING';
  } else if (hots === 'C5' || variant === 'c5') {
    bg = 'bg-[#48281E] text-[#F7D8B5] border-[#854836]';
    label = label || 'C5 EVALUATING';
  } else if (hots === 'C6' || variant === 'c6') {
    bg = 'bg-[#381B13] text-[#FFB22C] border-[#FFB22C]';
    label = label || 'C6 CREATING';
  } else if (variant === 'accent') {
    bg = 'bg-[#FFB22C] text-[#000000] font-bold border-[#854836]';
  } else if (variant === 'warning') {
    bg = 'bg-[#854836] text-[#F7F7F7] border-[#5E2F22]';
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-pixel tracking-wider border-[2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] ${bg}`}>
      {label}
    </span>
  );
};

interface PixelGaugeProps {
  label: string;
  value: number; // 0..100
  max?: number;
  colorType?: 'tension' | 'rapport';
  showPercent?: boolean;
}

export const PixelGauge: React.FC<PixelGaugeProps> = ({
  label,
  value,
  max = 100,
  colorType = 'tension',
  showPercent = true
}) => {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  let barBg = 'bg-[#FFB22C]';
  if (colorType === 'tension') {
    if (percent > 65) barBg = 'bg-[#EF4444]';
    else if (percent > 35) barBg = 'bg-[#854836]';
    else barBg = 'bg-[#10B981]';
  } else {
    // Rapport
    if (percent > 65) barBg = 'bg-[#10B981]';
    else if (percent > 35) barBg = 'bg-[#FFB22C]';
    else barBg = 'bg-[#854836]';
  }

  return (
    <div className="flex flex-col gap-1 w-full font-sans">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold tracking-wide text-[#F7F7F7] flex items-center gap-1.5">
          {label}
        </span>
        {showPercent && (
          <span className="font-mono font-bold text-xs text-[#FFB22C]">
            {Math.round(percent)}%
          </span>
        )}
      </div>

      <div className="w-full h-4 bg-[#120E0C] border-[2px] border-[#854836] shadow-[inset_1px_1px_0px_0px_rgba(0,0,0,0.8)] relative p-0.5 flex items-center">
        {/* Animated Bar Fill */}
        <div
          className={`h-full transition-all duration-500 ease-out ${barBg} shadow-[inset_0_2px_0_rgba(255,255,255,0.3)]`}
          style={{ width: `${percent}%` }}
        />
        {/* Retro Grid Notch Lines */}
        <div className="absolute inset-0 grid grid-cols-10 pointer-events-none opacity-25">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="border-r border-black h-full" />
          ))}
        </div>
      </div>
    </div>
  );
};
