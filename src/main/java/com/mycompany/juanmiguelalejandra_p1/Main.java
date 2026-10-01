package com.mycompany.juanmiguelalejandra_p1;

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
                    String intento = UtilidadesConsola.leerCombinacion("\nIngrese la combinación (4 dígitos): ");
                    UtilidadesConsola.animacionEscaneo(); 
                    cajaFuerte.abrir(intento);
                    break;
                case "2":
                    UtilidadesConsola.mascotaAlerta();
                    System.out.println(UtilidadesConsola.ANSI_CYAN + "\n--- MODO DE RECONFIGURACIÓN ---" + UtilidadesConsola.ANSI_RESET);
                    cajaFuerte.cambiarCombinacion();
                    UtilidadesConsola.animacionEngranajes(); 
                    break;
                case "3":
                    System.out.println(UtilidadesConsola.ANSI_PURPLE + "\nExtrayendo registros de seguridad..." + UtilidadesConsola.ANSI_RESET);
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
                System.out.println("\nPresione ENTER para continuar...");
                new Scanner(System.in).nextLine();
                UtilidadesConsola.limpiarPantalla();
            }
        }
    }
}