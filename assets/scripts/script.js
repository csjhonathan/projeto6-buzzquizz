const url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/';
const container = document.querySelector('.container');
const newQuizz = container.querySelector('.novoQuizz');
const allQuizzes = container.querySelector('.todosQuizzes');
const quizzTeste = {
    title: "TESTETESTETEJSTETESTETESTE",
    image: "https://http.cat/411.jpg",
    questions: [
        {
            title: "Título da pergunta 1",
            color: "#123456",
            answers: [
                {
                    text: "Texto da resposta 1",
                    image: "https://http.cat/411.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Texto da resposta 2",
                    image: "https://http.cat/412.jpg",
                    isCorrectAnswer: false
                }
            ]
        },
        {
            title: "Título da pergunta 2",
            color: "#123456",
            answers: [
                {
                    text: "Texto da resposta 1",
                    image: "https://http.cat/411.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Texto da resposta 2",
                    image: "https://http.cat/412.jpg",
                    isCorrectAnswer: false
                }
            ]
        },
        {
            title: "Título da pergunta 3",
            color: "#123456",
            answers: [
                {
                    text: "Texto da resposta 1",
                    image: "https://http.cat/411.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Texto da resposta 2",
                    image: "https://http.cat/412.jpg",
                    isCorrectAnswer: false
                }
            ]
        }
    ],
    levels: [
        {
            title: "Título do nível 1",
            image: "https://http.cat/411.jpg",
            text: "Descrição do nível 1",
            minValue: 0
        },
        {
            title: "Título do nível 2",
            image: "https://http.cat/412.jpg",
            text: "Descrição do nível 2",
            minValue: 50
        }
    ]
}
const localQuizzes = [];
const savedQuizzes = localStorage.getItem('Quizzes');
let resultado = [];
const respostas = []
let data = []

//VARIAVEIS DA TELA 3 5
let lvlList = '';
let lvlNodeList;
let quizzes = [];
let questionsList = '';
let questionsNodeList;
let quizzTitle;
let quizzImgUrl;
let quizzQuestionsQtt;
let quizzLevelsQtt;
let successUserQuizz;
let failedUserQuizz;
//================================
todosQuizzes();


function ShowUserQuizz() {


    const userQuizzesScreen = document.querySelector('.userQuizz');
    const userQuizzTitle = document.querySelector('.userQuizzes .titulo')
    const userQuizzes = local(localQuizzes);
    if (userQuizzes.length <= 0) {
        return
    }

    userQuizzesScreen.classList.add('userQuizzDisplayed');
    userQuizzesScreen.classList.remove('userQuizz');
    userQuizzTitle.innerHTML = `Seus Quizzes <ion-icon onclick ="goTocreatQuizz()" class = "addQuizz" name="add-circle"></ion-icon>`
    userQuizzesScreen.innerHTML = '';
    for (let i = 0; i < userQuizzes.length; i++) {
        axios
            .get(url + userQuizzes[i].id)
            .then(response => {
                {
                    const individualQuizz = response.data
                    userQuizzesScreen.innerHTML += `
                <li onclick = openQuizz(this) data-id = '${individualQuizz.id}' >
                    <img src="${individualQuizz.image}" alt="">
                    <div class="gradient"><p>${individualQuizz.title}</p></div>
                </li>
                `

                }
            })
    }
}
function local() {
    const arrLocalArrQuizzes = JSON.parse(savedQuizzes);
    if (savedQuizzes !== null) {
        for (let i = 0; i < arrLocalArrQuizzes.length; i++) {
            localQuizzes.push(arrLocalArrQuizzes[i]);
        }
    }
    return localQuizzes
}

function todosQuizzes() {


    const promisse = axios.get(url);

    promisse.then((resposta) => {
        container.innerHTML = `
        <div class="telaUm ">
        <div class = 'userQuizzes'>
            <p class="titulo"></p>
            <ul class="userQuizz">
                <p>Você não criou nenhum quizz ainda :(</p>
                <button onclick = 'goTocreatQuizz()'>Criar Quizz</button>
            </ul>
        </div>
        <div class="todosQuizzes">
            <p class="titulo">
                Todos os Quizzes
            </p>
            <ul class="listaQuizzes">

            </ul>
        </div>
    </div>`
        quizzes = resposta.data;
        quizzesIniciais();
        ShowUserQuizz();
    })

    promisse.catch(() => {
        alert("Algo inesperado aconteceu, a pagina sera reiniciada")
        window.location.reload(true)
    })


}
function quizzesIniciais() {
    const arrLocal = JSON.parse(savedQuizzes);
    const arrLocalId = []
    const iniciais = document.querySelector('.listaQuizzes');
    let serverQuizzList = 0;
    iniciais.innerHTML = ''
    if(arrLocal===null){
        for (let i = 0; serverQuizzList < 6; i++) {
                const boxQuizz = `
            <li onclick = openQuizz(this) data-id = '${quizzes[i].id}' class='serverQuizz' >
                <img src="${quizzes[i].image}" alt="">
                <div class="gradient"><p>${quizzes[i].title}</p></div>
                
            </li>
            `
            ; iniciais.innerHTML += boxQuizz
            
            serverQuizzList = document.querySelectorAll('.serverQuizz').length;
        }
    } else{
        for(let i = 0; i<arrLocal.length;i++){
            arrLocalId.push(arrLocal[i].id);
        }
    }
    
    
    
    for (let i = 0; serverQuizzList < 6; i++) {
        if(arrLocalId.includes(quizzes[i].id)){
            console.log(true)
        }else{
            const boxQuizz = `
        <li onclick = openQuizz(this) data-id = '${quizzes[i].id}' class='serverQuizz' >
            <img src="${quizzes[i].image}" alt="">
            <div class="gradient"><p>${quizzes[i].title}</p></div>
            
        </li>
        `
        ; iniciais.innerHTML += boxQuizz
        }
        serverQuizzList = document.querySelectorAll('.serverQuizz').length;
    }
}
const openQuizz = (quizz) => {
    const quizzId = quizz.getAttribute('data-id');
    axios
        .get(url + quizzId)
        .then(response => {
            showQuizz(response)
        })
        .catch(ErroExibirQuizz)
}
const showQuizz = receivedQuizz => {
    const quizzData = receivedQuizz.data;
    resultado = receivedQuizz.data.levels;
    data = receivedQuizz
    container.innerHTML = `
    <div class="telaDois">
    <div class="topo">
        <img src="${quizzData.image}" alt="Imagem Não Encontrada" class="quizzHeader">
        <div></div>
        <div><span>${quizzData.title}</span></div>
    </div>
    <div class="questionBox">${getQuestionTemplate(quizzData)}</div>
    <footer class="hidden"></footer>
    <div class="botoes hidden"></div>`
}

function getQuestionTemplate(quizzData) {
    let questionsTemplate = '';
    const quizzQuestions = quizzData.questions;
    for (let i = 0; i < quizzQuestions.length; i++) {
        questionsTemplate += `
        <div class="perguntas proxima">
            <div class="pergunta" style = "background-color: ${quizzQuestions[i].color}">
                ${quizzQuestions[i].title}
            </div>
            <ul class="respostas">${getAnswers(quizzQuestions[i].answers, [i])}</ul>
        </div>`
    }
    return questionsTemplate;
}
function getAnswers(quizzAnswers) {
    const sortedAnswers = quizzAnswers.sort(embaralhar);
    let answersTemplate = '';
    for (let i = 0; i < quizzAnswers.length; i++) {
        answersTemplate += `
            <li onclick="marcar(this)" data-iscorrect = '${sortedAnswers[i].isCorrectAnswer}'>
                <img src="${sortedAnswers[i].image}" alt="Imagem Não Encontrada">
                <div class="opcao ${sortedAnswers[i].isCorrectAnswer}">${sortedAnswers[i].text}</div>
            </li>`

    }
    return answersTemplate;
}
//FUNÇÕES 3 =======================================================
const telaUm = document.querySelector('.telaUm')
const telaTres = document.querySelector('.telaTres');
const telaDois = document.querySelector('.telaDois');

//TELA 3.1
const basicInfo = document.querySelector('.basicInfo');

//TELA 3.2
const quizzQuestions = document.querySelector('.telaTres .quizzQuestions');


//TELA 3.3
const selectLevel = document.querySelector('.telaTres .selectLevel');


//TELA 3.4
const quizzCreated = document.querySelector('.telaTres .quizzCreated');

const userQuizz = { title: quizzTitle, image: quizzImgUrl, questions: [], levels: [] };

function goTocreatQuizz() {
    container.innerHTML = `
    <div class="telaTres">
            <div class="basicInfo">
                <p>Comece pelo começo</p>
                <div class="inputs">
                    <input onkeyup="inputValidator(this)" type="text" placeholder="Título do seu quizz" required class="quizzTitle">
                    <input onkeyup="inputValidator(this)" type="text" placeholder="URL da imagem do seu quizz" required class="quizzImgUrl">
                    <input onkeyup="inputValidator(this)" type="text" placeholder="Quantidade de perguntas do quizz" required class="quizzQuestionsQtt">
                    <input onkeyup="inputValidator(this)" type="text" placeholder="Quantidade de níveis do quizz" required class="quizzLevelsQtt">
                </div>
                <button onclick = goToCreatQuestions()>Prosseguir pra criar perguntas</button>
            </div>
        </div>`
    quizzTitle = document.querySelector('.quizzTitle');
    quizzImgUrl = document.querySelector('.quizzImgUrl');
    quizzQuestionsQtt = document.querySelector('.quizzQuestionsQtt');
    quizzLevelsQtt = document.querySelector('.quizzLevelsQtt');
}

function goToCreatQuestions() {
    // if (isBlank() === false) {
    //     return
    // } else if (isValid(quizzTitle.value, quizzImgUrl.value, quizzQuestionsQtt.value, quizzLevelsQtt.value) === false) {
    //     return
    // }

    container.querySelector('.telaTres').innerHTML = `
    <div class="quizzQuestions">
    <p>Crie suas perguntas</p>
    <div>${questionsCards(quizzQuestionsQtt.value)}</div>
    <button onclick = 'goToCreatLevels()'>Prosseguir pra criar níveis</button>
    </div>
    `
    quizzTitle = quizzTitle.value;
    quizzImgUrl = quizzImgUrl.value;
    quizzQuestionsQtt = quizzQuestionsQtt.value;
    quizzLevelsQtt = quizzLevelsQtt.value
}

function goToCreatLevels() {
    creatQuizzObj();
    container.querySelector('.telaTres').innerHTML = `
    <div class="selectLevel">
    <p>Agora, decida os níveis </ion-icon></p>
    <div class="levels">${levelsCards(quizzLevelsQtt)}</div>
    <button onclick = 'goToQuizzCreated()'>Finalizar Quizz</button>
    </div>`
    lvlNodeList = document.querySelectorAll('.level');
}

function goToQuizzCreated() {
    setLvlObj();
    container.querySelector('.telaTres').innerHTML = `
    <div class="quizzCreated">
        <p>Seu quizz está pronto!</p>
        <div class="photo">
            <img src="${quizzTeste.image}" alt="">
            <p>${quizzTeste.title}</p>
        </div>
        <button onclick = 'accessQuizz()'> Acessar Quizz</button>
        <button onclick = 'goToHome()'> Voltar pra home</button>
    </div>`

    sendRequest(quizzTeste);
}
function sendRequest(newQuizz) {
    axios
        .post(url, newQuizz)
        .then(response => {
            localQuizzes.push({
                key: response.data.key,
                id: response.data.id
            })
            storageQuizzes()

        })
}

function storageQuizzes() {
    localQuizzesStorage = JSON.stringify(localQuizzes);
    localStorage.setItem('Quizzes', localQuizzesStorage)
}
function isBlank() {
    if (quizzTitle.value === '' ||
        quizzImgUrl.value === '' ||
        quizzQuestionsQtt.value === '' ||
        quizzLevelsQtt.value === '') {
        alert('Preencha todos os campos')
        return false
    }

}

function isValid(titulo, imgUrl, questionsQtt, lvlQtt) {

    // if (titulo.length < 20 || titulo.length > 65) {
    //     alert('Titulo com tamanho invalido');
    //     return false
    // }
    // if(imgUrl.includes('https://') || imgUrl.includes('http://')){
    //     if(imgUrl.includes('.jpg') || imgUrl.includes('.jpeg') || imgUrl.includes('.png') || imgUrl.includes('.webp')){
    //     }else{
    //         alert('insira uma URL válida para sua imagem')
    //         return false
    //     }
    // } else {
    //     alert('insira uma URL válida para sua imagem')
    //     return false
    // }
    // if (!Number(questionsQtt) || Number(questionsQtt) < 3) {
    //     alert('Quantidade de perguntas inválida (pelo menos 3)')
    //     return false
    // }
    // if (!Number(lvlQtt) || Number(lvlQtt) < 2) {
    //     alert('Quantidade de níveis inválida (pelo menos 2)')
    //     return false
    // }

    quizzTitle = titulo;
    quizzImgUrl = imgUrl;
    quizzQuestionsQtt = questionsQtt;
    quizzLevelsQtt = lvlQtt;

}

function creatQuizzObj() {
    questionsNodeList = document.querySelectorAll('.question');
    userQuizz.title = quizzTitle;
    userQuizz.image = quizzImgUrl;

    const questionsListObj = [];
    for (let i = 0; i < quizzQuestionsQtt; i++) {
        const question = {
            title: questionsNodeList[i].querySelector('.questionText').value,
            color: questionsNodeList[i].querySelector('.questionColor').value,
            answers: [{
                text: questionsNodeList[i].querySelector('.questionCorrectAnswer').value,
                image: questionsNodeList[i].querySelector('.questionCorrectAnswerImg').value,
                isCorrectAnswer: true
            }, {
                text: questionsNodeList[i].querySelector('.wrongOne').value,
                image: questionsNodeList[i].querySelector('.wrongOneImg').value,
                isCorrectAnswer: false
            }]
        }
        if (questionsNodeList[i].querySelector('.wrongTwo').value !== '' && questionsNodeList[i].querySelector('.wrongTwoImg').value !== '') {
            question.answers.push({
                text: questionsNodeList[i].querySelector('.wrongTwo').value,
                image: questionsNodeList[i].querySelector('.wrongTwoImg').value,
                isCorrectAnswer: false
            })
        }
        if (questionsNodeList[i].querySelector('.wrongThree').value !== '' && questionsNodeList[i].querySelector('.wrongThreeImg').value !== '') {
            question.answers.push({
                text: questionsNodeList[i].querySelector('.wrongThree').value,
                image: questionsNodeList[i].querySelector('.wrongThreeImg').value,
                isCorrectAnswer: false
            })
        }
        questionsListObj.push(question)
    }

    userQuizz.questions = questionsListObj;
}

function setLvlObj() {
    for (let i = 0; i < quizzLevelsQtt; i++) {
        userQuizz.levels.push({
            title: lvlNodeList[i].querySelector('.lvlTitle').value,
            image: lvlNodeList[i].querySelector('.lvlPercentage').value,
            text: lvlNodeList[i].querySelector('.lvlPercentage').value,
            minValue: lvlNodeList[i].querySelector('.lvlDescription').value
        })
    }
}

function levelsCards(l) {
    for (let i = 1; i <= l; i++) {

        lvlList += `
        <div class="level closed">
        <p>Nível ${i} <ion-icon name="create" onclick = showLevel(this)></ion-icon></p>
        <input type="text" required placeholder="Título do nível" class='lvlTitle'>
        <input type="text" required placeholder="% de acerto mínima" class='lvlPercentage'>
        <input type="text" required placeholder="URL da imagem do nível" class='lvlImgUrl'>
        <input type="text" required placeholder="Descrição do nível" class='lvlDescription'>
    </div>`
    }

    return lvlList;
}

function questionsCards(quizzQuestionsQtt) {
    for (let i = 1; i <= quizzQuestionsQtt; i++) {
        questionsList += `
        <div class="question">
        <div class="doQuestion ">
            <p>Pergunta ${i} <ion-icon name="create" onclick="showQuestion(this)"></ion-icon></p>
            <input onkeyup="inputValidator(this)" type="text" required placeholder="Texto da pergunta" class='questionText' >
            <input onkeyup="inputValidator(this)" type="text" required placeholder="Cor de fundo da pergunta" class='questionColor'>
        </div>
        <div class="correctAnswer">
            <p>Resposta correta</p>
            <input onkeyup="inputValidator(this)" type="text" required placeholder="Resposta correta" class='questionCorrectAnswer'>
            <input onkeyup="inputValidator(this)" type="text" required placeholder="URL da imagem" class='questionCorrectAnswerImg'>
        </div>
        <div class="wrongAnswers">
            <p>Respostas incorretas</p>
            <div class="wrong">
                <input onkeyup="inputValidator(this)" type="text" required placeholder="Resposta incorreta 1" class = 'wrongOne'>
                <input onkeyup="inputValidator(this)" type="text" required placeholder="URL da imagem 1" class = 'wrongOneImg'>
            </div>
            <div class="wrong">
                <input onkeyup="inputValidator(this)" type="text" placeholder="Resposta incorreta 2" class = 'wrongTwo'>
                <input onkeyup="inputValidator(this)" type="text" placeholder="URL da imagem 2" class = 'wrongTwoImg'>
            </div>
            <div class="wrong">
                <input onkeyup="inputValidator(this)" type="text" placeholder="Resposta incorreta 3" class = 'wrongThree'>
                <input onkeyup="inputValidator(this)" type="text" placeholder="URL da imagem 3" class = 'wrongThreeImg'>
            </div>
        </div>
    </div>`
    }

    return questionsList;
}
function inputValidator(input) {
}
function showLevel(cardLvl) {
    const clickedCardLvl = cardLvl.parentElement.parentElement;
    const selectedBefore = document.querySelector('.level.openedLvl');

    if (selectedBefore !== null) {
        selectedBefore.classList.remove('openedLvl');
    }
    clickedCardLvl.classList.add('openedLvl');
}

function showQuestion(cardQuestion) {
    const clickedCardQuestion = cardQuestion.parentElement.parentElement.parentElement;
    const selectedBefore = document.querySelector('.question.opened');

    if (selectedBefore !== null) {
        selectedBefore.classList.remove('opened');
    }
    clickedCardQuestion.classList.add('opened');
}

function goToHome() {
    window.location.reload()
}
function accessQuizz() {
    console.log(userQuizz)
}

// Tela Dois 
function ErroExibirQuizz(resposta) {
    alert("O Quizz que você procura não se encontra disponível, selecione outro para continuar com a diversão");
    window.location.reload(true);
}

function embaralhar() {
    return Math.random() - 0.5;
}

function marcar(selecionado) {
    const Jaselecionada = document.querySelector("ul .marcada");
    const UlJaMarcada = selecionado.parentNode.classList.contains("Ulmarcada");
    const proxima = document.querySelector('.proxima');
    if (Jaselecionada === null && !UlJaMarcada) {
        selecionado.classList.add("marcado");
        selecionado.parentNode.classList.add("Ulmarcada");
        proxima.classList.remove('proxima');
    }
    setTimeout(rolar, 2000);
    
}

function rolar() {
    const proxima = document.querySelector('.proxima');
    if (proxima !== null){
        proxima.scrollIntoView({ behavior: "smooth" });
    }else{
        avaliar();
    }
}

function avaliar(){
    const verdadeiro = document.querySelectorAll(".marcado .true");
    const falso = document.querySelectorAll(".marcado .false");
    const total = verdadeiro.length + falso.length;
    const score  = Math.floor((verdadeiro.length/total)*100);
    CreateFinal(resultado,score);
}

function CreateFinal(final,pontuacao){
    const rodape = document.querySelector("footer");
    const buttons = document.querySelector(".botoes")
    buttons.classList.remove("hidden")
    rodape.classList.remove("hidden")
    console.log(data.data);
    buttons.innerHTML = `
    <button onclick = 'accessQuizz()'>Reiniciar Quizz</button>
    <button onclick = 'goToHome()'> Voltar pra home</button>`

    for (let i=0; i<final.length ; i++){
        if(pontuacao>=final[i].minValue){
            rodape.innerHTML = `
        <div class="resultado">${final[i].title}</div>
        <div class="conteudo">
            <img src="${final[1].image}" alt="Imagem não encontrada">
            <div class="texto">${final[i].text}</div>
        </div>`;
        }
    }
    document.querySelector("footer").scrollIntoView({ behavior: "smooth" });
}
