export const TEAM_MEMBERS = [
  {
    id: 'juan',
    name: 'Juan',
    role: 'Expositor 1: Concurrencia, UX y Multithreading',
    badge: 'Threads & Consola',
    avatarColor: 'from-blue-500 to-indigo-600',
    topicTitle: 'Concurrencia con Runnable, Animaciones y UX (UtilidadesConsola.java)',
    classFocus: 'UtilidadesConsola.java',
    timeAllocation: '4 - 5 min',
    topics: [
      'Concurrencia en Java: clase anidada estática HiloMascara implementando la interfaz funcional Runnable.',
      'Técnica de enmascaramiento con Thread.sleep(1) y retrocesos (\\010*) mientras Scanner espera en el hilo principal.',
      'Ciclo de vida del hilo: start(), sincronización mediante bandera booleana detener y manejo de InterruptedException.',
      'Códigos de escape ANSI para interfaz cromática en consola y animaciones de terminal (spinners y barras).'
    ],
    talkingPoints: [
      '“Buenos días profesor y compañeros. En nuestro proyecto desarrollé e implementé la clase UtilidadesConsola. Uno de los mayores retos en Java de consola es enmascarar contraseñas sin librerías externas.”',
      '“Para resolverlo, aplicamos Multithreading creando una clase anidada HiloMascara que implementa Runnable. Corremos un hilo paralelo que sobreescribe la pantalla mientras Scanner espera la pulsación de teclas.”',
      '“Controlamos el hilo mediante una bandera booleana detener, lo que previene condiciones de carrera y permite liberar el recurso en cuanto se presiona ENTER.”'
    ],
    questionsToDefend: [
      '¿Qué ventajas tiene implementar Runnable frente a heredar de Thread? -> Permite que la clase herede de otra si fuera necesario (Java no tiene herencia múltiple) y desacopla la tarea de la ejecución.',
      '¿Por qué se captura InterruptedException en dormir()? -> Es una excepción comprobada obligatoria al usar Thread.sleep(). Se preserva el estado de interrupción con Thread.currentThread().interrupt().'
    ]
  },
  {
    id: 'miguel',
    name: 'Miguel',
    role: 'Expositor 2: Lógica de Negocio y Seguridad',
    badge: 'Core & Seguridad',
    avatarColor: 'from-emerald-500 to-teal-600',
    topicTitle: 'Lógica Central, Validaciones y Bloqueo (CajaFuerte.java)',
    classFocus: 'CajaFuerte.java',
    timeAllocation: '4 - 5 min',
    topics: [
      'Encapsulamiento estricto: atributos privados (combinacionActual, intentosConsecutivos, estaBloqueada).',
      'Algoritmo del método abrir(): validación temprana (fail-fast) y verificación de contraseña.',
      'Control de seguridad: política de máximo 3 intentos fallidos consecutivos con bloqueo total.',
      'Algoritmo del método cambiarCombinacion(): verificación de clave previa, validación de caracteres {\'1\',\'2\',\'3\'} y no repetición.',
      'Método auxiliar privado validarFormato(String).'
    ],
    talkingPoints: [
      '“En la clase CajaFuerte reside el núcleo de negocio. Todos sus atributos son privados para evitar que el estado interno sea corrompido desde el exterior.”',
      '“El método abrir implementa una defensa escalonada: primero valida si el sistema ya está bloqueado, luego analiza la sintaxis (4 dígitos entre 1 y 3) y finalmente coteja con .equals().”',
      '“Para el cambio de clave aplicamos una regla de tres factores: comprobar clave anterior, validar nuevo formato y asegurar que no sea idéntica a la anterior.”'
    ],
    questionsToDefend: [
      '¿Por qué usar .equals() en lugar del operador ==? -> En Java, == evalúa la identidad de referencia en memoria; .equals() compara el contenido textual.',
      '¿Por qué validarFormato es private? -> Es un helper method, un detalle de implementación interno no visible para otras clases.'
    ]
  },
  {
    id: 'alejandra',
    name: 'Alejandra',
    role: 'Expositora 3: Orquestación, Menú y Auditoría',
    badge: 'Main & Estadistica',
    avatarColor: 'from-purple-500 to-pink-600',
    topicTitle: 'Punto de Entrada JVM, Menú de Control y Métricas (Main.java y Estadistica.java)',
    classFocus: 'Main.java & Estadistica.java',
    timeAllocation: '4 - 5 min',
    topics: [
      'Punto de entrada JVM: método main(String[] args) e instanciación de objetos en memoria Heap.',
      'Estructura iterativa while(ejecutando) y switch-case con cadenas para navegación robusta sin excepciones de tipo.',
      'Principio de Responsabilidad Única (SRP) en Estadistica.java: separación entre lógica de seguridad y telemetría.',
      'Encapsulamiento atómico de contadores (accesosExitosos, accesosFallidos, vecesBloqueada) sin setters arbitrarios.',
      'Conclusiones finales de la defensa grupal y paso a la demostración práctica.'
    ],
    talkingPoints: [
      '“Buenos días profesor y compañeros. Yo tengo a cargo la presentación de las clases Main.java y Estadistica.java.”',
      '“En Main.java estructuramos el ciclo de vida de la aplicación con un bucle while controlado por una bandera ejecutando. Empleamos switch-case sobre cadenas (String) para evitar que el programa se caiga por un InputMismatchException si el usuario ingresa letras.”',
      '“En Estadistica.java aplicamos el Principio de Responsabilidad Única (SRP). La caja no se preocupa por cómo se guardan o imprimen las estadísticas; Estadistica encapsula los contadores de forma atómica.”'
    ],
    questionsToDefend: [
      '¿Por qué Main lee cadenas con leerTexto() en vez de enteros con nextInt()? -> Para robustez: si el usuario escribe caracteres no numéricos, nextInt() lanza InputMismatchException; con String se procesa limpiamente en el switch.',
      '¿Por qué Estadistica no extiende de CajaFuerte? -> Porque no es una relación de herencia "Es-Un", sino una relación de composición "Tiene-Un". CajaFuerte contiene una instancia de Estadistica.'
    ]
  }
];

export const UML_RELATIONS = [
  {
    from: 'Main',
    to: 'CajaFuerte',
    type: 'Dependencia / Asociación',
    label: 'instancia y delega acciones a',
    description: 'Main posee una referencia local de CajaFuerte para ejecutar abrir(), cambiarCombinacion() y mostrarEstadisticas().'
  },
  {
    from: 'CajaFuerte',
    to: 'Estadistica',
    type: 'Composición',
    label: 'tiene una (1:1)',
    description: 'CajaFuerte instancia y gestiona el ciclo de vida de un objeto Estadistica para registrar cada evento de acceso.'
  },
  {
    from: 'UtilidadesConsola',
    to: 'HiloMascara',
    type: 'Anidación Estática (Inner Class)',
    label: 'define e inicia hilo',
    description: 'HiloMascara implementa Runnable para la tarea concurrente de sobrescribir caracteres en terminal.'
  },
  {
    from: 'Main / CajaFuerte / Estadistica',
    to: 'UtilidadesConsola',
    type: 'Dependencia Estática',
    label: 'utiliza métodos utilitarios',
    description: 'Acceden a las constantes ANSI, animaciones de carga, arte ASCII y métodos de lectura seguros.'
  }
];
