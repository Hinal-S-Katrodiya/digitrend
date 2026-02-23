import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";

const Contact = ({ id }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div id={id} className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12"
      style={{ background: "var(--gradient-bg)" }}
    >
      {/* Floating decorative dots */}
      <motion.div
        className="absolute top-20 right-20 w-2 h-2 rounded-full bg-primary-foreground/40"
        animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 left-16 w-1.5 h-1.5 rounded-full bg-primary-foreground/30"
        animate={{ y: [0, 8, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 text-primary-foreground/20 text-lg font-bold"
        animate={{ rotate: [0, 90, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        +
      </motion.div>
      <motion.div
        className="absolute bottom-1/4 right-1/3 text-primary-foreground/15 text-sm font-bold"
        animate={{ rotate: [0, -90, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      >
        ×
      </motion.div>

      {/* Card with wavy/blob shape */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative w-full max-w-[850px]"
      >
        {/* SVG blob background for the card */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 850 550"
          preserveAspectRatio="none"
          style={{ filter: "drop-shadow(1px 30px 30px rgba(0,0,0,0.05))" }}
        >
          <motion.path
            d="M 40,0 
               C 20,0 0,20 0,45 
               L 0,100 
               C 0,110 5,120 15,120 
               C 30,120 30,140 15,145 
               C 5,148 0,155 0,165 
               L 0,300 
               C 0,310 5,320 15,320 
               C 30,320 30,340 15,345 
               C 5,348 0,355 0,365 
               L 0,505 
               C 0,530 20,550 45,550 
               L 300,550 
               C 310,550 320,545 320,535 
               C 320,520 340,520 345,535 
               C 348,545 355,550 365,550 
               L 600,550 
               C 610,550 620,545 620,535 
               C 620,520 640,520 645,535 
               C 648,545 655,550 665,550 
               L 805,550 
               C 830,550 850,530 850,505 
               L 850,445 
               C 850,435 845,425 835,425 
               C 820,425 820,405 835,400 
               C 845,397 850,390 850,380 
               L 850,200 
               C 850,190 845,180 835,180 
               C 820,180 820,160 835,155 
               C 845,152 850,145 850,135 
               L 850,45 
               C 850,20 830,0 805,0 
               L 550,0 
               C 540,0 530,5 530,15 
               C 530,30 510,30 505,15 
               C 502,5 495,0 485,0 
               L 250,0 
               C 240,0 230,5 230,15 
               C 230,30 210,30 205,15 
               C 202,5 195,0 185,0 
               Z"
            fill="white"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>

        {/* Card content */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 p-6 sm:p-10 md:p-14 min-h-[500px]">
          {/* Left - Form */}
          <div>
            <motion.h1
              className="text-3xl md:text-4xl font-bold text-card-foreground mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Let's talk
            </motion.h1>
            <motion.p
              className="text-muted-foreground text-sm mb-8 leading-relaxed max-w-[300px]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              To request a quote or want to meet up for coffee, contact us directly or fill out the form and we will get back to you promptly.
            </motion.p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-xs font-bold text-muted-foreground mb-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full border-input bg-gray-100 rounded-2xl py-2 px-4 text-sm text-card-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-xs font-bold text-muted-foreground mb-1">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-mail"
                  className="w-full border-input bg-gray-100 py-2 px-4 text-sm text-card-foreground outline-none focus:border-primary transition-colors rounded-2xl placeholder:text-muted-foreground/50"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-xs rounded-2xl font-bold text-muted-foreground mb-1">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Type something if you want..."
                  className="w-full rounded-2xl bg-gray-100 p-4 text-sm text-card-foreground outline-none focus:border-primary transition-colors resize-none placeholder:text-muted-foreground/50"
                />
              </motion.div>

              <motion.button
                type="submit"
                className="px-8 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg  "
                style={{ boxShadow: "0 8px 25px hsl(246 65% 58% / 0.4)" }}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                Send Message
              </motion.button>
            </form>
          </div>

          {/* Right - Illustration & Contact Info */}
          <div className="flex flex-col items-center justify-between pt-4">
            {/* Illustration */}
            <motion.div
              className="relative w-48 h-48 flex items-center justify-center mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="absolute inset-0 rounded-full bg-primary/5" />
              <div className="relative flex items-center justify-center">
                {/* Envelope */}
                <motion.div
                  className="relative"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-20 h-14 rounded-md bg-primary/80 flex items-center justify-center shadow-lg">
                    <Mail className="w-8 h-8 text-primary-foreground" />
                  </div>
                  {/* Chat bubble */}
                  <motion.div
                    className="absolute -top-8 -left-4 bg-primary rounded-xl px-3 py-2 shadow-md"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground/80" />
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground/80" />
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground/80" />
                    </div>
                  </motion.div>
                  {/* Paper plane */}
                  <motion.div
                    className="absolute -top-6 right-[-30px] text-accent"
                    animate={{ x: [0, 8, 0], y: [0, -5, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  </motion.div>
                  {/* Document */}
                  <motion.div
                    className="absolute -top-4 right-[-10px] w-10 h-12 bg-card rounded shadow-md border border-border/50 flex flex-col gap-1 p-1.5"
                    animate={{ rotate: [5, 8, 5] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <div className="w-full h-1 bg-primary/20 rounded" />
                    <div className="w-3/4 h-1 bg-primary/20 rounded" />
                    <div className="w-full h-1 bg-primary/20 rounded" />
                    <div className="w-1/2 h-1 bg-primary/20 rounded" />
                  </motion.div>
                </motion.div>

                {/* Floating decorative elements */}
                <motion.div
                  className="absolute -right-8 top-0 w-3 h-3 rounded-full bg-accent"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -left-6 bottom-2 w-2 h-2 rounded-full bg-secondary"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                />
                {/* Phone icon */}
                <motion.div
                  className="absolute -bottom-4 -left-8"
                  animate={{ rotate: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Phone className="w-6 h-6 text-accent" />
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="space-y-3 text-center md:text-left w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-start gap-2 justify-center md:justify-start">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  151 New Park Ave, Hartford, CT 06106<br />United States
                </p>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <p className="text-xs text-muted-foreground">+1 (203) 302-9545</p>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <p className="text-xs text-muted-foreground">contactus@inveritasoft.com</p>
              </div>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              className="flex gap-4 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/80 transition-colors shadow-md"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
