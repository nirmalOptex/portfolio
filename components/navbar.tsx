"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useScroll } from "@/hooks/use-scroll";
import { useActiveSection } from "@/hooks/use-active-section";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { navLinks, siteConfig } from "@/lib/site";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

/** Section ids the scroll-spy watches, derived once from the nav config. */
const sectionIds = navLinks.map((link) => link.href.replace("#", ""));

export function Navbar() {
  const scrolled = useScroll(10);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/80 bg-background/70 backdrop-blur-md py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#home"
          className="flex items-center gap-2 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span className="font-display text-xl font-black uppercase tracking-[0.22em] text-[#FF3B30] drop-shadow-[0_10px_20px_rgba(255,59,48,0.25)] transition-colors duration-300">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <NavigationMenuItem key={link.label}>
                    <NavigationMenuLink
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50 ${
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                        />
                      )}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Action Button & Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl font-medium tracking-tight transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 cursor-pointer bg-primary text-primary-foreground hover:bg-accent/90 px-4 py-3 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Let&apos;s Work Together
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            {/* `render` merges the trigger onto the Button — nesting a <Button>
                inside would produce an invalid button-in-button. */}
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-9 h-9 rounded-xl border border-border bg-background/50 hover:bg-accent/80 hover:text-accent-foreground backdrop-blur-sm cursor-pointer"
                />
              }
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] border-l border-border bg-background/95 backdrop-blur-md p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <SheetTitle className="font-display text-xl font-black uppercase tracking-[0.22em] text-[#FF3B30] flex items-center gap-2">
                    {siteConfig.name}
                  </SheetTitle>
                </div>

                <nav className="flex flex-col gap-4">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.label}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        aria-current={
                          activeSection === link.href.replace("#", "")
                            ? "true"
                            : undefined
                        }
                        className={`block py-2 text-lg font-medium transition-colors duration-200 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50 ${
                          activeSection === link.href.replace("#", "")
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-4 mt-auto">
                <Link
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="w-full inline-flex items-center justify-center rounded-xl py-6 font-medium shadow-md bg-primary text-primary-foreground hover:bg-accent/80 transition-all duration-300 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  Let&apos;s Work Together
                </Link>
                <div className="text-center text-xs text-muted-foreground">
                  © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
