# BDD – Given, When, Then

El enfoque **BDD (Behavior-Driven Development)** expresa cada prueba en lenguaje de negocio usando la narrativa **Given – When – Then (Dado – Cuando – Entonces)**. Esto alinea las pruebas técnicas con los requisitos del sistema y facilita la comunicación con personas no técnicas.

---

## Escenarios

### Escenario 1: Registro exitoso de votante válido
```gherkin
Given  que existe una persona viva, de 30 años, con id único
When   intento registrarla como votante
Then   el resultado debe ser VALID
```

### Escenario 2: Persona null
```gherkin
Given  que no se proporciona ninguna persona (null)
When   intento registrarla como votante
Then   el resultado debe ser INVALID
```

### Escenario 3: Identificador cero
```gherkin
Given  que existe una persona viva de 25 años con id igual a 0
When   intento registrarla como votante
Then   el resultado debe ser INVALID
```

### Escenario 4: Identificador negativo
```gherkin
Given  que existe una persona viva de 25 años con id igual a -5
When   intento registrarla como votante
Then   el resultado debe ser INVALID
```

### Escenario 5: Persona fallecida
```gherkin
Given  que existe una persona fallecida de 40 años con id válido
When   intento registrarla como votante
Then   el resultado debe ser DEAD
```

### Escenario 6: Edad negativa (límite inferior inválido)
```gherkin
Given  que existe una persona viva con edad -1 y un id válido
When   intento registrarla como votante
Then   el resultado debe ser INVALID_AGE
```

### Escenario 7: Edad mayor a 120 (límite superior inválido)
```gherkin
Given  que existe una persona viva con edad 121 y un id válido
When   intento registrarla como votante
Then   el resultado debe ser INVALID_AGE
```

### Escenario 8: Menor de edad – límite superior (17 años)
```gherkin
Given  que existe una persona viva de 17 años con id válido
When   intento registrarla como votante
Then   el resultado debe ser UNDERAGE
```

### Escenario 9: Edad mínima válida (18 años – límite inferior válido)
```gherkin
Given  que existe una persona viva de 18 años con id válido
When   intento registrarla como votante
Then   el resultado debe ser VALID
```

### Escenario 10: Edad máxima válida (120 años – límite superior válido)
```gherkin
Given  que existe una persona viva de 120 años con id válido
When   intento registrarla como votante
Then   el resultado debe ser VALID
```

### Escenario 11: Registro duplicado
```gherkin
Given  que ya existe una persona registrada con id 200
When   intento registrar una segunda persona con el mismo id 200
Then   el resultado debe ser DUPLICATED
```

---

## Trazabilidad BDD → Código

| Escenario BDD | Método en Registry.test.ts |
|--------------|---------------------------|
| Registro exitoso | `should register a valid person` |
| Persona null | `should return INVALID when person is null` |
| Id cero | `should return INVALID when id is zero` |
| Id negativo | `should return INVALID when id is negative` |
| Persona fallecida | `should return DEAD when person is not alive` |
| Edad negativa | `should return INVALID_AGE when age is negative` |
| Edad > 120 | `should return INVALID_AGE when age is over 120` |
| Menor de edad (17) | `should return UNDERAGE when age is 17` |
| Edad mínima (18) | `should return VALID when age is exactly 18` |
| Edad máxima (120) | `should return VALID when age is exactly 120` |
| Duplicado | `should return DUPLICATED when same id is registered twice` |
