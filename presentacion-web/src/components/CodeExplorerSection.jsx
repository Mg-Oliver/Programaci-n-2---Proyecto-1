import React, { useState, useEffect, useMemo } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import { PROJECT_FILES } from '../data/projectCode';
import { Code2, Copy, Check, Info, Sparkles, BookOpen, User, Layers, HelpCircle, ChevronRight } from 'lucide-react';

export default function CodeExplorerSection({ selectedFileId, onSelectFile }) {
  const [activeFile, setActiveFile] = useState(
    PROJECT_FILES.find((f) => f.id === selectedFileId) || PROJECT_FILES[0]
  );
  const [copied, setCopied] = useState(false);
  const [selectedHighlight, setSelectedHighlight] = useState(null);

  useEffect(() => {
    if (selectedFileId) {
      const found = PROJECT_FILES.find((f) => f.id === selectedFileId);
      if (found) {
        setActiveFile(found);
        setSelectedHighlight(null);
      }
    }
  }, [selectedFileId]);


  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeLines = useMemo(() => {
    const grammar = Prism.languages.java || Prism.languages.javascript;
    const highlighted = Prism.highlight(activeFile.code, grammar, 'java');
    return highlighted.split('\n');
  }, [activeFile.code]);

  const activeRange = useMemo(() => {
    if (selectedHighlight === null) return null;
    const hl = activeFile.highlights[selectedHighlight];
    if (!hl || !hl.lines) return null;
    const parts = hl.lines.split('-').map((n) => parseInt(n.trim(), 10));
    if (parts.length === 1) return { start: parts[0], end: parts[0] };
    return { start: parts[0], end: parts[1] };
  }, [selectedHighlight, activeFile]);

  return (
    <section id="codigo" style={{ padding: '80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
      <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '12px' }}>
            <Code2 size={14} /> Explorador Didáctico de Código
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '16px' }}>
            Código Fuente Completo y Análisis de Programación 2
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '780px', margin: '0 auto', fontSize: '1.05rem' }}>
            Haz clic en cada archivo para ver su implementación en Java 21, resaltar las líneas clave y consultar las explicaciones teóricas y pedagógicas para responder durante la defensa.
          </p>
        </div>

        {/* File Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '12px',
            marginBottom: '20px',
          }}
        >
          {PROJECT_FILES.map((file) => {
            const isActive = activeFile.id === file.id;
            return (
              <button
                key={file.id}
                onClick={() => {
                  setActiveFile(file);
                  setSelectedHighlight(null);
                  if (onSelectFile) onSelectFile(file.id);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: isActive ? 'rgba(0, 242, 254, 0.15)' : 'rgba(18, 26, 43, 0.7)',
                  border: isActive ? '1px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 0 16px rgba(0, 242, 254, 0.25)' : 'none',
                }}
              >
                <Code2 size={16} color={isActive ? '#00f2fe' : '#64748b'} />
                <span>{file.name}</span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    background: 'rgba(255, 255, 255, 0.08)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    color: 'var(--text-muted)',
                  }}
                >
                  {file.responsible}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active File Meta Banner */}
        <div
          className="glass-panel"
          style={{
            padding: '18px 24px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            flexWrap: 'wrap',
            background: 'rgba(16, 24, 40, 0.85)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span className="badge badge-purple">{activeFile.category}</span>
              <span className="badge badge-emerald">
                <User size={12} /> Defendido por: {activeFile.responsible}
              </span>
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
              {activeFile.description}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handleCopyCode}
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.82rem' }}
              title="Copiar código al portapapeles"
            >
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              <span>{copied ? '¡Copiado!' : 'Copiar Java'}</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Code Box + Highlights Sidebar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.8fr) minmax(320px, 1fr)',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Code Window */}
          <div
            className="glass-panel"
            style={{
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '14px',
              background: '#0d121c',
            }}
          >
            {/* Terminal Title Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 18px',
                background: '#131926',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#f59e0b' }} />
                <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#10b981' }} />
                <span
                  style={{
                    marginLeft: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  {activeFile.path}
                </span>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Java 21 / UTF-8
              </div>
            </div>

            {/* Scrollable Code Area with Line Numbers */}
            <div
              style={{
                maxHeight: '680px',
                overflowY: 'auto',
                overflowX: 'auto',
                position: 'relative',
                backgroundColor: '#0d121c',
                padding: '16px 0',
              }}
            >
              <div style={{ minWidth: '100%', width: 'max-content' }}>
                {codeLines.map((lineHtml, idx) => {
                  const lineNum = idx + 1;
                  const isHighlighted =
                    activeRange && lineNum >= activeRange.start && lineNum <= activeRange.end;
                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        lineHeight: '1.65rem',
                        fontSize: '0.86rem',
                        backgroundColor: isHighlighted ? 'rgba(0, 242, 254, 0.12)' : 'transparent',
                        borderLeft: isHighlighted ? '3px solid var(--accent-cyan)' : '3px solid transparent',
                        paddingRight: '20px',
                        transition: 'background-color 0.2s ease',
                      }}
                    >
                      <span
                        style={{
                          width: '52px',
                          minWidth: '52px',
                          textAlign: 'right',
                          paddingRight: '18px',
                          userSelect: 'none',
                          color: isHighlighted ? '#38bdf8' : '#475569',
                          fontWeight: isHighlighted ? 700 : 400,
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                        }}
                      >
                        {lineNum}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          whiteSpace: 'pre',
                        }}
                        dangerouslySetInnerHTML={{ __html: lineHtml || '&nbsp;' }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Pedagogical Explanations & Highlight Cards */}
          <div>
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={18} color="#00f2fe" />
                <span>Puntos Críticos para Explicar</span>
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {activeFile.highlights.length} conceptos clave
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {activeFile.highlights.map((h, idx) => {
                const isSelected = selectedHighlight === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedHighlight(isSelected ? null : idx)}
                    className="glass-panel"
                    style={{
                      padding: '16px',
                      cursor: 'pointer',
                      border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.08)',
                      background: isSelected ? 'rgba(0, 242, 254, 0.08)' : 'rgba(18, 26, 43, 0.65)',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 0 15px rgba(0, 242, 254, 0.2)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          background: 'rgba(0, 242, 254, 0.12)',
                          color: 'var(--accent-cyan)',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontWeight: 600,
                        }}
                      >
                        Líneas {h.lines}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#c084fc', fontWeight: 600 }}>
                        {h.concept}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '0.98rem', color: '#fff', marginBottom: '6px' }}>
                      {h.title}
                    </h4>

                    <p
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                      }}
                    >
                      {h.explanation}
                    </p>

                    <div
                      style={{
                        marginTop: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.76rem',
                        color: isSelected ? 'var(--accent-cyan)' : 'var(--text-muted)',
                      }}
                    >
                      <Sparkles size={12} />
                      <span>{isSelected ? 'Concepto enfocado' : 'Tip: Argumento clave para el docente'}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Principles Badges */}
            <div
              className="glass-panel"
              style={{
                marginTop: '18px',
                padding: '16px',
                background: 'rgba(16, 24, 40, 0.6)',
              }}
            >
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>
                PRINCIPIOS DE PROGRAMACIÓN 2 IMPLEMENTADOS:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {activeFile.principles.map((pr, i) => (
                  <span key={i} className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>
                    {pr}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
