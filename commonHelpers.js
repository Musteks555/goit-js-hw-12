import{S as y,i as c,a as h}from"./assets/vendor-e6ae6a6a.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const t={gallery:document.querySelector(".gallery-container"),form:document.querySelector(".form"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".btn-load-more")},l={query:"",page:1,maxPage:0,per_page:40},L=new y(".gallery-link",{captions:!0,captionSelector:"img",captionDelay:250,captionPosition:"bottom",captionsData:"alt"});t.form.addEventListener("submit",v);async function v(a){a.preventDefault();const r=a.currentTarget,n=r.elements.query,s=r.elements.searchBtn;t.gallery.innerHTML="",t.loader.classList.add("show"),s.disabled=!0,t.query=n.value.trim(),t.loadMoreBtn.classList.add("is-hidden");const e=document.querySelector(".iziToast");if(e&&c.hide({transitionOut:"fadeOutUp"},e),!!t.query)try{const{hits:o,totalHits:i}=await d(t.query);l.maxPage=Math.ceil(i/l.per_page),u(o),g(),o.length&&o.length!==i?(t.loadMoreBtn.classList.remove("is-hidden"),t.loadMoreBtn.addEventListener("click",f)):o.length||c.show({message:"Sorry, there are no images matching your search query. Please, try again!",messageColor:"#FAFAFB",messageSize:"16px",messageLineHeight:"24px",color:"#EF4040",progressBarColor:"#B51B1B",position:"topRight",icon:"icon-cancel",iconColor:"#FAFAFB"})}catch(o){console.log(o)}finally{t.loader.classList.remove("show"),r.reset(),s.disabled=!1,l.page=1}}async function d(a){const r={key:"41767472-d86fe691fef3335ff5b770a4f",q:`${a}`,image_type:"photo",orientation:"horizontal",safesearch:!0,page:l.page,per_page:l.per_page},n="https://pixabay.com/api/";return h.get(`${n}`,{params:r}).then(({data:s})=>s)}function u(a){const r=a.map(({webformatURL:n,largeImageURL:s,tags:e,likes:o,views:i,comments:p,downloads:m})=>`
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
                        <p class="gallery-info-value">${i}</p>
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
      `).join("");t.gallery.insertAdjacentHTML("beforeend",r)}function g(){L.refresh()}async function f(){l.page+=1,t.loader.classList.add("show"),t.loadMoreBtn.classList.add("is-hidden");try{const{hits:a}=await d(l.query);u(a),g();const r=document.querySelectorAll(".gallery-item:last-child")[0].getBoundingClientRect();window.scrollTo({top:r.y+r.height*2,behavior:"smooth"})}catch(a){console.log(a)}finally{l.page===l.maxPage?(c.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"#000",messageSize:"16px",messageLineHeight:"24px",color:"#6C8CFF",position:"topRight",icon:"icon-info",iconColor:"#000"}),t.loadMoreBtn.removeEventListener("click",f)):t.loadMoreBtn.classList.remove("is-hidden"),t.loader.classList.remove("show")}}
//# sourceMappingURL=commonHelpers.js.map
