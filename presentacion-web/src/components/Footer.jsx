import React from 'react';
import { Shield, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: '#070a10',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '50px 24px 30px 24px',
        color: 'var(--text-secondary)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Shield size={20} color="#031326" />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>
                Caja Fuerte Digital • Programación 2
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Proyecto de Cátedra — Juan, Miguel y Alejandra
              </div>
            </div>
          </div>

          {/* Authors pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Desarrollado por:</span>
            <span className="badge badge-cyan" style={{ fontSize: '0.75rem' }}>Juan</span>
            <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>Miguel</span>
            <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>Alejandra</span>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.82rem' }}
          >
            <ArrowUp size={14} /> Volver arriba
          </button>
        </div>

        {/* Bottom copyright line */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            Diseñado especialmente para la sustentación y defensa oral del proyecto en Programación II.
          </div>
          <div>
            Java 21 • Programación Orientada a Objetos • Multithreading
          </div>
        </div>
      </div>
    </footer>
  );
}
