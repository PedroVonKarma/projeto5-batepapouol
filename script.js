let nick;
let promiseEntrada;
function iniciar(){
    nick = prompt("Escolha um nome de usuário");
    nickname = {
        name: nick
    }
    promiseEntrada = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nickname);
    promiseEntrada.then()
}