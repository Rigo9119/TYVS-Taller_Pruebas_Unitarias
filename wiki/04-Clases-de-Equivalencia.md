# Clases de Equivalencia y Valores Límite

Antes de escribir las pruebas se particionó el espacio de entrada en **clases de equivalencia**: grupos de valores que el sistema trata de la misma forma. Probar un representante por clase es suficiente. Los **valores límite** (bordes entre clases) se agregan porque son donde suelen ocurrir errores.

---

## Partición por atributo

### Persona (referencia)
| Clase | Valores | Resultado esperado |
|-------|---------|-------------------|
| Nula | `null` | `INVALID` |
| Válida | cualquier instancia | continúa evaluación |

### Identificador (`id`)
| Clase | Valores representativos | Resultado esperado |
|-------|------------------------|-------------------|
| Inválido negativo | `-5` | `INVALID` |
| Inválido cero (límite) | `0` | `INVALID` |
| Válido positivo | `1`, `200` | continúa evaluación |

### Estado de vida (`alive`)
| Clase | Valor | Resultado esperado |
|-------|-------|-------------------|
| Muerta | `false` | `DEAD` |
| Viva | `true` | continúa evaluación |

### Edad (`age`)
| Clase | Rango | Valor representativo | Resultado esperado |
|-------|-------|---------------------|--------------------|
| Inválida negativa | `age < 0` | `-1` (límite) | `INVALID_AGE` |
| Menor de edad | `0 ≤ age < 18` | `17` (límite superior) | `UNDERAGE` |
| Válida mínima | `age = 18` | `18` (límite inferior válido) | `VALID` |
| Válida máxima | `age = 120` | `120` (límite superior válido) | `VALID` |
| Inválida alta | `age > 120` | `121` (límite) | `INVALID_AGE` |

### Unicidad del `id`
| Clase | Condición | Resultado esperado |
|-------|-----------|-------------------|
| Nuevo | `id` no registrado previamente | `VALID` |
| Duplicado | `id` ya registrado | `DUPLICATED` |

---

## Matriz completa de pruebas

| ID | Nombre del test | Entrada | Resultado esperado | Clase cubierta |
|----|----------------|---------|-------------------|----------------|
| T01 | `should register a valid person` | `age=30, id=1, alive=true` | `VALID` | CE10 – camino feliz |
| T02 | `should return INVALID when person is null` | `null` | `INVALID` | CE1 – nulidad |
| T03 | `should return INVALID when id is zero` | `id=0` | `INVALID` | CE2 – id límite inferior |
| T04 | `should return INVALID when id is negative` | `id=-5` | `INVALID` | CE2 – id negativo |
| T05 | `should return DEAD when person is not alive` | `alive=false` | `DEAD` | CE3 – persona muerta |
| T06 | `should return INVALID_AGE when age is negative` | `age=-1` | `INVALID_AGE` | CE4 – edad límite inferior |
| T07 | `should return INVALID_AGE when age is over 120` | `age=121` | `INVALID_AGE` | CE5 – edad límite superior |
| T08 | `should return UNDERAGE when age is 17` | `age=17` | `UNDERAGE` | CE6 – edad límite menor |
| T09 | `should return VALID when age is exactly 18` | `age=18` | `VALID` | CE7 – edad mínima válida |
| T10 | `should return VALID when age is exactly 120` | `age=120` | `VALID` | CE8 – edad máxima válida |
| T11 | `should return DUPLICATED when same id is registered twice` | `id=200` dos veces | `DUPLICATED` | CE9 – duplicado |

---

## Justificación de los valores límite

- **`age = -1`** → borde inferior de la clase inválida negativa; un error de ±1 lo convertiría en `0` (menor de edad válido), que es un resultado completamente distinto.
- **`age = 17`** → borde superior de la clase menor de edad; un error de ±1 lo convertiría en `18` (válido).
- **`age = 18`** → borde inferior de la clase válida; el más propenso a errores de comparación (`<` vs `<=`).
- **`age = 120`** → borde superior de la clase válida; ídem al anterior.
- **`age = 121`** → borde inferior de la clase inválida alta.
- **`id = 0`** → borde entre id inválido e id válido.
