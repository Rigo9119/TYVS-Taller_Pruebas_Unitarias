# Patrón AAA – Arrange, Act, Assert

Todas las pruebas de este proyecto siguen el patrón **AAA**, que divide cada caso de prueba en tres secciones claramente separadas:

| Fase | Propósito |
|------|-----------|
| **Arrange** | Preparar los datos y objetos necesarios para la prueba |
| **Act** | Ejecutar la acción que se quiere probar |
| **Assert** | Verificar que el resultado obtenido es el esperado |

Este patrón mejora la legibilidad porque cualquier desarrollador puede entender de un vistazo qué se prepara, qué se ejecuta y qué se valida.

---

## Ejemplo completo: persona menor de edad

```typescript
it('should return UNDERAGE when age is 17', () => {
  // Arrange – se crea una persona viva con 17 años y un id válido
  const person = new Person('Sofia', 103, 17, Gender.FEMALE, true)

  // Act – se intenta registrarla en el servicio
  const result = registry.registerVoter(person)

  // Assert – se verifica que el sistema rechaza al menor de edad
  expect(result).toBe(RegisterResult.UNDERAGE)
})
```

---

## Pautas aplicadas en el proyecto

1. **Una sola acción por prueba** — el bloque `Act` siempre tiene exactamente una llamada al método bajo prueba.
2. **Un solo `expect` por prueba** — cada prueba verifica un único comportamiento; si falla, el motivo es inequívoco.
3. **Nombres descriptivos** — cada prueba se nombra con la forma `should <resultado> when <condición>`, describiendo el comportamiento esperado sin ambigüedad.
4. **Aislamiento con `beforeEach`** — se crea una instancia nueva de `Registry` antes de cada prueba para evitar que el estado compartido (el `Set` de ids registrados) afecte otros casos.

```typescript
beforeEach(() => {
  registry = new Registry()
})
```

5. **Sin lógica en las pruebas** — los bloques `Arrange` y `Assert` no contienen condicionales ni bucles; son declarativos y directos.

---

## Ejemplo de prueba con estado previo (CE9 – duplicado)

Este caso requiere preparar el estado del registro antes de ejecutar la acción principal:

```typescript
it('should return DUPLICATED when same id is registered twice', () => {
  // Arrange – se registra una primera persona para establecer el estado previo
  const first  = new Person('Carlos', 200, 30, Gender.MALE,   true)
  const second = new Person('Carla',  200, 25, Gender.FEMALE, true)

  // Act – se registra la primera (válida) y luego se intenta registrar la segunda con el mismo id
  registry.registerVoter(first)
  const result = registry.registerVoter(second)

  // Assert – la segunda inscripción debe ser rechazada como duplicado
  expect(result).toBe(RegisterResult.DUPLICATED)
})
```
