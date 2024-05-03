## Tuples

Las tuplas o _tuples_ nos permiten crear un **array fuertemente tipado especificando el tipo de dato de cada elemento,** así como una cantidad definida de elementos que podrá almacenar.

Las tuplas no vienen en el conjunto de tipos de datos por defecto de JavaScript

### Tuplas en TypeScript

Las definimos indicando entre `[]` el tipo de dato que cada elemento tendrá en la tupla.

```
const user: [string, number] = ['nicobytes', 15];
```

Al definir el tipado de cada uno también estamos definiendo la cantidad de valores que tendrá la tupla, por tanto, no podemos agregar más elementos.

```
let user: [string, number];

user = ['nico']; // Error: la tupla debe almacenar 2 valores (un `string` y un `number`)
user = ['nico', true]; // Error: el segundo elemento de la tupla debe ser del tipo `number`
user = ['nico', 20]; // Correcto: el primer elemento es del tipo `string` y el segundo de tipo `number`
```

### Desestructuración

Podemos aplicar desestructuración para asignar a ciertas variables respectivamente los valores dentro de una tupla.

```
const user: [string, number] = ['nicobytes', 15];
const [username, age] = user;
console.log(username); // nicobytes
```


## Enums

Un enum es un tipo de dato que nos permite **crear un set de opciones**. Estas opciones son almacenadas bajo una estructura llave-valor similar a un objeto.

### Enums en TypeScript

Veamos algunos aspectos de los _enums_ en TypeScript:

- Los declaramos usando la palabra reservada `enum` seguido del nombre que tendrá este.
- Entre llaves estarán los datos llave-valor.
- Se recomienda que el nombre del `enum` y de las llaves dentro del mismo estén en mayúscula:

```
// ENUM
enum ROLES {
	ADMIN = "admin",
	SELLER = "seller",
	CUSTOMER = "customer",
}

// TIPO DE DATO USER
type User = {
	username: string;
	role: ROLES;
}

// CONSTANTE
const nicoUser: User = { // `nicoUser` es del tipo de dato User
	username: 'nicobytes',
	role: ROLES.ADMIN // Le asignamos el rol ADMIN que es uno de los 3 roles disponibles
}
```

La ventaja que nos da esto es que disponemos de una lista de valores predeterminados que podemos asignar a una variable o a un atributo de la misma. Por tanto, no podemos asignar otro valor que no este dentro de las opciones que nos brinde el `enum`:  
![Los posibles valores que puede tomar el atributo role (ADMIN, SELLER o CUSTOMER) en la constante nicoUser](https://static.platzi.com/media/articlases/Images/06-los-posibles-valores-que-puede-tomar-el-atributo-role-en-la-constante-nicouser-curso-de-typescript-tipos-avanzados-y-funciones.png)

### Analizando una librería con enums

Capacitor es una librería que nos ayuda a implementar aplicaciones multiplataformas. Realizaremos un pequeño análisis aparte de su código para observar cómo hacen empleo de los `enums` y cómo estos nos pueden ayudar en nuestros proyectos.

Podemos realizar la instalación con el siguiente comando:

```
npm install @capacitor/camera
```

Ahora veamos el siguiente código que podemos implementar con dicha librería:

```
import { Camera, CameraResultType } from '@capacitor/camera';

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });
};
```

Observamos que `CameraResultType` es un `enum` que restringe al atributo `resultType` a tener un valor dentro de las opciones del `enum`. En este caso, dicho atributo recibe el valor de la llave `Uri` del `enum`.

En conclusión, un `enum` nos ayuda a no equivocarnos cuando asignemos valores a una variable reduciendo las posibilidades de asignación a una lista de opciones predefinidas.

## Unknown type

El _unknown type_ nos indica que una variable es de **un tipo de dato desconocido**. Es similar a `any`, pero sin quitar el análisis de código estático que nos brinda TypeScript.

El tipo `unknown` nos **fuerza a hacer una verificación de tipo**. Esta es la forma que TypeScript sugiere trabajar con variables de las cuales no sabemos de qué tipo serán. Así evitamos utilizar constantemente `any`.

### Unknown type en TypeScript

Usamos el keyword `unknown` para declarar una variable de este tipo.

```
let unknownVar: unknown;
```

### Unknown vs. Any

Con `any` podemos hacer lo que queramos, no hay restricción alguna, pero con `unknown` vamos a tener advertencias al momento de utilizar alguna función o método con variables de este tipo.

```
let unknownVar: unknown;

unknownVar.toUpperCase(); // Nos marcará el editor una advertencia
```

Por ejemplo, no podemos directamente aplicar un método propio de un `string` a una variable `unknown`. Para ello debemos realizar una verificación de tipo para asegurarnos que se ejecutará dicho método siempre cuando `unknownVar` sea del tipo `string` en algún punto del programa:

```
let unknownVar: unknown;

if (unknownVar === 'string') {
	unknownVar.toUpperCase(); // Ahora ya no nos marcará como error.
}
```

### Unknown en funciones

También podemos emplear `unknown` en funciones si no sabemos exactamente que nos va a devolver.

```
const parse = (str: string): unknown => {
	return JSON.parse(str)
}
```

## Never type

El _never type_ se usa para **funciones que nunca van a terminar o que detienen el programa**. Con esto TypeScript nos ayuda a detectarlos como por ejemplo un ciclo infinito cuando lanzamos un mensaje de error.

### Never type en funciones infinitas

En el siguiente código, TypeScript infiere que el tipo es `never`, ya que su ejecución será infinita.

```
const withoutEnd = () => {
	while (true) {
		console.log('Nunca parar de aprender');
	}
}
```

### Never vs. Void

Las funciones del tipo `void` son aquellas que no retornan ningún dato, simplemente ejecutan las instrucciones dentro del bloque de la función. Por tanto, no debemos confundirlas con las de tipo `never`:

```
const voidFunc = () => {
  for(let i = 1; i <= 5; i++){
    console.log(i)
  }
}

voidFunc()

/*
// Función infinita y de tipo Never 👇
const neverFunc = () => {
	while (true) {
		console.log('Nunca parar de aprender');
	}
}
*/
```

### Never type en código con errores

Una función también puede ser del tipo `never` cuando tenemos un `throw` que lance un error y, como resultado, haga detener la ejecución.

```
const fail = (message: string) => { // TypeScript infiere que esta función se de tipo `never`
  throw new Error(message)
}

const example = (input:unknown) => {
  if(typeof input === 'string'){
    return 'Es un string';
  }
  else if (Array.isArray(input)){
    return 'Es un array';
  }
  return fail('Not Match'); // Lanzamos un error
}

console.log(example('Hola')) //'Es un string'
console.log(example([1,1,1,1])) // 'Es un array'
console.log(example(1212)) // error: Uncaught Error: Not Match
console.log(example('Hola después del fail')) // NUNCA SE EJECUTA, porque se lanzó un error previamente
```

## Parámetros por defecto

Los parámetros por defecto se usan para **predefinir valores** a los parámetros de una función **en caso de no especificar** un valor al invocarla.

### Parámetros por defecto en TypeScript

En TypeScript, usamos el signo `=` para definir el valor por defecto que cierto parámetro tendrá. Veamos un ejemplo:

```
// Definición de función
const createProduct = (
	id: string | number,
	isNew: boolean = true, // 👀
	stock: number = 10, // 👀
) => {
	return { // Retornamos un objeto con los valores pasados como parámetros.
		id,
		stock,
		isNew
	}
}

// Impresión en consola
console.log(
	createProduct(1)
) // { id: 1, stock: 10, isNew: true } `stock` y `isNew` por defecto

console.log(
	createProduct(2, false)
) // { id: 1, stock: 10, isNew: false } `stock` por defecto

console.log(
	createProduct(3, false, 50)
) // { id: 1, stock: 50, isNew: false }
```


## Parámetros opcionales y nullish-coalescing

Los **parámetros opcionales** son aquellos que **podemos obviar su envío** cuando mandamos datos en una función que requiere argumentos.

El **_nullish-coalescing_** nos permite **evaluar si una variable está definida**, pero si esta es `null` o `undefined`, retorna un segundo valor diferente.

### Parámetros opcionales en TypeScript

Para denotar que un parámetro será opcional usamos el operador `?` al lado. Siempre debemos colocar los parámetros opcionales al final.

```
const createProduct = (
	id: string | number, // Puede ser de tipo `string` o `number`.
	isNew: boolean,
	stock?: number, // PARÁMETRO OPCINAL.
) => {
	return { // Retornamos un objeto con los valores pasados como parámetros.
		id,
		stock,
		isNew
	}
}

console.log(
	createProduct(1, true)
) // { id: 1, stock: undefined, isNew: true }
```

### Valores por defecto con el operador OR

Para evitar tener como retorno valores `undefined` podríamos emplear el operador lógico `||` (OR) para asignar un valor por defecto.

```
const createProduct = (
	id: string | number, // Puede ser de tipo `string` o `number`.
	isNew?: boolean,	// PARÁMETRO OPCINAL.
	stock?: number, // PARÁMETRO OPCINAL.
) => {
	return { // Retornamos un objeto con los valores pasados como parámetros.
		id,
		stock: stock || 10,
		isNew
	}
}

console.log(
	createProduct(1, true)
) // { id: 1, stock: undefined, isNew: true }
```

### El problema de usar valores falsy en JavaScript

El operador `||` evalúa si el primer valor es _falsy_, de serlo retorna un segundo valor, si no es **_falsy_** retorna el primero. Los valores que son considerados _falsy_ en JavaScript son:

- String vacío `“”`
- Número `0`
- El valor booleano `false`

Aquí surge un problema: si nosotros deseáramos mandar como argumento un valor que JavaScript considera _falsy_, entonces el operador `||` no tomará en cuenta nuestros valores y los cambiará por los de defecto:

```
const createProduct = (
	id: string | number, // Puede ser de tipo `string` o `number`.
	isNew?: boolean,	// PARÁMETRO OPCINAL.
	stock?: number, // PARÁMETRO OPCINAL.
) => {
	return { // Retornamos un objeto con los valores pasados como parámetros.
		id,
		stock: stock || 10,
		isNew: isNew || true
	}
}

console.log(
	createProduct(1, false, 0)
) // { id: 1, stock: 10, isNew: true }
// 👆 JavaScript retorna los valores por defecto de `isNew` y `stock`
//		y no los que mandamos en los argumentos.
```

Este problema podemos solucionarlo con el _nullish-coalescing._

### Nullish-coalescing para asignar valores por defecto

El _nullish-coalescin_g se representa con el operador `??`. Esto evalúa si el primer valor está definido, si no lo está, retorna el segundo:

```
const createProduct = (
	id: string | number, // Puede ser de tipo `string` o `number`.
	isNew?: boolean,	// PARÁMETRO OPCINAL.
	stock?: number, // PARÁMETRO OPCINAL.
) => {
	return { // Retornamos un objeto con los valores pasados como parámetros.
		id,
		stock: stock ?? 10,
		isNew: isNew ?? true
	}
}

console.log(
	createProduct(1, false, 0)
) // { id: 1, stock: 0, isNew: false }
```