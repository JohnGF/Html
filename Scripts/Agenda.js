
let calendar = document.querySelector('.calendar')

const month_names = [ "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
"Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

let text=document.querySelector("#eventos_dia")
let horas=document.querySelector("#horas")
let min=document.querySelector("#min")
let s_day_id=0
let dia_atual=document.querySelector("#dia_selecionado")

function event_window(id){
    let s_day_v=document.getElementById(id)
    dia_atual.innerHTML="Dia "+s_day_v.getAttribute("dia")
    
    s_day_id = id
    json_aid=JSON.parse(sessionStorage.getItem(id))
    if (sessionStorage.getItem(id)!==null)
    {
        //text.value=sessionStorage.getItem(id)
        
        text.value=json_aid.texto
        horas.value=json_aid.tempo_h
        min.value=json_aid.tempo_m

    }
    else{
    text.value=null
    horas.value=0
    min.value=0}
    
    return console.log(id)

    //document.getElementById(id).innerHTML = new HTML
    //sessionStorage.setItem(id,window.prompt("Enter your name: "))
}
function eventos_dia(key){
    let event_info_day ={
        tempo_h:horas.value,
        tempo_m:min.value,
        texto:text.value
    }
    //sessionStorage.setItem(key,text.value)  
    sessionStorage.setItem(key,JSON.stringify(event_info_day))  
}
const b_salvar=document.querySelector(".salvar")
b_salvar.addEventListener("click",function(){eventos_dia(s_day_id)})


isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (month==undefined) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    // get first day of month
    
    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        let id = (i - first_day.getDay() + 1)+""+month+""+year
        day.setAttribute("id",id)
        day.onclick=function(){event_window(id)}
        //day.addEventListener("click",eventos_dia(id),false)
        if (i >= first_day.getDay()) {

            day.classList.add('calendar-day-hover')
            day.innerHTML =  i - first_day.getDay() + 1
            day.setAttribute("dia",i - first_day.getDay() + 1)
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        calendar_days.appendChild(day)
    }
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    console.log(month.innerHTML)
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        //console.log(curr_month)
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')


month_picker.onclick = () => {
    month_list.classList.add('show')
    //console.log(month_list)
}

let currDate = new Date()

let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

let dark_mode_toggle = document.querySelector('.dark-mode-switch')
sessionStorage.setItem("darkmode","light")
dark_mode_toggle.onclick = () => {
    // sessionStorage.setItem("darkmode","light")
    // document.querySelector('body').classList.toggle('light')

    // sessionStorage.setItem("darkmode","dark")
    // document.querySelector('body').classList.toggle('dark')
    
    if(sessionStorage.getItem("darkmode")=="light"){
        document.querySelector('body').classList.toggle('dark')
        sessionStorage.setItem("darkmode","dark")
        console.log("vou para preto")
        return
    }
    if(sessionStorage.getItem("darkmode")=="dark"){
        document.querySelector('body').classList.toggle('light')
        sessionStorage.setItem("darkmode","light")}
        console.log("vou para branco")
        return
}
//let dia_selecionado = document.querySelector(".calendar-days ")
//let dias = dia_selecionado.children
//Clicar no quadrado
// window.onclick = e => {
//     console.log(e.target.id)
//     let chave=e.target.id
//     if (chave > 0){
//         sessionStorage.setItem(chave,"Blablabla Eventos")
    
