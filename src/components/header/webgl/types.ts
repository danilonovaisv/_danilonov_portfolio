export interface NavItem {
  label: string;
  link: string;
}

export interface FluidGlassBarProps {
  navItems?: NavItem[];
  barProps?: {
    transmission?: number;
    roughness?: number;
    thickness?: number;
    ior?: number;
    color?: string;
    attenuationColor?: string;
    attenuationDistance?: number;
  };
  eventSource?: HTMLElement | null;
  followPointer?: boolean;
  className?: string;
}
