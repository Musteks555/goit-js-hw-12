import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';

const gallery = document.querySelector('.gallery-container');
const form = document.querySelector('.form');
const input = form.querySelector('.input-search');
const searchBtn = form.querySelector('.btn-search');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.btn-load-more');

let query = '';
let page = 1;
const per_page = 40;
let maxPage = 0;

const lightbox = new SimpleLightbox('.gallery-link', {
  captions: true,
  captionSelector: 'img',
  captionDelay: 250,
  captionPosition: 'bottom',
  captionsData: 'alt',
});

form.addEventListener('submit', imageSearch);

async function imageSearch(e) {
  e.preventDefault();

  gallery.innerHTML = '';
  loader.classList.add('show');
  searchBtn.disabled = true;
  loadMoreBtn.classList.add('is-hidden');

  const toast = document.querySelector('.iziToast');
  if (toast) {
    iziToast.hide(
      {
        transitionOut: 'fadeOutUp',
      },
      toast
    );
  }

  query = input.value.trim();

  if (!query) {
    return;
  }

  try {
    const { hits, totalHits } = await fetchImages(query);

    maxPage = Math.ceil(totalHits / per_page);

    renderImages(hits);

    if (hits.length && hits.length !== totalHits) {
      updateModal();

      loadMoreBtn.classList.remove('is-hidden');
      loadMoreBtn.addEventListener('click', loadMore);
    } else if (!hits.length) {
      iziToast.show({
        message: `Sorry, there are no images matching your search query. Please, try again!`,
        messageColor: '#FAFAFB',
        messageSize: '16px',
        messageLineHeight: '24px',
        color: '#EF4040',
        progressBarColor: '#B51B1B',
        position: 'topRight',
        icon: 'icon-cancel',
        iconColor: '#FAFAFB',
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    loader.classList.remove('show');

    form.reset();

    searchBtn.disabled = false;
  }
}

async function fetchImages(searchWord) {
  const params = {
    key: '41767472-d86fe691fef3335ff5b770a4f',
    q: `${searchWord}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page,
  };

  const url = `https://pixabay.com/api/`;

  return axios.get(`${url}`, { params }).then(({ data }) => data);
}

function renderImages(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
            <li class="gallery-item">
                <a href="${largeImageURL}" class="gallery-link">
                    <img src="${webformatURL}" alt="${tags}" data-source="${largeImageURL}">
                </a>
                
                <ul class="gallery-info-container">
                    <li class="gallery-info">
                        <p class="gallery-info-name">Likes</p>
                        <p class="gallery-info-value">${likes}</p>
                    </li>

                    <li class="gallery-info">
                        <p class="gallery-info-name">Views</p>
                        <p class="gallery-info-value">${views}</p>
                    </li>

                    <li class="gallery-info">
                        <p class="gallery-info-name">Comments</p>
                        <p class="gallery-info-value">${comments}</p>
                    </li>

                    <li class="gallery-info">
                        <p class="gallery-info-name">Downloads</p>
                        <p class="gallery-info-value">${downloads}</p>
                    </li>
                </ul>
            </li>
      `;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

function updateModal() {
  lightbox.refresh();
}

async function loadMore() {
  page += 1;

  loader.classList.add('show');
  loadMoreBtn.classList.add('is-hidden');

  try {
    const { hits } = await fetchImages(query);

    renderImages(hits);
  } catch (error) {
    console.log(error);
  } finally {
    if (page === maxPage) {
      loadMoreBtn.removeEventListener('click', loadMore);
    } else {
      loadMoreBtn.classList.remove('is-hidden');
    }

    loader.classList.remove('show');
  }
}
