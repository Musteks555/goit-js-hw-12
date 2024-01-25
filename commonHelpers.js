import{S as m,i as c,a as y}from"./assets/vendor-e6ae6a6a.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const t={gallery:document.querySelector(".gallery-container"),form:document.querySelector(".form"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".btn-load-more")},l={query:"",page:1,maxPage:0,per_page:40},h=new m(".gallery-link",{captions:!0,captionSelector:"img",captionDelay:250,captionPosition:"bottom",captionsData:"alt"});t.form.addEventListener("submit",L);t.loadMoreBtn.addEventListener("click",B);async function L(r){r.preventDefault();const a=r.currentTarget,i=a.elements.query,s=a.elements.searchBtn;t.gallery.innerHTML="",t.loader.classList.add("show"),s.disabled=!0,t.query=i.value.trim(),t.loadMoreBtn.classList.add("is-hidden");const e=document.querySelector(".iziToast");if(e&&c.hide({transitionOut:"fadeOutUp"},e),!!t.query)try{const{hits:o,totalHits:n}=await d(t.query);l.maxPage=Math.ceil(n/l.per_page),u(o),g(),o.length&&o.length!==n?t.loadMoreBtn.classList.remove("is-hidden"):o.length||c.show({message:"Sorry, there are no images matching your search query. Please, try again!",messageColor:"#FAFAFB",messageSize:"16px",messageLineHeight:"24px",color:"#EF4040",progressBarColor:"#B51B1B",position:"topRight",icon:"icon-cancel",iconColor:"#FAFAFB"})}catch(o){console.log(o)}finally{t.loader.classList.remove("show"),a.reset(),s.disabled=!1,l.page=1}}async function d(r){const a={key:"41767472-d86fe691fef3335ff5b770a4f",q:`${r}`,image_type:"photo",orientation:"horizontal",safesearch:!0,page:l.page,per_page:l.per_page},i="https://pixabay.com/api/";return y.get(`${i}`,{params:a}).then(({data:s})=>s)}function u(r){const a=r.map(({webformatURL:i,largeImageURL:s,tags:e,likes:o,views:n,comments:f,downloads:p})=>`
            <li class="gallery-item">
                <a href="${s}" class="gallery-link">
                    <img src="${i}" alt="${e}" data-source="${s}">
                </a>
                
                <ul class="gallery-info-container">
                    <li class="gallery-info">
                        <p class="gallery-info-name">Likes</p>
                        <p class="gallery-info-value">${o}</p>
                    </li>

                    <li class="gallery-info">
                        <p class="gallery-info-name">Views</p>
                        <p class="gallery-info-value">${n}</p>
                    </li>

                    <li class="gallery-info">
                        <p class="gallery-info-name">Comments</p>
                        <p class="gallery-info-value">${f}</p>
                    </li>

                    <li class="gallery-info">
                        <p class="gallery-info-name">Downloads</p>
                        <p class="gallery-info-value">${p}</p>
                    </li>
                </ul>
            </li>
      `).join("");t.gallery.insertAdjacentHTML("beforeend",a)}function g(){h.refresh()}async function B(){l.page+=1,t.loader.classList.add("show"),t.loadMoreBtn.classList.add("is-hidden");try{const{hits:r}=await d(l.query);u(r),g()}catch(r){console.log(r)}finally{t.loader.classList.remove("show")}if(l.page===l.maxPage)c.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"#000",messageSize:"16px",messageLineHeight:"24px",color:"#6C8CFF",position:"topRight",icon:"icon-info",iconColor:"#000"});else{t.loadMoreBtn.classList.remove("is-hidden");const r=document.querySelector(".gallery-item").getBoundingClientRect().height,a=t.loadMoreBtn.getBoundingClientRect().y;console.log(r),console.log(a),window.scrollTo({top:a+r*2,behavior:"smooth"})}}
//# sourceMappingURL=commonHelpers.js.map
