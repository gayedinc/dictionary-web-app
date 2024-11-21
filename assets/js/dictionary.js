async function init() {
  data = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/word').then(response => response.json());
  console.log(data)
  dictionaryData = data;
  render();
}


const searchInput = document.querySelector(".searchInput"); //input elemanı
const searchWords = document.querySelector(".searchWords"); // kelime alanı
const searchForm = document.getElementById("searchForm"); // form elemanı


let filteredWord = '';

function handleSubmit(e) {
  e.preventDefault();
  filteredWord = searchForm.filteredWord.value.toLocaleLowerCase('en');
  if (!filteredWord) {
    searchWords.innerText = "Whoops, can’t be empty…";
    return;
  }
  searchWords.innerText = filteredWord;
  render();
  searchInput.value = ""; // input temizle
}

searchForm.addEventListener('submit', handleSubmit);

let dictionaryData = []; // aranan kelimeleri tutacağımız boş dizi

async function render() {
  searchWords.innerHTML = '';
  const matchingWords = dictionaryData.filter(entry =>
    entry.word.toLocaleLowerCase('en').includes(filteredWord)
  );

  if (matchingWords.length === 0) {
    searchWords.innerHTML = `
    <div class="notFoundTxt">
      <span>😕</span>
      <h5>No Definitions Found</h5>
      <p>Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.</p>
    </div>
    `;
    return;
  }
}
console.log(dictionaryData)

init();