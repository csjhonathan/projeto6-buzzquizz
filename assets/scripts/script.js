const url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';
const btnCreatQuizz = document.querySelector('.novoQuizz button'); //<== botão de criar quizz
const container = document.querySelector('.container');
const newQuizz = container.querySelector('.novoQuizz');
const allQuizzes = container.querySelector('.todosQuizzes');
const containerTelaDois = document.querySelector(".containerTelaDois")

let quizzes = [];

todosQuizzes();

function todosQuizzes() {
    const promisse = axios.get(url);

    promisse.then((resposta) => {
        quizzes = resposta.data;
        quizzesIniciais();
    })

    promisse.catch(() => {
        alert("Algo inesperado aconteceu, a pagina sera reiniciada")
        window.location.reload(true)
    })
}

function quizzesIniciais() {
    const iniciais = document.querySelector('.listaQuizzes');
    iniciais.innerHTML = ''

    for (let i = 0; i < 6; i++) {
        const boxQuizz = `
        <li onclick="AbrirQuizz(${quizzes[i].id})">
            <img src="${quizzes[i].image}" alt="">
            <div class="gradient"><p>${quizzes[i].title}</p></div>
            
        </li>
        `;
        iniciais.innerHTML += boxQuizz
<<<<<<< HEAD

        console.log(quizzes[i].image)
        console.log(quizzes[i].id)
=======
>>>>>>> 710a347fa08106e02fde076e5a6559ce74c6feac
    }
}

//FUNÇÕES E VARIAVEIS DA TELA 3 =======================================================
const telaUm = document.querySelector('.telaUm')
const telaTres = document.querySelector('.telaTres');
const telaDois = document.querySelector('.telaDois');

//TELA 3.1
const basicInfo = document.querySelector('.telaTres .basicInfo');
const btnGetCreatQuestions = basicInfo.querySelector('button');
let quizzTitle = basicInfo.querySelector('.quizzTitle');
let quizzImgUrl = basicInfo.querySelector('.quizzImgUrl');
let quizzQuestionsQtt = basicInfo.querySelector('.quizzQuestionsQtt');
let quizzLevelsQtt = basicInfo.querySelector('.quizzLevelsQtt');

//TELA 3.2
const quizzQuestions = document.querySelector('.telaTres .quizzQuestions');
const btnGetCreatLvls = quizzQuestions.querySelector('button');
let questionsList;

//TELA 3.3
const selectLevel = document.querySelector('.telaTres .selectLevel');
const lvlCard = selectLevel.querySelector('.level')
const selectLevelBtn = selectLevel.querySelector('button')
let lvlList;

//TELA 3.4
const quizzCreated = document.querySelector('.telaTres .quizzCreated');
const btnAccessQuizz = quizzCreated.querySelector('.accessQuizz');
const btnGoToHome = quizzCreated.querySelector('.goToHome');

const userQuizz = { title: '', image: '', questions: [], levels: [] };

const isBlank = () => {
    // if (quizzTitle.value === '' ||
    //     quizzImgUrl.value === '' ||
    //     quizzQuestionsQtt.value === '' ||
    //     quizzLevelsQtt.value === '') {
    //     alert('Preencha todos os campos')
    //     return
    // }
    isValid(quizzTitle.value, quizzImgUrl.value, quizzQuestionsQtt.value, quizzLevelsQtt.value);
}

const isValid = (titulo, imgUrl, questionsQtt, lvlQtt) => {

    // if (titulo.length < 20 || titulo.length > 65) {
    //     alert('Titulo com tamanho invalido');
    //     return
    // }
    // if(imgUrl.includes('https://') || imgUrl.includes('http://')){
    //     if(imgUrl.includes('.jpg') || imgUrl.includes('.jpeg') || imgUrl.includes('.png') || imgUrl.includes('.webp')){
    //     }else{
    //         alert('insira uma URL válida para sua imagem')
    //         return
    //     }
    // } else {
    //     alert('insira uma URL válida para sua imagem')
    //     return
    // }
    // if (!Number(questionsQtt) || Number(questionsQtt) < 3) {
    //     alert('Quantidade de perguntas inválida (pelo menos 3)')
    //     return
    // }
    // if (!Number(lvlQtt) || Number(lvlQtt) < 2) {
    //     alert('Quantidade de níveis inválida (pelo menos 2)')
    //     return
    // }

    // quizzTitle = titulo;
    // quizzImgUrl = imgUrl;
    // quizzQuestionsQtt = questionsQtt;
    // quizzLevelsQtt = lvlQtt;

    basicInfo.classList.add('hidden');
    quizzQuestions.classList.remove('hidden');

    questionsCards(quizzQuestionsQtt);
};

const creatQuizzObj = () => {
    userQuizz.title = quizzTitle;
    userQuizz.image = quizzImgUrl;

    const questionsListObj = [];
    for (let i = 0; i < quizzQuestionsQtt; i++) {
        const questionTitle = questionsList[i].querySelector('.questionText').value;
        const questionColor = questionsList[i].querySelector('.questionColor').value;
        const questionCorrectAnswer = questionsList[i].querySelector('.questionCorrectAnswer').value;
        const questionCorrectAnswerImg = questionsList[i].querySelector('.questionCorrectAnswerImg').value;
        const questionWrongAnswerOne = questionsList[i].querySelector('.wrongOne').value;
        const questionWrongAnswerOneImg = questionsList[i].querySelector('.wrongOneImg').value;
        const questionWrongAnswerTwo = questionsList[i].querySelector('.wrongTwo').value;
        const questionWrongAnswerTwoImg = questionsList[i].querySelector('.wrongTwoImg').value;
        const questionWrongAnswerThree = questionsList[i].querySelector('.wrongThree').value;
        const questionWrongAnswerThreeImg = questionsList[i].querySelector('.wrongThreeImg').value;
        const question = {
            title: questionTitle,
            color: questionColor,
            answers: [{
                text: questionCorrectAnswer,
                image: questionCorrectAnswerImg,
                isCorrectAnswer: true
            }, {
                text: questionWrongAnswerOne,
                image: questionWrongAnswerOneImg,
                isCorrectAnswer: false
            }]
        }
        if (questionWrongAnswerTwo !== '' && questionWrongAnswerTwoImg !== '') {
            question.answers.push({
                text: questionWrongAnswerTwo,
                image: questionWrongAnswerTwoImg,
                isCorrectAnswer: false
            })
        }
        if (questionWrongAnswerThree !== '' && questionWrongAnswerThreeImg !== '') {
            question.answers.push({
                text: questionWrongAnswerThree,
                image: questionWrongAnswerThreeImg,
                isCorrectAnswer: false
            })
        }
        questionsListObj.push(question)
    }

    userQuizz.questions = questionsListObj;
    levelsCards();
}

const setLvlObj = () => {
    for (let i = 0; i < quizzLevelsQtt; i++) {
        const lvlTitle = lvlList[i].querySelector('.lvlTitle').value;
        const lvlPercentage = lvlList[i].querySelector('.lvlPercentage').value;
        const lvlImgUrl = lvlList[i].querySelector('.lvlImgUrl').value;
        const lvlDescription = lvlList[i].querySelector('.lvlDescription').value;
        userQuizz.levels.push({
            title: lvlTitle,
            image: lvlImgUrl,
            text: lvlDescription,
            minValue: lvlPercentage,
            image: lvlImgUrl,
            text: lvlDescription,
            minValue: lvlPercentage
        })
    }

    setTimeout(sendRequest(), 1000);
}
const levelsCards = function () {
    for (let i = 1; i <= quizzLevelsQtt; i++) {

        selectLevel.querySelector('div').innerHTML += `
        <div class="level closed">
        <p>Nível ${i} <ion-icon name="create" onclick = showLevel(this)></ion-icon></p>
        <input type="text" required placeholder="Título do nível" class='lvlTitle'>
        <input type="text" required placeholder="% de acerto mínima" class='lvlPercentage'>
        <input type="text" required placeholder="URL da imagem do nível" class='lvlImgUrl'>
        <input type="text" required placeholder="Descrição do nível" class='lvlDescription'>
    </div>`
    }

    lvlList = document.querySelectorAll('.level');
}
const questionsCards = (quizzQuestionsQtt) => {
    for (let i = 1; i <= quizzQuestionsQtt; i++) {
        quizzQuestions.querySelector('div').innerHTML += `
        <div class="question">
        <div class="doQuestion ">
            <p>Pergunta ${i} <ion-icon name="create" onclick="showQuestion(this)"></ion-icon></p>
            <input type="text" required placeholder="Texto da pergunta" class='questionText' >
            <input type="text" required placeholder="Cor de fundo da pergunta" class='questionColor'>
        </div>
        <div class="correctAnswer">
            <p>Resposta correta</p>
            <input type="text" required placeholder="Resposta correta" class='questionCorrectAnswer'>
            <input type="text" required placeholder="URL da imagem" class='questionCorrectAnswerImg'>
        </div>
        <div class="wrongAnswers">
            <p>Respostas incorretas</p>
            <div class="wrong">
                <input type="text" required placeholder="Resposta incorreta 1" class = 'wrongOne'>
                <input type="text" required placeholder="URL da imagem 1" class = 'wrongOneImg'>
            </div>
            <div class="wrong">
                <input type="text" placeholder="Resposta incorreta 2" class = 'wrongTwo'>
                <input type="text" placeholder="URL da imagem 2" class = 'wrongTwoImg'>
            </div>
            <div class="wrong">
                <input type="text" placeholder="Resposta incorreta 3" class = 'wrongThree'>
                <input type="text" placeholder="URL da imagem 3" class = 'wrongThreeImg'>
            </div>
        </div>
    </div>`
    }

    questionsList = document.querySelectorAll('.question');
}
const showLevel = (cardLvl) => {
    const clickedCardLvl = cardLvl.parentElement.parentElement;
    const selectedBefore = telaTres.querySelector('.level.openedLvl');

    if (selectedBefore !== null) {
        selectedBefore.classList.remove('openedLvl');
    }
    clickedCardLvl.classList.add('openedLvl');
}
const showQuestion = (cardQuestion) => {
    const clickedCardQuestion = cardQuestion.parentElement.parentElement.parentElement;
    const selectedBefore = telaTres.querySelector('.question.opened');

    if (selectedBefore !== null) {
        selectedBefore.classList.remove('opened');
    }
    clickedCardQuestion.classList.add('opened');
}

let successUserQuizz;
let failedUserQuizz;
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
const sendRequest = () => {
    axios
        .post(url, quizzTeste)
        .then(response => {
            console.log('deu tudo certo');
            console.log(response);
            successUserQuizz = response;
            createdQuizzScreen();
        })
        .catch(response => {
            console.log(response);
            console.log('deu tudo errado');
            failedUserQuizz = response;
        })
}
const createdQuizzScreen = () => {
    selectLevel.classList.add('hidden');
    quizzCreated.classList.remove('hidden');
    quizzCreated.querySelector('.photo').innerHTML = `
    <img src="${quizzTeste.image}" alt="">
    <p>${quizzTeste.title}</p>
    `
}


//EVENT LISTENERS
btnCreatQuizz.addEventListener('click', () => {
    telaUm.classList.add('hidden');
    telaTres.classList.remove('hidden');
});
btnGetCreatQuestions.addEventListener('click', () => {
    isBlank();
});
btnCreatQuizz.addEventListener('click', callScreeThree => {
    newQuizz.classList.add('hidden');
    allQuizzes.classList.add('hidden');
    telaTres.classList.remove('hidden');
})

btnGetCreatLvls.addEventListener('click', () => {
    quizzQuestions.classList.add('hidden');
    selectLevel.classList.remove('hidden');
    creatQuizzObj();
})
selectLevelBtn.addEventListener('click', e => setLvlObj());

btnGoToHome.addEventListener('click', e => window.location.reload())
btnAccessQuizz.addEventListener('click', e => {
    telaTres.classList.add('hidden')
    telaDois.classList.remove('hidden');
})


// Tela Dois 

function AbrirQuizz(identificador){
    container.classList.add("hidden");
    containerTelaDois.classList.remove("hidden");
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${identificador}`);
    promise.then(ExibiQuizz);
    promise.catch(ErroExibirQuizz);
}
function ExibiQuizz(resposta){
    const fundo = document.querySelector(".topo img");
    fundo.src = resposta.data.image;
    const texto = document.querySelector(".topo div");
    texto.innerHTML = resposta.data.title;
    ExibirPerguntas(resposta.data.questions);
}
function ErroExibirQuizz(resposta){
    alert("O Quizz que você procura não se encontra disponível, selecione outro para continuar com a diversão");
        window.location.reload(true);
}

function ExibirPerguntas(perguntas){
    console.log(perguntas);
    const exibindo = document.querySelector(".telaDois .caixote");
    console.log(exibindo);
    for (let i=0; i<perguntas.length; i++){
        exibindo.innerHTML +=`
                <div class="perguntas">
                <div class="pergunta">
                    ${perguntas[i].title}
                </div>
                <ul class="respostas indice${i}">       
                </ul>
            </div>
        `
    }
    ExibirQuest(perguntas)
}

function ExibirQuest(data){
    console.log(data);
    for(let i=0; i<data.length; i++){
        const listaUl = document.querySelector(`.indice${i}`)
        const embaralhado = data[i].answers
        embaralhado.sort(embaralhar);
        for(let b=0; b<data[i].answers.length; b++){
            listaUl.innerHTML +=`
            <li>
                <img src="${data[i].answers[b].image}" alt="Imagem Não Encontrada">
                <div class="opcao">${embaralhado[b].text}</div>
            </li>
            `
        }
    }
}
function embaralhar() { 
	return Math.random() - 0.5; 
}