import {qs, qsa} from './libs';

export function Ui(){
  nationality_dropdown()
  date_dropdown()
  email_verify()
}

function nationality_dropdown(){
  qs('.group.nat .row').addEventListener("click", event => {
    qs('.group.nat').classList.toggle('open')
  })

  qsa('.group.nat .dropdown ul li').forEach(el => {
    el.addEventListener("click", event => {
      qs('.group.nat .row label').innerHTML = event.target.innerHTML
      qs('.group.nat').classList.toggle('open')
      qs('.group.nat').classList.add("selected")
    })
  })
}
function date_dropdown(){
  let months = [
    {'january':31},
    {'february':28},
    {'march':31},
    {'april':30},
    {'may':31},
    {'june':30},
    {'july':31},
    {'august':31},
    {'september':30},
    {'october':31},
    {'november':30},
    {'december':31},

  ]

  /* days */
  let day = qs('.dropdown.day label')
  
  day.addEventListener("click", event => {

    qs('.dropdown.day').classList.toggle('open')

    let month = qs('.dropdown.month label span')
    let d = 30
    if(month.innerHTML !== 'Month'){
      d = months.filter(el => Object.keys(el)[0].toLowerCase() == month.innerHTML)
      d.length && (d = Object.values(d[0])[1])
    }
    let str = ``
    for(var i = 0; i<=d; i++){
      str += `<li>${i+1}</li>`
    }

    qs('.dropdown.day ul').innerHTML = str
    add_day_listeners()


  })
  add_day_listeners()





  /* months */

  let str =  ``
  months.forEach(el => str += `<li>${Object.keys(el)[0]}</li>`)
  qs('.dropdown.month ul').innerHTML = str
  qs('.dropdown.month label').addEventListener('click', event => {
    qs('.dropdown.month').classList.toggle('open')
  })

  qsa('.dropdown.month ul li').forEach(el =>{
    el.addEventListener('click', event => {
    qs('.dropdown.month label span').innerHTML = event.target.innerHTML
    qs('.dropdown.month').classList.toggle('open')
   })
  })

  // years

  str = ``
  for(let i = 1930; i <= new Date().getFullYear(); i++){
    str += `<li>${i}</li>`
  }

  qs('.dropdown.year ul').innerHTML = str

  qs('.dropdown.year label').addEventListener('click', event => {
    qs('.dropdown.year').classList.toggle('open')
  })
  

  qsa('.dropdown.year ul li').forEach(el => {
    el.addEventListener("click", event => {
      qs('.dropdown.year label span').innerHTML = event.target.innerHTML
      qs('.dropdown.year').classList.toggle('open')
    })
  })

}

function add_day_listeners(){
  qsa('.dropdown.day ul li').forEach(el => {
    el.addEventListener('click', event => {
    qs('.dropdown.day label span').innerHTML = event.target.innerHTML
    qs('.dropdown.day').classList.toggle('open')
  })
  })
}

function email_verify(){
  qs('#email').addEventListener('blur', event => {
    let res = event.target.value.match(/[^\s@]+@[^\s@]+\.[^\s@]+/gi)
    if(!res){
      qs('.group.email i').innerHTML = 'Email invalid'
      qs('.group.email').classList.add('error')
    } else {
      qs('.group.email i').innerHTML = ''
      qs('.group.email').classList.remove('error')
    }
  })
  
}