import{S as q,i as d,a as w}from"./assets/vendor-e6ae6a6a.js";(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const m=document.querySelector(".gallery-container"),u=document.querySelector(".form"),$=u.querySelector(".input-search"),p=u.querySelector(".btn-search"),c=document.querySelector(".loader"),a=document.querySelector(".btn-load-more");let n="",f=1;const y=40;let g=0;const B=new q(".gallery-link",{captions:!0,captionSelector:"img",captionDelay:250,captionPosition:"bottom",captionsData:"alt"});u.addEventListener("submit",F);async function F(s){s.preventDefault(),m.innerHTML="",c.classList.add("show"),p.disabled=!0,a.classList.add("is-hidden");const l=document.querySelector(".iziToast");if(l&&d.hide({transitionOut:"fadeOutUp"},l),n=$.value.trim(),!!n)try{const{hits:o,totalHits:r}=await h(n);g=Math.ceil(r/y),L(o),o.length&&o.length!==r?(k(),a.classList.remove("is-hidden"),a.addEventListener("click",v)):o.length||d.show({message:"Sorry, there are no images matching your search query. Please, try again!",messageColor:"#FAFAFB",messageSize:"16px",messageLineHeight:"24px",color:"#EF4040",progressBarColor:"#B51B1B",position:"topRight",icon:"icon-cancel",iconColor:"#FAFAFB"})}catch(o){console.log(o)}finally{c.classList.remove("show"),u.reset(),p.disabled=!1}}async function h(s){const l={key:"41767472-d86fe691fef3335ff5b770a4f",q:`${s}`,image_type:"photo",orientation:"horizontal",safesearch:!0,page:f,per_page:y},o="https://pixabay.com/api/";return w.get(`${o}`,{params:l}).then(({data:r})=>r)}function L(s){const l=s.map(({webformatURL:o,largeImageURL:r,tags:e,likes:t,views:i,comments:b,downloads:S})=>`
            <li class="gallery-item">
                <a href="${r}" class="gallery-link">
                    <img src="${o}" alt="${e}" data-source="${r}">
                </a>
                
                <ul class="gallery-info-container">
                    <li class="gallery-info">
                        <p class="gallery-info-name">Likes</p>
                        <p class="gallery-info-value">${t}</p>
                    </li>

                    <li class="gallery-info">
                        <p class="gallery-info-name">Views</p>
                        <p class="gallery-info-value">${i}</p>
                    </li>

                    <li class="gallery-info">
                        <p class="gallery-info-name">Comments</p>
                        <p class="gallery-info-value">${b}</p>
                    </li>

                    <li class="gallery-info">
                        <p class="gallery-info-name">Downloads</p>
                        <p class="gallery-info-value">${S}</p>
                    </li>
                </ul>
            </li>
      `).join("");m.insertAdjacentHTML("beforeend",l)}function k(){B.refresh()}async function v(){f+=1,c.classList.add("show"),a.classList.add("is-hidden");try{const{hits:s}=await h(n);L(s)}catch(s){console.log(s)}finally{f===g?a.removeEventListener("click",v):a.classList.remove("is-hidden"),c.classList.remove("show")}}
//# sourceMappingURL=commonHelpers.js.map
