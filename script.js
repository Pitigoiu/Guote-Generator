
const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');

let apiQuotes=[];

//Show Loading
function loading(){
  loader.hidden=false;
  quoteContainer.hidden=true;
}
//Hide Loading
function complete(){
  if(!loader.hidden){
quoteContainer.hidden=false;
loader.hidden=true;}
}
//Show New Quote
function newQuote(){
  loading();
  const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
  //Check if author is blank and replace it with Unknown
  if(!quote.author)
    authorText.textContent='Unknown';
  else authorText.textContent=quote.author;
  //Check quote lenght to determine styling
  if(quote.text.length>50)
    quoteText.classList.add('long-quote');
  else quoteText.classList.remove('long-quote');
  //Set quote, hide loader
  quoteText.textContent=quote.text;
  complete();
}

// Get uotes From API
async function getQuotes(){
  loading()
  const apiURL='https://type.fit/api/quotes'
  try{
    const response=await fetch(apiURL);
    apiQuotes=await response.json();
    newQuote();
  }catch(error){
    
    // Catch Error Here
  }
}

//Tweet Quote
function tweetQuote(){
  const TwitterURL=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(TwitterURL,'_blanck');
}
//Event Listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

//On Load
getQuotes();
  