let anyVar :any;
anyVar = true;
anyVar = undefined;
anyVar = null;
anyVar = 1;
anyVar = [];
anyVar = {}; // <-- anyVar a esta altura es un objeto vacio

let isNew: boolean = anyVar;

anyVar.doSomething();
anyVar.touppercase();


let unknowVar :unknown;
unknowVar = true;
unknowVar = undefined;
unknowVar = null;
unknowVar = 1;
unknowVar = [];
unknowVar = {};

// unknowVar.doSomething();
if(typeof unknowVar === "string"){
  unknowVar.toLocaleLowerCase();

unknowVar.toUpperCase();
}
if (typeof unknowVar ==="boolean") {
  let isNew2: boolean = unknowVar
}
// let isNew2:boolean=unknowVar


const parse =(str:string):unknown=>{
  return JSON.parse(str);
}
