// HPI 1.6-V
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Wifi, Shield, Utensils, Wind, BookOpen, Users, ArrowRight, MapPin, CheckCircle2, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { HostelFacilities } from '@/entities';

// --- MANDATORY ANIMATED ELEMENT COMPONENT ---
type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Add a small delay via setTimeout if needed, or just let CSS handle transition-delay
        setTimeout(() => {
            element.classList.add('is-visible');
        }, delay);
        observer.unobserve(element); // Stop observing after reveal
      }
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return <div ref={ref} className={`${className || ''} animate-reveal`}>{children}</div>;
};

// --- CUSTOM STYLES FOR ANIMATIONS ---
const CustomStyles = () => (
  <style>{`
    .animate-reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 1s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1s cubic-bezier(0.2, 0.8, 0.2, 1);
      will-change: opacity, transform;
    }
    .animate-reveal.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .clip-diagonal {
      clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
    }
    
    .clip-image-shape {
      clip-path: inset(0 0 0 0 round 0px);
      transition: clip-path 0.8s ease;
    }
    
    .hover-trigger:hover .clip-image-shape {
      clip-path: inset(10px 10px 10px 10px round 20px);
    }

    .text-stroke {
      -webkit-text-stroke: 1px rgba(46, 139, 87, 0.3);
      color: transparent;
    }
  `}</style>
);

export default function HomePage() {
  // --- DATA FIDELITY PROTOCOL: CANONICAL DATA SOURCES ---
  const [keyFacilities, setKeyFacilities] = useState<HostelFacilities[]>([]);

  useEffect(() => {
    const fetchKeyFacilities = async () => {
      const { items } = await BaseCrudService.getAll<HostelFacilities>('hostelfacilities');
      const filtered = items.filter(f => f.isKeyFacility);
      setKeyFacilities(filtered.slice(0, 6));
    };
    fetchKeyFacilities();
  }, []);

  const iconMap: Record<string, any> = {
    wifi: Wifi,
    shield: Shield,
    utensils: Utensils,
    wind: Wind,
    book: BookOpen,
    users: Users,
  };

  // --- SCROLL PROGRESS FOR PARALLAX ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-clip selection:bg-primary selection:text-white">
      <CustomStyles />
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      <Header />

      {/* --- HERO SECTION: ZENITH MINIMALISM --- */}
      <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Parallax Background Image */}
        <div className="absolute inset-0 z-0">
            <div className="relative w-full h-full">
                <Image
                    src="https://static.wixstatic.com/media/9ee374_2d88d11597ee48ef883766d406ae358b~mv2.png?originWidth=1600&originHeight=896"
                    alt="Modern student hostel interior with natural light"
                    className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background/90" />
            </div>
        </div>

        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <AnimatedElement>
                <h1 className="font-heading text-7xl md:text-8xl lg:text-[10rem] leading-[0.9] text-white tracking-tight mb-8">
                  CITY<br />
                  <span className="text-primary-foreground/80 italic font-light">HOSTEL</span>
                </h1>
              </AnimatedElement>
              
              <AnimatedElement delay={200}>
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mt-8">
                    <div className="h-px w-24 bg-white/50 hidden md:block" />
                    <p className="font-paragraph text-xl md:text-2xl text-white/90 max-w-xl leading-relaxed">
                        A sanctuary for scholars in the heart of Bhawarkua. 
                        Where safety meets serenity, and ambition finds its home.
                    </p>
                </div>
              </AnimatedElement>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4 pb-4">
                <AnimatedElement delay={400}>
                    <div className="backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-none">
                        <p className="font-heading text-white text-lg mb-6 uppercase tracking-widest text-xs">Start Your Journey</p>
                        <div className="flex flex-col gap-4">
                            <Link to="/rooms-facilities" className="w-full">
                                <Button className="w-full bg-white text-primary hover:bg-white/90 h-14 text-lg rounded-none transition-all duration-300 hover:pl-8 group">
                                    Explore Spaces
                                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Link to="/contact" className="w-full">
                                <Button variant="outline" className="w-full border-white text-white hover:bg-white/10 h-14 text-lg rounded-none bg-transparent">
                                    Book a Visit
                                </Button>
                            </Link>
                        </div>
                    </div>
                </AnimatedElement>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* --- SECTION 2: THE NARRATIVE (STICKY SCROLL) --- */}
      <section className="relative w-full bg-background py-32">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Sticky Sidebar */}
                <div className="lg:col-span-4 relative">
                    <div className="sticky top-32">
                        <AnimatedElement>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-px bg-primary" />
                                <span className="text-primary font-heading uppercase tracking-widest text-sm">The Standard</span>
                            </div>
                            <h2 className="font-heading text-5xl md:text-6xl text-foreground leading-tight mb-8">
                                Designed for <br />
                                <span className="text-primary italic">Focus.</span>
                            </h2>
                            <p className="font-paragraph text-lg text-foreground/60 leading-relaxed mb-12">
                                We believe that your environment shapes your success. Every corner of City Hostel is curated to provide the peace of mind necessary for academic excellence.
                            </p>
                            <div className="hidden lg:block">
                                <Image
                                    src="https://static.wixstatic.com/media/9ee374_f172e834676e41589aeec2b9f4bbe0a3~mv2.png?originWidth=896&originHeight=1152"
                                    alt="Architectural detail of the hostel"
                                    className="w-full aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        </AnimatedElement>
                    </div>
                </div>

                {/* Scrolling Content */}
                <div className="lg:col-span-8 flex flex-col gap-32 pt-12 lg:pt-0">
                    {/* Feature 1 */}
                    <AnimatedElement className="group">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="order-2 md:order-1">
                                <div className="w-16 h-16 bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                    <Shield className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-500" />
                                </div>
                                <h3 className="font-heading text-3xl text-foreground mb-4">Uncompromised Safety</h3>
                                <p className="font-paragraph text-foreground/70 leading-relaxed mb-6">
                                    With 24/7 surveillance and a secure perimeter, we ensure that your safety is never a concern. Focus on your studies while we watch over your home.
                                </p>
                                <ul className="space-y-3">
                                    {['CCTV Surveillance', 'Biometric Access', '24/7 Guard'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                                            <CheckCircle2 className="w-4 h-4 text-primary" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="order-1 md:order-2 relative overflow-hidden aspect-square md:aspect-[4/5]">
                                <Image
                                    src="https://static.wixstatic.com/media/9ee374_052b1f2909f547eb8d7a12764c932ea8~mv2.png?originWidth=768&originHeight=960"
                                    alt="Secure entrance of City Hostel"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </AnimatedElement>

                    {/* Feature 2 */}
                    <AnimatedElement className="group">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="relative overflow-hidden aspect-square md:aspect-[4/5]">
                                <Image
                                    src="https://static.wixstatic.com/media/9ee374_a5bd11fc811f4fa18d0e50c4a59f2e79~mv2.png?originWidth=768&originHeight=960"
                                    alt="Comfortable study area"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div>
                                <div className="w-16 h-16 bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                    <Star className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-500" />
                                </div>
                                <h3 className="font-heading text-3xl text-foreground mb-4">Premium Comfort</h3>
                                <p className="font-paragraph text-foreground/70 leading-relaxed mb-6">
                                    Our rooms are designed to be more than just a place to sleep. They are personal retreats equipped with modern amenities and ergonomic furniture.
                                </p>
                                <ul className="space-y-3">
                                    {['Spacious Rooms', 'Ergonomic Furniture', 'Daily Housekeeping'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                                            <CheckCircle2 className="w-4 h-4 text-primary" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </AnimatedElement>

                    {/* Feature 3 */}
                    <AnimatedElement className="group">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="order-2 md:order-1">
                                <div className="w-16 h-16 bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                    <MapPin className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-500" />
                                </div>
                                <h3 className="font-heading text-3xl text-foreground mb-4">Prime Location</h3>
                                <p className="font-paragraph text-foreground/70 leading-relaxed mb-6">
                                    Located in Bhawarkua, the educational hub of Indore. Walk to your classes, access libraries, and enjoy the vibrant student community right outside your door.
                                </p>
                                <Button variant="link" className="p-0 text-primary font-heading text-lg hover:no-underline group-hover:translate-x-2 transition-transform">
                                    View on Map <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                            <div className="order-1 md:order-2 relative overflow-hidden aspect-square md:aspect-[4/5]">
                                <Image
                                    src="https://static.wixstatic.com/media/9ee374_34c0a558d21a421494052e90beac2506~mv2.png?originWidth=768&originHeight=960"
                                    alt="Map view of Bhawarkua area"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </AnimatedElement>
                </div>
            </div>
        </div>
      </section>

      {/* --- SECTION 3: VISUAL BREATHER (FULL BLEED) --- */}
      <section className="relative w-full h-[80vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
            <Image
                src="https://static.wixstatic.com/media/9ee374_b2eacfde95444a2595d798645109b021~mv2.png?originWidth=1920&originHeight=1280"
                alt="Quiet library study space"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
            <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <AnimatedElement>
                <Quote className="w-16 h-16 text-white/30 mx-auto mb-8" />
                <h2 className="font-heading text-4xl md:text-6xl text-white leading-tight mb-8">
                    "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
                </h2>
                <p className="font-paragraph text-xl text-white/80">
                    We provide the environment. You provide the ambition.
                </p>
            </AnimatedElement>
        </div>
      </section>

      {/* --- SECTION 4: CURATED AMENITIES (DATA DRIVEN) --- */}
      <section className="py-32 bg-white">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-gray-100 pb-8">
                <AnimatedElement>
                    <h2 className="font-heading text-5xl text-foreground mb-4">Curated Amenities</h2>
                    <p className="font-paragraph text-lg text-foreground/60 max-w-md">
                        Everything you need to live, learn, and thrive.
                    </p>
                </AnimatedElement>
                <AnimatedElement delay={200}>
                    <Link to="/rooms-facilities">
                        <Button variant="outline" className="rounded-none border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                            View All Facilities
                        </Button>
                    </Link>
                </AnimatedElement>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100">
                {keyFacilities.map((facility, index) => {
                    const IconComponent = iconMap[facility.category?.toLowerCase() || 'users'] || Users;
                    return (
                        <AnimatedElement key={facility._id} delay={index * 100} className="bg-white p-12 hover:bg-primary/5 transition-colors duration-500 group h-full">
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <div className="w-12 h-12 mb-8 text-primary/40 group-hover:text-primary transition-colors duration-300">
                                        <IconComponent className="w-full h-full" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="font-heading text-2xl text-foreground mb-4 group-hover:translate-x-2 transition-transform duration-300">
                                        {facility.facilityName}
                                    </h3>
                                    <p className="font-paragraph text-foreground/60 leading-relaxed">
                                        {facility.description}
                                    </p>
                                </div>
                                <div className="mt-8 pt-8 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className="text-xs font-heading uppercase tracking-widest text-primary">Included</span>
                                </div>
                            </div>
                        </AnimatedElement>
                    );
                })}
            </div>
        </div>
      </section>

      {/* --- SECTION 5: STATS & TRUST --- */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10">
            <div className="absolute right-0 top-0 w-[600px] h-[600px] border-[100px] border-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute left-0 bottom-0 w-[400px] h-[400px] border-[50px] border-white rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
                <AnimatedElement delay={0}>
                    <div className="p-8">
                        <div className="font-heading text-7xl md:text-8xl mb-2">10<span className="text-4xl align-top">+</span></div>
                        <p className="font-paragraph text-lg text-white/80 uppercase tracking-widest">Years of Excellence</p>
                    </div>
                </AnimatedElement>
                <AnimatedElement delay={200}>
                    <div className="p-8">
                        <div className="font-heading text-7xl md:text-8xl mb-2">500<span className="text-4xl align-top">+</span></div>
                        <p className="font-paragraph text-lg text-white/80 uppercase tracking-widest">Happy Students</p>
                    </div>
                </AnimatedElement>
                <AnimatedElement delay={400}>
                    <div className="p-8">
                        <div className="font-heading text-7xl md:text-8xl mb-2">24<span className="text-4xl align-top">/7</span></div>
                        <p className="font-paragraph text-lg text-white/80 uppercase tracking-widest">Support & Security</p>
                    </div>
                </AnimatedElement>
            </div>
        </div>
      </section>

      {/* --- SECTION 6: CTA & LOCATION --- */}
      <section className="py-32 bg-white relative">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-50 p-8 md:p-20 relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div>
                        <AnimatedElement>
                            <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-8">
                                Ready to move in?
                            </h2>
                            <p className="font-paragraph text-xl text-foreground/70 mb-10 max-w-lg">
                                Spaces fill up fast before the academic session. Secure your spot at City Hostel today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/contact">
                                    <Button className="bg-primary text-white hover:bg-primary/90 h-14 px-8 text-lg rounded-none w-full sm:w-auto">
                                        Contact Us Now
                                    </Button>
                                </Link>
                                <Link to="/rooms-facilities">
                                    <Button variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-white h-14 px-8 text-lg rounded-none w-full sm:w-auto bg-transparent">
                                        Check Availability
                                    </Button>
                                </Link>
                            </div>
                        </AnimatedElement>
                    </div>
                    <div className="relative h-[400px] w-full">
                        <AnimatedElement delay={200} className="h-full w-full">
                            <div className="absolute inset-0 border-2 border-primary translate-x-4 translate-y-4" />
                            <div className="absolute inset-0 bg-gray-200">
                                {/* Placeholder for Map or Location Image */}
                                <Image
                                    src="https://static.wixstatic.com/media/9ee374_c639d257a0c446a98e79139970c4f8d1~mv2.png?originWidth=576&originHeight=384"
                                    alt="Map location of City Hostel"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </AnimatedElement>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}