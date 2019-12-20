let quizz = localStorage.getItem('quizz');
quizz = JSON.parse(quizz)
console.log(quizz)
if (quizz == null) {
    let jsoncode = '{"name":"Mon premier quiz sur Quizzie","creationDate":"2019-11-20T08:00:59.566Z","modificationDate":"2019-11-20T18:00:59.566Z","record":{"holderName":"Jojo","score":0,"creationDate":"2019-11-20T12:00:59.566Z"},"questions":[{"heading":"Parmi ces languages, lesquels envoient du lourd ?","propositions":[{"content":"Python","correct":true},{"content":"Visual Basic","correct":false},{"content":"Java","correct":false},{"content":"JavaScript","correct":true}]},{"heading":"En JavaScript, laquelle de ces instructions ne doit pas apparaître dans le code du projet ?","propositions":[{"content":"const","correct":false},{"content":"var","correct":true},{"content":"let","correct":false}]}]}'
    quizz = JSON.parse(jsoncode)
    console.log(quizz)
    localStorage.setItem('quizz', JSON.stringify(quizz));
}







const record_txt = document.getElementById("record")
const bouton1 = document.getElementById("bouton1")
const bouton2 = document.getElementById("bouton2")
const titre_txt = document.getElementById("titre")
const texte_txt = document.getElementById("texte")
const nb_txt = document.getElementById("nb")
var ide = 0

start()

function start() {
    setindex()
}

bouton2.addEventListener("click", () => {
    if (bouton2.className == "lancer") {
        resetquizzEdit()
        resetquizz()
        setgame()
    }
})


bouton1.addEventListener("click", () => {
    if (bouton1.className == "index") {
        resetquizzEdit()
        resetquizz()
        setindex()

        let asupprimer2 = document.getElementById("btnSuivant")
        if (asupprimer2 != null) {
            document.body.removeChild(asupprimer2)
        }
    } else if (bouton1.className == "edit") {
        resetquizz()
        setedit()
    }
})





function setindex() {


    let nb_questions = quizz.questions.length;
    nb_txt.innerHTML = nb_questions + " questions"

    let record = quizz.record
    record_txt.innerHTML = "Record détenu par " + record["holderName"] + " avec " + record["score"] + " points."


    bouton1.innerHTML = "Editer"
    bouton1.className = "edit"
    bouton2.innerHTML = "Lancer"
    bouton2.className = "lancer"


    titre_txt.innerHTML = quizz.name
    texte_txt.innerHTML = "Vous pouvez lancer le quiz ou l'éditer pour y apporter vos propres questions"
}




// function setgame() {

//     resetindex()
//     titre_txt.innerHTML = "Quizz"
//     bouton1.innerHTML = "Accueil"
//     bouton1.className = "index"
//     bouton2.innerHTML = ""
//     bouton2.className = ""

//     quizz.questions.forEach(element => {

//         var question = document.createElement('question')
//         question.htmlFor = "h2";
//         question.id = ide++
//         document.body.appendChild(question);
//         question.innerHTML = element["heading"]


//         var mybr = document.createElement('br');
//         document.body.appendChild(mybr);


//         element.propositions.forEach(element => {


//             var checkbox = document.createElement('input');
//             checkbox.type = "checkbox";
//             checkbox.value = element["content"];
//             checkbox.id = ide++;
//             checkbox.className = element["correct"];


//             var label = document.createElement('label')
//             label.htmlFor = "label";
//             label.id = ide++;
//             label.appendChild(document.createTextNode(element["content"]))

//             document.body.appendChild(checkbox);
//             document.body.appendChild(label);

//             var mybr = document.createElement('br');
//             document.body.appendChild(mybr);
//         });
//         var mybr = document.createElement('br');
//         document.body.appendChild(mybr);

//     });

// var btnvalider = document.createElement("BUTTON");
// btnvalider.innerHTML = "VALIDER"
// btnvalider.id = ide++
// document.body.appendChild(btnvalider);

// btnvalider.addEventListener("click", () => {
//     checkreponses()
// })

// }

function setgame() {
    resetindex()
    titre_txt.innerHTML = "Quizz"
    bouton1.innerHTML = "Accueil"
    bouton1.className = "index"
    bouton2.innerHTML = ""
    bouton2.className = ""

    let nb_questions = quizz.questions.length;
    nb_txt.innerHTML = nb_questions + " questions"

    let actualQuestion = 0
    let score = 0


    var btnSuivant = document.createElement("BUTTON");
    btnSuivant.innerHTML = "Suivants"
    btnSuivant.id = "btnSuivant"
    document.body.appendChild(btnSuivant);


    btnSuivant.addEventListener("click", () => {

        score = checkreponses(score)
        console.log(score)

        resetquizz()
        setQuestion(actualQuestion)
        actualQuestion++



        if (actualQuestion == nb_questions) {

            let asupprimer = document.getElementById("btnSuivant")
            document.body.removeChild(asupprimer)


            let btnvalider = document.createElement("BUTTON");
            btnvalider.innerHTML = "Terminer"
            btnvalider.id = ide++
            document.body.appendChild(btnvalider);


            btnvalider.addEventListener("click", () => {
                score = checkreponses(score)
                alert("Score: " + score)
                endGame(score)
            })
        }


    })


    setQuestion(actualQuestion)
    actualQuestion++
}


function endGame(score) {
    let record = getRecord()
    if (score > record) {
        setNewRecord(score)
    } else {
        setNiceTryPage()
    }

}


function checkreponses(score) {

    let array = []
    let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

    for (let i = 0; i < checkboxes.length; i++) {
        array.push(checkboxes[i].className)
    }
    console.log(array)

    array.forEach(element => {
        if (element == "true") {
            score++
        } else if (element == "false") {
            score--
        }
    });


    return score
}

// function checkreponses() {

//     let array = []
//     let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

//     for (let i = 0; i < checkboxes.length; i++) {
//         array.push(checkboxes[i].className)
//     }
//     console.log(array)

//     let score = 0
//     array.forEach(element => {
//         if (element == "true") {
//             score++
//         }
//     });

//     alert("mon score: " + score)

//     let record = getRecord()
//     if (score > record) {
//         setNewRecord(score)
//     } else {
//         setNiceTryPage()
//     }

// }





function setQuestion(index) {

    var mybr = document.createElement('br');
    document.body.appendChild(mybr);

    let question = document.createElement('question')
    let element = quizz.questions[index]
    question.htmlFor = "h2";
    question.id = ide++
    document.body.appendChild(question);
    question.innerHTML = element.heading


    var mybr = document.createElement('br');
    document.body.appendChild(mybr);


    element.propositions.forEach(element => {
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.value = element["content"];
        checkbox.id = ide++;
        checkbox.className = element["correct"];
        document.body.appendChild(checkbox);

        var label = document.createElement('label')
        label.htmlFor = "label";
        label.id = ide++;
        label.appendChild(document.createTextNode(element["content"]))
        document.body.appendChild(label);

        var mybr = document.createElement('br');
        document.body.appendChild(mybr);
    });


}





function setedit() {
    resetindex()
    titre_txt.innerHTML = "Quizz Edit"
    quizz.questions.forEach((element, index) => {

        bouton1.innerHTML = "Accueil"
        bouton1.className = "index"
        bouton2.innerHTML = "Lancer"
        bouton2.className = "lancer"

        createDeleteQuestion(element, index)


        var question = document.createElement('question')
        question.htmlFor = "h2";
        question.id = ide++
        document.body.appendChild(question);
        question.innerHTML = element["heading"]


        var mybr = document.createElement('br');
        document.body.appendChild(mybr);

        if (element.propositions != undefined) {
            element.propositions.forEach((element, index2) => {


                createDeletePropo(element, index, index2)

                var label = document.createElement('label')
                label.htmlFor = "label";
                label.id = ide++;
                label.appendChild(document.createTextNode(element["content"]))
                document.body.appendChild(label);

                createCheck(element)

                var mybr = document.createElement('br');
                document.body.appendChild(mybr);

            });
        }
        createAddPropo(index)
    });
    createAddQuestion()
}



function createCheck(element) {
    let isCorrect = document.createElement('box');
    if (element["correct"] == true) {
        isCorrect.innerHTML = "   ☑ "
    } else {
        isCorrect.innerHTML = "   ☐ "
    }
    isCorrect.className = element["correct"]
    isCorrect.id = ide++;
    document.body.appendChild(isCorrect);

    isCorrect.addEventListener("click", () => {

        if (element["correct"] == true) {
            element["correct"] = false
        } else {
            element["correct"] = true
        }
        console.log(element)
        resetquizzEdit()
        setedit()
    })

}



function createAddPropo(index) {
    var i = document.createElement("input"); //input element, text
    i.setAttribute('type', "text");
    i.setAttribute('placeholder', "Ajouter proposition");
    i.setAttribute('id', "proposition" + index);

    var s = document.createElement("input"); //input element, Submit button
    s.setAttribute('type', "submit");
    s.setAttribute('value', "Valider");

    document.body.appendChild(i);
    document.body.appendChild(s);

    add2Br()

    s.addEventListener("click", () => {
        let newProposition = {
            content: document.getElementById("proposition" + index).value,
            correct: true
        }
        quizz.questions[index].propositions.push(newProposition)
        console.log(newProposition)

        localStorage.setItem('quizz', JSON.stringify(quizz));

        resetquizzEdit()
        setedit()
    })
}




function createAddQuestion() {
    var i = document.createElement("input"); //input element, text
    i.setAttribute('type', "text");
    i.setAttribute('placeholder', "Ajouter question");
    i.setAttribute('id', "question");

    var s = document.createElement("input"); //input element, Submit button
    s.setAttribute('type', "submit");
    s.setAttribute('value', "Valider");

    document.body.appendChild(i);
    document.body.appendChild(s);

    s.addEventListener("click", () => {
        let newQuestion = {
            heading: document.getElementById("question").value,
            propositions: Array()
        }
        quizz.questions.push(newQuestion)

        localStorage.setItem('quizz', JSON.stringify(quizz));;

        console.log(newQuestion)
        resetquizzEdit()
        setedit()
    })
}




function createDeletePropo(element, index, index2) {

    var suppr2 = document.createElement('X');
    suppr2.className = element["content"]
    suppr2.id = ide++;
    suppr2.innerHTML = "❌ "
    document.body.appendChild(suppr2);

    suppr2.addEventListener("click", () => {
        delete quizz.questions[index].propositions[index2]
        quizz.questions[index].propositions.splice(index2)
        localStorage.setItem('quizz', JSON.stringify(quizz));

        console.log(quizz)
        resetquizzEdit()
        setedit()
    })
}

function createDeleteQuestion(element, index) {
    var suppr = document.createElement('X');
    suppr.className = element["heading"]
    suppr.id = ide++;
    suppr.innerHTML = "  ❌ "
    document.body.appendChild(suppr)
    suppr.addEventListener("click", () => {
        //delete quizz.questions[index]
        quizz.questions.splice(index)
        localStorage.setItem('quizz', JSON.stringify(quizz));

        console.log(quizz)
        resetquizzEdit()
        setedit()

    })
}

function add2Br() {
    var mybr = document.createElement('br');
    document.body.appendChild(mybr);
    var mybr = document.createElement('br');
    document.body.appendChild(mybr);
}


function resetindex() {
    titre_txt.innerHTML = ""
    texte_txt.innerHTML = ""
}


function resetquizz() {
    for (let k = 0; k < ide; k++) {
        let asupprimer = document.getElementById(k)
        document.body.removeChild(asupprimer)
    }

    ide = 0

    //supprimer les br
    let var1 = document.getElementsByTagName('br');
    for (let i = var1.length; i--;) {
        var1[i].parentNode.removeChild(var1[i]);
    }
}

function resetquizzEdit() {
    for (let k = 0; k < ide; k++) {
        let asupprimer = document.getElementById(k)
        document.body.removeChild(asupprimer)
    }
    ide = 0

    //supprimer champs
    let inputs = document.getElementsByTagName('input');
    for (let i = inputs.length; i--;) {
        inputs[i].parentNode.removeChild(inputs[i]);
        //alert("lol")
    }

    //supprimer les br
    let var1 = document.getElementsByTagName('br');
    for (let i = var1.length; i--;) {
        var1[i].parentNode.removeChild(var1[i]);
    }
}






function getRecord() {
    return quizz.record.score
}


function setNewRecord(newRecord) {
    quizz.record.score = newRecord

    localStorage.setItem('quizz', JSON.stringify(quizz));;

    setRecordPage()

}

function refreshRecord() {
    let record = quizz.record
    record_txt.innerHTML = "Record détenu par " + record["holderName"] + " avec " + record["score"] + " points."
}

function setRecordPage() {
    resetquizz()

    titre_txt.innerHTML = "BRAVO ! Record battu ! " + quizz.record.score + " points, THIS IS INSANE OMG"


    var i = document.createElement("input"); //input element, text
    i.setAttribute('type', "text");
    i.setAttribute('name', "username");
    i.setAttribute('placeholder', "Pseudo");
    i.setAttribute('id', "Pseudo");



    var s = document.createElement("input"); //input element, Submit button
    s.setAttribute('type', "submit");
    s.setAttribute('value', "Valider");
    s.setAttribute('id', "btnUsername");

    document.body.appendChild(i);
    document.body.appendChild(s);

    btnUsername.addEventListener("click", () => {
        let holderName = document.getElementById("Pseudo").value

        if (holderName != "") {
            quizz.record.holderName = holderName
            localStorage.setItem('quizz', JSON.stringify(quizz));;
        } else {
            quizz.record.holderName = "le nulos qui sait pas ecrire son nom dans un champ ;"
            localStorage.setItem('quizz', JSON.stringify(quizz));;

        }

        refreshRecord()

        let asupprimer = document.getElementById("Pseudo")
        let asupprimer2 = document.getElementById("btnUsername")
        document.body.removeChild(asupprimer)
        document.body.removeChild(asupprimer2)

        setindex()

    })
}

function setNiceTryPage() {
    resetquizz()
    titre_txt.innerHTML = "Dommage t'as failli être fort, retente si tu veux ! \n le meilleur reste " + quizz.record.holderName + " avec " + quizz.record.score + " point(s)"

}