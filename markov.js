/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length - 1; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1];
      
      if (!chains.has(word)) chains.set(word, []);
      chains.get(word).push(nextWord);
    }
    this.chains = chains;
  }

  static choice(ar) {
    const randomIndex = Math.floor(Math.random() * ar.length);
    return ar[randomIndex];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let key = MarkovMachine.choice(Array.from(this.chains.keys()));
    let output = [];

    for (let i = 0; i < numWords && key !== null; i++){
      output.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }
    return output.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
