# TDD – Red → Green → Refactor

El desarrollo del servicio `Registry` siguió el ciclo TDD de forma incremental. Cada iteración agrega una nueva regla de negocio.

---

## Iteración 1 – Camino feliz (persona válida)

### RED – Prueba que falla

Se escribe la primera prueba antes de tener implementación real. El servicio aún no existe, por lo que la prueba no compila.

```typescript
it('should register a valid person', () => {
  // Arrange
  const person = new Person('Ana', 1, 30, Gender.FEMALE, true)

  // Act
  const result = registry.registerVoter(person)

  // Assert
  expect(result).toBe(RegisterResult.VALID)
})
```

**Resultado:** error de compilación — `Registry` no existe.

### GREEN – Implementación mínima

Se crea `Registry` con la implementación más simple posible para pasar la prueba:

```typescript
export class Registry {
  registerVoter(person: Person | null): RegisterResult {
    return RegisterResult.VALID
  }
}
```

**Resultado:** prueba en verde.

### REFACTOR

Sin duplicación ni mejoras necesarias en esta etapa. Se mantiene el código mínimo.

---

## Iteración 2 – Persona muerta

### RED – Prueba que falla

```typescript
it('should return DEAD when person is not alive', () => {
  // Arrange
  const person = new Person('Carlos', 2, 40, Gender.MALE, false)

  // Act
  const result = registry.registerVoter(person)

  // Assert
  expect(result).toBe(RegisterResult.DEAD)
})
```

**Resultado:** falla — el servicio devuelve `VALID` en lugar de `DEAD`.

### GREEN – Implementación mínima

```typescript
registerVoter(person: Person | null): RegisterResult {
  if (!person.alive) return RegisterResult.DEAD
  return RegisterResult.VALID
}
```

**Resultado:** ambas pruebas en verde.

### REFACTOR

Sin cambios estructurales necesarios aún.

---

## Iteración 3 – Validación de edad

### RED – Prueba que falla

```typescript
it('should return UNDERAGE when age is 17', () => {
  // Arrange
  const person = new Person('Sofia', 103, 17, Gender.FEMALE, true)

  // Act
  const result = registry.registerVoter(person)

  // Assert
  expect(result).toBe(RegisterResult.UNDERAGE)
})
```

**Resultado:** falla — devuelve `VALID`.

### GREEN – Implementación mínima

```typescript
if (person.age < 18) return RegisterResult.UNDERAGE
```

**Resultado:** prueba en verde.

### REFACTOR

Se extrae la constante `MIN_AGE = 18` para evitar el número mágico en el código:

```typescript
const MIN_AGE = 18
const MAX_AGE = 120

// ...
if (person.age < MIN_AGE) return RegisterResult.UNDERAGE
if (person.age < 0 || person.age > MAX_AGE) return RegisterResult.INVALID_AGE
```

---

## Iteración 4 – Registro duplicado

### RED – Prueba que falla

```typescript
it('should return DUPLICATED when same id is registered twice', () => {
  // Arrange
  const first  = new Person('Carlos', 200, 30, Gender.MALE,   true)
  const second = new Person('Carla',  200, 25, Gender.FEMALE, true)

  // Act
  registry.registerVoter(first)
  const result = registry.registerVoter(second)

  // Assert
  expect(result).toBe(RegisterResult.DUPLICATED)
})
```

**Resultado:** falla — devuelve `VALID` en el segundo registro.

### GREEN – Implementación mínima

```typescript
private readonly registeredIds = new Set<number>()

// ...
if (this.registeredIds.has(person.id)) return RegisterResult.DUPLICATED
this.registeredIds.add(person.id)
```

**Resultado:** todas las pruebas en verde.

### REFACTOR

Se reorganiza el orden de las validaciones de mayor a menor prioridad (null → id → alive → age → duplicado), garantizando que las reglas más baratas computacionalmente se evalúen primero.

---

## Implementación final de Registry.ts

```typescript
import { Person } from '../model/Person'
import { RegisterResult } from '../model/RegisterResult'

const MIN_AGE = 18
const MAX_AGE = 120

export class Registry {
  private readonly registeredIds = new Set<number>()

  registerVoter(person: Person | null): RegisterResult {
    if (person === null)                        return RegisterResult.INVALID
    if (person.id <= 0)                         return RegisterResult.INVALID
    if (!person.alive)                          return RegisterResult.DEAD
    if (person.age < 0 || person.age > MAX_AGE) return RegisterResult.INVALID_AGE
    if (person.age < MIN_AGE)                   return RegisterResult.UNDERAGE
    if (this.registeredIds.has(person.id))      return RegisterResult.DUPLICATED
    this.registeredIds.add(person.id)
    return RegisterResult.VALID
  }
}
```
