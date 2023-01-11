let operations = 0;
const asyncAdd = async (a,b) => {
  operations++;
  if (typeof a !== 'number' || typeof b !== 'number') {
    return Promise.reject('Argumenty muszą mieć typ number')
  }
  return new Promise((resolve) => {
    setTimeout(() =>{
      resolve(a+b)
    }, 100)
  })
}

const add = async (asyncAddFn, ...args) => {
  let result = 0;
  for (const arg of args) {
    if (typeof arg !== 'number') {
      return Promise.reject('Wszystkie argumenty muszą być typu number');
    }
    result = await asyncAddFn(result, arg);
  }
  return result;
}

const measureExecutionTime = (fn) => {
  operations = 0;
  const start = performance.now();
  fn()
  .then(result => {
    const end = performance.now();
    console.log(`Czas wykonania: ${end - start} ms`);
    console.log(`Wynik: ${result}`);
    console.log(`Ilość operacji:${operations}`);
  })
  .catch((error)=>console.log(error));
}
const data = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10];
measureExecutionTime(() => add(asyncAdd, ...data));
