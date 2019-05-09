let speech,speechRec;
var msg;
function setup() {
	speech = new p5.Speech(); // speech synthesis object
	speech.onLoad = voiceReady;
	let lang=navigator.language || 'en-US';
	speechRec=new p5.SpeechRec(lang,gotSpeech);

	function voiceReady() {
		console.log(speech.voices);
	}

	function gotSpeech(){
		if(speechRec.resultValue){
			console.log(speechRec.resultString)
			document.getElementById('msg').value=speechRec.resultString;
			textinputeval();
		}
	}
}

function speak_out(intro) {
	let voices = speech.voices;
	let voice = random(voices);
	console.log(voice);
	speech.setRate(1);
	speech.setPitch(1);
	speech.setVoice('Google UK English Female');
	speech.setLang('en-US');
	speech.speak(intro);
}