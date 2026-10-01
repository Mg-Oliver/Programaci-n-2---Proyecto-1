package com.mycompany.juanmiguelalejandra_p1;

import java.util.Scanner;

public class UtilidadesConsola {
    public static final String ANSI_RESET = "\u001B[0m";
    public static final String ANSI_RED = "\u001B[31m";
    public static final String ANSI_GREEN = "\u001B[32m";
    public static final String ANSI_YELLOW = "\u001B[33m";
    public static final String ANSI_CYAN = "\u001B[36m";
    public static final String ANSI_PURPLE = "\u001B[35m";
    public static final String ANSI_BLUE = "\u001B[34m";

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
                System.out.print("\010*"); 
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
        System.out.println(ANSI_CYAN + "\n> Combinación capturada." + ANSI_RESET);
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
        String[] spinner = {"|", "/", "-", "\\"};
        int iteraciones = 15;
        int tiempo = milisegundos / iteraciones;
        
        for (int i = 0; i < iteraciones; i++) {
            System.out.print(ANSI_PURPLE + spinner[i % spinner.length] + ANSI_RESET);
            dormir(tiempo);
            System.out.print("\b");
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
            System.out.print("\r" + frames[i % frames.length]);
            dormir(150);
        }
        System.out.println(ANSI_RESET + "\n");
    }

    public static void mostrarBoveda() {
        System.out.println(ANSI_CYAN + "      ___________");
        System.out.println("     /           \\");
        System.out.println("    |  .-------.  |");
        System.out.println("    |  | " + ANSI_YELLOW + "[ * ]" + ANSI_CYAN + " |  |");
        System.out.println("    |  | " + ANSI_YELLOW + " -|- " + ANSI_CYAN + " |  |");
        System.out.println("    |  '-------'  |");
        System.out.println("     \\___________/" + ANSI_RESET);
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
}