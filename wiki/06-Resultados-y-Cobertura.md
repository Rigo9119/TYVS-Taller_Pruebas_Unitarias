# Resultados y Cobertura

## Ejecución de pruebas

Comando para ejecutar las pruebas:
```bash
npm test
```

Resultado obtenido:
```
 ✓ test/domain/service/Registry.test.ts (11 tests) 2ms

 Test Files  1 passed (1)
      Tests  11 passed (11)
   Start at  11:05:48
   Duration  346ms
```

**11 pruebas, 0 fallos, 0 errores.**

---

## Reporte de cobertura

Comando para generar el reporte:
```bash
npm run coverage
```

Resultado:
```
 % Coverage report from v8
-------------------|---------|----------|---------|---------|
File               | % Stmts | % Branch | % Funcs | % Lines |
-------------------|---------|----------|---------|---------|
All files          |     100 |      100 |     100 |     100 |
 model             |     100 |      100 |     100 |     100 |
  Gender.ts        |     100 |      100 |     100 |     100 |
  Person.ts        |     100 |      100 |     100 |     100 |
  RegisterResult.ts|     100 |      100 |     100 |     100 |
 service           |     100 |      100 |     100 |     100 |
  Registry.ts      |     100 |      100 |     100 |     100 |
-------------------|---------|----------|---------|---------|
```

| Métrica | Resultado | Umbral requerido |
|---------|-----------|-----------------|
| Sentencias (Stmts) | **100%** | ≥ 75% |
| Ramas (Branch) | **100%** | ≥ 75% |
| Funciones (Funcs) | **100%** | ≥ 75% |
| Líneas (Lines) | **100%** | ≥ 75% |

El reporte HTML completo se genera en `coverage/index.html` al ejecutar `npm run coverage`.

---

## Líneas no cubiertas

Ninguna — el 100% de cobertura en ramas confirma que todas las condiciones del método `registerVoter` fueron ejercitadas, incluyendo los caminos `true` y `false` de cada `if`.

---

## Defectos encontrados durante el proceso TDD

Durante la fase **Roja** de cada iteración se detectaron los siguientes defectos (ver `defectos.md`):

| ID | Defecto | Estado |
|----|---------|--------|
| 01 | Edad negativa devolvía `VALID` en lugar de `INVALID_AGE` | Resuelto |
| 02 | Persona muerta devolvía `VALID` en lugar de `DEAD` | Resuelto |
| 03 | Segundo registro con mismo `id` devolvía `VALID` en lugar de `DUPLICATED` | Resuelto |
| 04 | Menor de edad (17) devolvía `VALID` en lugar de `UNDERAGE` | Resuelto |

Todos los defectos fueron detectados por las pruebas antes de existir la implementación, demostrando el valor del enfoque TDD.

---

## Conclusiones técnicas

1. **TDD fuerza el diseño desde el comportamiento**: cada regla de negocio tiene una prueba que la respalda; ninguna línea de código de producción existe sin una razón verificable.

2. **Los valores límite detectan errores reales**: los errores más comunes son `<` vs `<=`. Probar `age = 17` y `age = 18` por separado garantiza que la condición de mayoría de edad está correctamente implementada.

3. **100% de cobertura de ramas es el objetivo real**: la cobertura de líneas puede engañar (una línea ejecutada no significa que todas sus condiciones fueron probadas). La cobertura de ramas confirma que cada decisión del código fue ejercitada en ambas direcciones.

4. **Vitest es una alternativa moderna a Jest**: configuración mínima, salida clara y cobertura integrada sin dependencias adicionales más allá de `@vitest/coverage-v8`.

---

## Escenarios no cubiertos y justificación

| Escenario | Justificación de exclusión |
|-----------|---------------------------|
| `gender = UNIDENTIFIED` | El género no afecta ninguna regla de negocio en el dominio actual |
| `name` vacío o null | La validación del nombre no forma parte de los requisitos especificados |
| Registro de múltiples personas válidas | El comportamiento es composición de CE10 repetido; no agrega valor de prueba |
