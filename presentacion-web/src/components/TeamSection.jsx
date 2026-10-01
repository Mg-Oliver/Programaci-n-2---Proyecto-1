import React from 'react';
import { TEAM_MEMBERS } from '../data/teamData';
import { Users, Clock, FileCode, ArrowRight, BookOpen } from 'lucide-react';

export default function TeamSection({ onSelectClass }) {
  return (
    <section id="equipo" style={{ padding: '80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '46px' }}>
          <span className="badge badge-emerald" style={{ marginBottom: '12px' }}>
            <Users size={14} /> Equipo de Exposición (3 Integrantes)
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '14px' }}>
            Distribución de Clases y Roles
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '720px', margin: '0 auto', fontSize: '1.05rem' }}>
            Cada integrante tiene asignadas clases modulares específicas del proyecto para sustentar ante el docente.
          </p>
        </div>

        {/* 3 Member Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '32px',
          }}
        >
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="glass-panel"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                background: 'rgba(16, 23, 38, 0.8)',
                transition: 'all 0.25s ease',
              }}
            >
              <div>
                {/* Member Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${
                          member.id === 'juan' ? '#3b82f6, #6366f1' : member.id === 'miguel' ? '#10b981, #14b8a6' : '#a855f7, #ec4899'
                        })`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '1.25rem',
                        color: '#fff',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                      }}
                    >
                      {member.name[0]}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#fff' }}>{member.name}</h3>
                      <span className="badge badge-purple" style={{ fontSize: '0.72rem', marginTop: '2px' }}>
                        {member.badge}
                      </span>
                    </div>
                  </div>

                  <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>
                    <Clock size={12} /> {member.timeAllocation}
                  </span>
                </div>

                {/* Role Description */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                    Rol en la sustentación:
                  </div>
                  <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {member.role}
                  </div>
                </div>

                {/* Class Focus */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
                    Clases a cargo:
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {member.classFocus.split('&').map((cls) => (
                      <span
                        key={cls}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          background: 'rgba(0, 242, 254, 0.1)',
                          color: 'var(--accent-cyan)',
                          border: '1px solid rgba(0, 242, 254, 0.25)',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                        }}
                      >
                        {cls.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons to View Code */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                {member.classFocus.split('&').map((cls) => {
                  const cleanName = cls.trim();
                  return (
                    <button
                      key={cleanName}
                      onClick={() => onSelectClass(cleanName)}
                      className="btn-primary"
                      style={{
                        padding: '10px 16px',
                        fontSize: '0.85rem',
                        width: '100%',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FileCode size={16} />
                        <span>Ver código {cleanName}</span>
                      </span>
                      <ArrowRight size={15} />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
