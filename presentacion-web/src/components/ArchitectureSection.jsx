import React, { useState } from 'react';
import { Layers, Sparkles } from 'lucide-react';
import { UML_RELATIONS } from '../data/teamData';

export default function ArchitectureSection() {
  const [activeTab, setActiveTab] = useState('diagram');

  return (
    <section id="arquitectura" style={{ padding: '80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge badge-purple" style={{ marginBottom: '12px' }}>
            <Layers size={14} /> Modelo Estructural POO
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '16px' }}>
            Arquitectura de Clases y Diagrama UML
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '760px', margin: '0 auto', fontSize: '1.05rem' }}>
            El sistema se compone de 4 elementos cooperativos diseñados para maximizar la cohesión y minimizar el acoplamiento, cumpliendo con los estándares de la Programación 2.
          </p>
        </div>

        {/* Navigation Tabs (Diagrama de Clases & Relaciones) */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '36px' }}>
          <button
            onClick={() => setActiveTab('diagram')}
            className={activeTab === 'diagram' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 24px', fontSize: '0.92rem' }}
          >
            Diagrama de Clases UML
          </button>
          <button
            onClick={() => setActiveTab('relations')}
            className={activeTab === 'relations' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 24px', fontSize: '0.92rem' }}
          >
            Relaciones y Cardinalidad
          </button>
        </div>

        {/* Tab 1: UML Classes Display */}
        {activeTab === 'diagram' && (
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                marginBottom: '30px',
              }}
            >
              {/* Class 1: Main */}
              <div
                className="glass-panel"
                style={{
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                  overflow: 'hidden',
                  background: 'rgba(15, 23, 42, 0.85)',
                }}
              >
                <div
                  style={{
                    background: 'rgba(59, 130, 246, 0.18)',
                    padding: '12px 16px',
                    borderBottom: '1px solid rgba(59, 130, 246, 0.3)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    «Clase Controladora / Launcher»
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: '#60a5fa', fontFamily: 'var(--font-mono)' }}>Main</h3>
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                    ATRIBUTOS
                  </div>
                  <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                    (Sin estado propio en campos)
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                    MÉTODOS
                  </div>
                  <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ color: '#93c5fd' }}>+ main(args: String[]): void</div>
                  </div>
                </div>
              </div>

              {/* Class 2: CajaFuerte */}
              <div
                className="glass-panel"
                style={{
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  overflow: 'hidden',
                  background: 'rgba(15, 23, 42, 0.85)',
                }}
              >
                <div
                  style={{
                    background: 'rgba(16, 185, 129, 0.18)',
                    padding: '12px 16px',
                    borderBottom: '1px solid rgba(16, 185, 129, 0.3)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: '#6ee7b7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    «Clase Núcleo / Entidad»
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: '#34d399', fontFamily: 'var(--font-mono)' }}>CajaFuerte</h3>
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                    ATRIBUTOS PRIVADOS (-)
                  </div>
                  <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '14px' }}>
                    <div>- combinacionActual: String</div>
                    <div>- estadisticas: Estadistica</div>
                    <div>- intentosConsecutivos: int</div>
                    <div>- estaBloqueada: boolean</div>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                    MÉTODOS
                  </div>
                  <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ color: '#34d399' }}>+ CajaFuerte()</div>
                    <div style={{ color: '#34d399' }}>+ abrir(intento: String): void</div>
                    <div style={{ color: '#34d399' }}>+ cambiarCombinacion(): void</div>
                    <div style={{ color: '#f87171' }}>- validarFormato(c: String): boolean</div>
                    <div style={{ color: '#34d399' }}>+ mostrarEstadisticas(): void</div>
                  </div>
                </div>
              </div>

              {/* Class 3: Estadistica */}
              <div
                className="glass-panel"
                style={{
                  border: '1px solid rgba(168, 85, 247, 0.4)',
                  overflow: 'hidden',
                  background: 'rgba(15, 23, 42, 0.85)',
                }}
              >
                <div
                  style={{
                    background: 'rgba(168, 85, 247, 0.18)',
                    padding: '12px 16px',
                    borderBottom: '1px solid rgba(168, 85, 247, 0.3)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: '#d8b4fe', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    «Clase Modelo / Telemetría»
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: '#c084fc', fontFamily: 'var(--font-mono)' }}>Estadistica</h3>
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                    ATRIBUTOS PRIVADOS (-)
                  </div>
                  <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '14px' }}>
                    <div>- accesosExitosos: int</div>
                    <div>- accesosFallidos: int</div>
                    <div>- totalIntentos: int</div>
                    <div>- vecesBloqueada: int</div>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                    MÉTODOS PÚBLICOS (+)
                  </div>
                  <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ color: '#c084fc' }}>+ Estadistica()</div>
                    <div style={{ color: '#c084fc' }}>+ registrarIntentoFallido(): void</div>
                    <div style={{ color: '#c084fc' }}>+ registrarIntentoExitoso(): void</div>
                    <div style={{ color: '#c084fc' }}>+ registrarBloqueo(): void</div>
                    <div style={{ color: '#c084fc' }}>+ mostrarEstadisticas(): void</div>
                  </div>
                </div>
              </div>

              {/* Class 4: UtilidadesConsola */}
              <div
                className="glass-panel"
                style={{
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  overflow: 'hidden',
                  background: 'rgba(15, 23, 42, 0.85)',
                }}
              >
                <div
                  style={{
                    background: 'rgba(245, 158, 11, 0.18)',
                    padding: '12px 16px',
                    borderBottom: '1px solid rgba(245, 158, 11, 0.3)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: '#fde047', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    «Clase Utilitaria & Concurrencia»
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: '#fbbf24', fontFamily: 'var(--font-mono)' }}>UtilidadesConsola</h3>
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                    CONSTANTES Y MULTITHREAD
                  </div>
                  <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '14px' }}>
                    <div>+ ANSI_RESET, ANSI_GREEN... : String</div>
                    <div style={{ color: '#f59e0b' }}>- class HiloMascara implements Runnable</div>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                    MÉTODOS ESTÁTICOS (+)
                  </div>
                  <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ color: '#fbbf24' }}>+ leerCombinacion(msg): String</div>
                    <div style={{ color: '#fbbf24' }}>+ leerTexto(msg): String</div>
                    <div style={{ color: '#fbbf24' }}>+ simularCarga(msg, ms): void</div>
                    <div style={{ color: '#fbbf24' }}>+ animacionEscaneo(): void</div>
                    <div style={{ color: '#fbbf24' }}>+ mostrarBoveda(): void</div>
                    <div style={{ color: '#fbbf24' }}>+ dibujarGraficoEstadisticas(): void</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Note alert */}
            <div
              style={{
                background: 'rgba(0, 242, 254, 0.05)',
                border: '1px solid rgba(0, 242, 254, 0.2)',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
              }}
            >
              <Sparkles size={20} color="#00f2fe" style={{ flexShrink: 0 }} />
              <div>
                <strong>Diseño Orientado a la Cátedra:</strong> La separación modular en 4 clases permite demostrar los 4 objetivos curriculares de Programación II: <em>Encapsulamiento y modificadores de acceso</em>, <em>Composición de objetos</em>, <em>Manejo de multihilos (Runnable)</em> y <em>Algoritmia de validación de cadenas</em>.
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Relaciones y Cardinalidad */}
        {activeTab === 'relations' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {UML_RELATIONS.map((rel, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      background: 'rgba(0, 242, 254, 0.1)',
                      border: '1px solid rgba(0, 242, 254, 0.25)',
                      borderRadius: '8px',
                      padding: '8px 14px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      color: 'var(--accent-cyan)',
                      fontSize: '0.9rem',
                    }}
                  >
                    {rel.from}
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>─── {rel.type} ───►</span>
                  <div
                    style={{
                      background: 'rgba(168, 85, 247, 0.1)',
                      border: '1px solid rgba(168, 85, 247, 0.25)',
                      borderRadius: '8px',
                      padding: '8px 14px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      color: '#c084fc',
                      fontSize: '0.9rem',
                    }}
                  >
                    {rel.to}
                  </div>
                </div>

                <div style={{ flex: '1 1 300px' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#fff', marginBottom: '4px' }}>
                    {rel.label}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {rel.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
