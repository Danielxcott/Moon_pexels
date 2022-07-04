const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitBtn = document.querySelector(".submit-btn");
const auth = "563492ad6f91700001000001892eefa7ed1e43e6b99daa205d9da68d";
const nav = document.querySelector("nav");
const iconSearch = document.querySelector(".icon");
const moreBtn = document.querySelector(".more");
let page = 1;
let fetchMore;
let currentSearch;

const height  = window.innerHeight;

window.addEventListener("scroll",function(){
    const currentHeight = Math.floor(this.window.scrollY);
    if(currentHeight>height-180){
        nav.classList.add("scroll-nav")
    }else{
        nav.classList.remove("scroll-nav")
    }
})

const fetchApi = async(url)=>{
    const fetchData = await fetch(url,{
        method:'GET',
        headers:{
            Accept : 'application/json',
            Authorization : auth,
        }
    })
    const data = await fetchData.json();
    return data;
}
const getData = (data) =>{
    data.photos.forEach((photo)=>{
        const galleryDiv = document.createElement("div");
        galleryDiv.classList.add("gallery-img");
        galleryDiv.innerHTML = `
        <div class="gallery-info">    
        <a href=${photo.src.original} download>Download</a>
        <p>${photo.photographer}</p>
        </div>
        <img src=${photo.src.large} alt="" />
        ` 
        gallery.appendChild(galleryDiv);
    })
}

const curatedPhoto = async () =>{
     fetchMore = `https://api.pexels.com/v1/curated?per_page=15&page=1`;
    const data = await fetchApi(fetchMore);
    // console.log(Math.floor(Math.random(data.photos.length)*15));
    getData(data);
}

curatedPhoto();

const search = async (searchText) =>{
    clear();
     fetchMore = `https://api.pexels.com/v1/search?query=${searchText}&per_page=15&page=1`;
   const data = await fetchApi(fetchMore);
   getData(data);
}

const clear = ()=>{
    searchInput.value="";
    gallery.innerHTML = "";
}

submitBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const text = searchInput.value;
    search(text);
    currentSearch = text;
})

iconSearch.addEventListener("click",()=>{
    searchInput.classList.toggle("active");
})

const loadMorePhoto = async () =>{
    page++;
    if(currentSearch){
        fetchMore = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    }else{
        fetchMore = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchMore);
    getData(data);
}

moreBtn.addEventListener("click",loadMorePhoto);

