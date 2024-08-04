let inputBox = document.querySelector(".input-box");
let btn= document.querySelector(".btn");
let result= document.querySelector(".result");

btn.addEventListener("click",()=>{
    getWord(inputBox.value);
})

async function getWord(word){
    try{
        result.innerHTML = "Fetching Data...";
        let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        definitions = data[0].meanings[0].definitions[0];

        result.innerHTML = `<h2><strong>Word: </strong>${word}</h2>
        <p>${data[0].meanings[0].partOfSpeech}</p>
        <p><strong>Definition: </strong>${definitions.definition}</p>
        <p><strong>Example: </strong>${definitions.example}</p>`




        result.innerHTML += `<p><strong>Antonyms: </strong>`;
        if(definitions.antonyms.length == 0){
            result.innerHTML += `<p>Not found...</p>`
        }else{
            for(let i=0; i<definitions.antonyms.length; i++){
                result.innerHTML += `<li>${definitions.antonyms[i]}`;
            }
        }





        result.innerHTML += `<p><strong>Synonyms: </strong>`;
        if(definitions.synonyms.length == 0){
            result.innerHTML += `<p>Not found...</p>`;
        }else{
            for(let i=0; i<definitions.synonyms.length; i++){
                result.innerHTML += `<li>${definitions.synonyms[i]}</li>`;
            }
        }




        result.innerHTML += `<div><a href="${data[0].sourceUrls}">Read More</a><div>`;
        inputBox.value = "";
    }
    catch(error){
        result.innerHTML = "Sorry, the word is not found..."
    }


}