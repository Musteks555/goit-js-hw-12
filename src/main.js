import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery-container');
const form = document.querySelector('.form');
const input = form.querySelector('.input-search');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery-link', {
  captions: true,
  captionSelector: 'img',
  captionDelay: 250,
  captionPosition: 'bottom',
  captionsData: 'alt',
});

form.addEventListener('submit', imageSearch);

function imageSearch(e) {
  e.preventDefault();

  gallery.innerHTML = '';
  loader.classList.add('show');

  const toast = document.querySelector('.iziToast');
  if (toast) {
    iziToast.hide(
      {
        transitionOut: 'fadeOutUp',
      },
      toast
    );
  }

  const searchWord = input.value;
  input.value = '';

  const searchParams = new URLSearchParams({
    key: '41767472-d86fe691fef3335ff5b770a4f',
    q: `${searchWord}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  const url = `https://pixabay.com/api/?${searchParams}`;

  fetchImages(url)
    .then(images => {
      if (images.hits.length) {
        renderImages(images.hits);

        updateModal();
      } else {
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
    })
    .catch(error => console.log(error))
    .finally(() => loader.classList.remove('show'));
}

function fetchImages(url) {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
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
            <div class="gallery-item">
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
            </div>
      `;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

function updateModal() {
  lightbox.refresh();
}
