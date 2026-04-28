import { useState, useEffect } from 'react';
import { Phone, Navigation as NavigationIcon, ChevronDown, CheckCircle, Clock, Award, Users, Menu, X, ArrowUp } from 'lucide-react';
import LiquidChrome from './components/LiquidChrome';

function App() {
  const [navDark, setNavDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavDark(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);
    };
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
      
      {/* Navigation */}
      <nav 
        style={{
          position: 'fixed',
          top: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          padding: isMobile ? '0.6rem 1.5rem' : '0.75rem 2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: isMobile ? '1.5rem' : '4rem',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '100px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          width: 'max-content',
          maxWidth: '95%'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/stanleylogo2.png" 
            alt="Stanley Pro Audio" 
            style={{ height: isMobile ? '28px' : '32px', width: 'auto', display: 'block' }}
          />
        </div>

        {!isMobile ? (
          <div className="font-label" style={{ display: 'flex', gap: '2.5rem', fontSize: '1rem' }}>
            <a href="#services" style={{ color: '#0a0a0a', textDecoration: 'none', fontWeight: '700', letterSpacing: '1px' }}>SERVICES</a>
            <a href="#about" style={{ color: '#0a0a0a', textDecoration: 'none', fontWeight: '700', letterSpacing: '1px' }}>ABOUT</a>
            <a href="#contact" style={{ color: '#0a0a0a', textDecoration: 'none', fontWeight: '700', letterSpacing: '1px' }}>CONTACT</a>
          </div>
        ) : (
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#0a0a0a', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '4px'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && mobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(10, 10, 10, 0.98)',
            zIndex: 90,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2.5rem',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <a 
            href="#services" 
            onClick={() => setMobileMenuOpen(false)}
            className="font-heading"
            style={{ color: '#fff', textDecoration: 'none', fontSize: '3rem', letterSpacing: '4px' }}
          >
            SERVICES
          </a>
          <a 
            href="#about" 
            onClick={() => setMobileMenuOpen(false)}
            className="font-heading"
            style={{ color: '#fff', textDecoration: 'none', fontSize: '3rem', letterSpacing: '4px' }}
          >
            ABOUT
          </a>
          <a 
            href="#contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="font-heading"
            style={{ color: '#fff', textDecoration: 'none', fontSize: '3rem', letterSpacing: '4px' }}
          >
            CONTACT
          </a>
        </div>
      )}

      {/* Hero Section */}
      <section 
        style={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          paddingTop: '60px'
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'auto', zIndex: -1 }}>
          <LiquidChrome 
            baseColor={[199/255, 52/255, 52/255]} 
            speed={0.3} 
            amplitude={0.3} 
            interactive={true} 
          />
        </div>
        
        {/* Gradient overlays */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40vh',
          background: 'linear-gradient(to top, #0a0a0a 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        {/* Rising Particles */}
        <div className="particle" style={{ width: '4px', height: '4px', left: '10%', animationDuration: '4s' }} />
        <div className="particle" style={{ width: '6px', height: '6px', left: '20%', animationDuration: '6s', animationDelay: '1s' }} />
        <div className="particle" style={{ width: '3px', height: '3px', left: '35%', animationDuration: '5s', animationDelay: '2s' }} />
        <div className="particle" style={{ width: '5px', height: '5px', left: '60%', animationDuration: '7s', animationDelay: '0.5s' }} />
        <div className="particle" style={{ width: '4px', height: '4px', left: '80%', animationDuration: '4.5s', animationDelay: '1.5s' }} />

        {/* Hero Content */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%' }}>
          
          <div 
            className="font-label float-slow delay-1 glass-panel"
            style={{ 
              display: 'inline-block',
              padding: '0.5rem 1.5rem',
              borderRadius: '99px',
              color: '#fff',
              marginBottom: '2rem',
              fontSize: '1.2rem',
              border: '1px solid #c73434',
              boxShadow: '0 0 15px rgba(199, 52, 52, 0.3)'
            }}
          >
            ⚜️ Platinum PhilGEPS Certified
          </div>

          <h1 
            className="font-heading" 
            style={{ 
              lineHeight: 0.9, 
              margin: '0',
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))'
            }}
          >
            <div className="float-medium delay-2" style={{ fontSize: 'clamp(4rem, 15vw, 10rem)', letterSpacing: '4px' }}>STANLEY</div>
            <div className="float-fast delay-3" style={{ fontSize: 'clamp(3rem, 12vw, 8rem)', letterSpacing: '4px', color: '#000000' }}>PRO AUDIO</div>
          </h1>

          <p 
            className="font-body float-slow delay-4" 
            style={{ 
              fontSize: '1.5rem', 
              marginTop: '1.5rem',
              color: '#d1d1d1',
              letterSpacing: '1px'
            }}
          >
            Quality Events · Iloilo City, Philippines
          </p>

          <div 
            className="float-medium delay-1"
            style={{ 
              display: 'flex', 
              gap: '1.5rem', 
              justifyContent: 'center', 
              marginTop: '3rem'
            }}
          >
            <a 
              href="#contact"
              className="font-label"
              style={{
                backgroundColor: '#c73434',
                color: '#fff',
                padding: '1rem 2.5rem',
                textDecoration: 'none',
                fontSize: '1.2rem',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 20px rgba(199, 52, 52, 0.4)'
              }}
            >
              Book an Event
            </a>
            <a 
              href="#services"
              className="font-label"
              style={{
                backgroundColor: 'transparent',
                border: '2px solid #fff',
                color: '#fff',
                padding: '1rem 2.5rem',
                textDecoration: 'none',
                fontSize: '1.2rem',
                borderRadius: '4px',
                transition: 'all 0.3s ease'
              }}
            >
              Our Services
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 10 }}>
          <span className="font-label" style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.7 }}>SCROLL</span>
          <div className="scroll-indicator-line" />
        </div>
      </section>

      {/* Stats Bar */}
      <section 
        style={{ 
          backgroundColor: '#050505', 
          borderBottom: '1px solid rgba(199, 52, 52, 0.1)',
          padding: '3rem 0',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          {[
            { v: '13K+', l: 'Facebook Followers', i: Users },
            { v: '⚜️', l: 'Platinum PhilGEPS', i: Award },
            { v: '24/7', l: 'Always Available', i: Clock },
            { v: '100%', l: 'Quality Events', i: CheckCircle }
          ].map((stat, i) => (
            <div key={i} className="float-small" style={{ animationDelay: `${i * 0.4}s`, display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: 'rgba(199, 52, 52, 0.1)', borderRadius: '50%', color: '#c73434' }}>
                <stat.i size={24} />
              </div>
              <div>
                <div className="font-heading" style={{ fontSize: '2.5rem', lineHeight: 1 }}>{stat.v}</div>
                <div className="font-label" style={{ color: '#888' }}>{stat.l}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: '8rem 0', backgroundColor: '#0a0a0a', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <img 
              src="/stanleylogo-removebg-preview.png" 
              alt="Stanley Pro Audio" 
              style={{ height: '100px', width: 'auto', marginBottom: '1.5rem' }}
            />
            <br />
            <span className="font-label" style={{ color: '#c73434', letterSpacing: '4px' }}>What We Offer</span>
            <h2 className="font-heading" style={{ fontSize: '4rem', marginTop: '0.5rem' }}>Our Services</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '🎙️', title: 'Sound Systems', desc: 'Professional-grade audio setups for concerts, corporate events, and large gatherings' },
              { icon: '💡', title: 'Stage Lighting', desc: 'Dynamic lighting rigs that set the mood from intimate ceremonies to massive outdoor productions' },
              { icon: '🎤', title: 'Live Events', desc: 'End-to-end audio-visual production for weddings, concerts, fiestas, conventions, and corporate shows' },
              { icon: '📡', title: 'Audio Rental', desc: 'Rent top-tier microphones, speakers, mixers, and PA systems for your specific event needs' }
            ].map((srv, i) => (
              <div 
                key={i} 
                className={`glass-panel float-slow delay-${(i % 4) + 1}`}
                style={{ 
                  padding: '3rem 2rem', 
                  borderRadius: '8px',
                  borderTop: '3px solid transparent',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderTopColor = '#c73434';
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(199, 52, 52, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderTopColor = 'transparent';
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{srv.icon}</div>
                <h3 className="font-heading" style={{ fontSize: '2rem', marginBottom: '1rem' }}>{srv.title}</h3>
                <p className="font-body" style={{ color: '#aaa', lineHeight: 1.6 }}>{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platinum Certification Section */}
      <section id="about" style={{ padding: '6rem 0', position: 'relative', zIndex: 10 }}>
        <div className="container" style={{ position: 'relative' }}>
          
          <div 
            className="glass-panel" 
            style={{ 
              padding: '6rem 3rem', 
              textAlign: 'center', 
              borderRadius: '16px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Radial Red Glow Background */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '60%',
              height: '60%',
              background: 'radial-gradient(circle, rgba(199,52,52,0.15) 0%, rgba(10,10,10,0) 70%)',
              pointerEvents: 'none'
            }} />

            <div className="float-medium delay-3" style={{ fontSize: '5rem', marginBottom: '1rem', position: 'relative' }}>⚜️</div>
            <h2 className="font-heading float-small delay-1" style={{ fontSize: '3.5rem', marginBottom: '2rem', position: 'relative' }}>
              Platinum PhilGEPS Certified
            </h2>
            <p className="font-body float-slow delay-2" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', color: '#ccc', position: 'relative' }}>
              Stanley Pro Audio is proudly certified by the Philippine Government Electronic Procurement System — your guarantee of verified, trusted, and quality service for government and private events across the Visayas.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '8rem 0', backgroundColor: '#0a0a0a', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span className="font-label" style={{ color: '#c73434', letterSpacing: '4px' }}>Get In Touch</span>
            <h2 className="font-heading" style={{ fontSize: '4rem', marginTop: '0.5rem' }}>Ready to Serve</h2>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
            
            <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { label: 'Primary', val: '0919 610 4858', i: Phone },
                { label: 'Alternate', val: '0929 363 4850', i: Phone },
                { label: 'Facebook', val: 'Stanley Pro Audio', i: Users },
                { label: 'Location', val: 'Iloilo City, Philippines 5035', i: NavigationIcon }
              ].map((c, i) => (
                <div key={i} className={`glass-panel float-small delay-${i%4 + 1}`} style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', borderRadius: '8px' }}>
                  <div style={{ color: '#c73434' }}>
                    <c.i size={32} />
                  </div>
                  <div>
                    <div className="font-label" style={{ color: '#c73434', marginBottom: '0.2rem' }}>{c.label}</div>
                    <div className="font-heading" style={{ fontSize: '2rem', letterSpacing: '1px' }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ flex: '1 1 400px' }}>
              <div 
                className="glass-panel" 
                style={{ 
                  height: '100%', 
                  minHeight: '400px', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  backgroundImage: 'radial-gradient(circle at center, rgba(199,52,52,0.1) 0%, transparent 70%)',
                }} />
                
                <div className="float-medium delay-2" style={{ color: '#c73434', marginBottom: '2rem' }}>
                  <NavigationIcon size={64} style={{ fill: 'rgba(199,52,52,0.2)' }} />
                </div>
                
                <h3 className="font-heading float-small delay-1" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Iloilo City</h3>
                <p className="font-label float-slow delay-3" style={{ color: '#aaa', fontSize: '1.2rem', letterSpacing: '2px' }}>
                  Western Visayas · Philippines 5035
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '4rem 0', backgroundColor: '#050505', borderTop: '1px solid rgba(199, 52, 52, 0.2)', position: 'relative', zIndex: 10 }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          
          <div className="font-heading" style={{ color: '#c73434', fontSize: '2.5rem', marginBottom: '0.5rem' }}>STANLEY PRO AUDIO</div>
          <div className="font-label" style={{ color: '#888', letterSpacing: '2px', marginBottom: '3rem' }}>Quality Events · Iloilo City, Philippines</div>
          
          <div className="font-label" style={{ display: 'flex', gap: '2rem', marginBottom: '4rem' }}>
            <a href="#services" style={{ color: '#fff', textDecoration: 'none' }}>Services</a>
            <a href="#about" style={{ color: '#fff', textDecoration: 'none' }}>About</a>
            <a href="#contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact</a>
            <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Facebook</a>
          </div>

          <div style={{ color: '#555', fontSize: '0.9rem' }}>
            © 2025 Stanley Pro Audio · Platinum PhilGEPS Certified ⚜️ · Iloilo City, Philippines
          </div>
          
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'rgba(199, 52, 52, 0.9)',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: showScrollTop ? 1 : 0,
          transform: showScrollTop ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
          pointerEvents: showScrollTop ? 'auto' : 'none',
          boxShadow: '0 4px 20px rgba(199, 52, 52, 0.4)',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(199, 52, 52, 0.6)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(199, 52, 52, 0.4)';
        }}
      >
        <ArrowUp size={24} />
      </button>

    </div>
  );
}

export default App;
