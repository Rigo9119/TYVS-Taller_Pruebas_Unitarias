import { describe, it, expect, beforeEach } from 'vitest'
import { Registry } from '../../../src/domain/service/Registry'
import { Person } from '../../../src/domain/model/Person'
import { Gender } from '../../../src/domain/model/Gender'
import { RegisterResult } from '../../../src/domain/model/RegisterResult'

/**
 * Pruebas unitarias del servicio Registry siguiendo TDD (Red→Green→Refactor)
 * y el patrón AAA (Arrange–Act–Assert).
 *
 * Clases de equivalencia cubiertas:
 *   CE1  – persona null              → INVALID
 *   CE2  – id <= 0                   → INVALID
 *   CE3  – persona muerta            → DEAD
 *   CE4  – edad negativa             → INVALID_AGE
 *   CE5  – edad > 120                → INVALID_AGE
 *   CE6  – edad < 18 (menor)         → UNDERAGE
 *   CE7  – edad exacta 18 (límite)   → VALID
 *   CE8  – edad exacta 120 (límite)  → VALID
 *   CE9  – registro duplicado        → DUPLICATED
 *   CE10 – persona válida            → VALID
 */
describe('Registry', () => {
  let registry: Registry

  beforeEach(() => {
    registry = new Registry()
  })

  // -------------------------------------------------------------------------
  // CE10 – Camino feliz: persona viva, mayor de edad, id único
  // Given: persona viva de 30 años con id único
  // When:  intento registrarla
  // Then:  resultado debe ser VALID
  // -------------------------------------------------------------------------
  it('should register a valid person', () => {
    // Arrange
    const person = new Person('Ana', 1, 30, Gender.FEMALE, true)

    // Act
    const result = registry.registerVoter(person)

    // Assert
    expect(result).toBe(RegisterResult.VALID)
  })

  // -------------------------------------------------------------------------
  // CE1 – Persona null
  // Given: referencia null como persona
  // When:  intento registrarla
  // Then:  resultado debe ser INVALID
  // -------------------------------------------------------------------------
  it('should return INVALID when person is null', () => {
    // Arrange
    const person = null

    // Act
    const result = registry.registerVoter(person)

    // Assert
    expect(result).toBe(RegisterResult.INVALID)
  })

  // -------------------------------------------------------------------------
  // CE2 – Id igual a cero (valor límite inferior inválido)
  // Given: persona viva de 25 años con id = 0
  // When:  intento registrarla
  // Then:  resultado debe ser INVALID
  // -------------------------------------------------------------------------
  it('should return INVALID when id is zero', () => {
    // Arrange
    const person = new Person('Luis', 0, 25, Gender.MALE, true)

    // Act
    const result = registry.registerVoter(person)

    // Assert
    expect(result).toBe(RegisterResult.INVALID)
  })

  // -------------------------------------------------------------------------
  // CE2 – Id negativo
  // Given: persona viva de 25 años con id = -5
  // When:  intento registrarla
  // Then:  resultado debe ser INVALID
  // -------------------------------------------------------------------------
  it('should return INVALID when id is negative', () => {
    // Arrange
    const person = new Person('Laura', -5, 25, Gender.FEMALE, true)

    // Act
    const result = registry.registerVoter(person)

    // Assert
    expect(result).toBe(RegisterResult.INVALID)
  })

  // -------------------------------------------------------------------------
  // CE3 – Persona muerta
  // Given: persona con alive = false, edad 40
  // When:  intento registrarla
  // Then:  resultado debe ser DEAD
  // -------------------------------------------------------------------------
  it('should return DEAD when person is not alive', () => {
    // Arrange
    const person = new Person('Carlos', 2, 40, Gender.MALE, false)

    // Act
    const result = registry.registerVoter(person)

    // Assert
    expect(result).toBe(RegisterResult.DEAD)
  })

  // -------------------------------------------------------------------------
  // CE4 – Edad negativa (valor límite: -1)
  // Given: persona viva con edad = -1
  // When:  intento registrarla
  // Then:  resultado debe ser INVALID_AGE
  // -------------------------------------------------------------------------
  it('should return INVALID_AGE when age is negative', () => {
    // Arrange
    const person = new Person('Juan', 101, -1, Gender.MALE, true)

    // Act
    const result = registry.registerVoter(person)

    // Assert
    expect(result).toBe(RegisterResult.INVALID_AGE)
  })

  // -------------------------------------------------------------------------
  // CE5 – Edad mayor a 120 (valor límite: 121)
  // Given: persona viva con edad = 121
  // When:  intento registrarla
  // Then:  resultado debe ser INVALID_AGE
  // -------------------------------------------------------------------------
  it('should return INVALID_AGE when age is over 120', () => {
    // Arrange
    const person = new Person('Elvira', 102, 121, Gender.FEMALE, true)

    // Act
    const result = registry.registerVoter(person)

    // Assert
    expect(result).toBe(RegisterResult.INVALID_AGE)
  })

  // -------------------------------------------------------------------------
  // CE6 – Menor de edad (valor límite: 17)
  // Given: persona viva con edad = 17
  // When:  intento registrarla
  // Then:  resultado debe ser UNDERAGE
  // -------------------------------------------------------------------------
  it('should return UNDERAGE when age is 17', () => {
    // Arrange
    const person = new Person('Sofia', 103, 17, Gender.FEMALE, true)

    // Act
    const result = registry.registerVoter(person)

    // Assert
    expect(result).toBe(RegisterResult.UNDERAGE)
  })

  // -------------------------------------------------------------------------
  // CE7 – Edad mínima válida (valor límite: 18)
  // Given: persona viva con edad = 18
  // When:  intento registrarla
  // Then:  resultado debe ser VALID
  // -------------------------------------------------------------------------
  it('should return VALID when age is exactly 18', () => {
    // Arrange
    const person = new Person('Pedro', 104, 18, Gender.MALE, true)

    // Act
    const result = registry.registerVoter(person)

    // Assert
    expect(result).toBe(RegisterResult.VALID)
  })

  // -------------------------------------------------------------------------
  // CE8 – Edad máxima válida (valor límite: 120)
  // Given: persona viva con edad = 120
  // When:  intento registrarla
  // Then:  resultado debe ser VALID
  // -------------------------------------------------------------------------
  it('should return VALID when age is exactly 120', () => {
    // Arrange
    const person = new Person('Rosa', 105, 120, Gender.FEMALE, true)

    // Act
    const result = registry.registerVoter(person)

    // Assert
    expect(result).toBe(RegisterResult.VALID)
  })

  // -------------------------------------------------------------------------
  // CE9 – Registro duplicado (mismo id, segundo intento)
  // Given: persona viva de 30 años registrada previamente con id = 200
  // When:  intento registrar una segunda persona con el mismo id
  // Then:  resultado debe ser DUPLICATED
  // -------------------------------------------------------------------------
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
})
