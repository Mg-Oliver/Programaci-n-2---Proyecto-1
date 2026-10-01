import React, { useState } from 'react';
import { TEACHER_QUESTIONS } from '../data/teacherQuestions';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, Search, Award } from 'lucide-react';

export default function TeacherQuestionsSection() {
  const [openIdx, setOpenIdx] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('ALL');

  const tags = ['ALL', 'POO', 'Multithreading', 'Java Core', 'Clean Code', 'Algoritmos'];

  const filteredQuestions = TEACHER_QUESTIONS.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag = selectedTag === 'ALL' || q.tag === selectedTag;

    return matchesSearch && matchesTag;
  });

  return (
    <section id="preguntas" style={{ padding: '80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge badge-amber" style={{ marginBottom: '12px' }}>
            <Award size={14} /> Preparación para la Defensa
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '16px' }}>
            Banco de Preguntas Frecuentes del Docente
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '720px', margin: '0 auto', fontSize: '1.05rem' }}>
            Respuestas modelo argumentadas con conceptos técnicos de Programación 2 para responder con total seguridad a las preguntas del jurado.
          </p>
        </div>

        {/* Filter Controls: Search & Tags */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          {/* Search Box */}
          <div
            style={{
              position: 'relative',
              width: '100%',
            }}
          >
            <Search
              size={18}
              color="var(--text-muted)"
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Buscar por pregunta, concepto o palabra clave (ej: equals, hilos, private, static)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(18, 26, 43, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '14px 16px 14px 46px',
                color: '#fff',
                fontSize: '0.95rem',
                outline: 'none',
                fontFamily: 'var(--font-sans)',
              }}
            />
          </div>

          {/* Tag Badges */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                style={{
                  background: selectedTag === tag ? 'rgba(0, 242, 254, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  border: selectedTag === tag ? '1px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: selectedTag === tag ? '#fff' : 'var(--text-secondary)',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Questions Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filteredQuestions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              No se encontraron preguntas con ese criterio de búsqueda.
            </div>
          ) : (
            filteredQuestions.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="glass-panel"
                  style={{
                    overflow: 'hidden',
                    border: isOpen ? '1px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.08)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {/* Question Header */}
                  <div
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                    style={{
                      padding: '20px 24px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      background: isOpen ? 'rgba(0, 242, 254, 0.05)' : 'transparent',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <HelpCircle size={20} color="#00f2fe" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                          <span className="badge badge-purple" style={{ fontSize: '0.68rem' }}>
                            {item.category}
                          </span>
                          <span className="badge badge-cyan" style={{ fontSize: '0.68rem' }}>
                            {item.tag}
                          </span>
                        </div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#fff', lineHeight: 1.4 }}>
                          {item.question}
                        </h3>
                      </div>
                    </div>

                    <div style={{ color: isOpen ? 'var(--accent-cyan)' : 'var(--text-muted)' }}>
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>

                  {/* Answer Body */}
                  {isOpen && (
                    <div
                      style={{
                        padding: '20px 24px 24px 58px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                        background: 'rgba(10, 15, 25, 0.5)',
                        fontSize: '0.94rem',
                        lineHeight: 1.65,
                        color: '#cbd5e1',
                      }}
                    >
                      <div
                        style={{
                          marginBottom: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#34d399',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                        }}
                      >
                        <Sparkles size={14} /> Respuesta fundamentada para el Jurado:
                      </div>
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
