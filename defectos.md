# Registro de Defectos

Este documento recopila los defectos encontrados durante la ejecución de pruebas unitarias del proyecto **Registraduría**.
Cada defecto documenta el ciclo TDD: detectado en fase **Roja** y resuelto en fase **Verde**.

---

## Formato 1: Lista detallada (narrativa)

### Defecto 01

- **Caso de prueba**: `shouldRejectInvalidAgeNegative` — Persona con edad -1 (edad inválida).
- **Entrada**: `Person(name="Juan", id=101, age=-1, gender=MALE, alive=true)`
- **Resultado esperado**: `INVALID_AGE`
- **Resultado obtenido (antes del fix)**: `VALID`
- **Causa probable**: Falta de validación de edad negativa en `Registry.registerVoter`.
- **Corrección aplicada**: Se agregó la condición `if (p.getAge() < 0 || p.getAge() > MAX_AGE) return RegisterResult.INVALID_AGE;` en `Registry.java`.
- **Estado**: Resuelto

---

### Defecto 02

- **Caso de prueba**: `shouldRejectDeadPerson` — Persona muerta.
- **Entrada**: `Person(name="Ana", id=102, age=45, gender=FEMALE, alive=false)`
- **Resultado esperado**: `DEAD`
- **Resultado obtenido (antes del fix)**: `VALID`
- **Causa probable**: No se evaluaba la condición `alive=false`.
- **Corrección aplicada**: Se agregó `if (!p.isAlive()) return RegisterResult.DEAD;` en `Registry.java`.
- **Estado**: Resuelto

---

### Defecto 03

- **Caso de prueba**: `shouldReturnDuplicatedWhenSameIdRegisteredTwice` — Registro duplicado con el mismo `id`.
- **Entradas**:
  - Persona 1: `Person(name="Carlos", id=200, age=30, gender=MALE, alive=true)`
  - Persona 2: `Person(name="Carla", id=200, age=25, gender=FEMALE, alive=true)`
- **Resultado esperado**:
  - Persona 1 → `VALID`
  - Persona 2 → `DUPLICATED`
- **Resultado obtenido (antes del fix)**:
  - Persona 1 → `VALID`
  - Persona 2 → `VALID`
- **Causa probable**: No había verificación de `id` previamente registrado.
- **Corrección aplicada**: Se incorporó `Set<Integer> registeredIds` en `Registry.java` para rastrear los `id` ya inscritos.
- **Estado**: Resuelto

---

### Defecto 04

- **Caso de prueba**: `shouldRejectUnderageAt17` — Persona menor de edad.
- **Entrada**: `Person(name="Sofia", id=103, age=17, gender=FEMALE, alive=true)`
- **Resultado esperado**: `UNDERAGE`
- **Resultado obtenido (antes del fix)**: `VALID`
- **Causa probable**: No existía validación de edad mínima (18 años) en `Registry.registerVoter`.
- **Corrección aplicada**: Se agregó `if (p.getAge() < MIN_AGE) return RegisterResult.UNDERAGE;` con constante `MIN_AGE = 18`.
- **Estado**: Resuelto

---

## Formato 2: Tabla de defectos (bug tracking)

| ID | Caso de Prueba | Entrada | Resultado Esperado | Resultado Obtenido | Causa Probable | Estado |
|-----|---------------------|---------|--------------------|--------------------|----------------|--------|
| 01 | Edad inválida negativa | `Person(id=101, age=-1, alive=true)` | `INVALID_AGE` | `VALID` | No se validaba edad negativa | **Resuelto** |
| 02 | Persona muerta | `Person(id=102, age=45, alive=false)` | `DEAD` | `VALID` | No se evaluaba condición `alive=false` | **Resuelto** |
| 03 | Registro duplicado | `Person(id=200)` + `Person(id=200)` | 1º → `VALID`, 2º → `DUPLICATED` | 1º → `VALID`, 2º → `VALID` | No había verificación de `id` duplicado | **Resuelto** |
| 04 | Menor de edad (17 años) | `Person(id=103, age=17, alive=true)` | `UNDERAGE` | `VALID` | No se validaba edad mínima de 18 | **Resuelto** |

---

## Convenciones de Estado

| Estado | Significado |
|---------|-------------|
| **Abierto** | El defecto fue detectado pero no corregido. |
| **En progreso** | El defecto se encuentra en análisis o corrección. |
| **Resuelto** | El defecto fue corregido y validado mediante pruebas. |

---

## Observaciones

- Todos los defectos fueron detectados durante la fase **Roja (RED)** del ciclo TDD.
- Cada defecto fue corregido con la implementación mínima necesaria en la fase **Verde (GREEN)**.
- Las constantes `MIN_AGE = 18` y `MAX_AGE = 120` fueron extraídas durante la fase de **Refactor**.
- La cobertura final con JaCoCo supera el 95% de instrucciones y el 100% de ramas.
