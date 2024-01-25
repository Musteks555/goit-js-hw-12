import{S as y,i as c,a as h}from"./assets/vendor-e6ae6a6a.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const r={gallery:document.querySelector(".gallery-container"),form:document.querySelector(".form"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".btn-load-more")},i={query:"",page:1,maxPage:0,per_page:40},L=new y(".gallery-link",{captions:!0,captionSelector:"img",captionDelay:250,captionPosition:"bottom",captionsData:"alt"});r.form.addEventListener("submit",v);async function v(a){a.preventDefault();const t=a.currentTarget,n=t.elements.query,s=t.elements.searchBtn;r.gallery.innerHTML="",r.loader.classList.add("show"),s.disabled=!0,r.loadMoreBtn.classList.add("is-hidden");const e=document.querySelector(".iziToast");if(e&&c.hide({transitionOut:"fadeOutUp"},e),r.query=n.value.trim(),!!r.query)try{const{hits:o,totalHits:l}=await d(r.query);i.maxPage=Math.ceil(l/i.per_page),u(o),f(),o.length&&o.length!==l?(r.loadMoreBtn.classList.remove("is-hidden"),r.loadMoreBtn.addEventListener("click",g)):o.length||c.show({message:"Sorry, there are no images matching your search query. Please, try again!",messageColor:"#FAFAFB",messageSize:"16px",messageLineHeight:"24px",color:"#EF4040",progressBarColor:"#B51B1B",position:"topRight",icon:"icon-cancel",iconColor:"#FAFAFB"})}catch(o){console.log(o)}finally{r.loader.classList.remove("show"),t.reset(),s.disabled=!1}}async function d(a){const t={key:"41767472-d86fe691fef3335ff5b770a4f",q:`${a}`,image_type:"photo",orientation:"horizontal",safesearch:!0,page:i.page,per_page:i.per_page},n="https://pixabay.com/api/";return h.get(`${n}`,{params:t}).then(({data:s})=>s)}function u(a){const t=a.map(({webformatURL:n,largeImageURL:s,tags:e,likes:o,views:l,comments:p,downloads:m})=>`
            <li class="gallery-item">
                <a href="${s}" class="gallery-link">
                    <img src="${n}" alt="${e}" data-source="${s}">
                </a>
                
                <ul class="gallery-info-container">
                    <li class="gallery-info">
                        <p class="gallery-info-name">Likes</p>
                        <p class="gallery-info-value">${o}</p>
                    </li>

                    <li class="gallery-info">
                        <p class="gallery-info-name">Views</p>
                        <p class="gallery-info-value">${l}</p>
                    </li>

                    <li class="gallery-info">
                        <p class="gallery-info-name">Comments</p>
                        <p class="gallery-info-value">${p}</p>
                    </li>

                    <li class="gallery-info">
                        <p class="gallery-info-name">Downloads</p>
                        <p class="gallery-info-value">${m}</p>
                    </li>
                </ul>
            </li>
      `).join("");r.gallery.insertAdjacentHTML("beforeend",t)}function f(){L.refresh()}async function g(){i.page+=1,r.loader.classList.add("show"),r.loadMoreBtn.classList.add("is-hidden");try{const{hits:a}=await d(i.query);u(a),f()}catch(a){console.log(a)}finally{i.page===i.maxPage?(c.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"#000",messageSize:"16px",messageLineHeight:"24px",color:"#6C8CFF",position:"topRight",icon:"icon-info",iconColor:"#000"}),r.loadMoreBtn.removeEventListener("click",g)):r.loadMoreBtn.classList.remove("is-hidden"),r.loader.classList.remove("show")}}
//# sourceMappingURL=commonHelpers.js.map
