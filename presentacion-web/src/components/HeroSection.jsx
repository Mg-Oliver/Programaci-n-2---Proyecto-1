import React from 'react';
import { ShieldCheck, Code2, Cpu, Terminal, Play, Sparkles, Layers, Users } from 'lucide-react';

export default function HeroSection({ onScrollToCode, onScrollToSim }) {
  return (
    <section
      style={{
        paddingTop: '130px',
        paddingBottom: '80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center',
        }}
      >
        {/* Course & Semester Badges */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <span className="badge badge-cyan">
            <Cpu size={14} /> Asignatura: Programación 2
          </span>
          <span className="badge badge-purple">
            <Code2 size={14} /> Java 21 / Maven
          </span>
          <span className="badge badge-emerald">
            <Users size={14} /> Sustentación Grupal (3 Integrantes)
          </span>
        </div>

        {/* Main Title */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
            lineHeight: 1.15,
            marginBottom: '24px',
            fontWeight: 800,
          }}
        >
          Sustentación de Proyecto: <br />
          <span className="gradient-text">Caja Fuerte Digital & Bóveda</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: '860px',
            margin: '0 auto 36px auto',
            fontWeight: 400,
          }}
        >
          Una solución de software desarrollada en <strong>Java</strong> aplicando principios de{' '}
          <span style={{ color: 'var(--accent-cyan)' }}>Programación Orientada a Objetos</span>,{' '}
          <span style={{ color: 'var(--accent-emerald)' }}>validación algorítmica estricta</span>,{' '}
          <span style={{ color: 'var(--accent-purple)' }}>multithreading con Runnable</span> y telemetría de seguridad.
        </p>

        {/* Authors Ribbon */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '18px',
            background: 'rgba(16, 24, 40, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '12px 28px',
            borderRadius: '9999px',
            marginBottom: '40px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
          }}
        >
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Integrantes del Grupo:
          </span>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ color: '#60a5fa', fontWeight: 600, fontSize: '0.95rem' }}>Juan</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
            <span style={{ color: '#34d399', fontWeight: 600, fontSize: '0.95rem' }}>Miguel</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
            <span style={{ color: '#c084fc', fontWeight: 600, fontSize: '0.95rem' }}>Alejandra</span>
          </div>
        </div>

        {/* Call to Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '70px',
          }}
        >
          <button onClick={onScrollToCode} className="btn-primary" style={{ padding: '12px 26px', fontSize: '1rem' }}>
            <Code2 size={18} />
            <span>Explicar Código Fuente</span>
          </button>
          <button onClick={onScrollToSim} className="btn-secondary" style={{ padding: '12px 24px', fontSize: '1rem' }}>
            <Play size={18} color="#10b981" />
            <span>Demostración en Vivo</span>
          </button>
        </div>

        {/* Feature Cards Grid (4 pillars of Programación 2) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            textAlign: 'left',
          }}
        >
          {/* Card 1 */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'rgba(0, 242, 254, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                border: '1px solid rgba(0, 242, 254, 0.3)',
              }}
            >
              <ShieldCheck size={24} color="#00f2fe" />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Encapsulamiento Puro</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Variables críticas con modificador <code>private</code>. El acceso a la contraseña y a los estados de bloqueo se realiza exclusivamente mediante métodos de control controlados.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'rgba(168, 85, 247, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                border: '1px solid rgba(168, 85, 247, 0.3)',
              }}
            >
              <Cpu size={24} color="#c084fc" />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Concurrencia (Threads)</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Implementación de <code>Runnable</code> con <code>HiloMascara</code>. Oculta la clave en la terminal con asteriscos en un hilo secundario sin congelar el hilo de lectura del usuario.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                border: '1px solid rgba(16, 185, 129, 0.3)',
              }}
            >
              <Layers size={24} color="#34d399" />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Composición & SRP</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Separación de la lógica de seguridad (<code>CajaFuerte</code>) y la telemetría de auditoría (<code>Estadistica</code>). Cada clase posee una única responsabilidad bien definida.
            </p>
          </div>

          {/* Card 4 */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'rgba(245, 158, 11, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                border: '1px solid rgba(245, 158, 11, 0.3)',
              }}
            >
              <Terminal size={24} color="#fbbf24" />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>UX & Secuencias ANSI</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Diseño de consola enriquecida: códigos de escape ANSI para colores, spinners dinámicos, gráficos de barras de seguridad y mascotas de retroalimentación de estado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
