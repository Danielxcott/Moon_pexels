const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitBtn = document.querySelector(".submit-btn");
const auth = "563492ad6f91700001000001892eefa7ed1e43e6b99daa205d9da68d"

const curatedPhoto = async () =>{
    const fetchData = await fetch(`https://api.pexels.com/v1/curated?per_page=15&page=1`,{
        method:'GET',
        headers:{
            Accept : 'application/json',
            Authorization : auth,
        }
    })
    const data = await fetchData.json();
    // console.log(Math.floor(Math.random(data.photos.length)*15));
    console.log(data.photos)
    data.photos.forEach((photo)=>{
        const galleryDiv = document.createElement("div");
        galleryDiv.classList.add("gallery-img");
        galleryDiv.innerHTML = `<img src=${photo.src.large} alt="" />
        <p>${photo.photographer}</p>
        ` 
        gallery.appendChild(galleryDiv);
    })
}

curatedPhoto();