const API_KEY="018087701f8f4d1da5ec6258f13c9b0c";
const url = "https://newsapi.org/v2/everything?q="

window.addEventListener('load',()=> fetchNews("India"));
function reload(){
    window.location.reload();

}

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`)
    const data = await res.json();
    binedData(data.articles)

}

function binedData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate=document.getElementById('template-news-card')

    cardsContainer.innerHTML='';

    articles.forEach((articles) => {
        if(!articles.urlToImage)return;
        const cardClone = newsCardTemplate.content.cloneNode(true)
        fillDataInCard(cardClone,articles)
        cardsContainer.appendChild(cardClone);

    } );
}

function fillDataInCard(cardClone,articles){
    const newsImg = cardClone.querySelector("#news-img")
    const newstitle = cardClone.querySelector("#news-title")
    const newsSource = cardClone.querySelector("#news-source")
    const newsDesc = cardClone.querySelector("#news-desc")

    newsImg.src = articles.urlToImage;
    newstitle.innerHTML=articles.title;
    newsDesc.innerHTML= articles.description;

    const date = new Date(articles.publishedAt).toLocaleString(undefined,{
        timeZone: 'Asia/Kolkata'
    })
   newsSource.innerHTML=`${articles.source.name} . ${date} `

   cardClone.firstElementChild.addEventListener('click',()=>{
    window.open(articles.url,"_blank")
   })
}

let curSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id)
    const navItem = document.getElementById(id);
    curSelectedNav?.classlist.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
}

const searchbutton = document.getElementById('search-button')
const searchtext = document.getElementById('search-text');
searchbutton.addEventListener('click',() =>{
    const query = searchtext.value;
    fetchNews(query);
})



// finally wait is over and i am happy for that