import{S as d,i as n}from"./assets/vendor-46aac873.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function l(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=l(e);fetch(e.href,o)}})();const u=document.querySelector(".gallery-container"),f=document.querySelector(".form"),i=f.querySelector(".input-search"),c=document.querySelector(".loader"),g=new d(".gallery-link",{captions:!0,captionSelector:"img",captionDelay:250,captionPosition:"bottom",captionsData:"alt"});f.addEventListener("submit",y);function y(r){r.preventDefault(),u.innerHTML="",c.classList.add("show");const t=document.querySelector(".iziToast");t&&n.hide({transitionOut:"fadeOutUp"},t);const l=i.value;i.value="";const e=`https://pixabay.com/api/?${new URLSearchParams({key:"41767472-d86fe691fef3335ff5b770a4f",q:`${l}`,image_type:"photo",orientation:"horizontal",safesearch:!0})}`;h(e).then(o=>{o.hits.length?(v(o.hits),L()):n.show({message:"Sorry, there are no images matching your search query. Please, try again!",messageColor:"#FAFAFB",messageSize:"16px",messageLineHeight:"24px",color:"#EF4040",progressBarColor:"#B51B1B",position:"topRight",icon:"icon-cancel",iconColor:"#FAFAFB"})}).catch(o=>console.log(o)).finally(()=>c.classList.remove("show"))}function h(r){return fetch(r).then(t=>{if(!t.ok)throw new Error(t.status);return t.json()})}function v(r){const t=r.map(({webformatURL:l,largeImageURL:a,tags:e,likes:o,views:s,comments:p,downloads:m})=>`
            <div class="gallery-item">
                <a href="${a}" class="gallery-link">
                    <img src="${l}" alt="${e}" data-source="${a}">
                </a>
                
                <ul class="gallery-info-container">
                    <li class="gallery-info">
                        <p class="gallery-info-name">Likes</p>
                        <p class="gallery-info-value">${o}</p>
                    </li>

                    <li class="gallery-info">
                        <p class="gallery-info-name">Views</p>
                        <p class="gallery-info-value">${s}</p>
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
            </div>
      `).join("");u.insertAdjacentHTML("beforeend",t)}function L(){g.refresh()}
//# sourceMappingURL=commonHelpers.js.map
