

class DataMuseApi{
    constructor(){}

     getWordsMeanLike(word: string){
        return fetch(`https://api.datamuse.com/words?ml=${word}`).then(response => response.json()
        );
    }

    getWordsAdjectives(word: string){
        return fetch(`https://api.datamuse.com/words?rel_jjb=${word}`).then(response => response.json()
        );

    }

    getWordsComprisesOf(word: string){
        return fetch(`https://api.datamuse.com/words?rel_com=${word}`).then(response => response.json()
        );

    }

    getWordsMoreGeneralThan(word: string){
        return fetch(`https://api.datamuse.com/words?rel_gen=${word}`).then(response => response.json()
        );

    }
}
const datamuseapi = new DataMuseApi();
export default  datamuseapi;

