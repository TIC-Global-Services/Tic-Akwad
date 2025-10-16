"use client";
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiPlus } from "react-icons/hi2";
import Container from "@/components/Reusbale/Container";
import { usePathname } from "next/navigation";

// Register GSAP plugin once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// CONSTANTS
const NAV_ITEMS = [
  { name: "About", link: "/about" },
  { name: "Client Portal", link: "/client" },
  { name: "Archive", link: "/archive" },
  { name: "Brand Stories", link: '/brand-stories' },
] as const;

const FULL_NAV_ITEMS = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Client Portal", link: "/client" },
  { name: "Archive", link: "/archive" },
  { name: "Brand Stories", link: '/brand-stories' },
  { name: "Contact", link: "/contact" },
] as const;

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/the.internetcompany/", label: "Instagram" },
  { href: "https://www.linkedin.com/company/tic-global-services/", label: "LinkedIn" },
] as const;

const LOGO_URLS = {
  white: "https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/Frame%206.png?updatedAt=1759756212630",
  black: "https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/Frame%205.png?updatedAt=1759756217013",
} as const;

const WHITE_BG_PATHS = ["/contact", "/archive", "/about"];

const ANIMATION_CONFIG = {
  scrollStart: "50px top",
  scrollEnd: "20px top",
  scrub: 0.5,
  buttonFadeThreshold: 0.3,
  overlayDelay: 0.2,
  contentStagger: 0.05,
} as const;

const Navbar = () => {
  // DOM References
  const refs = {
    navbar: useRef<HTMLElement>(null),
    menuButton: useRef<HTMLButtonElement>(null),
    plusIcon: useRef<HTMLDivElement>(null),
    overlay: useRef<HTMLDivElement>(null),
    menuLinks: useRef<HTMLDivElement>(null),
    socialLinks: useRef<HTMLDivElement>(null),
    overlayLogo: useRef<HTMLDivElement>(null),
  };

  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  
  const pathname = usePathname();
  const isWhiteBg = useMemo(() => WHITE_BG_PATHS.includes(pathname), [pathname]);

  // Calculate current animation state based on scroll position
  const calculateScrollState = useCallback(() => {
    const scrollY = window.scrollY;
    const threshold = 50; // matches scrollStart
    const range = 30; // difference between scrollStart and scrollEnd
    
    let progress = 0;
    if (scrollY > threshold) {
      progress = Math.min(1, (scrollY - threshold) / range);
    }

    const navbarOpacity = Math.max(0, 1 - progress * 2);
    const navbarY = progress * -80;

    const buttonProgress = Math.max(0, (progress - ANIMATION_CONFIG.buttonFadeThreshold) * 2);
    const buttonOpacity = Math.min(1, buttonProgress);
    const buttonScale = 0.8 + buttonOpacity * 0.2;
    const buttonY = -20 + buttonOpacity * 20;

    return {
      navbar: { opacity: navbarOpacity, y: navbarY },
      button: { opacity: buttonOpacity, scale: buttonScale, y: buttonY }
    };
  }, []);

  // Setup initial states
  const setupInitialStates = useCallback(() => {
    const { menuButton, overlay, menuLinks, socialLinks, overlayLogo, navbar } = refs;
    
    if (!menuButton.current || !overlay.current || !navbar.current) return;

    // Calculate initial state based on current scroll position
    const state = calculateScrollState();

    // Set navbar initial state
    gsap.set(navbar.current, {
      opacity: state.navbar.opacity,
      y: state.navbar.y,
    });

    // Set button initial state
    gsap.set(menuButton.current, {
      opacity: state.button.opacity,
      scale: state.button.scale,
      y: state.button.y,
    });

    // Set overlay initial state
    gsap.set(overlay.current, {
      clipPath: "circle(0% at 95% 5%)",
      visibility: "hidden",
    });

    // Set overlay elements initial state
    const overlayElements = [menuLinks.current, socialLinks.current, overlayLogo.current].filter(Boolean);
    if (overlayElements.length > 0) {
      gsap.set(overlayElements, { opacity: 0, y: 50 });
    }
  }, [calculateScrollState]);

  // Setup scroll animations
  const setupScrollAnimations = useCallback(() => {
    const { navbar, menuButton } = refs;
    if (!navbar.current || !menuButton.current) return;

    // Kill existing scroll trigger if any
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: ANIMATION_CONFIG.scrollStart,
      end: ANIMATION_CONFIG.scrollEnd,
      scrub: ANIMATION_CONFIG.scrub,
      onUpdate: (self) => {
        const progress = self.progress;

        // Navbar fade out
        const navbarOpacity = Math.max(0, 1 - progress * 2);
        const navbarY = progress * -80;

        // Menu button fade in
        const buttonProgress = Math.max(0, (progress - ANIMATION_CONFIG.buttonFadeThreshold) * 2);
        const buttonOpacity = Math.min(1, buttonProgress);
        const buttonScale = 0.8 + buttonOpacity * 0.2;
        const buttonY = -20 + buttonOpacity * 20;

        gsap.set(navbar.current, { y: navbarY, opacity: navbarOpacity });
        gsap.set(menuButton.current, { opacity: buttonOpacity, scale: buttonScale, y: buttonY });
      },
    });

    scrollTriggerRef.current = trigger;
    return trigger;
  }, []);

  // Menu animations
  const openMenu = useCallback(() => {
    const { overlay, plusIcon, overlayLogo, menuLinks, socialLinks } = refs;
    if (!overlay.current || !plusIcon.current) return;

    gsap.set(overlay.current, { visibility: "visible" });

    gsap.to(plusIcon.current, {
      rotation: 45,
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(overlay.current, {
      clipPath: "circle(150% at 95% 5%)",
      duration: 0.6,
      ease: "power3.inOut",
    });

    const tl = gsap.timeline({ delay: ANIMATION_CONFIG.overlayDelay });

    if (overlayLogo.current) {
      tl.to(overlayLogo.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }

    if (menuLinks.current) {
      tl.to(menuLinks.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      }, "-=0.3");
    }

    if (socialLinks.current) {
      tl.to(socialLinks.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      }, "-=0.3");
    }
  }, []);

  const closeMenu = useCallback(() => {
    const { plusIcon, overlay, overlayLogo, menuLinks, socialLinks } = refs;
    if (!plusIcon.current || !overlay.current) return;

    const targetRotation = isHovering ? 22.5 : 0;
    gsap.to(plusIcon.current, {
      rotation: targetRotation,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    const overlayElements = [overlayLogo.current, menuLinks.current, socialLinks.current].filter(Boolean);
    if (overlayElements.length > 0) {
      gsap.to(overlayElements, {
        opacity: 0,
        y: 30,
        duration: 0.3,
        ease: "power2.inOut",
        stagger: ANIMATION_CONFIG.contentStagger,
      });
    }

    gsap.to(overlay.current, {
      clipPath: "circle(0% at 95% 5%)",
      duration: 0.4,
      delay: 0.1,
      ease: "power3.inOut",
      onComplete: () => {
        if (overlay.current) {
          gsap.set(overlay.current, { visibility: "hidden" });
        }
      },
    });
  }, [isHovering]);

  const toggleMenu = useCallback(() => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
    setIsMenuOpen((prev) => !prev);
  }, [isMenuOpen, openMenu, closeMenu]);

  const handleHoverEnter = useCallback(() => {
    setIsHovering(true);
    if (!isMenuOpen && refs.plusIcon.current) {
      gsap.to(refs.plusIcon.current, {
        rotation: 22.5,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  }, [isMenuOpen]);

  const handleHoverLeave = useCallback(() => {
    setIsHovering(false);
    if (!isMenuOpen && refs.plusIcon.current) {
      gsap.to(refs.plusIcon.current, {
        rotation: 0,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  }, [isMenuOpen]);

  const handleLinkClick = useCallback(() => {
    if (isMenuOpen) {
      toggleMenu();
    }
  }, [isMenuOpen, toggleMenu]);

  // Initial setup effect
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const setupTimer = setTimeout(() => {
      setupInitialStates();
      setupScrollAnimations();
    }, 50);

    return () => {
      clearTimeout(setupTimer);
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []); // Only run once on mount

  // Handle route changes
  useEffect(() => {
    // Close menu if open
    if (isMenuOpen) {
      closeMenu();
      setIsMenuOpen(false);
    }

    // Reset scroll to top (optional - remove if you don't want this)
    // window.scrollTo(0, 0);

    // Kill existing animations and triggers
    gsap.killTweensOf([refs.navbar.current, refs.menuButton.current]);
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
      scrollTriggerRef.current = null;
    }

    // Reinitialize after a short delay to ensure page has loaded
    const timer = setTimeout(() => {
      setupInitialStates();
      setupScrollAnimations();
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]); // Run whenever pathname changes

  // Helper function for nav link classes with active state
  const getNavLinkClasses = useCallback((itemLink: string) => {
    const isActive = pathname === itemLink;
    return `text-base xl:text-[19px] transition-colors duration-300 relative group ${
      isActive ? "font-bold" : "font-medium"
    } ${
      isWhiteBg ? "text-black hover:text-gray-700" : "text-white hover:text-gray-300"
    }`;
  }, [pathname, isWhiteBg]);

  const ctaButtonClasses = `text-sm sm:text-base lg:text-lg px-3 sm:px-4 py-1 sm:py-1 rounded-full font-medium transition-all duration-300 shadow-lg ${
    isWhiteBg
      ? "bg-transparent text-black border border-black hover:bg-black hover:text-white hover:scale-105"
      : "bg-transparent text-white border border-white hover:bg-white hover:text-black hover:scale-105"
  }`;

  return (
    <>
      {/* Main Navigation */}
      <nav ref={refs.navbar} className="fixed top-0 left-0 right-0 z-40 bg-transparent">
        <Container className="flex items-center justify-between py-4 sm:py-6 lg:py-3">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
              unoptimized
                src={isWhiteBg ? LOGO_URLS.white : LOGO_URLS.black}
                alt="The Internet Company Logo"
                width={200}
                height={100}
                className="h-12 sm:h-15 lg:h-17 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-6">
            {NAV_ITEMS.map((item, index) => (
              <Link key={`nav-${index}`} href={item.link} className={getNavLinkClasses(item.link)}>
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link href="/contact" className={ctaButtonClasses}>
            Let&apos;s talk
          </Link>
        </Container>
      </nav>

      {/* Floating Menu Button */}
      <button
        ref={refs.menuButton}
        onClick={toggleMenu}
        onMouseEnter={handleHoverEnter}
        onMouseLeave={handleHoverLeave}
        className="fixed top-4 right-4 sm:top-5 sm:right-5 lg:top-7 lg:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15 lg:w-17 lg:h-17 bg-white cursor-pointer rounded-full flex items-center justify-center shadow-md transition-all duration-300 group lg:hover:bg-black lg:hover:scale-105 lg:hover:shadow-lg"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        <div ref={refs.plusIcon} className="transition-transform duration-300 ease-out">
          <HiPlus className="w-5 h-5 sm:w-6 sm:h-6 lg:w-10 lg:h-10 text-black group-hover:text-white transition-colors duration-300" />
        </div>
      </button>

      {/* Full Screen Overlay Menu */}
      <div ref={refs.overlay} style={{ visibility: 'hidden', clipPath: 'circle(0% at 95% 5%)' }} className="fixed inset-0 bg-black z-45" role="dialog" aria-modal="true" aria-labelledby="menu-title">
        <div className="xl:h-full lg:h-full md:h-1/2 h-1/2 w-full flex lg:flex-row flex-col items-start justify-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-48">
          {/* Logo */}
          <div className="flex-1 flex items-start justify-start">
            <div ref={refs.overlayLogo} className="flex-shrink-0">
              <a href="/" onClick={handleLinkClick}>
                <Image src='https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/Frame%205.png?updatedAt=1759756217013' alt="The Internet Company Logo" width={500} height={500} className="h-20 sm:h-20 lg:h-30 w-auto" />
              </a>
            </div>
          </div>

          {/* Navigation and Social Links */}
          <div className="flex flex-row items-start justify-between gap-40">
            {/* Main Navigation */}
            <div ref={refs.menuLinks}>
              <nav className="space-y-2 sm:space-y-3 lg:space-y-4 text-start" id="menu-title">
                {FULL_NAV_ITEMS.map((item, index) => {
                  const isActive = pathname === item.link;
                  return (
                    <div key={`overlay-nav-${index}`} className="relative">
                      <a 
                        href={item.link} 
                        onClick={handleLinkClick} 
                        className={`block text-2xl sm:text-2xl md:text-5xl lg:text-4xl xl:text-5xl tracking-tight text-white hover:text-gray-400 transition-colors ${
                          isActive ? "font-bold" : "font-medium"
                        }`}
                      >
                        {item.name}
                      </a>

                      {item.name === "Client Portal" && (
                        <span className="absolute -top-1 -right-12 sm:-right-14 lg:-right-16 px-2 sm:px-3 py-1 text-xs hover:bg-[#4A5818] bg-[#c7e55b] text-black rounded">
                          New
                        </span>
                      )}

                      {item.name === "Archive" && (
                        <span className="absolute -top-1 -right-[-4px] md:-right-[-65px] sm:-right-12 lg:right-1 px-2 py-1 text-xs bg-gray-700 text-white rounded">
                          36
                        </span>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Social Links */}
            <div ref={refs.socialLinks} className="flex flex-col items-start">
              {SOCIAL_LINKS.map(({ href, label }) => (
                <a key={label} href={href} onClick={handleLinkClick} target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl lg:text:3xl xl:text-3xl tracking-tighter text-white hover:text-[#595959] transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <button className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors z-50" onClick={toggleMenu} aria-label="Close menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Copyright */}
          <div className="absolute bottom-7 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8">
            <p className="text-xs sm:text-sm text-gray-500 text-right">© Copyright TIC INTERNET COMPANY</p>
          </div>

          {/* Contact Button */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8">
            <button onClick={handleLinkClick} className="px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-black transition-all text-sm sm:text-base">
              contact
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;