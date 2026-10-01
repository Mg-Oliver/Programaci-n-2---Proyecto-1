package com.mycompany.juanmiguelalejandra_p1;

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

        System.out.println(UtilidadesConsola.ANSI_CYAN + "\n--- CAMBIO DE COMBINACIÓN ---" + UtilidadesConsola.ANSI_RESET);
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
}