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
      
      recognition.continuous = false
      recognition.lang = 'en-US'
      recognition.interimResults = false
      recognition.maxAlternatives = 1

      recognition.onresult = e => {
        const result = e.results[0][0]
        const { transcript, confidence } = result
        if (confidence < .75) {
          return reject(new Error(`We couldn't recognize what you were saying, please try again.`))
        }
        resolve(transcript)
      }

      recognition.onspeechend = () => {
        recognition.stop()
      }

      recognition.onnomatch = (event) => {
        reject(new Error(`We couldn't recognize what you were saying, please try again.`))
      }

      recognition.onerror = (err) => {
        reject(err)
      }
      
      recognition.start()
    })
  }
}

export default new TextToSpeech()