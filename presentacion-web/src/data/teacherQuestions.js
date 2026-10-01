export const TEACHER_QUESTIONS = [
  {
    category: 'Manejo de Memoria y Strings',
    question: '¿Por qué en CajaFuerte.java se utilizó intentoCombinacion.equals(combinacionActual) en lugar de intentoCombinacion == combinacionActual?',
    answer: 'En Java, el operador `==` evalúa igualdad por referencia de memoria (si ambos objetos apuntan a la misma dirección física en el Heap o String Pool). Por el contrario, `.equals()` compara el contenido semántico carácter por carácter. Dado que la combinación ingresada se crea dinámicamente mediante `scanner.nextLine()`, su dirección de memoria casi nunca coincidirá con la constante preexistente, por lo que usar `==` arrojaría false aunque los dígitos fuesen idénticos.',
    difficulty: 'Frecuente / Clásica',
    tag: 'Java Core'
  },
  {
    category: 'Principios POO & Arquitectura',
    question: '¿Por qué todos los atributos de CajaFuerte y Estadistica son private? ¿Qué pasaría si fueran public?',
    answer: 'Cumplen con el principio de Encapsulamiento (ocultamiento de la información). Si `combinacionActual` o `estaBloqueada` fuesen públicos, cualquier otra parte del código o una clase externa podría alterar la clave sin validar su formato o desbloquear la caja tras 3 fallos sin autorización. Al hacerlos privados y no exponer setters indiscriminados, la clase garantiza invariantes de seguridad en todo momento.',
    difficulty: 'Fundamental',
    tag: 'POO'
  },
  {
    category: 'Concurrencia y Multithreading',
    question: '¿Cómo funciona exactamente el enmascaramiento con HiloMascara y por qué implementa Runnable?',
    answer: 'En Java estándar, `System.in` en la consola no permite ocultar caracteres de forma nativa sin librerías externas o `System.console()` (que suele ser nulo en IDEs como NetBeans o Eclipse). Por ello se creó `HiloMascara` implementando `Runnable`. Al invocar `hilo.start()`, se crea un hilo paralelo que entra en un bucle `while(!detener)` imprimiendo el carácter de retroceso `\\010` seguido de un asterisco `*` cada milisegundo. Mientras tanto, el hilo principal espera la entrada con `scanner.nextLine()`. Al presionar Enter, se invoca `detenerMascara()` para finalizar el ciclo del hilo de manera segura.',
    difficulty: 'Avanzada',
    tag: 'Multithreading'
  },
  {
    category: 'Diseño de Software',
    question: '¿Por qué crearon una clase separada Estadistica en lugar de colocar esos 4 contadores dentro de CajaFuerte?',
    answer: 'Por el Principio de Responsabilidad Única (SRP - Single Responsibility Principle). La responsabilidad de `CajaFuerte` es la lógica de acceso y seguridad; la responsabilidad de `Estadistica` es la auditoría, acumulación de métricas y presentación de informes. Esta separación permite que si el día de mañana se desea persistir las estadísticas en un archivo JSON o en una base de datos SQLite, solo se deba modificar `Estadistica.java` sin tocar la lógica de la bóveda.',
    difficulty: 'Intermedia',
    tag: 'Clean Code'
  },
  {
    category: 'Algoritmos y Validación',
    question: '¿Cómo garantiza el método validarFormato(String) que no se ingresen caracteres no deseados como letras o el número 4?',
    answer: 'El algoritmo realiza dos comprobaciones: primero, verifica que la cadena no sea nula (`combinacion == null`) y que su longitud sea exactamente 4 (`combinacion.length() != 4`). Segundo, itera carácter por carácter con un bucle `for` y `charAt(i)`. Si cualquier carácter es diferente a `\'1\'`, `\'2\'` y `\'3\'`, retorna inmediatamente `false`. Solo si todos los 4 caracteres pasan el filtro retorna `true`.',
    difficulty: 'Básica',
    tag: 'Algoritmos'
  },
  {
    category: 'Estructuras de Control',
    question: '¿Por qué en Main.java se lee la opción como String en vez de leer directamente un int con scanner.nextInt()?',
    answer: 'Porque `scanner.nextInt()` es vulnerable: si el usuario ingresa accidentalmente una letra o símbolo, Java lanza una excepción no comprobada `InputMismatchException` que detendría el programa inmediatamente si no está atrapada en un bloque `try-catch`. Además, `nextInt()` no consume el salto de línea `\\n` pendiente en el búfer. Leer como `String` mediante `UtilidadesConsola.leerTexto()` es robusto ante cualquier entrada y el `switch (opcionStr)` maneja la selección limpiamente con una cláusula `default`.',
    difficulty: 'Intermedia',
    tag: 'Robustez'
  },
  {
    category: 'Manejo de Excepciones',
    question: '¿Por qué duerme el hilo con Thread.sleep() en UtilidadesConsola y qué pasa con InterruptedException?',
    answer: '`Thread.sleep(milisegundos)` se usa para dar realismo a las animaciones de carga y escaneo. Es un método que arroja la excepción comprobada `InterruptedException`. En el método auxiliar `dormir()`, se captura con `catch (InterruptedException e)` y se llama a `Thread.currentThread().interrupt()` para preservar el estado de interrupción del hilo sin ignorar la señal del sistema operativo.',
    difficulty: 'Avanzada',
    tag: 'Java Exceptions'
  }
];
