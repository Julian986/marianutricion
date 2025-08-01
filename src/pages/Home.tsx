import React, { useState, useEffect } from 'react';


const Home: React.FC = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right');
  const [faqOpen, setFaqOpen] = useState<number | null>(1);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const [closingFaq, setClosingFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  console.log(visibleElements);
  // Función para detectar elementos visibles
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            setVisibleElements(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    // Observar todos los elementos con clase 'animate-on-scroll'
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Cerrar menú móvil al hacer clic fuera y controlar scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (mobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.hamburger-button')) {
        setMobileMenuOpen(false);
      }
    };

    // Controlar scroll del body
    if (mobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.classList.remove('menu-open');
    };
  }, [mobileMenuOpen]);

  const testimonials = [
    {
      id: 1,
      name: "Daniela Kittlein",
      title: "Hace 4 años",
      image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1753913036/unnamed_f0qnfy.webp",
      testimonial: "Excelente profesional. Vicky es la mejor nutri de mar del plata sin lugar a dudas."
    },
    {
      id: 2,
      name: "Yanina Luengo",
      title: "Hace 4 años",
      image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1753913036/unnamed_1_lxxjs1.webp",
      testimonial: "Excelente profesional.! Muy cálida, alcance grandes objetivos.!! La recomiendo 100%."
    },
    {
      id: 3,
      name: "Candela Ara",
      title: "",
      image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1753913036/unnamed_2_joskwh.webp",
      testimonial: "María me ayudó a entender que la nutrición no es solo dieta, sino un estilo de vida. Ahora me siento más saludable y feliz."
    },
    {
      id: 4,
      name: "Selva Audine",
      title: "Hace 4 años",
      image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1753913035/unnamed_3_l3is10.webp",
    },
    {
      id: 5,
      name: "Oscar Paravizini",
      title: "Hace 4 años",
      image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1753913039/unnamed_4_ook4s3.webp",
    },
    {
      id: 6,
      name: "Florencia Paravizini",
      title: "Hace 4 años",
      image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1753913036/unnamed_5_kg1kid.webp",
    }
  ];

  const nextTestimonial = () => {
    setSlideDirection('right');
    setCurrentTestimonialIndex((prev) => (prev + 3) % testimonials.length);
  };

  const prevTestimonial = () => {
    setSlideDirection('left');
    setCurrentTestimonialIndex((prev) => (prev - 3 + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentTestimonialIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  const handleFaqToggle = (faqId: number) => {
    if (faqOpen === faqId) {
      // Cerrar FAQ
      setClosingFaq(faqId);
      setTimeout(() => {
        setFaqOpen(null);
        setClosingFaq(null);
      }, 300); // Duración de la animación
    } else {
      // Abrir FAQ
      if (faqOpen !== null) {
        setClosingFaq(faqOpen);
        setTimeout(() => {
          setFaqOpen(faqId);
          setClosingFaq(null);
        }, 300);
      } else {
        setFaqOpen(faqId);
      }
    }
  };

  // Función para scroll suave a secciones
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 100; // Altura aproximada del header
      const elementPosition = element.offsetTop - headerHeight - 20; // 20px de margen adicional
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    // Cerrar menú móvil si está abierto
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Contenido principal */}
      <div className="min-h-screen" style={{ backgroundColor: '#f3fef6' }}>
        {/* Barra superior */}
        <nav className="fixed top-0 left-0 w-screen flex items-center justify-between px-8 md:px-16 py-7 z-50" style={{ backgroundColor: '#f3fef6' }}>
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-2xl text-gray-700 tracking-tight">Maria Victoria Paravizini</span>
          </div>
          
          {/* Menú desktop */}
          <ul className="hidden lg:flex gap-10 text-gray-700 font-semibold text-xl">
            <li onClick={() => scrollToSection('hero')} className="hover:text-green-600 cursor-pointer transition-colors duration-200">Inicio</li>
            <li onClick={() => scrollToSection('about')} className="hover:text-green-600 cursor-pointer transition-colors duration-200">Sobre mí</li>
            <li onClick={() => scrollToSection('services')} className="hover:text-green-600 cursor-pointer transition-colors duration-200">Servicios</li>
            <li onClick={() => scrollToSection('contact')} className="hover:text-green-600 cursor-pointer transition-colors duration-200">Contacto</li>
          </ul>
          
          {/* Contacto desktop */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 22 2 13.93 2 4.5A1 1 0 013 3.5H6.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z"/></svg>
              <span className="text-green-700 font-semibold text-sm">Turnos y Consultas</span>
            </div>
            <span className="ml-2 font-bold text-lg text-gray-800">+4733378901</span>
          </div>
          
          {/* Botón hamburguesa móvil */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="hamburger-button lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
          >
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </nav>
        
        {/* Menú móvil */}
        <div className={`mobile-menu fixed top-0 left-0 w-full h-full z-40 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`} style={{ backgroundColor: '#f3fef6' }}>
          <div className="flex flex-col h-full pt-24 px-8">
            {/* Menú móvil */}
            <ul className="space-y-6 text-gray-700 font-semibold text-xl">
              <li onClick={() => scrollToSection('hero')} className="hover:text-green-600 cursor-pointer transition-colors duration-200 py-2 border-b border-gray-100">Inicio</li>
              <li onClick={() => scrollToSection('about')} className="hover:text-green-600 cursor-pointer transition-colors duration-200 py-2 border-b border-gray-100">Sobre mí</li>
              <li onClick={() => scrollToSection('services')} className="hover:text-green-600 cursor-pointer transition-colors duration-200 py-2 border-b border-gray-100">Servicios</li>
              <li onClick={() => scrollToSection('contact')} className="hover:text-green-600 cursor-pointer transition-colors duration-200 py-2 border-b border-gray-100">Contacto</li>
            </ul>
          </div>
        </div>

        {/* Sección principal */}
        <main id="hero" className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-8 py-16 md:py-24">
          {/* Texto a la izquierda */}
          <div className="md:w-1/2 w-full flex flex-col items-start justify-center mb-12 md:mb-0">
            <span id="badge" className="animate-on-scroll bg-green-100 text-green-700 font-semibold px-4 py-2 rounded mb-6 text-sm tracking-wide hidden md:block">Lic. Maria Victoria Paravizini</span>
            <h1 id="title" className="animate-on-scroll text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">Nutrición Integral</h1>
            <p id="description" className="animate-on-scroll text-lg text-gray-600 mb-8 max-w-xl"> 𝚃𝚎 𝚊𝚌𝚘𝚖p𝚊ñ𝚘 𝚊 𝚘𝚙𝚝𝚒𝚖𝚒𝚣𝚊𝚛 𝚝𝚞 𝚜𝚊𝚕𝚞𝚍 𝚊 𝚝𝚛𝚊𝚟é𝚜 𝚍𝚎 𝚕𝚊 𝚊𝚕𝚒𝚖𝚎𝚗𝚝𝚊𝚌𝚒ó𝚗 𝚌𝚘𝚗𝚜𝚌𝚒𝚎𝚗𝚝𝚎.
              </p>
            <a href="https://wa.me/5492235121205" target="_blank" rel="noopener noreferrer">
              <button id="cta-button" className="animate-on-scroll bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold px-10 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto transform hover:scale-105 cursor-pointer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.26-1.44l-.38-.22-3.69.97.99-3.59-.25-.37A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.47-7.1c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.5-.5-.67-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.13 3.25 5.17 4.42.72.25 1.28.4 1.72.52.72.23 1.37.2 1.88.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35z"/>
                </svg>
                Solicitar turno
              </button>
            </a>
          </div>
          {/* Imagen a la derecha */}
          <div className="md:w-1/2 w-full flex justify-center items-center relative">
            {/* Imagen borrosa de fondo */}
            {/* <img src="/María imagen perfil.png" alt="Fondo borroso María" className="absolute z-0 w-[420px] h-[420px] md:w-[520px] md:h-[520px] object-cover blur-2xl scale-110 opacity-40" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute' }} /> */}
            {/* Imagen nítida de María delante */}
            <img src="https://res.cloudinary.com/dzoupwn0e/image/upload/v1753753067/imagen_de_perfil_ywyvxg.webp" alt="Nutricionista María" className="relative z-1 w-72 h-72 md:w-96 md:h-96 rounded-3xl object-cover shadow-md opacity-85" />
          </div>
        </main>

        {/* Sección de Servicios */}
        <section id="services" className="py-20">
          <div className="max-w-7xl mx-auto px-8">
            {/* Header de la sección */}
            <div id="services-header" className="animate-on-scroll text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Mis Servicios</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Te ofrezco un acompañamiento integral y personalizado para alcanzar tus objetivos de salud
              </p>
            </div>

            {/* Grid de servicios */}
            <div id="services-grid" className="animate-on-scroll grid md:grid-cols-3 gap-8">
              {/* Servicio 1 - Planes Personalizados */}
              <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
                <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                  <img 
                    src="https://res.cloudinary.com/dzoupwn0e/image/upload/v1753710806/photo-1490645935967-10de6ba17061_z6zsfd.webp" 
                    alt="Planes de nutrición personalizados" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-gray-500">Nutrición</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500">Personalizado</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Planes Personalizados</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Diseño planes de alimentación únicos adaptados a tu metabolismo, preferencias y objetivos específicos. 
                    Incluye análisis completo y seguimiento semanal.
                  </p>
                  <div className="flex items-center justify-between">
                    {/* <span className="text-green-600 font-semibold text-sm">Desde $150/mes</span> */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>María Victoria</span>
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-green-600">MV</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Servicio 2 - Consultas Online */}
              <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
                <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                  <img 
                    src="https://res.cloudinary.com/dzoupwn0e/image/upload/v1753710804/photo-1515683359900-6922e4964be1_rxqqmj.webp" 
                    alt="Consultas nutricionales online" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-gray-500">Online</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500">Flexible</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Consultas Online</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Atención profesional desde cualquier lugar del mundo. Consultas virtuales con tecnología de vanguardia 
                    y la misma calidad que una consulta presencial.
                  </p>
                  <div className="flex items-center justify-between">
                    {/* <span className="text-blue-600 font-semibold text-sm">Desde $80/consulta</span> */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>María Victoria</span>
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-blue-600">MV</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Servicio 3 - Educación Nutricional */}
              <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
                <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                  <img 
                    src="https://res.cloudinary.com/dzoupwn0e/image/upload/v1753710805/photo-1505576399279-565b52d4ac71_t9z7va.webp" 
                    alt="Educación nutricional" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-gray-500">Educación</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500">Integral</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Educación Nutricional</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Programa educativo integral que te empodera con conocimiento científico para tomar decisiones 
                    alimentarias informadas y crear hábitos saludables permanentes.
                  </p>
                  <div className="flex items-center justify-between">
                   {/*  <span className="text-purple-600 font-semibold text-sm">Desde $120/mes</span> */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>María Victoria</span>
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-purple-600">MV</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Sección Sobre Mí */}
        <section id="about" className="py-20" style={{ backgroundColor: '#f3fef6' }}>
          <div className="max-w-7xl mx-auto px-8">
            <div id="about-content" className="animate-on-scroll grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Sobre Mí</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Soy Licenciada en Nutrición con más de 8 años de experiencia ayudando a personas a transformar su vida a través de la alimentación consciente.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  Mi enfoque se basa en la ciencia de la nutrición combinada con un trato humano y empático. Creo que cada persona es única, por eso diseño planes personalizados que se adaptan a tu estilo de vida y objetivos.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                    <div className="text-gray-600">Pacientes atendidos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">8+</div>
                    <div className="text-gray-600">Años de experiencia</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img src="https://res.cloudinary.com/dzoupwn0e/image/upload/v1753711318/sala-de-espera-borrosa_nfqh6h.webp" alt="Consultorio" className="rounded-2xl shadow-2xl" />
                <div className="absolute -bottom-6 -left-6 rounded-xl p-6 shadow-lg" style={{ backgroundColor: '#f3fef6' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Licenciada Certificada</div>
                      <div className="text-sm text-gray-600">Colegio de Nutricionistas</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Testimonios */}
        <section className="py-20 bg-white md:rounded-none rounded-3xl mx-4 md:mx-0">
          <div className="max-w-7xl mx-auto px-8">
            <div id="testimonials-header" className="animate-on-scroll text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Lo que dicen mis pacientes</h2>
              <p className="text-xl text-gray-600">Experiencias reales de personas que transformaron su vida a través de la nutrición consciente</p>
            </div>
            
            {/* Carrusel de testimonios */}
            <div className="relative">
              {/* Flecha izquierda */}
              <button 
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 border border-gray-200 carousel-arrow cursor-pointer"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Flecha derecha */}
              <button 
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 border border-gray-200 carousel-arrow cursor-pointer"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Contenedor de testimonios */}
              <div className="grid md:grid-cols-3 gap-8 px-16 carousel-container">
                {getVisibleTestimonials().map((testimonial, index) => (
                  <div 
                    key={`${testimonial.id}-${currentTestimonialIndex}`} 
                    className="text-center carousel-item"
                    style={{
                      animation: slideDirection === 'right' 
                        ? 'slideInRight 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' 
                        : 'slideInLeft 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      animationFillMode: 'both',
                      animationDelay: `${index * 0.15}s`
                    }}
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{testimonial.title}</p>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.testimonial}"</p>
                    <div className="flex justify-center">
                      <div className="flex text-gray-900">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Indicadores de página */}
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: Math.ceil(testimonials.length / 3) }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonialIndex(i * 3)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      Math.floor(currentTestimonialIndex / 3) === i 
                        ? 'bg-green-600' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Ubicación */}
        <section className="py-20" style={{ backgroundColor: '#f3fef6' }}>
          <div className="max-w-7xl mx-auto px-8">
            <div id="location-header" className="animate-on-scroll text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Encuéntrame aquí</h2>
              <p className="text-xl text-gray-600">Visita mi consultorio para una atención personalizada y profesional</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Información de ubicación */}
              <div className="space-y-6">
                {/* Tarjeta principal */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-start gap-4 mb-8">
                    <svg className="w-8 h-8 text-gray-900 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Consultorio María Nutrición</h3>
                      <p className="text-gray-600 leading-relaxed">Ubicado en una zona céntrica y de fácil acceso, con estacionamiento disponible y excelente conectividad de transporte público.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Horarios de atención</h4>
                        <p className="text-gray-600">Lunes a Viernes 9:00 - 18:00</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Reserva tu cita</h4>
                        <p className="text-gray-600">+4733378901</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Email</h4>
                        <p className="text-gray-600">maria@nutricion.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botón de acción */}
                <div className="text-center">
                  <a 
                    href="https://maps.app.goo.gl/rhMrTiNq7dtD89Zy6" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Ver ubicación en Google Maps
                  </a>
                </div>
              </div>

              {/* Mapa */}
              <div className="relative">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-all duration-300">
                  <div className="relative">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.429034695573!2d-57.536828099999994!3d-38.0137763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584dc3a2fe48417%3A0xc776d180ebaa2b81!2sLic.%20Maria%20Victoria%20Paravizini%2C%20Nutricionista!5e0!3m2!1ses!2sar!4v1753656143482!5m2!1ses!2sar"
                      width="100%" 
                      height="500" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-[500px]"
                    ></iframe>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-semibold text-gray-700">Ubicación en tiempo real</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Preguntas Frecuentes */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-8">
            <div id="faq-header" className="animate-on-scroll text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Preguntas frecuentes</h2>
              <p className="text-xl text-gray-600">Resolvemos las dudas más comunes sobre nuestros servicios</p>
            </div>
            
            <div className="space-y-4">
              {/* Pregunta 1 - Expandida por defecto */}
              <div className="border-b border-gray-200">
                <button 
                  onClick={() => handleFaqToggle(1)}
                  className="w-full py-6 px-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-lg font-semibold text-gray-900">¿Cuánto tiempo toma ver resultados con la nutrición?</span>
                  <svg className={`w-8 h-8 text-black transition-transform duration-200 ${faqOpen === 1 ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <div className={`faq-answer ${faqOpen === 1 ? 'open' : closingFaq === 1 ? 'closing' : ''}`}>
                  <div className="pb-8 pr-12">
                    <p className="text-gray-600 leading-relaxed">
                      Los resultados varían según cada persona y sus objetivos. Generalmente, los primeros cambios se notan en 2-4 semanas, 
                      pero los resultados más significativos se ven en 2-3 meses con constancia. Cada plan es personalizado y adaptado a tu metabolismo y estilo de vida.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pregunta 2 */}
              <div className="border-b border-gray-200">
                <button 
                  onClick={() => handleFaqToggle(2)}
                  className="w-full py-6 px-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-lg font-semibold text-gray-900">¿Qué incluye la primera consulta?</span>
                  <svg className={`w-8 h-8 text-black transition-transform duration-200 ${faqOpen === 2 ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <div className={`faq-answer ${faqOpen === 2 ? 'open' : closingFaq === 2 ? 'closing' : ''}`}>
                  <div className="pb-8 pr-12">
                    <p className="text-gray-600 leading-relaxed">
                      La primera consulta incluye una evaluación completa: historial médico, análisis de composición corporal, 
                      evaluación de hábitos alimentarios, establecimiento de objetivos y creación de un plan nutricional personalizado. 
                      También recibirás material educativo y seguimiento semanal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pregunta 3 */}
              <div className="border-b border-gray-200">
                <button 
                  onClick={() => handleFaqToggle(3)}
                  className="w-full py-6 px-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-lg font-semibold text-gray-900">¿Trabajan con seguros médicos?</span>
                  <svg className={`w-8 h-8 text-black transition-transform duration-200 ${faqOpen === 3 ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <div className={`faq-answer ${faqOpen === 3 ? 'open' : closingFaq === 3 ? 'closing' : ''}`}>
                  <div className="pb-8 pr-12">
                    <p className="text-gray-600 leading-relaxed">
                      Sí, trabajamos con la mayoría de las obras sociales y prepagas. Te ayudamos a verificar tu cobertura 
                      y gestionar las autorizaciones necesarias. También ofrecemos planes de pago flexibles para que la nutrición 
                      sea accesible para todos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pregunta 4 */}
              <div className="border-b border-gray-200">
                <button 
                  onClick={() => handleFaqToggle(4)}
                  className="w-full py-6 px-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-lg font-semibold text-gray-900">¿Puedo cancelar mi cita si no puedo asistir?</span>
                  <svg className={`w-8 h-8 text-black transition-transform duration-200 ${faqOpen === 4 ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <div className={`faq-answer ${faqOpen === 4 ? 'open' : closingFaq === 4 ? 'closing' : ''}`}>
                  <div className="pb-8 pr-12">
                    <p className="text-gray-600 leading-relaxed">
                      Sí, puedes cancelar tu cita hasta 24 horas antes sin cargo. Para cancelaciones con menos tiempo, 
                      te pedimos que nos contactes lo antes posible para poder reprogramar tu consulta. 
                      Entendemos que pueden surgir imprevistos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pregunta 5 */}
              <div className="border-b border-gray-200">
                <button 
                  onClick={() => handleFaqToggle(5)}
                  className="w-full py-6 px-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-lg font-semibold text-gray-900">¿Ofrecen consultas online?</span>
                  <svg className={`w-8 h-8 text-black transition-transform duration-200 ${faqOpen === 5 ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <div className={`faq-answer ${faqOpen === 5 ? 'open' : closingFaq === 5 ? 'closing' : ''}`}>
                  <div className="pb-8 pr-12">
                    <p className="text-gray-600 leading-relaxed">
                      Sí, ofrecemos consultas online a través de videollamadas seguras. Las consultas virtuales tienen la misma 
                      calidad que las presenciales y te permiten acceder a nuestros servicios desde cualquier lugar. 
                      Solo necesitas una conexión a internet estable.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pregunta 6 */}
              <div className="border-b border-gray-200">
                <button 
                  onClick={() => handleFaqToggle(6)}
                  className="w-full py-6 px-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-lg font-semibold text-gray-900">¿Qué diferencia hay entre una dieta y un plan nutricional?</span>
                  <svg className={`w-8 h-8 text-black transition-transform duration-200 ${faqOpen === 6 ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <div className={`faq-answer ${faqOpen === 6 ? 'open' : closingFaq === 6 ? 'closing' : ''}`}>
                  <div className="pb-8 pr-12">
                    <p className="text-gray-600 leading-relaxed">
                      Una dieta es temporal y restrictiva, mientras que un plan nutricional es un cambio de estilo de vida sostenible. 
                      Nuestros planes te enseñan a comer de forma saludable, incluyen educación nutricional, y se adaptan a tu vida 
                      cotidiana para que puedas mantener los resultados a largo plazo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Contacto */}
        <section id="contact" className="py-20" style={{ backgroundColor: '#f3fef6' }}>
          <div id="contact-content" className="animate-on-scroll max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">¿Listo para empezar tu transformación?</h2>
            <p className="text-xl text-gray-600 mb-8">Agenda tu consulta gratuita y descubre cómo podemos trabajar juntos para alcanzar tus objetivos de salud</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/5492235121205" target="_blank" rel="noopener noreferrer">
                <button className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 justify-center transform hover:scale-105">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.26-1.44l-.38-.22-3.69.97.99-3.59-.25-.37A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.47-7.1c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.5-.5-.67-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.13 3.25 5.17 4.42.72.25 1.28.4 1.72.52.72.23 1.37.2 1.88.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35z"/>
                  </svg>
                  Consulta por WhatsApp
                </button>
              </a>
              <button className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 flex items-center gap-3 justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Enviar email
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer - Completamente separado */}
      <footer className="bg-gray-900 text-white py-12 w-full" style={{ marginLeft: '-2rem', marginRight: '-2rem', marginBottom: '-2rem', width: 'calc(100% + 4rem)' }}>
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">María Nutrición</h3>
              <p className="text-gray-400">Transformando vidas a través de la nutrición consciente y personalizada.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Planes personalizados</li>
                <li>Consultas online</li>
                <li>Educación nutricional</li>
                <li>Seguimiento continuo</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>WhatsApp: +4733378901</li>
                <li>Email: maria@nutricion.com</li>
                <li>Horarios: Lun-Vie 9-18hs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Sígueme</h4>
              <div className="flex space-x-4">
                <a href="https://wa.me/5492235121205" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" aria-label="WhatsApp">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.26-1.44l-.38-.22-3.69.97.99-3.59-.25-.37A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.47-7.1c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.5-.5-.67-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.13 3.25 5.17 4.42.72.25 1.28.4 1.72.52.72.23 1.37.2 1.88.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Instagram">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" />
                    <circle cx="12" cy="12" r="5" stroke="currentColor" />
                    <circle cx="17" cy="7" r="1.2" fill="currentColor" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 María Nutrición. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home; 