let nick;
let nickname;
function iniciar(){
    nick = prompt("Escolha um nome de usuário");
    nickname = {
        name: nick
    }
    let promiseEntrada = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nickname);
    promiseEntrada.then(deuBao)
    promiseEntrada.catch(deuRui)
}
function deuBao(){
    return
}
function deuRui(erro){
    const errorCode = erro.response.status;
    if(errorCode == 400){
        alert('Usuário online com este nome, escolha outro apelido')
    } else {
        alert('Nome de usuário inválido, escolha outro')
    }
    iniciar()
}
iniciar();

function doNothing(){
    return
}
function manterConection(){
    let promise1 = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nickname);
    promise1.then(doNothing)
}
setInterval(manterConection, 5000);

let listaCompleta = [];
let listaUsavel = [];
function rendGood(list){
    ul.innerHTML = '';
    listaCompleta = list.data;
    filtrar(listaCompleta);
    for(let i = 0; i<listaUsavel.length; i++){
        if(listaUsavel[i].type === "status"){
            tipo = 'gray'
        } else if(listaUsavel[i].type === "private_message"){
            tipo = 'red'
        } else{
            tipo = '';
        }
        ul.innerHTML += `<li data-test="message" class="${tipo}">
    <div class="text"><span>${listaUsavel[i].time}  </span><strong>${listaUsavel[i].from}</strong> para <strong>${listaUsavel[i].to}</strong>: ${listaUsavel[i].text}</div>
</li>`
    }
    const last = ul.lastChild
    last.scrollIntoView();
}
function filtrar(lista){
    listaUsavel = [];
    for(let j = 0; j<100; j++){
        if(lista[j].to === "Todos" || lista[j].to === nick){
            listaUsavel.push(lista[j])
        }
    }
}
let tipo = '';
const ul = document.querySelector('ul')
const nomeDescartavel = document.querySelector('input');
nomeDescartavel.addEventListener("keydown", function (e) {
    if (e.code === "Enter") { 
        sendMsg();
    }
})
function renderizar(){
    const promise2 = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise2.then(rendGood);
    
    
}
renderizar()
setInterval(renderizar, 3000)

function sendMsg(){
    const input = document.querySelector('input').value
    let objmsg = {
        from: nick,
        to: "Todos",
        text: `${input}`,
        type: "message"
    }
    const promise3 = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', objmsg)
    promise3.then(msgEnviada)
    promise3.catch(msgNaoEnviada)
}
function msgEnviada(){
    document.querySelector('input').value = ''
    renderizar();
}
function msgNaoEnviada(){
    window.location.reload()
}