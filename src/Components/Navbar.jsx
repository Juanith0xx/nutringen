import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX, HiChevronDown, HiChevronRight } from 'react-icons/hi';
import { FiUsers, FiMail } from 'react-icons/fi';
import { FaDog, FaPiggyBank, FaFeatherAlt, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(null); // para abrir/cerrar submenus móviles

  const links = [
    { name: 'Nosotros', icon: <FiUsers />, submenu: [{ name: 'Equipo', href: '#equipo' }, { name: 'Propósito', href: '#proposito' }, { name: 'Sostenibilidad', href: '#sostenibilidad' }] },
    { name: 'Aves', icon: <FaFeatherAlt />, submenu: [{ name: 'Nutrición', href: '#aves-nutricion' }, { name: 'Biológicos', href: '#aves-biologicos' }] },
    { name: 'Cerdos', icon: <FaPiggyBank />, submenu: [{ name: 'Nutrición Cerdos', href: '#cerdos-nutricion' }, { name: 'Farmacéutica Cerdos', href: '#cerdos-biologicos' }] },
    {
      name: 'Perros y Gatos', icon: <FaDog />, submenu: [
        { name: 'Gerólamo', href: '#gerolamo' },
        { name: 'Biofresh', href: '#biofresh' },
        { name: 'Three Chile', href: '#threechile' },
        { name: 'Guabi Natural', href: '#guabinatural' },
        { name: 'Gran Plus', href: '#granplus' },
      ]
    },
    { name: 'Puntos de Venta', href: '/puntos-venta', iconMobile: <FaMapMarkerAlt /> },
    { name: 'Contacto', href: '/contacto', icon: <FiMail />, isButton: true },
  ];

  const handleScroll = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const yOffset = -90;
        const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      setOpen(false);
    }
  };

  const toggleMobileSubmenu = (name) => {
    setMobileSubmenuOpen(prev => (prev === name ? null : name));
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-28">
        {/* Logo */}
        <div className="w-60 h-auto pt-6 pb-4">
          <Link to="/">
            <img src="/Logo.png" alt="Logo NUTRINGEN" className="w-full h-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-end flex-1 pr-4">
          <div className="flex items-center gap-x-6 relative">
            {links
              .filter((link) => !link.isButton)
              .map((link) =>
                link.submenu ? (
                  <div key={link.name} className="relative group">
                    <button className="flex items-center gap-1 text-[#2E7D32] !text-base md:text-2xl font-[Nunito Sans] hover:text-[#007A33] font-medium transition-colors duration-300">
                      {link.name}
                      <HiChevronRight className="text-[#2E7D32] ml-1" size={18} />
                    </button>
                    <div className="absolute top-full left-0 mt-4 w-60 bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-50">
                      <ul>
                        {link.submenu.map((sub) => (
                          <li key={sub.name}>
                            <a
                              href={sub.href}
                              onClick={(e) => handleScroll(e, sub.href)}
                              className="block px-4 py-2 text-[#2E7D32] hover:bg-[#007A33] hover:text-white rounded-md transition-all duration-300"
                            >
                              {sub.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-[#2E7D32] !text-base md:text-lg font-[Nunito Sans] hover:text-[#007A33] font-semibold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                )
              )}

            {links.filter((link) => link.isButton).map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="bg-[#84BD00] text-white px-10 py-2 rounded-lg shadow-md font-bold transform transition duration-300 hover:bg-[#007A33] hover:-translate-y-1 ml-6"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700 focus:outline-none" onClick={() => setOpen(!open)}>
          {open ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-screen w-64 bg-white shadow-xl z-50 transform transition-transform duration-500 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-xl font-bold text-[#84BD00]">Menú</span>
          <button onClick={() => setOpen(false)}>
            <HiX size={26} />
          </button>
        </div>

        <ul className="flex flex-col px-4 pt-6 space-y-4 overflow-y-auto">
          {links.filter((link) => !link.isButton).map((link) => (
            <li key={link.name}>
              {link.submenu ? (
                <>
                  <button
                    className="flex items-center justify-between w-full text-[#2E7D32] text-lg font-semibold"
                    onClick={() => toggleMobileSubmenu(link.name)}
                  >
                    <span className="flex items-center gap-2">{link.icon}{link.name}</span>
                    <HiChevronDown className={`transition-transform duration-300 ${mobileSubmenuOpen === link.name ? 'rotate-180' : ''}`} />
                  </button>
                  <ul className={`ml-6 mt-2 space-y-2 overflow-hidden transition-all duration-300 ${mobileSubmenuOpen === link.name ? 'max-h-96' : 'max-h-0'}`}>
                    {link.submenu.map((sub) => (
                      <li key={sub.name}>
                        <a
                          href={sub.href}
                          onClick={(e) => {
                            handleScroll(e, sub.href);
                            setActiveSubmenu(sub.name);
                          }}
                          className="block text-[#444] hover:text-[#2E7D32] text-base transition-colors duration-200"
                        >
                          {sub.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  to={link.href}
                  className="flex items-center text-[#2E7D32] hover:text-[#f3993e] text-lg font-medium transition-colors duration-200"
                  onClick={() => setOpen(false)}
                >
                  {link.iconMobile ? <span className="mr-3">{link.iconMobile}</span> : link.icon && <span className="mr-3">{link.icon}</span>}
                  {link.name}
                </Link>
              )}
            </li>
          ))}

          {/* Contact Button */}
          {links.filter((link) => link.isButton).map((link) => (
            <li key={link.name}>
              <Link
                to={link.href}
                className="flex items-center justify-center bg-[#84BD00] text-white px-4 py-2 rounded-lg shadow-md font-bold transition hover:bg-[#e68932]"
                onClick={() => setOpen(false)}
              >
                {link.icon && <span className="mr-3">{link.icon}</span>}
                {link.name}
              </Link>
            </li>
          ))}

          {/* WhatsApp debajo del Contacto */}
          <li>
            <a
              href="https://wa.me/56969186224"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg shadow-md font-bold transition hover:bg-green-600"
              onClick={() => setOpen(false)}
            >
              <FaWhatsapp className="mr-3" size={20} />
              WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
