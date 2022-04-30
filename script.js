const wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector("input"),
infoText = wrapper.querySelector(".info-text"),
removeIcon = wrapper.querySelector(".search span");
// synonyms = wrapper.querySelector(".synonyms .list")


//data function
function data(result, word){
    if(result.title){ //if api returns the message of can't find word
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Spell better, child.`
    }else{
        wrapper.classList.add("active"); //if searched word exists, active class is added to wrapper
        let definitions = result[0].meanings[0].definitions[0],
        phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`;

        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phonetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = definitions.example;

        // for (let i = 0; i < 5; i++) { // getting only 5 synonyms out of many
        //     let tag = `<span>${definitions.synonyms[i]},</span>`;
        //     synonyms.insertAdjacentHTML("beforeend", tag);
        // }

    }
    console.log(result);
}

//fetch api function
function fetchApi(word){
    wrapper.classList.remove("active");
    infoText.style.color = "#000";
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    //fetching api response and returning it with parsing into js obj
    //and in another then method calling data function with passing api
    //response and searched word as an argument
    fetch(url).then(res => res.json()).then(result => data(result, word));
}

searchInput.addEventListener("keyup", e =>{
    if(e.key === "Enter" && e.target.value){
        fetchApi(e.target.value);
    }
});

removeIcon.addEventListener("click", ()=>{
    searchInput.value = "";
    searchInput.focus();
})