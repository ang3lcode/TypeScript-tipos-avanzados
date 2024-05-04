// 1️⃣Si le enviamos un array, nos debe unir cada elemento del array y devolver un string.
// 2️⃣Si le enviamos un string, nos debe separar cada caracter y formar un array como respuesta.
// [N,i,c,o] => 'Nico' ... string[] => string 1️⃣
//  'Nico' => [N,i,c,o] ... string => string[] 2️⃣


function parseStr(input: string | string[]): string | string[] {
  if (Array.isArray(input)) {
    return input.join(''); // string
  } else {
    return input.split(''); // string[]
  }
}

// Llamando a la función...
const rptaArray = parseStr('Nico'); // Entrada: string - Salida: Array
console.log('rptaArray', 'Nico =>' ,rptaArray);

const rptaStr = parseStr(['N','i','c','o']); // Entrada: array - Salida: string
console.log('rptaStr', "['N','i','c','o'] =>",rptaStr);

const rptaArray = parseStr('Nico'); // Entrada: string - Salida: Array
// La salida y por tanto el valor que es asignado a `rptaArray` será un Array.
// Si intentamos aplicar un método propio de los Arrays:
rptaArray.reverse(); // ⛔ ...Nos marcará error 👀

const rptaStr = parseStr(['N','i','c','o']); // Entrada: array - Salida: string
// La salida y por tanto el valor que es asignado a `rptaStr` será un string.
// Si intentamos aplicar un método propio de los strings:
rptaStr.toLowerCase(); // ⛔ ...Nos marcará error 👀


const rptaArray = parseStr('Nico');
// rtaArray.reverse(); ⛔ NO directamente
if (Array.isArray(rtaArray)) { //✅ Validación de tipos previamente...
  rtaArray.reverse(); // 👍 Ahora sí nos permite utilizar este método de los arrays.
}
console.log('rtaArray', 'Nico =>' ,rtaArray); // Vemos en consola


const rtaStr = parseStr(['N','i','c','o']);
// rtaStr.toLowerCase(); ⛔ NO directamente
if (typeof rtaStr === 'string') { //✅ Validación de tipos previamente...
  rtaStr.toLowerCase(); // 👍 Ahora sí nos permite utilizar este método de los strings.
}
console.log('rtaStr', "['N','i','c','o'] =>",rtaStr); // Vemos en consola


// SOBRECARGAS:
function parseStr(input: string): string[]; // Entrada: string - Salida: string[]
function parseStr(input: string[]): string; // Entrada: string[] - Salida: string

// Función principal con las instrucciones deseadas y a la que se le aplicarán las sobrecargas:
function parseStr(input: unknown): unknown {
}



// SOBRECARGAS:
function parseStr(input: string): string[]; // Entrada: string - Salida: string[]
function parseStr(input: string[]): string; // Entrada: string[] - Salida: string

// Función principal y a la que se le aplicarán las sobrecargas:
function parseStr(input: unknown): unknown {
    if (Array.isArray(input)) {
        return input.join(''); // string
    } else {
        return input.split(''); // string[]
    }
}



// SOBRECARGAS:
function parseStr(input: string): string[]; // Entrada: string - Salida: string[]
function parseStr(input: string[]): string; // Entrada: string[] - Salida: string

// Función principal y a la que se le aplicarán las sobrecargas:
function parseStr(input: unknown): unknown {
    if (Array.isArray(input)) {
        return input.join(''); // string
    } else {
        return input.split(''); // string[]
    }
}

const rtaArray = parseStr('Nico'); // Salida: array
rtaArray.reverse(); // ✅ Ya podemos acceder a los métodos de un array
console.log('rtaArray', 'Nico =>' ,rtaArray);

const rtaStr = parseStr(['N','i','c','o']); // Salida: string
rtaStr.toLowerCase(); // ✅ Ya podemos acceder a los métodos de un string
console.log('rtaStr', "['N','i','c','o'] =>",rtaStr);
