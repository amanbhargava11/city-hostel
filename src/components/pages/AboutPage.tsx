import { motion } from 'framer-motion';
import { Shield, Sparkles, Home, Award } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Your security is our top priority. We maintain 24/7 security with CCTV surveillance, secure entry systems, and trained staff to ensure a safe living environment for all students.',
    },
    {
      icon: Sparkles,
      title: 'Cleanliness',
      description: 'We maintain the highest standards of hygiene and cleanliness. Regular cleaning schedules, sanitized common areas, and well-maintained facilities ensure a healthy living space.',
    },
    {
      icon: Home,
      title: 'Comfort',
      description: 'Experience the comfort of home with well-furnished rooms, quality amenities, and a peaceful environment conducive to both study and relaxation.',
    },
    {
      icon: Award,
      title: 'Experience',
      description: 'With over 10 years of experience in student accommodation, we understand the unique needs of students and provide personalized care and support.',
    },
  ];

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
              About City Hostel
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              A trusted name in student accommodation in Bhawarkua, Indore
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
                Welcome to Your Home Away From Home
              </h2>
              <div className="space-y-4 font-paragraph text-lg text-foreground/70">
                <p>
                  City Hostel has been serving students in Bhawarkua, Indore for over a decade, providing safe, clean, and comfortable accommodation for college students. We understand that moving away from home for education is a significant step, and we strive to make this transition as smooth as possible.
                </p>
                <p>
                  Our hostel is strategically located near major educational institutions in Indore, making it convenient for students to commute to their colleges. We provide a supportive environment that balances academic focus with social interaction, helping students grow both personally and professionally.
                </p>
                <p>
                  We welcome both male and female students, maintaining separate facilities to ensure privacy and comfort for all residents. Our experienced management team is dedicated to creating a positive living experience where students can focus on their studies while enjoying a sense of community.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-secondary">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto">
              What makes City Hostel the preferred choice for students and parents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-white border border-gray-200"
              >
                <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-2xl text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="font-paragraph text-base text-foreground/70">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="font-heading text-6xl text-primary mb-4">10+</p>
              <p className="font-paragraph text-xl text-foreground">Years of Experience</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <p className="font-heading text-6xl text-primary mb-4">500+</p>
              <p className="font-paragraph text-xl text-foreground">Happy Students</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <p className="font-heading text-6xl text-primary mb-4">24/7</p>
              <p className="font-paragraph text-xl text-foreground">Security & Support</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-primary">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-4xl md:text-5xl text-primary-foreground mb-6">
                Our Mission
              </h2>
              <p className="font-paragraph text-lg text-primary-foreground/90">
                To provide students with a safe, comfortable, and affordable living environment that supports their academic journey and personal growth. We are committed to maintaining the highest standards of service, cleanliness, and security while fostering a community where students can thrive.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
