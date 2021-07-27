const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

class TextToSpeech {
  constructor () {
    this.recognition = new SpeechRecognition()
  }

  record () {
    return new Promise((resolve, reject) => {
      const { recognition } = this

      const colors = ['red', 'blue']
      const grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
      
      const speechRecognitionList = new SpeechGrammarList()
      speechRecognitionList.addFromString(grammar, 1)

      recognition.grammars = speechRecognitionList
      recognition.continuous = false
      recognition.lang = 'en-US'
      recognition.interimResults = false
      recognition.maxAlternatives = 1

      recognition.onresult = e => {
        const result = e.results[0][0]
        const { transcript, confidence } = result
        console.log(transcript, confidence)
        resolve(transcript)
      }

      recognition.onspeechend = () => {
        recognition.stop()
      }

      recognition.onnomatch = (event) => {
        reject('could not recognize what you were saying')
      }

      recognition.onerror = reject
      
      recognition.start()
    })
  }
}

export default new TextToSpeech()