import {qs, qsa,load_toast} from './libs';

export function Ui(){
  nationality_dropdown()
  date_dropdown()
  submit()
  
  email_verify()
  name_verify()
  surname_verify()
  password_verify()

  fadein()
}

function nationality_dropdown(){
  qs('.group.nat .row').addEventListener("click", event => {
    qs('.group.nat').classList.toggle('open')
  })

  qsa('.group.nat .dropdown ul li').forEach(el => {
    el.addEventListener("click", event => {
      qs('.group.nat .row i').innerHTML = event.target.innerHTML
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
  let day = qs('.dropdown.day i')
  let d = 30
  let str = ``
  for(var i = 0; i<=d; i++){ str += `<li>${i+1}</li>` }
  qs('.dropdown.day ul').innerHTML = str

  qsa('.dropdown.day ul li').forEach(el => {
    el.addEventListener('click', event => {
    qs('.dropdown.day i span').innerHTML = event.target.innerHTML
    qs('.dropdown.day').classList.toggle('open')
  })
  })

  day.addEventListener("click", _ => qs('.dropdown.day').classList.toggle('open'))






  /* months */

  str =  ``
  months.forEach(el => str += `<li>${Object.keys(el)[0]}</li>`)
  qs('.dropdown.month ul').innerHTML = str
  qs('.dropdown.month i').addEventListener('click', event => {
    qs('.dropdown.month').classList.toggle('open')
  })

  qsa('.dropdown.month ul li').forEach(el =>{
    el.addEventListener('click', event => {
    qs('.dropdown.month i span').innerHTML = event.target.innerHTML
    qs('.dropdown.month').classList.toggle('open')
   })
  })

  // years

  str = ``
  for(let i = 1930; i <= new Date().getFullYear(); i++){
    str += `<li>${i}</li>`
  }

  qs('.dropdown.year ul').innerHTML = str

  qs('.dropdown.year i').addEventListener('click', event => {
    qs('.dropdown.year').classList.toggle('open')
  })
  

  qsa('.dropdown.year ul li').forEach(el => {
    el.addEventListener("click", event => {
      qs('.dropdown.year i span').innerHTML = event.target.innerHTML
      qs('.dropdown.year').classList.toggle('open')
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
function name_verify(){
  qs('#name').addEventListener("blur", event => {
    if(!qs("#name").value){
      qs('.group.name i')
      ? qs('.group.name i').innerHTML = 'Field can not be empty'
      : qs('.group.name').insertAdjacentHTML('beforeend', '<i class="error">Field can not be empty</i>')
      qs('.group.name').classList.add('error')
    } else {
      qs('.group.name i') && qs('.group.name i').remove()
      qs('.group.name').classList.remove('error')
    }
  })
}
function surname_verify(){
  qs('#surname').addEventListener("blur", event => {
    if(!qs("#surname").value){
      qs('.group.surname').insertAdjacentHTML('beforeend', '<i class="error">Field can not be empty</i>')
      qs('.group.surname').classList.add('error')
    } else {
      qs('.group.surname i') && qs('.group.surname i').remove()
      qs('.group.surname').classList.remove('error')
    }
  })
}
function password_verify(){
  qs('#pswd').addEventListener('blur', event => {
    let res = event.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gi)
    if(!res){
      qs('.group.pswd i').innerHTML = 'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number'
      qs('.group.pswd').classList.add('error')
    } else {
      qs('.group.pswd i').innerHTML = ''
      qs('.group.pswd').classList.remove('error')
    }
  })
}

function submit(){
  let valid = () => {
    validate.name()
    validate.surname()
    validate.email()
    validate.pswd()
    if(!validate.valid){
      qs('button.submit').classList.add('shake')
      setTimeout(()=>{qs('button.submit').classList.remove('shake')},1000)
      return
    }
    let obj = {
      name: qs('#name').value,
      surnname: qs('#surname').value,
      email: qs('#email').value,
      gender: qs('input[type="radio"]:checked').id,
      nationality: qs('.group.nat i').innerHTML,
      date: {
        day: +qs('.dropdown.day i span').innerHTML,
        month: qs('.dropdown.month i span').innerHTML,
        year: +qs('.dropdown.year i span').innerHTML
      },
      password: qs('#pswd').value
    }
    let path = '/server-ok'
    window.location.host == 'ashaev.by' && (path = '/test/server-ok.json')
    fetch(path,{
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify(obj)
    })
    .then(r => r.json())
    .then(j => {
      if(j.success){
        load_toast().then(_ => new Snackbar("Регистрация прошла успешно"))
        // clean fields
        qs('#name').value = ''
        qs('#surname').value = ''
        qs('#email').value = ''
        qs('.dropdown.day i span').innerHTML = 'Day'
        qs('.dropdown.month i span').innerHTML = 'Month'
        qs('.dropdown.year i span').innerHTML = 'Year'
        qs('#pswd').value = ''
        qs('#cpswd').value = ''

        qs('.group.nat').classList.remove('selected')
        qs('.group.nat i').remove()
        qs('img.ok').remove()
      }
    })
    
  }
  qs('button.submit').addEventListener('click', valid)
}

let validate = {
  valid: true,
  name(){
    if(!qs('#name').value){
      qs('#name').focus()
      qs('#name').blur()
      this.valid = false
    } else {this.valid = true}
    
  },
  surname(){
    if(!qs('#surname').value){
      qs('#surname').focus()
      qs('#surname').blur()
      this.valid = false
    } else {this.valid = true}
  },
  email(){
    let res = qs('#email').value.match(/[^\s@]+@[^\s@]+\.[^\s@]+/gi)
    !res ? (qs('#email').focus(), qs('#email').blur(), this.valid = false)
    : this.valid = true
  },
  pswd(){
    let res = qs('#pswd').value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gi)
    !res ? (qs('#pswd').focus(), qs('#pswd').blur(),this.valid = false)
    : this.valid = true
    
  },
}



function fadein(){
  
  const fadeIn = async (el, timeout, display) => {
  
    return new Promise(resolve => {
      el.style.opacity = 0;
      el.style.display = display || 'block';
      el.style.transform = `translateY(10px)`
      el.style.transition = `all ${timeout}ms`;
      setTimeout(() => {
        el.style.opacity = 1;
        el.style.transform = `translateY(0)`
        resolve(true)
      }, 100);
      })
  
};

let arr = [
  qs('.group.name'), 
  qs('.group.surname'),
  qs('.group.nat'),
  qs('.group.email'),
  qs('.group.date'),
  qs('.group.gender'),
  qs('.group.pswd'),
  qs('.group.cpswd'),

];

arr.forEach(el => el.style.opacity=0)

function delay() {
  return new Promise(resolve => setTimeout(resolve, 300));
}
async function delayedLog(item) {
  await delay();
  await fadeIn(item, 1000, 'block');
  setTimeout(()=>item.removeAttribute('style'),500)
  
}
async function processArray(array) {
  for (const item of array) {
    await delayedLog(item);
  }
  //console.log('Done!');
}
processArray(arr);
}



