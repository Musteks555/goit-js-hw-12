import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';

const refs = {
  gallery: document.querySelector('.gallery-container'),
  form: document.querySelector('.form'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.btn-load-more'),
};

const queryParams = {
  query: '',
  page: 1,
  maxPage: 0,
  per_page: 40,
};

const lightbox = new SimpleLightbox('.gallery-link', {
  captions: true,
  captionSelector: 'img',
  captionDelay: 250,
  captionPosition: 'bottom',
  captionsData: 'alt',
});

refs.form.addEventListener('submit', imageSearch);
refs.loadMoreBtn.addEventListener('click', loadMore);

async function imageSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;

  const input = form.elements.query;
  const searchBtn = form.elements.searchBtn;

  refs.gallery.innerHTML = '';
  refs.loader.classList.add('show');
  searchBtn.disabled = true;
  refs.query = input.value.trim();
  refs.loadMoreBtn.classList.add('is-hidden');

  const toast = document.querySelector('.iziToast');
  if (toast) {
    iziToast.hide(
      {
        transitionOut: 'fadeOutUp',
      },
      toast
    );
  }

  if (!refs.query) {
    return;
  }

  try {
    const { hits, totalHits } = await fetchImages(refs.query);

    queryParams.maxPage = Math.ceil(totalHits / queryParams.per_page);

    renderImages(hits);
    updateModal();

    if (hits.length && hits.length !== totalHits) {
      refs.loadMoreBtn.classList.remove('is-hidden');
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
    refs.loader.classList.remove('show');

    form.reset();

    searchBtn.disabled = false;

    queryParams.page = 1;
  }
}

async function fetchImages(searchWord) {
  const params = {
    key: '41767472-d86fe691fef3335ff5b770a4f',
    q: `${searchWord}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: queryParams.page,
    per_page: queryParams.per_page,
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

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function updateModal() {
  lightbox.refresh();
}

async function loadMore() {
  queryParams.page += 1;

  refs.loader.classList.add('show');
  refs.loadMoreBtn.classList.add('is-hidden');

  try {
    const { hits } = await fetchImages(queryParams.query);

    renderImages(hits);
    updateModal();
  } catch (error) {
    console.log(error);
  } finally {
    refs.loader.classList.remove('show');
  }

  if (queryParams.page === queryParams.maxPage) {
    iziToast.show({
      message: `We're sorry, but you've reached the end of search results.`,
      messageColor: '#000',
      messageSize: '16px',
      messageLineHeight: '24px',
      color: '#6C8CFF',
      position: 'topRight',
      icon: 'icon-info',
      iconColor: '#000',
    });
  } else {
    refs.loadMoreBtn.classList.remove('is-hidden');

    const cardHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
