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
    listaCompleta = list;
}
function filtrar(obj){
    if(obj.to === "Todos"){
        return true
    } else if(obj.to === nick){
        return true
    } else {
        return false
    }
}
let tipo = '';
function renderizar(){
    const promise2 = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise2.then(rendGood);
    listaUsavel = listaCompleta.filter(filtrar)
    
    
    const ul = document.querySelector('ul')
    ul.innerHTML = '';
    for(let i = 0; i<listaUsavel.length; i++){
        if(listaUsavel[i].type === "status"){
            tipo = 'gray'
        }
        if(listaUsavel[i].type === "private_message"){
            tipo = 'red'
        } else{
            tipo = '';
        }
        ul.innerHTML += `<li class="${tipo}">
    <div class="text"><span>${listaUsavel[i].time}  </span><strong>${listaUsavel[i].from}</strong> para <strong>${listaUsavel[i].to}</strong>: ${listaUsavel[i].text}</div>
</li>`
    }
}
renderizar();

//funcao de enviar mensagem (q terminar renderizando)