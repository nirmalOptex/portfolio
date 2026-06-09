"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useScroll } from "@/hooks/use-scroll";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/data";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const scrolled = useScroll(10);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        <Link href="#home" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent-foreground flex items-center justify-center font-bold text-primary-foreground text-lg shadow-md group-hover:rotate-6 transition-transform duration-300">
            A
          </span>
          <span className="font-display text-xl tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text group-hover:text-primary transition-colors duration-300">
            Antigravity
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuLink
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Action Button & Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link href="#contact">
            <Button className="rounded-xl font-medium tracking-tight transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/95">
              Let&apos;s Work Together
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="w-9 h-9 rounded-xl border border-border bg-background/50 hover:bg-accent/80 hover:text-accent-foreground backdrop-blur-sm cursor-pointer"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] border-l border-border bg-background/95 backdrop-blur-md p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <SheetTitle className="font-display text-xl tracking-tight flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-primary to-accent-foreground flex items-center justify-center font-bold text-primary-foreground text-sm">
                      A
                    </span>
                    Antigravity
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
                        className="block py-2 text-lg font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-4 mt-auto">
                <Link href="#contact" onClick={() => setMobileOpen(false)} className="w-full">
                  <Button className="w-full rounded-xl py-6 font-medium shadow-md bg-primary text-primary-foreground hover:bg-primary/90">
                    Let&apos;s Work Together
                  </Button>
                </Link>
                <div className="text-center text-xs text-muted-foreground">
                  © 2026 Antigravity. All rights reserved.
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
