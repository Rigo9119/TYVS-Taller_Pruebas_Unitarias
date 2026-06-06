# Inicio

## Descripción del dominio

Este proyecto implementa el sistema de **Registraduría Electoral**, un servicio que permite registrar personas como votantes para las próximas elecciones. El sistema valida que cada persona cumpla con los requisitos legales antes de inscribirla, y emite un certificado electoral únicamente a aquellas cuyo voto sea válido.

El núcleo del sistema es el método `registerVoter(person)`, que aplica las siguientes reglas de negocio:

| Condición | Resultado |
|-----------|-----------|
| Persona `null` | `INVALID` |
| `id <= 0` | `INVALID` |
| `alive = false` | `DEAD` |
| `age < 0` o `age > 120` | `INVALID_AGE` |
| `age < 18` | `UNDERAGE` |
| `id` ya registrado | `DUPLICATED` |
| Todas las reglas pasan | `VALID` |

---

## Alcance del taller

- Aplicar el ciclo **TDD (Red → Green → Refactor)** para construir el servicio de forma incremental.
- Estructurar cada prueba con el patrón **AAA (Arrange – Act – Assert)**.
- Definir **clases de equivalencia y valores límite** para maximizar cobertura con el mínimo de pruebas.
- Expresar los escenarios clave en formato **BDD (Given – When – Then)**.
- Medir la cobertura de código con **Vitest + @vitest/coverage-v8** y superar el 75%.

---

## Tecnologías utilizadas

| Rol | Herramienta |
|-----|-------------|
| Lenguaje | TypeScript 5 |
| Framework de pruebas | Vitest 2 |
| Cobertura de código | @vitest/coverage-v8 |
| Gestión de dependencias | npm |

---

## Estructura del proyecto

```
pruebasunitarias/
 ├─ package.json
 ├─ tsconfig.json
 ├─ vitest.config.ts
 ├─ src/
 │   └─ domain/
 │       ├─ model/
 │       │   ├─ Gender.ts
 │       │   ├─ Person.ts
 │       │   └─ RegisterResult.ts
 │       └─ service/
 │           └─ Registry.ts
 └─ test/
     └─ domain/
         └─ service/
             └─ Registry.test.ts
```

---

## Equipo

- Rigo Rosero Castillo

**Maestría en Ingeniería de Software – Universidad de La Sabana**
Curso: Testing y Validación de Software – 2025
