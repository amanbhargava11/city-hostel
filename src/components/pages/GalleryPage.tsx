import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { GalleryImages } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImages[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchImages = async () => {
      const { items } = await BaseCrudService.getAll<GalleryImages>('galleryimages');
      const sorted = items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
      setImages(sorted);
    };
    fetchImages();
  }, []);

  const categories = ['All', ...Array.from(new Set(images.map(img => img.category).filter(Boolean)))];

  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter(img => img.category === selectedCategory);

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
              Gallery
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Take a virtual tour of our hostel facilities and living spaces
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      {categories.length > 1 && (
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 font-paragraph text-base transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-white text-foreground border border-gray-200 hover:border-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative aspect-[4/3] overflow-hidden border border-gray-200"
                >
                  {image.imageFile && (
                    <Image
                      src={image.imageFile}
                      alt={image.altText || image.imageTitle || 'Gallery image'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      width={800}
                    />
                  )}
                  {(image.imageTitle || image.imageDescription) && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        {image.imageTitle && (
                          <h3 className="font-heading text-xl mb-2">
                            {image.imageTitle}
                          </h3>
                        )}
                        {image.imageDescription && (
                          <p className="font-paragraph text-sm opacity-90">
                            {image.imageDescription}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-paragraph text-lg text-foreground/70">
                No images available in this category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
                Want to See More?
              </h2>
              <p className="font-paragraph text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
                Schedule a visit to experience our facilities in person
              </p>
              <a
                href="https://wa.me/919302777888?text=Hi,%20I%20would%20like%20to%20schedule%20a%20visit%20to%20City%20Hostel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 font-paragraph text-base transition-colors"
              >
                Schedule a Visit
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
