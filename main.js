const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

//speech that it recognises

const questionsList = [ 'how are you', 'are you a robot', 'where are you', 'is it sunny' ];
const answersList = [ 'good', 'what do you think?', 'in your computer', `why don't you look outside` ];

// identifiying the window element of speech recongition API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//running the function
const recognition = new SpeechRecognition();

// //A function that access a JSON format of questions and answers.
// function getResponses() {
// 	fetch('responses.json').then((res) => res.json()).then((data) => {
// 		let questionsArray;
// 		let answersArray;
// 		let listone = [];
// 		let listtwo;
// 		data.map((responses) => {
// 			listwo = responses;
// 			console.log(Object.values(responses));
// 			listone.push(JSON.stringify(responses.questions));
// 			console.log(listone[0]);
// 		});
// 	});
// }
// getResponses();

//when the voice gets activated, this is going to start:
recognition.onstart = function() {
	console.log('voice is activated, you can speak to microphone');
};

//when we stop talking and have the result of the string:
recognition.onresult = function(event) {
	//the even tholds the string of what we're talking about.
	const current = event.resultIndex; //accessing the text output through the array output on console.
	const transcript = event.results[current][0].transcript;
	content.textContent = transcript; //accessing the h3 tag by changing
	readOutLoud(transcript);
};

//add the listener to the btn
btn.addEventListener('click', () => {
	recognition.start();
});

function readOutLoud(message) {
	const speech = new SpeechSynthesisUtterance(); //a method on the window that speaks back.

	speech.text = 'That is not a valid input, please pick from one of the below phrases.'; //default response

	const respond = questionsList.map((question) => {
		if (message.includes(question)) {
			let index = questionsList.indexOf(question);
			const finalText = answersList[index]; //math.floor responds back with whole numbers
			speech.text = finalText;
		}
	});

	speech.volume = 1; // one is loudest
	speech.rate = 1; //one is quickest
	speech.pitch = 1; //highest
	//need your browser to listen to it
	window.speechSynthesis.speak(speech);
}
