const liczba1 = document.querySelector('#liczba1')
const liczba2 = document.querySelector('#liczba2')
const liczba3 = document.querySelector('#liczba3')
const liczba4 = document.querySelector('#liczba4')
const btnPrzelicz = document.querySelector('#przelicz')
const sumaPojemnik = document.querySelector('#suma')
const sredniaPojemnik = document.querySelector('#srednia')
const minPojemnik = document.querySelector('#min')
const maxPojemnik = document.querySelector('#max')



btnPrzelicz.addEventListener('click', () => {
  sumaPojemnik.innerHTML= +liczba1.value + +liczba2.value + +liczba3.value + +liczba4.value
  sredniaPojemnik.innerHTML = ( +liczba1.value + +liczba2.value + +liczba3.value + +liczba4.value)/4
  minPojemnik.innerHTML =  Math.min(+liczba1.value, +liczba2.value, +liczba3.value, +liczba4.value)
  maxPojemnik.innerHTML =  Math.max(+liczba1.value, +liczba2.value, +liczba3.value, +liczba4.value)
})

