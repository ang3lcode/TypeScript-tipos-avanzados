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