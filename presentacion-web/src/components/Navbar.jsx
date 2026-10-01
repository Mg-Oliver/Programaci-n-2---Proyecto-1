import React, { useState, useEffect } from 'react';
import { Shield, Users, Layers, Code, Play, HelpCircle } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#equipo', label: 'Equipo', icon: Users },
    { href: '#arquitectura', label: 'Arquitectura UML', icon: Layers },
    { href: '#codigo', label: 'Código Java', icon: Code },
    { href: '#simulador', label: 'Simulador en Vivo', icon: Play },
    { href: '#preguntas', label: 'Preguntas Defensa', icon: HelpCircle },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? 'rgba(10, 13, 20, 0.94)' : 'rgba(10, 13, 20, 0.7)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(0, 242, 254, 0.2)' : 'rgba(255, 255, 255, 0.06)'}`,
        padding: '12px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1380px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        {/* Brand / Logo */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: '#fff',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(0, 242, 254, 0.4)',
            }}
          >
            <Shield size={22} color="#031326" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>CAJA FUERTE</span>
              <span className="badge badge-cyan" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>PROG 2</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              JUAN • MIGUEL • ALEJANDRA
            </div>
          </div>
        </a>

        {/* Center Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '4px 8px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}
          className="nav-links-container"
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  padding: '6px 12px',
                  borderRadius: '8px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent-cyan)';
                  e.currentTarget.style.background = 'rgba(0, 242, 254, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <Icon size={15} />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* Direct Action Button to Simulator */}
        <div>
          <a
            href="#simulador"
            className="btn-primary"
            style={{
              padding: '8px 16px',
              fontSize: '0.85rem',
              textDecoration: 'none',
            }}
          >
            <Play size={15} />
            <span>Simulador en Vivo</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
