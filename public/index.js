window.onload = function() {
  var links = document.querySelectorAll('.link-user')
  const us = new ClipboardJS(links)
  us.on('success', function (e) {
    const el = document.createElement('textarea');
    el.classList.add('hidden')
    el.value = e.text;
    const str =  'modal-' + e.trigger.classList[2].slice(4)
    const element = document.getElementById(`${str}`)
    element.appendChild(el);
    el.select();
    document.execCommand('Copy');
    element.removeChild(el);
  });
  us.on('error', function (e) {
  });
}
const add = new ClipboardJS('.create-link');
add.on('success', function (e) {
});
add.on('error', function (e) {
});
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems,{edge:'right'});
});
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
  });
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems,{constrainWidth: false});
  });
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems);
  });
if(document.querySelector('.inp')) {
    const input = document.querySelector('.inp');
    const btn = document.querySelector('.analitics-done')
    const label = document.querySelector(".label")
    input.addEventListener('change', () => {
    label.innerHTML = input.files['0'].name
    btn.classList.remove('hide')
    label.style.paddingLeft = '20px'
    })
}

// new
const random = () => Math.random().toString(36).substr(2, 9)
const eventPerson = () => {
    const addPersonBtn = document.querySelectorAll('.add-person')
for(let i =0; i< addPersonBtn.length; i++){
    addPersonBtn[i].addEventListener('click', (e)=> {
        const cardPanels = document.querySelectorAll('.card-panel')
        for(let l = 0; l < cardPanels.length; l++){
            if(e.target.id + '-card' == cardPanels[l].id){
                const currentCard  = document.getElementById(cardPanels[l].id)
                const personField = currentCard.querySelector('.person')
                const elem = document.createElement('div')
                elem.classList.add('person')
                elem.innerHTML = `
                <div class="input-field ">
                <div class="col s6">
                    <i class="material-icons prefix">assignment_ind</i>
                    <input  class="center" id="${e.target.id}" name="surname" type="text" class="validate">
                  <label for="${e.target.id}" class="center">Фамилия</label>
                  <span class="helper-text" data-error="Введите логин" style="color:#2e7d32"></span>
                </div>
                </div>
                <div class="input-field">
                    <div class="col s6">
                    <input  class="center" id="${e.target.id}" name="name" type="text" class="validate"  required>
                  <label for="${e.target.id}" class="center">Имя</label>
                  <span class="helper-text" data-error="Введите логин" style="color:#2e7d32"></span>
                </div>
                </div>
                `
                personField.appendChild(elem)
            }
        }
    })

}

}
eventPerson()

const addGroup = document.querySelector('.add-group')
const addGroupElem = document.querySelector('.add-group-wrap')
addGroup.addEventListener('click',()=> {
    const elem = document.createElement('div')
    const randomId = random()
    elem.classList.add('card-panel')
    elem.classList.add('white')
    elem.id = randomId + '-card'
    elem.innerHTML = `
    <div class="input-field">
            <i class="material-icons prefix">group</i>
            <input  class="center" id="${randomId}" name="department" type="text">
            <label for="${randomId}" class="center">Название отдела</label>
            <span class="helper-text" data-error="Введите логин" style="color:#2e7d32"></span>
    </div>
  <div class="divider"></div>
  <h6 class='center'>Сотрудники</h6>
  <div class="persons">
    <div class="person">
       <div class="input-field ">
        <div class="col s6">
            <i class="material-icons prefix">assignment_ind</i>
            <input  class="center" id="${randomId}" name="surname" type="text" class="validate">
          <label for="${randomId}" class="center">Фамилия</label>
          <span class="helper-text" data-error="Введите логин" style="color:#2e7d32"></span>
        </div>
        </div>
        <div class="input-field">
            <div class="col s6">
            <input  class="center" id="${randomId}" name="name" type="text" class="validate">
          <label for="${randomId}" class="center">Имя</label>
          <span class="helper-text" data-error="Введите логин" style="color:#2e7d32"></span>
        </div>
        </div>
    </div>
  </div>
  <div class="center">
    <a class="btn-floating btn-medium waves-effect waves-light purple lighten-2  add-person"><i class="material-icons" id="${randomId}">add</i></a>
  </div>
    `
    addGroupElem.before(elem)
    eventPerson()
})

const compliteBtn = document.querySelector('.complite')
compliteBtn.addEventListener('click',async ()=> {
    const section = document.querySelector('.set-department')
    const inputs = section.getElementsByTagName('input')
    const data = []
    for(let i=0; i <inputs.length; i++) {
        data.push({value:inputs[i].value,id: inputs[i].id, name: inputs[i].name})
    }
   
    await fetch('/admin/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      });
})




///////////////////
// const skills = [
//     'Стрессоустойчивость',
//     'Организованность',
//     'Ориентация на результат ',
//     'Эмоциональный интеллект',
//     'Мотивация',
//     'Скорость работы',
//     'Работа в команде'
// ]

// var ctx2 = document.getElementById('myChart2').getContext('2d');
// var myChart2 = new Chart(ctx2, {
//     type: 'bar',
//     data: {
//         labels: skills,
//         datasets: [
//             {
//             label: 'корреляционный вес',
//             type: 'line',
//             backgroundColor: 'rgb(27, 94, 32)',
//             borderColor: 'rgb(27, 94, 32)',
//             data: [5.45,2.12,3.02,2.43,1.11,0.24],
//             fill: false,
//             yAxisID: 'left-y-axis'
//         },
//         {
//             label: '% от максимально возможного',
//             type: 'line',
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: [60,70,75,80,90,91],
//             fill: false,
//             yAxisID: 'right-y-axis'
//         },
//     ]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 id: 'left-y-axis',
//                 type: 'linear',
//                 position: 'left'
//             }, {
//                 id: 'right-y-axis',
//                 type: 'linear',
//                 position: 'right'
//             }]
//         }
//     }
// });
// var ctx3 = document.getElementById('myChart3').getContext('2d');
// var myChart3 = new Chart(ctx3, {
//     type: 'radar',
//     data: {
//         labels: skills,
//         datasets: [{
//             label: 'Сотрудник',
//             data: [60,70,75,80,90,91],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',

//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',

//             ],
//             borderWidth: 1
//         },{
//             label: 'Норма',
            
//             backgroundColor: 'rgba(27, 94, 32, .2)',
//             borderColor: 'rgb(27, 94, 32)',
//             data: [80,80,80,80,80,80],
//             fill: true,
//             yAxisID: 'left-y-axis'
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });
// var ctx4 = document.getElementById('myChart4').getContext('2d');
// var myChart4 = new Chart(ctx4,{
//     type: 'bar',
//     data: {
//         labels: ['Январь','Февраль','Март','Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь'],
//         datasets: [
//             {
//             label: skills[0],
//             type: 'bar',
//             backgroundColor: 'rgba(255, 99, 132, 1)',
//                 borderColor: 'rgba(255, 99, 132, 1)',
//             data: [45,12,02,43,11,24,71,32,88],
//             fill: false,
//             yAxisID: 'left-y-axis'
//         },
//         {
//             label: skills[1],
//             type: 'bar',
//             backgroundColor: 'rgba(54, 162, 235, 0.6)',
//                 borderColor: 'rgba(54, 162, 235, 1)',
//             data: [60,70,75,80,90,91,80,80,80],
//             fill: false,
//             yAxisID: 'right-y-axis'
//         },
//         {
//             label: `${skills[1]}(Лин.)`,
//             type: 'line',
//             backgroundColor: 'rgba(54, 162, 235, 0.6)',
//                 borderColor: 'rgba(54, 162, 235, 1)',
//             data: [60,70,75,80,90,91,80,80,80],
//             fill: false,
//             yAxisID: 'right-y-axis'
//         },
//         {
//             label: skills[2],
//             type: 'bar',
//             backgroundColor: 'rgba(255, 206, 86, 0.6)',
//                 borderColor: 'rgba(255, 206, 86, 1)',
//             data: [60,70,75,53,54,77,32,85,90],
//             fill: false,
//             yAxisID: 'right-y-axis'
//         },
//     ]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 id: 'left-y-axis',
//                 type: 'linear',
//                 position: 'left'
//             }, {
//                 id: 'right-y-axis',
//                 type: 'linear',
//                 position: 'right'
//             }]
//         }
//     } 
// });


