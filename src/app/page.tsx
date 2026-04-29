'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Coffee,
  MapPin,
  Clock,
  Instagram,
  Phone,
  ArrowDown,
  Menu as MenuIcon,
  X,
  Star,
  Wifi,
  UtensilsCrossed,
  Leaf,
  Heart,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'

// ─── Data ───────────────────────────────────────────────────────────────────

interface MenuItem {
  name: string
  description: string
  price: string
  image: string
}

// ─── Menu Data (from official menu PDF) ────────────────────────────────────

const basicCoffeeMenu: MenuItem[] = [
  { name: 'Espresso', description: 'Rich and bold single shot of our finest beans', price: 'Rp 12.000', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=200&h=200&fit=crop' },
  { name: 'Americano', description: 'Clean and bright, espresso with hot water', price: 'Rp 18.000', image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=200&h=200&fit=crop' },
  { name: 'Latte', description: 'Smooth espresso blended with steamed milk', price: 'Rp 18.000', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&h=200&fit=crop' },
  { name: 'Cappuccino', description: 'Classic espresso with velvety foam layer', price: 'Rp 22.000', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=200&fit=crop' },
  { name: 'Dirty Latte', description: 'Bold espresso poured over cold milk', price: 'Rp 25.000', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=200&fit=crop' },
  { name: 'V-60 / Japanese', description: 'Pour-over brewed with precision — hot/ice', price: 'Rp 20.000', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop' },
  { name: 'Magic (Secret Milk)', description: 'Our signature ristretto with silky milk', price: 'Rp 25.000', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=200&h=200&fit=crop' },
]

const handCraftMenu: MenuItem[] = [
  { name: 'Larasati', description: 'Brown sugar creamy latte', price: 'Rp 20.000', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=200&h=200&fit=crop' },
  { name: 'Maharasa', description: 'Brown sugar with double espresso', price: 'Rp 24.000', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=200&h=200&fit=crop' },
  { name: 'Rum Burner', description: 'Flavour rum with latte', price: 'Rp 23.000', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=200&h=200&fit=crop' },
  { name: 'Van Halen', description: 'Vanilla syrup with condensed milk', price: 'Rp 23.000', image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=200&h=200&fit=crop' },
  { name: 'French Caramel', description: 'Caramel syrup with condensed milk', price: 'Rp 23.000', image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=200&h=200&fit=crop' },
  { name: 'Butterscotch Salt', description: 'Salty cream and lotus biscuit', price: 'Rp 26.000', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop' },
  { name: 'Mocca', description: 'Rich chocolate with espresso', price: 'Rp 26.000', image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=200&h=200&fit=crop' },
  { name: 'Hazelnut', description: 'Hazelnut syrup with condensed milk', price: 'Rp 23.000', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop' },
]

const matchaChocoMenu: MenuItem[] = [
  { name: 'Matcha Latte', description: 'Creamy milk with premium matcha', price: 'Rp 25.000', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=200&h=200&fit=crop' },
  { name: 'Matcha Mango Sticky Rice', description: 'Fresh coconut, mango flavour, matcha & whipping cream', price: 'Rp 27.000', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=200&h=200&fit=crop' },
  { name: 'Coconut Matcha', description: 'Fresh coconut with whipping cream and matcha', price: 'Rp 26.000', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=200&h=200&fit=crop' },
  { name: 'Choco Marshmallow', description: 'Thick chocolate and marshmallow on top', price: 'Rp 24.000', image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=200&h=200&fit=crop' },
  { name: 'Coconut Choco', description: 'Fresh coconut with whipping cream and choco', price: 'Rp 26.000', image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=200&h=200&fit=crop' },
]

const nonCoffeeMenu: MenuItem[] = [
  { name: 'Red Velvet', description: 'Frappe series — smooth and velvety', price: 'Rp 25.000', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200&h=200&fit=crop' },
  { name: 'Taro', description: 'Frappe series — sweet purple taro', price: 'Rp 25.000', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200&h=200&fit=crop' },
  { name: 'Cookies n Cream', description: 'Frappe series — classic cookies blended', price: 'Rp 25.000', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200&h=200&fit=crop' },
  { name: 'Classic Tea', description: 'Black tea — simple and refreshing', price: 'Rp 12.000', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&h=200&fit=crop' },
  { name: 'Lychee Tea', description: 'Lychee syrup with fresh lychee fruit', price: 'Rp 16.000', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&h=200&fit=crop' },
]

const mocktailMenu: MenuItem[] = [
  { name: 'Dry', description: 'Americano with sweet, acid, fresh — creamcheese & creamy on top', price: 'Rp 26.000', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&h=200&fit=crop' },
  { name: 'Berrie', description: 'Tea based with creamy topping', price: 'Rp 26.000', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=200&h=200&fit=crop' },
  { name: 'Autumn', description: 'Mocktail espresso with lychee and sakura flavour', price: 'Rp 26.000', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=200&h=200&fit=crop' },
  { name: 'Moody', description: 'Mocktail non-espresso with strawberry and lychee', price: 'Rp 25.000', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&h=200&fit=crop' },
  { name: 'Winter', description: 'Mocktail espresso with soda and strawberry', price: 'Rp 26.000', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=200&h=200&fit=crop' },
  { name: 'Woody', description: 'Mocktail non-espresso with sakura and strawberry', price: 'Rp 25.000', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&h=200&fit=crop' },
  { name: 'Americano Cranberry', description: 'Americano with cranberry flavour', price: 'Rp 26.000', image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=200&h=200&fit=crop' },
  { name: 'Americano Guava', description: 'Americano with guava flavour', price: 'Rp 26.000', image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=200&h=200&fit=crop' },
  { name: 'Americano Kiwi', description: 'Americano with kiwi flavour', price: 'Rp 26.000', image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=200&h=200&fit=crop' },
]

const asianFoodMenu: MenuItem[] = [
  { name: 'Chicken Sambal Matah', description: 'Balinese-style sambal with crispy chicken', price: 'Rp 26.000', image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=200&h=200&fit=crop' },
  { name: 'Chicken Katsu', description: 'Crispy breaded chicken with signature sauce', price: 'Rp 26.000', image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=200&h=200&fit=crop' },
  { name: 'Chicken Teriyaki', description: 'Glazed chicken with sweet teriyaki sauce', price: 'Rp 26.000', image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=200&h=200&fit=crop' },
  { name: 'Hongkong Fried Rice', description: 'Wok-tossed fried rice Hongkong style', price: 'Rp 25.000', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&h=200&fit=crop' },
  { name: 'Cheezy Curry Lava', description: 'Curry with melted cheese lava center', price: 'Rp 20.000', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&h=200&fit=crop' },
  { name: 'Cheezy Curry Creamy', description: 'Creamy curry with rich cheese sauce', price: 'Rp 20.000', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&h=200&fit=crop' },
  { name: 'Chicken Salted Egg', description: 'Crispy chicken with creamy salted egg sauce', price: 'Rp 26.000', image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=200&h=200&fit=crop' },
]

const westernFoodMenu: MenuItem[] = [
  { name: 'Aglio Pasta', description: 'Classic aglio olio with garlic and chili', price: 'Rp 24.000', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&h=200&fit=crop' },
  { name: 'Alfredo Pasta', description: 'Creamy fettuccine with parmesan sauce', price: 'Rp 24.000', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&h=200&fit=crop' },
  { name: 'Fractal Burger', description: 'Our signature house burger', price: 'Rp 26.000', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop' },
  { name: 'Mac & Cheese', description: 'Cheesy macaroni baked to perfection', price: 'Rp 25.000', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&h=200&fit=crop' },
  { name: 'Grilled Chicken Mushroom', description: 'Juicy grilled chicken with sautéed mushroom', price: 'Rp 28.000', image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=200&h=200&fit=crop' },
  { name: 'The Sandwich', description: 'Our signature breakfast sandwich', price: 'Rp 26.000', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=200&h=200&fit=crop' },
  { name: 'French Toast Matcha', description: 'French toast with premium matcha', price: 'Rp 26.000', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=200&h=200&fit=crop' },
  { name: 'Hot Breakfast', description: 'Complete hot breakfast platter', price: 'Rp 26.000', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=200&h=200&fit=crop' },
]

const snackMenu: MenuItem[] = [
  { name: 'Bola Ubi', description: 'Sweet purple potato balls', price: 'Rp 18.000', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop' },
  { name: 'Tahu Cabe Garam', description: 'Crispy tofu with salted chili', price: 'Rp 20.000', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop' },
  { name: 'Mix Platter', description: 'Assorted snack platter — perfect for sharing', price: 'Rp 20.000', image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=200&h=200&fit=crop' },
  { name: 'French Fries', description: 'Classic crispy golden fries', price: 'Rp 16.000', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop' },
  { name: 'Cireng Moza', description: 'Crispy with gooey mozzarella inside', price: 'Rp 16.000', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop' },
  { name: 'Spicy Wings', description: 'Fiery chicken wings with spice glaze', price: 'Rp 22.000', image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=200&h=200&fit=crop' },
  { name: 'Bolu Pisang', description: 'Soft banana cake — sweet and comforting', price: 'Rp 18.000', image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=200&h=200&fit=crop' },
]

const galleryItems = [
  {
    title: 'Our Space',
    description: 'Modern interior with warm lighting',
    image: 'about-cafe.JPG',
    source: 'Google Maps',
    span: 'sm:col-span-2 lg:col-span-2 lg:row-span-2',
  },
  {
    title: 'Cozy Corner',
    description: 'Perfect spot for your favorite brew',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop',
    source: 'Atmosphere',
    span: '',
  },
  {
    title: 'Aesthetic Vibes',
    description: 'Cinematic interior for every mood',
    image: 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=600&h=400&fit=crop',
    source: 'Atmosphere',
    span: '',
  },
  {
    title: 'Work Friendly',
    description: 'Free WiFi, comfy seats, great coffee',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&h=400&fit=crop',
    source: 'Atmosphere',
    span: '',
  },
  {
    title: 'Hidden Gem',
    description: 'Nestled in Manahan, Solo',
    image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600&h=400&fit=crop',
    source: 'Atmosphere',
    span: '',
  },
  {
    title: 'Fine Dish Experience',
    description: 'Where coffee meets culinary art',
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&h=400&fit=crop',
    source: 'Atmosphere',
    span: '',
  },
]

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Location', href: '#location' },
]

const stats = [
  { icon: Coffee, label: '100% Arabica Beans', description: 'Sourced from premium Indonesian farms' },
  { icon: Heart, label: 'Cozy Atmosphere', description: 'Designed for comfort and inspiration' },
  { icon: UtensilsCrossed, label: 'Fine Dish', description: 'Premium food for every craving' },
  { icon: Wifi, label: 'Free WiFi', description: 'Stay connected while you unwind' },
]

// ─── SVG Decorations ────────────────────────────────────────────────────────

function CoffeeCupSVG({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Saucer */}
      <ellipse cx="90" cy="170" rx="70" ry="12" fill="currentColor" opacity="0.15" />
      {/* Cup body */}
      <path d="M40 80 H140 V150 Q140 165 125 165 H55 Q40 165 40 150 Z" fill="currentColor" opacity="0.2" />
      <path d="M45 80 H135 V148 Q135 160 122 160 H58 Q45 160 45 148 Z" fill="currentColor" opacity="0.1" />
      {/* Handle */}
      <path d="M140 100 Q165 100 165 125 Q165 150 140 150" stroke="currentColor" strokeWidth="6" opacity="0.2" fill="none" />
      {/* Coffee surface */}
      <ellipse cx="90" cy="85" rx="48" ry="8" fill="currentColor" opacity="0.25" />
      {/* Latte art - heart */}
      <path d="M85 82 Q82 76 87 76 Q92 76 90 80 Q95 76 100 78 Q103 80 95 85 L90 88 Z" fill="currentColor" opacity="0.3" />
      {/* Steam */}
      <path className="animate-steam" d="M70 70 Q65 55 72 45 Q78 35 73 20" stroke="currentColor" strokeWidth="2" opacity="0.3" fill="none" strokeLinecap="round" />
      <path className="animate-steam-delayed" d="M90 68 Q85 52 92 42 Q98 32 93 17" stroke="currentColor" strokeWidth="2" opacity="0.25" fill="none" strokeLinecap="round" />
      <path className="animate-steam-slow" d="M110 70 Q105 55 112 45 Q118 35 113 20" stroke="currentColor" strokeWidth="2" opacity="0.2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function CoffeeBeanSVG({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 40 60" className={`${className} ${flip ? 'scale-x-[-1]' : ''}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20" cy="30" rx="16" ry="26" fill="currentColor" opacity="0.15" />
      <path d="M20 6 Q14 20 20 30 Q26 40 20 54" stroke="currentColor" strokeWidth="2" opacity="0.2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function DecorativeDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <Separator className="w-16 bg-gold/30" />
      <Coffee className="size-4 text-gold/50" />
      <Separator className="w-16 bg-gold/30" />
    </div>
  )
}

// ─── Hooks ──────────────────────────────────────────────────────────────────

function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollY
}

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })

  return { ref, isInView }
}

// ─── Section Components ─────────────────────────────────────────────────────

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  const { ref, isInView } = useReveal()

  return (
    <div ref={ref} className="text-center mb-12 md:mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="mt-3 text-muted-foreground text-base sm:text-lg max-w-xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
      <DecorativeDivider />
    </div>
  )
}

// ─── Navbar ─────────────────────────────────────────────────────────────────

function Navbar() {
  const scrollY = useScrollPosition()
  const isScrolled = scrollY > 50

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
            <Image
              src="/logo-circular.png"
              alt="Fractal Urban Classic Coffee Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-primary transition-colors group-hover:text-gold">
              FRACTAL
            </span>
            <span className="text-[0.6rem] sm:text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">
              Urban Classic Coffee
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover-underline text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button size="sm" className="bg-gold hover:bg-gold/90 text-white rounded-full px-5" asChild>
            <a href="https://maps.app.goo.gl/yiaA9bgW82DDbDWp9" target="_blank" rel="noopener noreferrer">
              <MapPin className="size-3.5" />
              Visit Us
            </a>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="size-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader className="pt-8">
              <SheetTitle className="font-serif text-2xl text-primary">FRACTAL</SheetTitle>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                Urban Classic Coffee
              </p>
            </SheetHeader>
            <div className="flex flex-col gap-1 mt-8">
              {navLinks.map((link) => (
                <SheetClose key={link.href} asChild>
                  <a
                    href={link.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium hover:bg-accent/50 transition-colors"
                  >
                    <ChevronRight className="size-4 text-gold" />
                    {link.label}
                  </a>
                </SheetClose>
              ))}
            </div>
            <div className="mt-auto pb-8">
              <Separator className="mb-4" />
              <div className="flex items-center gap-3 px-3">
                <Instagram className="size-4 text-gold" />
                <a
                  href="https://instagram.com/fractal.coffee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  @fractal.coffee
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}

// ─── Hero Section ───────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain-overlay"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-green-50/60 to-lime-50/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />

      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-200/15 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-emerald-200/10 rounded-full blur-2xl" />

      {/* Floating coffee beans decoration */}
      <div className="absolute top-24 right-8 sm:right-16 opacity-40 animate-float">
        <CoffeeBeanSVG className="w-8 h-12 text-forest" />
      </div>
      <div className="absolute bottom-32 left-12 sm:left-20 opacity-30 animate-float" style={{ animationDelay: '2s' }}>
        <CoffeeBeanSVG className="w-6 h-10 text-gold" flip />
      </div>
      <div className="absolute top-40 left-1/4 opacity-20 animate-float" style={{ animationDelay: '4s' }}>
        <CoffeeBeanSVG className="w-5 h-8 text-emerald" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Coffee Cup SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mx-auto mb-6 sm:mb-8 w-32 h-32 sm:w-40 sm:h-40 text-forest"
        >
          <CoffeeCupSVG className="w-full h-full" />
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-2"
        >
          <p className="text-sm sm:text-base tracking-[0.3em] uppercase text-muted-foreground font-medium">
            Welcome to
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-primary leading-none">
            Premium Coffee
          </h1>
          <div className="flex items-center justify-center gap-3 sm:gap-4 my-3 sm:my-4">
            <Separator className="w-12 sm:w-20 bg-gold/40" />
            <Leaf className="size-4 sm:size-5 text-gold/60" />
            <Separator className="w-12 sm:w-20 bg-gold/40" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary/80 tracking-wide">
            <span>Fine Dish</span>
            <span className="mx-2 sm:mx-3 text-gold/70">•</span>
            <span>Be Happy</span>
          </div>
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground italic font-serif"
        >
          Hidden gem di tengah kota Solo
        </motion.p>

        {/* Motto */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-2 text-xs sm:text-sm tracking-[0.2em] uppercase text-muted-foreground/70"
        >
          Coffee — work/hangout — repeat
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
        >
          <Button
            size="lg"
            className="bg-gold hover:bg-gold/85 text-white rounded-full px-8 py-6 text-base shadow-lg shadow-gold/20 transition-all hover:shadow-xl hover:shadow-gold/30 hover:scale-105"
            asChild
          >
            <a href="#menu">
              <Coffee className="size-4" />
              Explore Menu
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 py-6 text-base border-primary/20 hover:bg-primary/5 transition-all hover:scale-105"
            asChild
          >
            <a href="#location">
              <MapPin className="size-4" />
              Find Us
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <a href="#about" className="flex flex-col items-center gap-1 text-muted-foreground/60 hover:text-muted-foreground transition-colors">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ArrowDown className="size-4" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── About Section ──────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-green-100/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading title="Our Story" subtitle="A hidden gem waiting to be discovered" />

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-forest/10">
              <Image
                src="/about-cafe.JPG"
                alt="Fractal Urban Classic Coffee Interior"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {/* Text overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-serif text-white text-2xl font-bold drop-shadow-lg">
                  Since Manahan, Solo
                </p>
                <p className="text-white/70 text-sm mt-1">
                  Where coffee meets comfort
                </p>
              </div>
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-gold text-white rounded-xl p-4 shadow-xl shadow-gold/20">
              <Star className="size-6 mb-1" />
              <p className="text-sm font-bold">Hidden Gem</p>
              <p className="text-xs text-white/80">of Solo</p>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-foreground/90 leading-relaxed text-base sm:text-lg">
                <span className="font-serif text-xl sm:text-2xl text-primary font-semibold">Fractal Urban Classic Coffee</span> is
                more than just a coffee shop — it&apos;s a sanctuary in the heart of Manahan, Solo. 
                Tucked away near SPBU Manahan on Jalan MT Haryono, this hidden gem offers 
                a perfect escape from the hustle and bustle of city life.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                We believe in the simple philosophy: <span className="text-primary font-medium italic font-serif">&ldquo;Coffee — work/hangout — repeat.&rdquo;</span>{' '}
                Whether you&apos;re a digital nomad looking for the perfect work spot, a group 
                of friends seeking a cozy hangout, or a foodie craving fine dining, Fractal 
                is your go-to destination.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Every cup is crafted from 100% Arabica beans, every dish is prepared with 
                passion, and every corner is designed to make you feel at home. With free 
                WiFi, aesthetic photo corners, and an atmosphere that blends urban sophistication 
                with classic warmth — this is where your best moments happen.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card className="border-border/50 hover:border-gold/30 hover:shadow-md transition-all duration-300 py-4 gap-3">
                    <CardContent className="px-4">
                      <stat.icon className="size-5 text-gold mb-1.5" />
                      <p className="text-sm font-semibold text-primary leading-tight">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Menu Section ───────────────────────────────────────────────────────────

function MenuItemCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.05 * index }}
    >
      <Card className="group border-border/50 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 py-0 gap-0 overflow-hidden">
        <CardContent className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
          {/* Menu item image */}
          <div className="flex-shrink-0 w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] relative rounded-xl overflow-hidden shadow-md border border-border/30 bg-gradient-to-br from-sage/50 to-emerald/30">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="72px"
              unoptimized
            />
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-serif font-semibold text-base sm:text-lg text-primary group-hover:text-gold transition-colors leading-tight">
                {item.name}
              </h3>
              <p className="flex-shrink-0 font-semibold text-sm sm:text-base text-gold whitespace-nowrap">
                {item.price}
              </p>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-relaxed">
              {item.description}
            </p>
          </div>
        </CardContent>
        {/* Hover accent line */}
        <div className="h-0.5 bg-gradient-to-r from-gold/0 via-gold/50 to-gold/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </Card>
    </motion.div>
  )
}

const menuTabs = [
  { value: 'basic-coffee', label: 'Espresso Bar', shortLabel: 'Espresso', icon: Coffee, items: basicCoffeeMenu },
  { value: 'handcraft', label: 'HandCraft', shortLabel: 'HandCraft', icon: Star, items: handCraftMenu },
  { value: 'matcha-choco', label: 'Matcha & Choco', shortLabel: 'Matcha', icon: Leaf, items: matchaChocoMenu },
  { value: 'non-coffee', label: 'Non-Coffee', shortLabel: 'Non-Coffee', icon: Heart, items: nonCoffeeMenu },
  { value: 'mocktail', label: 'Mocktail', shortLabel: 'Mocktail', icon: Coffee, items: mocktailMenu },
  { value: 'asian-food', label: 'Asian Food', shortLabel: 'Asian', icon: UtensilsCrossed, items: asianFoodMenu },
  { value: 'western-food', label: 'Western & More', shortLabel: 'Western', icon: UtensilsCrossed, items: westernFoodMenu },
  { value: 'snacks', label: 'Snacks', shortLabel: 'Snacks', icon: Heart, items: snackMenu },
]

function MenuSection() {
  return (
    <section id="menu" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-ivory/50 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          title="Our Menu"
          subtitle="Crafted with passion, served with love"
        />

        <Tabs defaultValue="basic-coffee" className="w-full">
          <TabsList className="mx-auto flex h-auto p-1.5 bg-secondary/50 rounded-full flex-wrap justify-center gap-1">
            {menuTabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-full px-3 sm:px-5 py-2 text-[11px] sm:text-sm data-[state=active]:bg-gold data-[state=active]:text-white"
              >
                <tab.icon className="size-3.5 sm:mr-1.5" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {menuTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-8">
              <div className="grid gap-3 sm:gap-4">
                {tab.items.map((item, i) => (
                  <MenuItemCard key={item.name} item={item} index={i} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

// ─── Gallery Section ────────────────────────────────────────────────────────

function GallerySection() {
  return (
    <section id="gallery" className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="The Atmosphere"
          subtitle="Every corner tells a story"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-500 ${
                item.span || 'aspect-[4/3]'
              } ${item.span ? 'aspect-[4/3] sm:aspect-auto' : ''}`}
            >
              {/* Photo */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                unoptimized
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <p className="font-serif text-white text-base sm:text-lg font-bold drop-shadow-md">{item.title}</p>
                <p className="text-white/80 text-xs sm:text-sm mt-0.5">{item.description}</p>
                {item.source && (
                  <p className="text-white/50 text-[10px] sm:text-xs mt-1.5 flex items-center gap-1">
                    <MapPin className="size-3" />
                    {item.source}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* See more on Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8 sm:mt-10"
        >
          <Button
            variant="outline"
            className="rounded-full px-6 sm:px-8 py-5 text-sm border-gold/30 text-gold hover:bg-gold hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
            asChild
          >
            <a href="https://maps.app.goo.gl/yiaA9bgW82DDbDWp9" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="size-4 mr-2" />
              Lihat Foto Lengkap di Google Maps
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Location & Contact Section ─────────────────────────────────────────────

function LocationSection() {
  return (
    <section id="location" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-ivory/30 to-background" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          title="Find Us"
          subtitle="We're waiting for your visit"
        />

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden shadow-xl shadow-forest/10 aspect-square md:aspect-auto md:min-h-[450px]"
          >
            <iframe
              src="https://maps.google.com/maps?q=Fractal+Urban+Classic+Coffee+Jl.+Pelatuk+I+Manahan+Surakarta&t=&z=17&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
              title="Fractal Urban Classic Coffee Location"
            />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            {/* Address */}
            <Card className="border-border/50 hover:border-gold/20 transition-colors py-5 gap-4">
              <CardContent className="px-5 flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <MapPin className="size-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary text-sm">Our Address</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    Jalan Pelatuk I, Manahan<br />
                    Surakarta, Jawa Tengah 57139
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    (Near SPBU Manahan — Jl. MT Haryono)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Operating Hours */}
            <Card className="border-border/50 hover:border-gold/20 transition-colors py-5 gap-4">
              <CardContent className="px-5 flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Clock className="size-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary text-sm">Operating Hours</h3>
                  <div className="mt-2 space-y-1.5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-muted-foreground">Monday – Friday</span>
                      <span className="text-sm font-medium text-primary">08.00 – 24.00</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-muted-foreground">Saturday – Sunday</span>
                      <span className="text-sm font-medium text-primary">08.00 – 01.00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social */}
            <Card className="border-border/50 hover:border-gold/20 transition-colors py-5 gap-4">
              <CardContent className="px-5 flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Instagram className="size-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary text-sm">Follow Us</h3>
                  <a
                    href="https://instagram.com/fractal.coffee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold transition-colors mt-1"
                  >
                    @fractal.coffee
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Google Maps Link */}
            <Button
              className="w-full bg-gold hover:bg-gold/85 text-white rounded-xl py-6 text-base shadow-lg shadow-gold/15 transition-all hover:shadow-xl hover:shadow-gold/25"
              asChild
            >
              <a
                href="https://maps.app.goo.gl/yiaA9bgW82DDbDWp9"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="size-4" />
                Open in Google Maps
                <ExternalLink className="size-3.5 ml-1" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ─────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-forest text-primary-foreground relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-gold/0 via-gold/60 to-gold/0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="space-y-3">
              <div>
                <h3 className="font-serif text-2xl font-bold tracking-wider">FRACTAL</h3>
                <p className="text-xs tracking-[0.2em] uppercase text-primary-foreground/60">
                  Urban Classic Coffee
                </p>
              </div>
              <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-xs">
                Premium Coffee • Fine Dish • Be Happy
              </p>
              <p className="text-xs text-primary-foreground/40 italic font-serif">
                Coffee — work/hangout — repeat
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm tracking-wide uppercase text-primary-foreground/80 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/50 hover:text-gold transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="size-3 text-gold/40 group-hover:text-gold transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu Links */}
          <div>
            <h4 className="font-semibold text-sm tracking-wide uppercase text-primary-foreground/80 mb-4">
              Menu
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#menu" className="text-sm text-primary-foreground/50 hover:text-gold transition-colors inline-flex items-center gap-1.5 group">
                  <ChevronRight className="size-3 text-gold/40 group-hover:text-gold transition-colors" />
                  Coffee
                </a>
              </li>
              <li>
                <a href="#menu" className="text-sm text-primary-foreground/50 hover:text-gold transition-colors inline-flex items-center gap-1.5 group">
                  <ChevronRight className="size-3 text-gold/40 group-hover:text-gold transition-colors" />
                  Non-Coffee
                </a>
              </li>
              <li>
                <a href="#menu" className="text-sm text-primary-foreground/50 hover:text-gold transition-colors inline-flex items-center gap-1.5 group">
                  <ChevronRight className="size-3 text-gold/40 group-hover:text-gold transition-colors" />
                  Fine Dish
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm tracking-wide uppercase text-primary-foreground/80 mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="size-4 text-gold/70 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/50 leading-relaxed">
                  Jl. Pelatuk I, Manahan, Solo
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram className="size-4 text-gold/70 flex-shrink-0" />
                <a
                  href="https://instagram.com/fractal.coffee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-foreground/50 hover:text-gold transition-colors"
                >
                  @fractal.coffee
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <ExternalLink className="size-4 text-gold/70 flex-shrink-0" />
                <a
                  href="https://maps.app.goo.gl/yiaA9bgW82DDbDWp9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-foreground/50 hover:text-gold transition-colors"
                >
                  Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <Separator className="my-8 bg-primary-foreground/10" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-primary-foreground/40 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Fractal Urban Classic Coffee. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/30">
            Manahan, Solo — Surakarta, Jawa Tengah
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <GallerySection />
        <LocationSection />
      </main>
      <Footer />
    </div>
  )
}
