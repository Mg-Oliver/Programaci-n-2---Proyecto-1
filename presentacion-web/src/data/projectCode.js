export const PROJECT_FILES = [
  {
    id: 'CajaFuerte',
    name: 'CajaFuerte.java',
    path: 'src/main/java/.../CajaFuerte.java',
    category: 'Lógica del Negocio (Core)',
    responsible: 'Miguel',
    description: 'Contiene el estado de la bóveda, la combinación secreta, el control de bloqueos por seguridad y las reglas de validación.',
    principles: ['Encapsulamiento', 'Abstracción', 'Composición con Estadistica'],
    code: `package com.mycompany.juanmiguelalejandra_p1;

/**
 * Clase principal que contiene la lógica de negocio de la Caja Fuerte Digital.
 */
public class CajaFuerte {
    private String combinacionActual;
    private Estadistica estadisticas;
    private int intentosConsecutivos;
    private boolean estaBloqueada;

    public CajaFuerte() {
        this.combinacionActual = "1111"; 
        this.estadisticas = new Estadistica();
        this.intentosConsecutivos = 0;
        this.estaBloqueada = false;
    }

    public void abrir(String intentoCombinacion) {
        if (estaBloqueada) {
            System.out.println(UtilidadesConsola.ANSI_RED + "CAJA FUERTE BLOQUEADA. Acuda a soporte para reiniciar el sistema." + UtilidadesConsola.ANSI_RESET);
            return;
        }

        if (!validarFormato(intentoCombinacion)) {
            System.out.println(UtilidadesConsola.ANSI_RED + "Error: Valor inválido. La combinación debe tener 4 dígitos y solo usar 1, 2 o 3." + UtilidadesConsola.ANSI_RESET);
            return; 
        }

        UtilidadesConsola.simularCarga("Verificando combinación", 1200);

        if (intentoCombinacion.equals(combinacionActual)) {
            System.out.println(UtilidadesConsola.ANSI_GREEN + "ACCESO AUTORIZADO" + UtilidadesConsola.ANSI_RESET);
            estadisticas.registrarIntentoExitoso();
            intentosConsecutivos = 0; 
        } else {
            System.out.println(UtilidadesConsola.ANSI_RED + "ACCESO DENEGADO" + UtilidadesConsola.ANSI_RESET);
            estadisticas.registrarIntentoFallido();
            intentosConsecutivos++; 

            if (intentosConsecutivos >= 3) {
                estaBloqueada = true;
                estadisticas.registrarBloqueo();
                System.out.println(UtilidadesConsola.ANSI_RED + "CAJA FUERTE BLOQUEADA" + UtilidadesConsola.ANSI_RESET);
            } else {
                System.out.println(UtilidadesConsola.ANSI_YELLOW + "Advertencia: Le quedan " + (3 - intentosConsecutivos) + " intento(s) antes del bloqueo." + UtilidadesConsola.ANSI_RESET);
            }
        }
    }

    public void cambiarCombinacion() {
        if (estaBloqueada) {
            System.out.println(UtilidadesConsola.ANSI_RED + "LA CAJA FUERTE ESTÁ BLOQUEADA. No se puede cambiar la combinación." + UtilidadesConsola.ANSI_RESET);
            return;
        }

        System.out.println(UtilidadesConsola.ANSI_CYAN + "\\n--- CAMBIO DE COMBINACIÓN ---" + UtilidadesConsola.ANSI_RESET);
        String combinacionIngresada = UtilidadesConsola.leerCombinacion("Ingrese la combinación actual: ");

        if (!combinacionIngresada.equals(combinacionActual)) {
            System.out.println(UtilidadesConsola.ANSI_RED + "Combinación incorrecta. Operación cancelada." + UtilidadesConsola.ANSI_RESET);
            return;
        }

        String nuevaCombinacion = UtilidadesConsola.leerCombinacion("Ingrese la NUEVA combinación: ");

        if (!validarFormato(nuevaCombinacion)) {
            System.out.println(UtilidadesConsola.ANSI_RED + "Error: Valor inválido. La combinación debe tener 4 dígitos y solo usar 1, 2 o 3." + UtilidadesConsola.ANSI_RESET);
            return;
        }

        if (nuevaCombinacion.equals(combinacionActual)) {
            System.out.println(UtilidadesConsola.ANSI_RED + "Error: La nueva combinación no puede ser igual a la anterior." + UtilidadesConsola.ANSI_RESET);
            return;
        }

        UtilidadesConsola.simularCarga("Encriptando y guardando clave", 1500);

        combinacionActual = nuevaCombinacion;
        System.out.println(UtilidadesConsola.ANSI_GREEN + "COMBINACIÓN ACTUALIZADA EXITOSAMENTE" + UtilidadesConsola.ANSI_RESET);
    }

    private boolean validarFormato(String combinacion) {
        if (combinacion == null || combinacion.length() != 4) {
            return false;
        }
        
        for (int i = 0; i < combinacion.length(); i++) {
            char c = combinacion.charAt(i);
            if (c != '1' && c != '2' && c != '3') {
                return false; 
            }
        }
        return true;
    }

    public void mostrarEstadisticas() {
        estadisticas.mostrarEstadisticas();
    }
}`,
    highlights: [
      {
        lines: '7-10',
        title: 'Encapsulamiento con Atributos Privados',
        concept: 'POO - Ocultamiento de la Información',
        explanation: 'Las variables combinacionActual, estadisticas, intentosConsecutivos y estaBloqueada son privadas. Esto impide que una clase externa altere la clave directamente o desbloquee la caja sin pasar por las validaciones de seguridad.'
      },
      {
        lines: '12-17',
        title: 'Constructor y Composición',
        concept: 'Composición de Objetos',
        explanation: 'En el constructor se inicializa combinacionActual con "1111" y se instancia un nuevo objeto Estadistica(). La relación entre CajaFuerte y Estadistica es una composición (la caja fuerte "tiene una" estadística).'
      },
      {
        lines: '19-28',
        title: 'Patrón de Validación Temprana (Fail-Fast)',
        concept: 'Control de Flujo Robusto',
        explanation: 'Antes de realizar cualquier cálculo o verificación pesada, el método comprueba si la caja está bloqueada o si el formato es inválido. Si algo falla, corta la ejecución con return inmediatamente, ahorrando recursos.'
      },
      {
        lines: '32-48',
        title: 'Comparación con .equals() y Control de Intentos',
        concept: 'Manejo de Strings en Java & Lógica Algorítmica',
        explanation: 'Se usa .equals() en lugar de == porque == compararía las direcciones en memoria (referencias), mientras que .equals() compara los valores de los caracteres. Si falla 3 veces consecutivas, se activa estaBloqueada = true.'
      },
      {
        lines: '83-95',
        title: 'Método Auxiliar Privado (Helper Method)',
        concept: 'Abstracción y Reutilización',
        explanation: 'validarFormato() es private porque es un detalle de implementación interno. Valida que el String no sea nulo, tenga longitud exacta 4 y que cada carácter usando charAt(i) pertenezca únicamente al conjunto {\'1\', \'2\', \'3\'}.'
      }
    ]
  },
  {
    id: 'Estadistica',
    name: 'Estadistica.java',
    path: 'src/main/java/.../Estadistica.java',
    category: 'Métricas y Auditoría',
    responsible: 'Alejandra',
    description: 'Gestiona los contadores de intentos, éxitos, fallos y bloqueos. Garantiza la persistencia en memoria y la auditoría del sistema.',
    principles: ['Principio de Responsabilidad Única (SRP)', 'Encapsulamiento Atómico'],
    code: `package com.mycompany.juanmiguelalejandra_p1;

/**
 * Clase encargada de almacenar y gestionar las estadísticas de la caja fuerte.
 * Aplica los principios de encapsulamiento con atributos privados.
 */
public class Estadistica {
    private int accesosExitosos;
    private int accesosFallidos;
    private int totalIntentos;
    private int vecesBloqueada;

    // Constructor para inicializar las estadísticas en cero
    public Estadistica() {
        this.accesosExitosos = 0;
        this.accesosFallidos = 0;
        this.totalIntentos = 0;
        this.vecesBloqueada = 0;
    }

    // Métodos para actualizar las estadísticas de acuerdo a las acciones del usuario
    
    public void registrarIntentoFallido() {
        this.accesosFallidos++;
        this.totalIntentos++;
    }

    public void registrarIntentoExitoso() {
        this.accesosExitosos++;
        this.totalIntentos++;
    }

    public void registrarBloqueo() {
        this.vecesBloqueada++;
    }

    /**
     * Muestra las estadísticas formateadas con colores en la consola.
     */
    public void mostrarEstadisticas() {
        System.out.println(UtilidadesConsola.ANSI_CYAN + "\\n--- ESTADÍSTICAS DE USO ---" + UtilidadesConsola.ANSI_RESET);
        System.out.println("Cantidad de accesos exitosos: " + UtilidadesConsola.ANSI_GREEN + accesosExitosos + UtilidadesConsola.ANSI_RESET);
        System.out.println("Cantidad de accesos fallidos: " + UtilidadesConsola.ANSI_RED + accesosFallidos + UtilidadesConsola.ANSI_RESET);
        System.out.println("Cantidad total de intentos: " + UtilidadesConsola.ANSI_YELLOW + totalIntentos + UtilidadesConsola.ANSI_RESET);
        System.out.println("Cantidad de veces que la caja fue bloqueada: " + UtilidadesConsola.ANSI_RED + vecesBloqueada + UtilidadesConsola.ANSI_RESET);
        System.out.println(UtilidadesConsola.ANSI_CYAN + "---------------------------" + UtilidadesConsola.ANSI_RESET);
    }
}`,
    highlights: [
      {
        lines: '7-12',
        title: 'Separación de Responsabilidades (SRP)',
        concept: 'Arquitectura Limpia en POO',
        explanation: 'En lugar de mezclar contadores dentro de CajaFuerte, se crea una clase dedicada exclusivamente a almacenar y reportar métricas. Facilita la extensibilidad (por ejemplo, guardar en base de datos o archivo en el futuro).'
      },
      {
        lines: '23-35',
        title: 'Métodos Mutadores Seguros',
        concept: 'Encapsulamiento y Protección de Datos',
        explanation: 'No existen setters arbitrarios como setAccesosFallidos(int x). La única manera de alterar las métricas es mediante acciones explícitas de negocio (registrarIntentoFallido, etc.), garantizando la consistencia del total.'
      },
      {
        lines: '40-47',
        title: 'Presentación Formateada en Consola',
        concept: 'Interfaz de Usuario Textual (TUI)',
        explanation: 'Genera un informe visualmente diferenciado usando los códigos cromáticos ANSI declarados en UtilidadesConsola, haciendo la salida amigable para el operador.'
      }
    ]
  },
  {
    id: 'UtilidadesConsola',
    name: 'UtilidadesConsola.java',
    path: 'src/main/java/.../UtilidadesConsola.java',
    category: 'Concurrencia, UX y Utilidades',
    responsible: 'Juan',
    description: 'Implementa multihilos (Thread/Runnable) para enmascarar contraseñas, secuencias de escape ANSI para color y animaciones de terminal.',
    principles: ['Multithreading / Concurrencia', 'Clase Anidada Estática', 'Polimorfismo con Runnable'],
    code: `package com.mycompany.juanmiguelalejandra_p1;

import java.util.Scanner;

public class UtilidadesConsola {
    public static final String ANSI_RESET = "\\u001B[0m";
    public static final String ANSI_RED = "\\u001B[31m";
    public static final String ANSI_GREEN = "\\u001B[32m";
    public static final String ANSI_YELLOW = "\\u001B[33m";
    public static final String ANSI_CYAN = "\\u001B[36m";
    public static final String ANSI_PURPLE = "\\u001B[35m";
    public static final String ANSI_BLUE = "\\u001B[34m";

    private static final Scanner scanner = new Scanner(System.in);

    public static void limpiarPantalla() {
        for (int i = 0; i < 40; i++) System.out.println();
    }

    // --- HILO PARA OCULTAR LA CONTRASEÑA CON ASTERISCOS ---
    private static class HiloMascara implements Runnable {
        private boolean detener = false;
        @Override
        public void run() {
            while (!detener) {
                System.out.print("\\010*"); 
                try {
                    Thread.sleep(1);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                }
            }
        }
        public void detenerMascara() {
            this.detener = true;
        }
    }

    public static String leerCombinacion(String mensaje) {
        System.out.print(ANSI_YELLOW + mensaje + ANSI_RESET);
        
        HiloMascara mascara = new HiloMascara();
        Thread hilo = new Thread(mascara);
        hilo.start();
        
        String input = scanner.nextLine();
        
        mascara.detenerMascara();
        System.out.println(ANSI_CYAN + "\\n> Combinación capturada." + ANSI_RESET);
        return input;
    }

    public static String leerTexto(String mensaje) {
        System.out.print(ANSI_CYAN + mensaje + ANSI_RESET);
        return scanner.nextLine();
    }

    // --- ANIMACIONES Y ARTE ASCII ---

    public static void imprimirAnimado(String texto, int velocidadMs) {
        for (char c : texto.toCharArray()) {
            System.out.print(c);
            dormir(velocidadMs);
        }
        System.out.println();
    }

    public static void simularCarga(String mensaje, int milisegundos) {
        System.out.print(ANSI_CYAN + mensaje + " ");
        String[] spinner = {"|", "/", "-", "\\\\"};
        int iteraciones = 15;
        int tiempo = milisegundos / iteraciones;
        
        for (int i = 0; i < iteraciones; i++) {
            System.out.print(ANSI_PURPLE + spinner[i % spinner.length] + ANSI_RESET);
            dormir(tiempo);
            System.out.print("\\b");
        }
        System.out.println(ANSI_GREEN + "[ COMPLETADO ]" + ANSI_RESET);
    }

    public static void animacionEscaneo() {
        System.out.print(ANSI_YELLOW + "Escaneando código: [");
        for(int i = 0; i < 15; i++) {
            System.out.print("»");
            dormir(50);
        }
        System.out.println("] VERIFICANDO..." + ANSI_RESET);
    }

    public static void animacionEngranajes() {
        System.out.println(ANSI_CYAN);
        String[] frames = {
            "  ⚙ Procesando...", "   ⚙ Procesando...", "    ⚙ Procesando...", "   ⚙ Procesando..."
        };
        for(int i = 0; i < 8; i++) {
            System.out.print("\\r" + frames[i % frames.length]);
            dormir(150);
        }
        System.out.println(ANSI_RESET + "\\n");
    }

    public static void mostrarBoveda() {
        System.out.println(ANSI_CYAN + "      ___________");
        System.out.println("     /           \\\\");
        System.out.println("    |  .-------.  |");
        System.out.println("    |  | " + ANSI_YELLOW + "[ * ]" + ANSI_CYAN + " |  |");
        System.out.println("    |  | " + ANSI_YELLOW + " -|- " + ANSI_CYAN + " |  |");
        System.out.println("    |  '-------'  |");
        System.out.println("     \\\\___________/" + ANSI_RESET);
    }

    public static void dibujarGraficoEstadisticas() {
        System.out.println(ANSI_PURPLE + " 📊 GENERANDO GRÁFICO DE SEGURIDAD..." + ANSI_RESET);
        dormir(500);
        System.out.println(ANSI_GREEN + " ██████████  [Éxitos]" + ANSI_RESET);
        dormir(200);
        System.out.println(ANSI_RED + " ████        [Fallos]" + ANSI_RESET);
        dormir(200);
        System.out.println(ANSI_YELLOW + " ██████      [Bloqueos]" + ANSI_RESET);
        dormir(200);
    }

    public static void mascotaFeliz() {
        System.out.println(ANSI_GREEN + "   [ ^_^ ] < ¡Todo en orden, jefe!" + ANSI_RESET);
    }

    public static void mascotaAlerta() {
        System.out.println(ANSI_RED + "   [ >_< ] < ¡Alarma! Acción requerida." + ANSI_RESET);
    }

    private static void dormir(int milisegundos) {
        try {
            Thread.sleep(milisegundos);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}`,
    highlights: [
      {
        lines: '6-12',
        title: 'Constantes ANSI y Modificador final',
        concept: 'Buenas Prácticas: Constantes Inmutables',
        explanation: 'Declaradas como public static final String para que pertenezcan a la clase y su valor sea inmutable en memoria. Permiten colorear la salida del terminal en verde, rojo, cyan, etc.'
      },
      {
        lines: '21-37',
        title: 'Concurrencia: HiloMascara implements Runnable',
        concept: 'Multithreading y Clases Anidadas',
        explanation: '¡Uno de los puntos más avanzados de Programación 2! Dado que Java Scanner no tiene un método estándar para ocultar caracteres en consola en todos los SO, se crea un hilo paralelo que imprime retrocesos (\\010) y asteriscos continuamente mientras el hilo principal espera la entrada.'
      },
      {
        lines: '39-51',
        title: 'Coordinación y Ciclo de Vida del Hilo',
        concept: 'Start y Señalización entre Hilos',
        explanation: 'Se instancia Thread(mascara) y se llama a hilo.start(). Cuando scanner.nextLine() termina, se invoca mascara.detenerMascara() que cambia la bandera booleana para terminar el bucle de manera limpia.'
      },
      {
        lines: '68-80',
        title: 'Manejo de Excepciones: Thread.sleep e InterruptedException',
        concept: 'Gestión de Excepciones Comprobadas (Checked Exceptions)',
        explanation: 'Thread.sleep() suspende la ejecución durante X milisegundos para dar realismo a las animaciones. Java obliga a capturar InterruptedException, preservando el estado de interrupción con Thread.currentThread().interrupt().'
      }
    ]
  },
  {
    id: 'Main',
    name: 'Main.java',
    path: 'src/main/java/.../Main.java',
    category: 'Punto de Entrada y Orquestación',
    responsible: 'Alejandra',
    description: 'Punto de inicio de la aplicación Java (main), menú interactivo en bucle, orquestación de llamadas a la bóveda y utilidades de consola.',
    principles: ['Control de Flujo (while / switch-case)', 'Instanciación de Objetos', 'Interacción con el Usuario'],
    code: `package com.mycompany.juanmiguelalejandra_p1;

import java.util.Scanner; 

public class Main {

    public static void main(String[] args) {
        CajaFuerte cajaFuerte = new CajaFuerte();
        boolean ejecutando = true;

        UtilidadesConsola.limpiarPantalla();
        
        UtilidadesConsola.simularCarga("Cargando módulos de seguridad", 1200);
        UtilidadesConsola.mostrarBoveda();
        UtilidadesConsola.mascotaFeliz();
        UtilidadesConsola.imprimirAnimado(UtilidadesConsola.ANSI_PURPLE + ">>> SISTEMA DE BÓVEDA DIGITAL INICIADO <<<" + UtilidadesConsola.ANSI_RESET, 30);
        
        System.out.println(UtilidadesConsola.ANSI_YELLOW + "Nota: La combinación por defecto es 1111" + UtilidadesConsola.ANSI_RESET);
        System.out.println("");

        while (ejecutando) {
            System.out.println(UtilidadesConsola.ANSI_PURPLE + "╔══════════════════════════════════════╗");
            System.out.println("║      " + UtilidadesConsola.ANSI_CYAN + "PANEL DE CONTROL CENTRAL" + UtilidadesConsola.ANSI_PURPLE + "        ║");
            System.out.println("╠══════════════════════════════════════╣");
            System.out.println("║ " + UtilidadesConsola.ANSI_RESET + "1. Desbloquear bóveda" + UtilidadesConsola.ANSI_PURPLE + "                ║");
            System.out.println("║ " + UtilidadesConsola.ANSI_RESET + "2. Modificar código de acceso" + UtilidadesConsola.ANSI_PURPLE + "        ║");
            System.out.println("║ " + UtilidadesConsola.ANSI_RESET + "3. Auditoría y Estadísticas" + UtilidadesConsola.ANSI_PURPLE + "          ║");
            System.out.println("║ " + UtilidadesConsola.ANSI_RESET + "4. Desconectar sistema" + UtilidadesConsola.ANSI_PURPLE + "               ║");
            System.out.println("╚══════════════════════════════════════╝" + UtilidadesConsola.ANSI_RESET);
            
            String opcionStr = UtilidadesConsola.leerTexto("Ejecutar comando (1-4): ");

            UtilidadesConsola.limpiarPantalla();

            switch (opcionStr) {
                case "1":
                    UtilidadesConsola.mostrarBoveda();
                    String intento = UtilidadesConsola.leerCombinacion("\\nIngrese la combinación (4 dígitos): ");
                    UtilidadesConsola.animacionEscaneo(); 
                    cajaFuerte.abrir(intento);
                    break;
                case "2":
                    UtilidadesConsola.mascotaAlerta();
                    System.out.println(UtilidadesConsola.ANSI_CYAN + "\\n--- MODO DE RECONFIGURACIÓN ---" + UtilidadesConsola.ANSI_RESET);
                    cajaFuerte.cambiarCombinacion();
                    UtilidadesConsola.animacionEngranajes(); 
                    break;
                case "3":
                    System.out.println(UtilidadesConsola.ANSI_PURPLE + "\\nExtrayendo registros de seguridad..." + UtilidadesConsola.ANSI_RESET);
                    UtilidadesConsola.simularCarga("Desencriptando historial", 1000);
                    UtilidadesConsola.dibujarGraficoEstadisticas(); 
                    cajaFuerte.mostrarEstadisticas();
                    break;
                case "4":
                    UtilidadesConsola.imprimirAnimado(UtilidadesConsola.ANSI_RED + "Bloqueando bóveda..." + UtilidadesConsola.ANSI_RESET, 40);
                    UtilidadesConsola.simularCarga("Apagando servidores", 1000);
                    UtilidadesConsola.imprimirAnimado(UtilidadesConsola.ANSI_CYAN + "Sistema fuera de línea. ¡Adiós!" + UtilidadesConsola.ANSI_RESET, 30);
                    ejecutando = false;
                    break;
                default:
                    UtilidadesConsola.mascotaAlerta();
                    System.out.println(UtilidadesConsola.ANSI_RED + "ERROR: Comando no reconocido. Reintente." + UtilidadesConsola.ANSI_RESET);
                    break;
            }
            
            if(ejecutando) {
                System.out.println("\\nPresione ENTER para continuar...");
                new Scanner(System.in).nextLine();
                UtilidadesConsola.limpiarPantalla();
            }
        }
    }
}`,
    highlights: [
      {
        lines: '7-10',
        title: 'Método Principal y Ciclo de Vida',
        concept: 'Punto de Entrada JVM',
        explanation: 'public static void main(String[] args) es el punto de entrada que la máquina virtual ejecuta. Se instancia CajaFuerte en memoria heap y se inicializa la bandera booleana ejecutando = true.'
      },
      {
        lines: '21-30',
        title: 'Bucle Principal y Menú Interactivo',
        concept: 'Estructuras de Control Iterativas',
        explanation: 'El bucle while (ejecutando) implementa el patrón de bucle de eventos (Game/Application Loop) común en aplicaciones de consola, mostrando la interfaz hasta que el usuario decida salir.'
      },
      {
        lines: '35-64',
        title: 'Estructura switch-case con Cadenas',
        concept: 'Control de Flujo Selectivo',
        explanation: 'En Java 7+ switch soporta String. Se valida cada opción numérica (1-4) y se incluye una rama default para atrapar cualquier comando no válido y retroalimentar al usuario con una mascota en alerta.'
      },
      {
        lines: '66-70',
        title: 'Pausa y Limpieza de Terminal',
        concept: 'Experiencia de Usuario en Consola',
        explanation: 'Garantiza que el usuario pueda leer los resultados de la operación antes de limpiar la consola con System.out.println() sucesivos.'
      }
    ]
  }
];
