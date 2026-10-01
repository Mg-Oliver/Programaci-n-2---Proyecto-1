# 🎙️ Guía de Exposición Oral y Guiones del Grupo
## Asignatura: Programación II — Universidad
### Proyecto: Caja Fuerte Digital & Sistema de Bóveda Central en Java

---

## ⏱️ Estructura y Tiempos de la Exposición (12 a 15 minutos en total)

| Expositor(a) | Clases a cargo | Rol Principal | Tiempo sugerido |
| :--- | :--- | :--- | :--- |
| **Juan** | `UtilidadesConsola.java` | Concurrencia con `Runnable`, Códigos ANSI y UX de Consola | 4 - 5 min |
| **Miguel** | `CajaFuerte.java` | Lógica Central de Negocio, Validaciones y Bloqueo | 4 - 5 min |
| **Alejandra** | `Main.java` & `Estadistica.java` | Punto de entrada JVM, Menú `switch-case` y Auditoría (SRP) | 4 - 5 min |

---

## 👤 1. Juan — `UtilidadesConsola.java`
### Rol: Concurrencia, UX y Multithreading

### 📌 Puntos Obligatorios a Explicar al Docente:
1. **Concurrencia en Java con la Interfaz `Runnable`:**
   - Explicar la clase anidada estática `HiloMascara implements Runnable`.
   - Explicar por qué se implementó `Runnable` en lugar de heredar de `Thread` (Java no permite herencia múltiple, desacopla la tarea del hilo ejecutor).
2. **Mecanismo de Enmascaramiento de Contraseñas:**
   - Explicar que la consola estándar de Java (`System.in` / `Scanner`) no posee un método nativo para ocultar caracteres como asteriscos.
   - Detallar cómo el hilo secundario ejecuta un bucle `while (!detener)` imprimiendo el carácter de retroceso `\010` y un asterisco `*` cada 1 milisegundo mediante `Thread.sleep(1)`.
3. **Ciclo de Vida y Sincronización del Hilo:**
   - Inicio del hilo con `Thread hilo = new Thread(mascara); hilo.start();`.
   - Finalización segura con la bandera booleana `detener` mediante `mascara.detenerMascara();` cuando `scanner.nextLine()` termina de leer.
4. **Manejo de Excepciones Comprobadas (Checked Exceptions):**
   - Justificar por qué `Thread.sleep` exige capturar `InterruptedException` y cómo se preserva la señal con `Thread.currentThread().interrupt();`.
5. **Interfaz Visual en Terminal (ANSI):**
   - Uso de constantes `public static final String` para secuencias de escape ANSI (colores verde, rojo, cyan, etc.).
   - Animación de spinner con arreglo `{"|", "/", "-", "\\"}` y gráfico de barras con caracteres Unicode `████`.

### 🗣️ Guión Textual de Apoyo (Qué decir frente al Jurado):
> *"Buenos días profesor y compañeros. En nuestro proyecto desarrollé e implementé la clase `UtilidadesConsola.java`. Uno de los mayores desafíos en aplicaciones de consola en Java es la lectura de contraseñas confidenciales, ya que por defecto `Scanner` muestra todo el texto en pantalla.*
> 
> *Para solucionar esto aplicando los conceptos de concurrencia vistos en Programación 2, creamos la clase anidada `HiloMascara`, la cual implementa la interfaz funcional `Runnable`. Al iniciar la lectura de la combinación, disparamos un hilo secundario en paralelo mediante `hilo.start()`. Este hilo ejecuta un bucle que imprime un retroceso `\010` seguido de un asterisco `*` cada milisegundo, cubriendo los caracteres que el usuario digita.*
> 
> *Para evitar que el hilo quede activo consumiendo CPU indefinidamente, empleamos un mecanismo de señalización mediante la bandera booleana `detener`. En cuanto el hilo principal termina de leer con `scanner.nextLine()`, invocamos `mascara.detenerMascara()`, lo que finaliza el bucle de manera limpia y segura.*
> 
> *Adicionalmente, centralizamos los códigos de escape ANSI y animaciones con `Thread.sleep` manejando correctamente la excepción obligatoria `InterruptedException`."*

### ❓ Preguntas Probables del Docente y Respuestas:
- **¿Qué ventaja tiene implementar `Runnable` frente a heredar de `Thread`?**  
  *Respuesta:* En Java no existe la herencia múltiple. Si heredamos de `Thread`, la clase no puede extender de ninguna otra. Implementar `Runnable` nos da flexibilidad, promueve el desacoplamiento de la tarea y sigue buenas prácticas de POO.
- **¿Por qué se llama a `Thread.currentThread().interrupt()` en el `catch` de `InterruptedException`?**  
  *Respuesta:* Porque capturar la excepción limpia la bandera de interrupción del hilo. Volver a llamar a `interrupt()` preserva el estado para que niveles superiores del entorno de ejecución sepan que el hilo fue solicitado a detenerse.

---

## 👤 2. Miguel — `CajaFuerte.java`
### Rol: Lógica Central del Negocio y Seguridad

### 📌 Puntos Obligatorios a Explicar al Docente:
1. **Encapsulamiento Estricto:**
   - Todos los atributos (`combinacionActual`, `estadisticas`, `intentosConsecutivos`, `estaBloqueada`) tienen modificador de acceso `private`.
   - Ninguna clase externa puede modificar la clave directamente ni alterar el contador de fallos sin pasar por los métodos de control.
2. **Método `abrir(String intentoCombinacion)` y Fail-Fast:**
   - Comprobación inmediata de `estaBloqueada`: si es verdadero, cancela la ejecución sin procesar.
   - Validación sintáctica previa con `validarFormato()` antes de cotejar contraseñas.
3. **Comparación con `.equals()` vs `==`:**
   - Justificación teórica de por qué se utiliza `.equals()` (evalúa contenido textual) y por qué `==` fallaría (evalúa direcciones de memoria en el Heap).
4. **Política de Seguridad por Fallos Consecutivos:**
   - Incremento del contador `intentosConsecutivos++` ante accesos erróneos.
   - Si `intentosConsecutivos >= 3`, se activa `estaBloqueada = true` de forma permanente y se registra el bloqueo en las estadísticas.
   - Si el acceso es exitoso, el contador se restablece a cero (`intentosConsecutivos = 0`).
5. **Algoritmo de Validación `validarFormato(String)`:**
   - Método auxiliar interno `private`.
   - Comprueba `combinacion != null && combinacion.length() == 4`.
   - Itera con `charAt(i)` asegurando que cada carácter sea únicamente `'1'`, `'2'` o `'3'`.
6. **Método `cambiarCombinacion()` (Regla de 3 Factores):**
   - Factor 1: Requiere ingresar la contraseña actual correcta.
   - Factor 2: La nueva contraseña debe cumplir `validarFormato()`.
   - Factor 3: La nueva contraseña no puede ser idéntica a la anterior.

### 🗣️ Guión Textual de Apoyo (Qué decir frente al Jurado):
> *"Buenos días profesor. A mí me corresponde exponer la clase `CajaFuerte.java`, donde reside toda la lógica de negocio y las reglas de seguridad.*
> 
> *Aplicamos un encapsulamiento riguroso declarando todos los atributos como `private`. El método principal es `abrir(String intento)`, el cual implementa el patrón Fail-Fast: primero verifica si la caja ya se encuentra bloqueada; si no lo está, evalúa la sintaxis mediante el método auxiliar privado `validarFormato`. Este método verifica que la cadena tenga exactamente 4 dígitos y que cada uno pertenezca al conjunto de caracteres 1, 2 o 3.*
> 
> *Para validar la clave usamos `.equals()`. Es fundamental recordar que en Java el operador `==` compara referencias de memoria, por lo que una cadena leída desde la consola nunca coincidiría con la constante guardada si usáramos `==`.*
> 
> *En caso de error, incrementamos el contador de intentos fallidos. Si el usuario acumula 3 fallos consecutivos, el sistema cambia la bandera `estaBloqueada = true`, activando una denegación de servicio total hasta que el soporte reinicie la unidad.*
> 
> *Para el cambio de clave aplicamos una regla de 3 pasos: autorizar con la clave actual, verificar formato de la nueva clave y validar que no sea igual a la previa."*

### ❓ Preguntas Probables del Docente y Respuestas:
- **¿Por qué `validarFormato` es `private`?**  
  *Respuesta:* Es un método auxiliar (helper method). Su propósito es interno para soportar `abrir()` y `cambiarCombinacion()`. Exponerlo como público violaría el principio de encapsulamiento y expondría detalles innecesarios.
- **¿Por qué se restablece `intentosConsecutivos = 0` tras un acceso exitoso?**  
  *Respuesta:* Porque la regla de seguridad estipula 3 fallos *consecutivos*. Si un usuario falla una vez pero luego introduce la clave correcta, demuestra ser el dueño legítimo y el contador se reinicia.

---

## 👤 3. Alejandra — `Main.java` & `Estadistica.java`
### Rol: Punto de Entrada JVM, Menú de Control y Métricas de Auditoría

### 📌 Puntos Obligatorios a Explicar al Docente:
1. **Punto de Entrada JVM (`Main.java`):**
   - Declaración de `public static void main(String[] args)`.
   - Instanciación del objeto principal en el Heap: `CajaFuerte cajaFuerte = new CajaFuerte();`.
2. **Ciclo de Vida del Programa (Event Loop de Consola):**
   - Bucle `while (ejecutando)` regulado por una bandera booleana.
   - Permite al operador realizar múltiples transacciones consecutivas sin que el programa termine abruptamente.
3. **Manejo Robusto de Menú con `switch-case` sobre Cadenas:**
   - La opción se captura como `String` mediante `UtilidadesConsola.leerTexto()`.
   - Evita la excepción `InputMismatchException` que ocurriría si se usara `scanner.nextInt()` y el usuario ingresara accidentalmente una letra o carácter especial.
   - Cláusula `default` para manejar opciones no reconocidas con retroalimentación visual (`mascotaAlerta()`).
4. **Principio de Responsabilidad Única (SRP) en `Estadistica.java`:**
   - Explicar por qué las métricas no se colocaron dentro de `CajaFuerte`: desacoplar la lógica de seguridad de la telemetría de auditoría.
   - Relación de Composición (Has-A): `CajaFuerte` *tiene una* instancia de `Estadistica`.
5. **Encapsulamiento Atómico de Contadores:**
   - Atributos privados: `accesosExitosos`, `accesosFallidos`, `totalIntentos`, `vecesBloqueada`.
   - Ausencia deliberada de setters (`setAccesosFallidos(int x)`). Solo se modifican mediante métodos de negocio atómicos (`registrarIntentoExitoso()`, `registrarIntentoFallido()`, `registrarBloqueo()`).
6. **Informe de Auditoría (`mostrarEstadisticas()`):**
   - Presentación de datos formateados con colores ANSI para rápida inspección operativa.

### 🗣️ Guión Textual de Apoyo (Qué decir frente al Jurado):
> *"Buenos días profesor y compañeros. Yo tengo a cargo la presentación de las clases `Main.java` y `Estadistica.java`.*
> 
> *En `Main.java` encontramos el método `main`, que constituye el punto de entrada de la Máquina Virtual de Java. Aquí instanciamos nuestro objeto `CajaFuerte` y gestionamos el ciclo de vida del programa con un bucle `while` gobernado por la bandera `ejecutando`.*
> 
> *Diseñamos la captura del menú leyendo cadenas de texto con `leerTexto()` en lugar de números enteros. Esto es crucial en Programación 2 para garantizar la robustez del software: si usáramos `scanner.nextInt()` y el usuario introduce por error una letra, Java arrojaría un `InputMismatchException` que detendría el sistema. Al leer `String`, el `switch-case` despacha limpiamente las opciones 1 a 4 y cualquier entrada errónea cae en la cláusula `default` de forma segura.*
> 
> *Por su parte, en `Estadistica.java` implementamos el Principio de Responsabilidad Única. La clase `CajaFuerte` no se encarga de formatear ni acumular auditorías; esa tarea se delega por composición a `Estadistica`.*
> 
> *Sus atributos son estrictamente privados y no existen métodos `set` arbitrarios que pudieran falsear los datos. Las estadísticas únicamente se incrementan mediante métodos atómicos como `registrarIntentoExitoso()` o `registrarBloqueo()`, asegurando la integridad total de la auditoría."*

### ❓ Preguntas Probables del Docente y Respuestas:
- **¿Por qué `Estadistica` no extiende (hereda) de `CajaFuerte`?**  
  *Respuesta:* Porque no existe una relación jerárquica "Es-Un". Una estadística no es un tipo de caja fuerte; la relación correcta es de composición ("Tiene-Un"). `CajaFuerte` contiene y delega en una instancia de `Estadistica`.
- **¿Por qué `Main` solo se encarga del menú y no valida contraseñas?**  
  *Respuesta:* Para respetar la arquitectura de capas y el bajo acoplamiento. `Main` actúa como la interfaz con el usuario (Vista/Controlador), mientras que la lógica y las reglas de negocio pertenecen exclusivamente a `CajaFuerte`.

---

## 🎯 Cierre y Paso a la Demostración Práctica
Al terminar Alejandra, el grupo invita al docente a la prueba práctica:
> *"A continuación, pasamos a la demostración interactiva en nuestro simulador en tiempo real para verificar el comportamiento de los 3 intentos fallidos, el bloqueo de seguridad y la actualización de las métricas."*
