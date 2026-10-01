package com.mycompany.juanmiguelalejandra_p1;

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
        System.out.println(UtilidadesConsola.ANSI_CYAN + "\n--- ESTADÍSTICAS DE USO ---" + UtilidadesConsola.ANSI_RESET);
        System.out.println("Cantidad de accesos exitosos: " + UtilidadesConsola.ANSI_GREEN + accesosExitosos + UtilidadesConsola.ANSI_RESET);
        System.out.println("Cantidad de accesos fallidos: " + UtilidadesConsola.ANSI_RED + accesosFallidos + UtilidadesConsola.ANSI_RESET);
        System.out.println("Cantidad total de intentos: " + UtilidadesConsola.ANSI_YELLOW + totalIntentos + UtilidadesConsola.ANSI_RESET);
        System.out.println("Cantidad de veces que la caja fue bloqueada: " + UtilidadesConsola.ANSI_RED + vecesBloqueada + UtilidadesConsola.ANSI_RESET);
        System.out.println(UtilidadesConsola.ANSI_CYAN + "---------------------------" + UtilidadesConsola.ANSI_RESET);
    }
}
