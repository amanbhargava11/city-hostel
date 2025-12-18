import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { RoomTypes, HostelFacilities } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function RoomsFacilitiesPage() {
  const [rooms, setRooms] = useState<RoomTypes[]>([]);
  const [facilities, setFacilities] = useState<HostelFacilities[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [roomsData, facilitiesData] = await Promise.all([
        BaseCrudService.getAll<RoomTypes>('roomtypes'),
        BaseCrudService.getAll<HostelFacilities>('hostelfacilities'),
      ]);
      setRooms(roomsData.items);
      setFacilities(facilitiesData.items);
    };
    fetchData();
  }, []);

  const categorizedFacilities = facilities.reduce((acc, facility) => {
    const category = facility.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(facility);
    return acc;
  }, {} as Record<string, HostelFacilities[]>);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-24 bg-primary">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary-foreground mb-6">
              Rooms & Facilities
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Comfortable living spaces with all the amenities you need
            </p>
          </motion.div>
        </div>
      </section>

      {/* Room Types Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              Our Room Types
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto">
              Choose from our range of well-furnished rooms designed for your comfort
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <motion.div
                key={room._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-gray-200 overflow-hidden hover:border-primary transition-colors"
              >
                {room.roomImage && (
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      src={room.roomImage}
                      alt={room.roomName || 'Room'}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      width={600}
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-heading text-2xl text-foreground mb-3">
                    {room.roomName}
                  </h3>
                  <p className="font-paragraph text-base text-foreground/70 mb-4">
                    {room.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary" />
                      <span className="font-paragraph text-base text-foreground">
                        Capacity: {room.capacity} {room.capacity === 1 ? 'Person' : 'Persons'}
                      </span>
                    </div>
                    {room.roomArea && (
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-primary" />
                        <span className="font-paragraph text-base text-foreground">
                          Area: {room.roomArea} sq ft
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary" />
                      <span className="font-paragraph text-base text-foreground">
                        {room.isAc ? 'AC Available' : 'Non-AC'}
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-heading text-3xl text-primary">
                      ₹{room.monthlyPrice?.toLocaleString('en-IN')}
                      <span className="font-paragraph text-base text-foreground/70">/month</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 h-auto text-base">
                Book Your Room
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-24 bg-secondary">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              Hostel Facilities
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto">
              Everything you need for a comfortable stay
            </p>
          </div>

          <div className="space-y-12">
            {Object.entries(categorizedFacilities).map(([category, categoryFacilities]) => (
              <div key={category}>
                <h3 className="font-heading text-2xl text-foreground mb-6 pb-3 border-b border-gray-200">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryFacilities.map((facility) => (
                    <motion.div
                      key={facility._id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="flex items-start gap-4 p-6 bg-white border border-gray-200"
                    >
                      <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-heading text-lg text-foreground mb-2">
                          {facility.facilityName}
                        </h4>
                        {facility.description && (
                          <p className="font-paragraph text-sm text-foreground/70">
                            {facility.description}
                          </p>
                        )}
                        {facility.availability && (
                          <p className="font-paragraph text-xs text-primary mt-2">
                            {facility.availability}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-4xl md:text-5xl text-primary-foreground mb-6">
                Ready to Make City Hostel Your Home?
              </h2>
              <p className="font-paragraph text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Contact us today to book your room or schedule a visit
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button className="bg-white text-primary hover:bg-white/90 px-6 py-3 h-auto text-base">
                    Contact Us
                  </Button>
                </Link>
                <a
                  href="https://wa.me/919302777888"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-transparent text-primary-foreground border border-primary-foreground hover:bg-primary-foreground/10 px-6 py-3 h-auto text-base">
                    WhatsApp Us
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
