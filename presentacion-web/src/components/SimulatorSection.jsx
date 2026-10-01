import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Play, Lock, Unlock, ShieldAlert, KeyRound, BarChart3, RotateCcw, Terminal, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

export default function SimulatorSection() {
  // Vault state mirroring CajaFuerte.java
  const [combinacionActual, setCombinacionActual] = useState('1111');
  const [estaBloqueada, setEstaBloqueada] = useState(false);
  const [intentosConsecutivos, setIntentosConsecutivos] = useState(0);

  // Statistics mirroring Estadistica.java
  const [stats, setStats] = useState({
    exitos: 0,
    fallos: 0,
    total: 0,
    bloqueos: 0,
  });

  // UI Flow State
  // Modes: 'IDLE' | 'INPUT_OPEN' | 'INPUT_CHANGE_CURRENT' | 'INPUT_CHANGE_NEW' | 'PROCESSING'
  const [modo, setModo] = useState('IDLE');
  const [currentInput, setCurrentInput] = useState('');
  const [tempOldPass, setTempOldPass] = useState('');
  const [statusMessage, setStatusMessage] = useState('Sistema listo. Seleccione una opción o ingrese código.');
  const [mascota, setMascota] = useState({ tipo: 'feliz', msg: '¡Todo en orden, jefe!' });
  const [lastExecutedLine, setLastExecutedLine] = useState('CajaFuerte cajaFuerte = new CajaFuerte();');

  // Terminal log
  const [logs, setLogs] = useState([
    { type: 'system', text: '>>> SISTEMA DE BÓVEDA DIGITAL INICIADO <<<' },
    { type: 'warning', text: 'Nota: La combinación por defecto es 1111' },
    { type: 'info', text: 'Esperando instrucciones en Panel Central...' }
  ]);

  const terminalLogsBoxRef = useRef(null);

  const addLog = (text, type = 'info') => {
    setLogs((prev) => [...prev, { text, type, time: new Date().toLocaleTimeString() }]);
  };

  useEffect(() => {
    if (terminalLogsBoxRef.current) {
      terminalLogsBoxRef.current.scrollTop = terminalLogsBoxRef.current.scrollHeight;
    }
  }, [logs]);

  // Keypad click handler
  const handleKeyClick = (val) => {
    if (modo === 'IDLE') {
      setModo('INPUT_OPEN');
      setCurrentInput(val);
      addLog(`> Iniciando ingreso de combinación: *`, 'input');
      return;
    }
    if (currentInput.length < 4) {
      const next = currentInput + val;
      setCurrentInput(next);
      addLog(`> Dígito capturado: * (${next.length}/4)`, 'input');
    }
  };

  const handleBackspace = () => {
    if (currentInput.length > 0) {
      setCurrentInput(currentInput.slice(0, -1));
    }
  };

  const handleClear = () => {
    setCurrentInput('');
  };

  // 1. Abrir bóveda logic mirroring CajaFuerte.java: abrir(String intento)
  const ejecutarAbrir = (codigo) => {
    setLastExecutedLine('cajaFuerte.abrir(intentoCombinacion);');

    if (estaBloqueada) {
      addLog('CAJA FUERTE BLOQUEADA. Acuda a soporte para reiniciar el sistema.', 'error');
      setStatusMessage('BÓVEDA BLOQUEADA PERMANENTEMENTE');
      setMascota({ tipo: 'alerta', msg: '¡Alarma! Intento en sistema bloqueado.' });
      return;
    }

    // Validar formato (longitud 4, solo 1, 2, 3)
    setLastExecutedLine('validarFormato(intentoCombinacion);');
    const esValido = codigo.length === 4 && /^[1-3]+$/.test(codigo);

    if (!esValido) {
      addLog('Error: Valor inválido. La combinación debe tener 4 dígitos y solo usar 1, 2 o 3.', 'error');
      setStatusMessage('Error de formato. Solo dígitos 1, 2 o 3.');
      setMascota({ tipo: 'alerta', msg: '¡Formato inválido detectado!' });
      return;
    }

    addLog('Verificando combinación en módulos de seguridad...', 'cyan');
    setModo('PROCESSING');

    setTimeout(() => {
      // Comparación con .equals()
      setLastExecutedLine('if (intentoCombinacion.equals(combinacionActual))');
      if (codigo === combinacionActual) {
        // Exito
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        addLog('ACCESO AUTORIZADO - Cerrojaduras liberadas', 'success');
        setStatusMessage('¡ACCESO AUTORIZADO! BÓVEDA ABIERTA');
        setMascota({ tipo: 'feliz', msg: '¡Acceso concedido con éxito!' });
        setIntentosConsecutivos(0);
        setStats((prev) => ({
          ...prev,
          exitos: prev.exitos + 1,
          total: prev.total + 1,
        }));
      } else {
        // Fallo
        const nuevosFallosConsecutivos = intentosConsecutivos + 1;
        setIntentosConsecutivos(nuevosFallosConsecutivos);
        setStats((prev) => ({
          ...prev,
          fallos: prev.fallos + 1,
          total: prev.total + 1,
        }));

        addLog('ACCESO DENEGADO - Combinación incorrecta', 'error');

        if (nuevosFallosConsecutivos >= 3) {
          setLastExecutedLine('estaBloqueada = true; estadisticas.registrarBloqueo();');
          setEstaBloqueada(true);
          setStats((prev) => ({ ...prev, bloqueos: prev.bloqueos + 1 }));
          addLog('CAJA FUERTE BLOQUEADA POR SUPERAR 3 INTENTOS FALLIDOS', 'error');
          setStatusMessage('¡ALERTA CRÍTICA: SISTEMA BLOQUEADO!');
          setMascota({ tipo: 'alerta', msg: '¡Sistema bloqueado por intrusión!' });
        } else {
          setLastExecutedLine('System.out.println("Advertencia: Le quedan " + (3 - intentos));');
          addLog(`Advertencia: Le quedan ${3 - nuevosFallosConsecutivos} intento(s) antes del bloqueo.`, 'warning');
          setStatusMessage(`Clave incorrecta. Restan ${3 - nuevosFallosConsecutivos} intentos.`);
          setMascota({ tipo: 'alerta', msg: '¡Clave errónea! Cuidado con el bloqueo.' });
        }
      }
      setModo('IDLE');
      setCurrentInput('');
    }, 800);
  };

  // Submit button
  const handleSubmitCode = () => {
    if (modo === 'INPUT_OPEN' || modo === 'IDLE') {
      ejecutarAbrir(currentInput);
    } else if (modo === 'INPUT_CHANGE_CURRENT') {
      // Step 1 of password change: verify current
      setLastExecutedLine('if (!combinacionIngresada.equals(combinacionActual))');
      if (currentInput !== combinacionActual) {
        addLog('Combinación incorrecta. Operación de cambio cancelada.', 'error');
        setStatusMessage('Clave actual errónea. Operación cancelada.');
        setMascota({ tipo: 'alerta', msg: '¡Operación abortada por clave errónea!' });
        setModo('IDLE');
        setCurrentInput('');
      } else {
        addLog('Clave actual verificada. Ingrese la NUEVA combinación (4 dígitos 1,2,3):', 'cyan');
        setTempOldPass(currentInput);
        setModo('INPUT_CHANGE_NEW');
        setCurrentInput('');
        setStatusMessage('Ingrese la NUEVA clave (4 dígitos, sólo 1, 2 o 3)');
      }
    } else if (modo === 'INPUT_CHANGE_NEW') {
      // Step 2 of password change: validate new password
      setLastExecutedLine('validarFormato(nuevaCombinacion) && !nueva.equals(actual)');
      const esValido = currentInput.length === 4 && /^[1-3]+$/.test(currentInput);
      if (!esValido) {
        addLog('Error: Valor inválido. La nueva clave debe tener 4 dígitos y solo usar 1, 2 o 3.', 'error');
        setStatusMessage('Error: La nueva clave debe ser 4 dígitos (1-3).');
      } else if (currentInput === tempOldPass) {
        addLog('Error: La nueva combinación no puede ser igual a la anterior.', 'error');
        setStatusMessage('Error: No puede ser idéntica a la anterior.');
      } else {
        setModo('PROCESSING');
        addLog('Encriptando y guardando nueva clave...', 'cyan');
        setTimeout(() => {
          setCombinacionActual(currentInput);
          addLog('COMBINACIÓN ACTUALIZADA EXITOSAMENTE.', 'success');
          setStatusMessage('¡Combinación modificada con éxito!');
          setMascota({ tipo: 'feliz', msg: '¡Nueva combinación cifrada en memoria!' });
          setModo('IDLE');
          setCurrentInput('');
        }, 800);
      }
    }
  };

  // Menu action 2: Cambiar combinación
  const handleStartChangePass = () => {
    setLastExecutedLine('cajaFuerte.cambiarCombinacion();');
    if (estaBloqueada) {
      addLog('LA CAJA FUERTE ESTÁ BLOQUEADA. No se puede cambiar la combinación.', 'error');
      setStatusMessage('Bloqueada. No se permite reconfigurar.');
      setMascota({ tipo: 'alerta', msg: '¡Bloqueada! Operación rechazada.' });
      return;
    }
    addLog('\n--- CAMBIO DE COMBINACIÓN ---', 'cyan');
    addLog('Ingrese la combinación actual para autorizar:', 'warning');
    setModo('INPUT_CHANGE_CURRENT');
    setCurrentInput('');
    setStatusMessage('Ingrese la clave ACTUAL para continuar');
  };

  // Menu action 3: Mostrar Estadísticas
  const handleShowStats = () => {
    setLastExecutedLine('cajaFuerte.mostrarEstadisticas(); -> estadisticas.mostrarEstadisticas();');
    addLog('\n📊 Extrayendo registros de seguridad y telemetría...', 'purple');
    addLog('--- ESTADÍSTICAS DE USO ---', 'cyan');
    addLog(`Cantidad de accesos exitosos: ${stats.exitos}`, 'success');
    addLog(`Cantidad de accesos fallidos: ${stats.fallos}`, 'error');
    addLog(`Cantidad total de intentos: ${stats.total}`, 'warning');
    addLog(`Cantidad de veces bloqueada: ${stats.bloqueos}`, 'error');
    addLog('---------------------------', 'cyan');
    setStatusMessage('Estadísticas extraídas correctamente.');
  };

  // Menu action: Reset (Support unlock)
  const handleResetSystem = () => {
    setLastExecutedLine('// Reinicio de simulación para demostración en clase');
    setCombinacionActual('1111');
    setEstaBloqueada(false);
    setIntentosConsecutivos(0);
    setModo('IDLE');
    setCurrentInput('');
    setMascota({ tipo: 'feliz', msg: '¡Todo en orden, jefe!' });
    setStatusMessage('Sistema restaurado a valores por defecto (Clave: 1111).');
    addLog('>>> SERVICIOS DE SEGURIDAD REINICIADOS - CLAVE POR DEFECTO: 1111 <<<', 'success');
  };

  return (
    <section id="simulador" style={{ padding: '80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
      <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge badge-emerald" style={{ marginBottom: '12px' }}>
            <Play size={14} /> Demostración en Tiempo Real
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '16px' }}>
            Simulador de Consola de la Caja Fuerte
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '780px', margin: '0 auto', fontSize: '1.05rem' }}>
            Prueba la lógica de la bóveda directamente en el navegador durante la exposición. Replica de forma idéntica el comportamiento del código Java compilado.
          </p>
        </div>

        {/* Live Code Trace Banner */}
        <div
          style={{
            background: 'rgba(16, 24, 40, 0.95)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            borderRadius: '12px',
            padding: '12px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>
              TRAZADOR DE LÓGICA JAVA
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Línea en ejecución:</span>
            <code style={{ color: '#38bdf8', fontSize: '0.88rem', fontWeight: 600 }}>
              {lastExecutedLine}
            </code>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Clave actual en memoria:</span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'rgba(255, 255, 255, 0.08)',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '0.82rem',
                color: '#34d399',
              }}
            >
              {combinacionActual}
            </span>
          </div>
        </div>

        {/* Simulator Main Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          {/* Panel 1: Cyber Vault Graphic & Keypad */}
          <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Vault Graphic Status */}
            <div
              style={{
                textAlign: 'center',
                padding: '24px',
                borderRadius: '16px',
                background: estaBloqueada
                  ? 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, rgba(15, 23, 42, 0.6) 80%)'
                  : 'radial-gradient(circle, rgba(0, 242, 254, 0.1) 0%, rgba(15, 23, 42, 0.6) 80%)',
                border: estaBloqueada ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(0, 242, 254, 0.2)',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Vault Door Icon */}
              <div
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  margin: '0 auto 16px auto',
                  background: estaBloqueada ? '#ef4444' : '#0f172a',
                  border: `4px solid ${estaBloqueada ? '#f87171' : '#00f2fe'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: estaBloqueada ? '0 0 30px rgba(239, 68, 68, 0.5)' : '0 0 30px rgba(0, 242, 254, 0.3)',
                  transition: 'all 0.3s ease',
                }}
              >
                {estaBloqueada ? (
                  <ShieldAlert size={44} color="#fff" />
                ) : (
                  <Lock size={44} color="#00f2fe" />
                )}
              </div>

              {/* Status Header */}
              <h3 style={{ fontSize: '1.25rem', marginBottom: '6px', color: estaBloqueada ? '#ef4444' : '#fff' }}>
                {estaBloqueada ? 'CAJA FUERTE BLOQUEADA' : 'BÓVEDA DIGITAL SEGURA'}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {statusMessage}
              </p>

              {/* Mascot Bubble */}
              <div
                style={{
                  marginTop: '14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: mascota.tipo === 'feliz' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                  border: `1px solid ${mascota.tipo === 'feliz' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  color: mascota.tipo === 'feliz' ? '#34d399' : '#fca5a5',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <span>{mascota.tipo === 'feliz' ? '[ ^_^ ]' : '[ >_< ]'}</span>
                <span>{mascota.msg}</span>
              </div>
            </div>

            {/* PIN Display */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>CÓDIGO (4 DÍGITOS: 1, 2, 3):</span>
                <span style={{ color: intentosConsecutivos > 0 ? '#f59e0b' : 'var(--text-muted)' }}>
                  Fallos consecutivos: {intentosConsecutivos}/3
                </span>
              </div>

              <div
                style={{
                  background: '#0d121c',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '10px',
                  padding: '14px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  letterSpacing: '0.3em',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  minHeight: '62px',
                }}
              >
                {[0, 1, 2, 3].map((idx) => {
                  const hasChar = currentInput.length > idx;
                  return (
                    <span
                      key={idx}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderBottom: `3px solid ${hasChar ? '#00f2fe' : 'rgba(255, 255, 255, 0.2)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#00f2fe',
                      }}
                    >
                      {hasChar ? '*' : '•'}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Keypad Buttons (Only 1, 2, 3 as per project rules!) */}
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px', textAlign: 'center' }}>
                TECLADO DE COMBINACIÓN (REGLA JAVA: SÓLO DÍGITOS 1, 2 y 3)
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '10px',
                  marginBottom: '10px',
                }}
              >
                {['1', '2', '3'].map((num) => (
                  <button
                    type="button"
                    key={num}
                    onClick={(e) => {
                      e.preventDefault();
                      handleKeyClick(num);
                    }}
                    disabled={modo === 'PROCESSING'}
                    style={{
                      padding: '16px',
                      fontSize: '1.4rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      color: '#fff',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
                    onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    {num}
                  </button>
                ))}
              </div>

              {/* Utility Keypad row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '10px' }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClear();
                  }}
                  className="btn-secondary"
                  style={{ padding: '12px 6px', fontSize: '0.8rem' }}
                  title="Limpiar código"
                >
                  Limpiar
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBackspace();
                  }}
                  className="btn-secondary"
                  style={{ padding: '12px 6px', fontSize: '0.8rem' }}
                  title="Borrar último"
                >
                  ⌫ Borrar
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmitCode();
                  }}
                  disabled={modo === 'PROCESSING' || currentInput.length !== 4}
                  className="btn-primary"
                  style={{
                    padding: '12px',
                    fontSize: '0.88rem',
                    opacity: currentInput.length === 4 ? 1 : 0.5,
                  }}
                >
                  Validar Código
                </button>
              </div>
            </div>

            {/* Quick Menu Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '10px' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                ACCIONES DEL MENÚ CENTRAL:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleStartChangePass();
                  }}
                  className="btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '8px' }}
                >
                  <KeyRound size={14} color="#38bdf8" /> Modificar Clave
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleShowStats();
                  }}
                  className="btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '8px' }}
                >
                  <BarChart3 size={14} color="#c084fc" /> Auditoría
                </button>
              </div>

              {estaBloqueada && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleResetSystem();
                  }}
                  className="btn-danger"
                  style={{ fontSize: '0.85rem', width: '100%', marginTop: '6px' }}
                >
                  <RotateCcw size={15} /> Desbloquear Bóveda (Reset para Demo)
                </button>
              )}
            </div>
          </div>

          {/* Panel 2: Live Console / Terminal ANSI */}
          <div
            className="glass-panel"
            style={{
              padding: '0',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              background: '#0a0e17',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            {/* Terminal Header */}
            <div
              style={{
                padding: '12px 18px',
                background: '#131926',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={16} color="#00f2fe" />
                <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#fff', fontWeight: 600 }}>
                  Consola Java (Salida ANSI & Scanner)
                </span>
              </div>
              <button
                onClick={() => setLogs([])}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                Limpiar consola
              </button>
            </div>

            {/* Terminal Logs Output */}
            <div
              ref={terminalLogsBoxRef}
              style={{
                flex: 1,
                padding: '18px',
                overflowY: 'auto',
                maxHeight: '440px',
                minHeight: '340px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.84rem',
                lineHeight: 1.6,
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              {logs.map((log, i) => {
                let color = '#94a3b8';
                if (log.type === 'error') color = '#f87171';
                if (log.type === 'success') color = '#34d399';
                if (log.type === 'warning') color = '#fbbf24';
                if (log.type === 'cyan') color = '#38bdf8';
                if (log.type === 'purple') color = '#c084fc';
                if (log.type === 'input') color = '#a78bfa';

                return (
                  <div key={i} style={{ color }}>
                    {log.text}
                  </div>
                );
              })}
            </div>

            {/* Live Telemetry / Estadistica.java Display */}
            <div
              style={{
                padding: '16px 20px',
                background: '#0d131f',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '10px', fontWeight: 600 }}>
                TELEMETRÍA EN VIVO (Estadistica.java)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '8px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#34d399' }}>{stats.exitos}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Éxitos</div>
                </div>
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '8px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f87171' }}>{stats.fallos}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Fallos</div>
                </div>
                <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '8px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fbbf24' }}>{stats.total}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Total</div>
                </div>
                <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '8px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#c084fc' }}>{stats.bloqueos}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Bloqueos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
