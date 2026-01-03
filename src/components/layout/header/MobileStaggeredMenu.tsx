'use client';

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Instagram, Linkedin, Mail } from 'lucide-react';
import { SOCIALS } from '@/config/navigation';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface MobileStaggeredMenuProps {
  navItems: NavItem[];
  logoUrl: string;
  gradient?: [string, string];
  accentColor: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNavigate: (_href: string) => void;
}

export default function MobileStaggeredMenu({
  navItems,
  logoUrl,
  accentColor = '#0057FF',
  isOpen,
  onOpen,
  onClose,
  onNavigate,
}: MobileStaggeredMenuProps) {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  // Refs for GSAP animations
  const panelRef = useRef<HTMLElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const itemsRef = useRef<HTMLElement[]>([]);
  const socialsRef = useRef<HTMLDivElement>(null);

  // Icon animation refs
  const plusHRef = useRef<HTMLSpanElement>(null);
  const plusVRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  // Text animation refs
  const textInnerRef = useRef<HTMLSpanElement>(null);
  const [textLines, setTextLines] = useState<string[]>(['Menu', 'Close']);

  // Animation refs
  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const busyRef = useRef(false);

  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  // Sync with external isOpen prop
  useEffect(() => {
    if (isOpen !== openRef.current) {
      if (isOpen) {
        openRef.current = true;
        setOpen(true);
        playOpen();
        animateIcon(true);
        animateText(true);
      } else {
        openRef.current = false;
        setOpen(false);
        playClose();
        animateIcon(false);
        animateText(false);
      }
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openRef.current) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Focus trap
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const focusableElements = panelRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    firstElement?.focus();
    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [open]);

  // Initialize GSAP
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      // Get pre-layers
      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(
          preContainer.querySelectorAll('.sm-prelayer')
        ) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      // Initial states - offscreen right
      gsap.set([panel, ...preLayers], { xPercent: 100 });

      // Icon initial state (plus sign)
      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });

      // Text initial state
      gsap.set(textInner, { yPercent: 0 });
    });
    return () => ctx.revert();
  }, []);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();

    const itemEls = itemsRef.current;
    const socialsEl = socialsRef.current;
    const socialLinks = socialsEl
      ? Array.from(socialsEl.querySelectorAll('.sm-social-link'))
      : [];
    const socialTitle = socialsEl?.querySelector('.sm-social-title');

    // Get current states for smooth animation
    const layerStates = layers.map((el) => ({
      el,
      start: Number(gsap.getProperty(el, 'xPercent')),
    }));
    const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

    // Set initial states for items
    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    // Animate pre-layers staggered
    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.5, ease: 'power4.out' },
        i * 0.07
      );
    });

    // Animate main panel
    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    // Animate items staggered
    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: { each: 0.1, from: 'start' },
        },
        itemsStart
      );
    }

    // Animate socials
    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) {
        tl.to(
          socialTitle,
          { opacity: 1, duration: 0.5, ease: 'power2.out' },
          socialsStart
        );
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    closeTweenRef.current?.kill();

    closeTweenRef.current = gsap.to(all, {
      xPercent: 100,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        // Reset item states for next open
        const itemEls = itemsRef.current;
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

        const socialsEl = socialsRef.current;
        if (socialsEl) {
          const socialTitle = socialsEl.querySelector('.sm-social-title');
          const socialLinks = Array.from(
            socialsEl.querySelectorAll('.sm-social-link')
          );
          if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
          if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        }

        busyRef.current = false;
      },
    });
  }, []);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power3.inOut' } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const cycles = 3;

    const seq: string[] = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);

    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: 'power4.out',
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onOpen();
      playOpen();
    } else {
      onClose();
      playClose();
    }

    animateIcon(target);
    animateText(target);
  }, [onOpen, onClose, playOpen, playClose, animateIcon, animateText]);

  // Ghost theme colors for pre-layers
  const preLayerColors = ['#0a0b1a', '#0d0f26', accentColor + '20'];

  return (
    <div className="lg:hidden">
      {/* Header bar fixed (edge-to-edge glass style) */}
      <header className="fixed top-0 left-0 right-0 z-100 pointer-events-none">
        <div className="w-full h-16 backdrop-blur-md border-b border-white/10 bg-black/20 pointer-events-auto">
          <div className="flex items-center justify-between h-full px-6">
            <Link href="/" onClick={onClose}>
              <Image
                src={logoUrl}
                alt="Danilo"
                width={32}
                height={32}
                className="h-8 w-auto object-contain"
                unoptimized
              />
            </Link>

            <button
              ref={toggleBtnRef}
              type="button"
              onClick={toggleMenu}
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={Boolean(open)}
              className="relative inline-flex items-center gap-2 bg-transparent border-0 cursor-pointer text-white font-medium leading-none overflow-visible z-110"
            >
              {/* Animated text */}
              <span
                className="relative inline-block h-[1em] overflow-hidden whitespace-nowrap"
                aria-hidden="true"
              >
                <span ref={textInnerRef} className="flex flex-col leading-none">
                  {textLines.map((line, i) => (
                    <span
                      className="block h-[1em] leading-none text-sm tracking-wide"
                      key={`${line}-${i}`}
                    >
                      {line}
                    </span>
                  ))}
                </span>
              </span>

              {/* Animated plus/X icon */}
              <span
                ref={iconRef}
                className="relative w-[14px] h-[14px] shrink-0 inline-flex items-center justify-center will-change-transform"
                aria-hidden="true"
              >
                <span
                  ref={plusHRef}
                  className="absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-sm -translate-x-1/2 -translate-y-1/2 will-change-transform"
                />
                <span
                  ref={plusVRef}
                  className="absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-sm -translate-x-1/2 -translate-y-1/2 will-change-transform"
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Pre-layers for staggered reveal animation */}
      <div
        ref={preLayersRef}
        className="fixed top-0 right-0 bottom-0 w-full pointer-events-none z-40"
        aria-hidden="true"
      >
        {preLayerColors.map((color, i) => (
          <div
            key={i}
            className="sm-prelayer absolute top-0 right-0 h-full w-full"
            style={{ background: color }}
          />
        ))}
      </div>

      {/* Main menu panel */}
      <nav
        ref={panelRef}
        id="mobile-menu-panel"
        className="fixed top-0 right-0 w-full h-full bg-gradient-to-b from-[#06071f] to-[#050505] flex flex-col justify-center px-8 overflow-y-auto z-50 pointer-events-auto"
        aria-hidden={!open}
      >
        {/* Menu items */}
        <ul className="flex flex-col gap-4" role="list">
          {navItems.map((item, idx) => (
            <li key={item.href} className="overflow-hidden leading-none">
              <button
                ref={(el) => {
                  if (el) itemsRef.current[idx] = el;
                }}
                onClick={() => onNavigate(item.href)}
                className="sm-panel-item text-4xl xs:text-5xl font-bold tracking-tight text-white hover:text-[#0057FF] transition-colors text-left leading-none uppercase will-change-transform origin-bottom-center"
                style={{ transformOrigin: '50% 100%' }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Social links */}
        <div
          ref={socialsRef}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col gap-4"
        >
          <h3
            className="sm-social-title text-sm font-medium uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Connect
          </h3>
          <div className="flex gap-4">
            {[
              {
                label: 'LinkedIn',
                href: SOCIALS.linkedin,
                icon: <Linkedin className="w-5 h-5" />,
              },
              {
                label: 'Instagram',
                href: SOCIALS.instagram,
                icon: <Instagram className="w-5 h-5" />,
              },
              {
                label: 'Email',
                href: `mailto:${SOCIALS.emailSecondary}`,
                icon: <Mail className="w-5 h-5" />,
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="sm-social-link flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-[#0057FF] hover:border-[#0057FF] hover:scale-110"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
