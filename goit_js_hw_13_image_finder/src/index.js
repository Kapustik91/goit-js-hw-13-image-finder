import './styles.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, error } from '@pnotify/core';

import ImagesFinderApiService from './apiService';
import photoCard from './templates/photoCard.hbs';
import LoadMoreBtn from './load-more-btn';

const refs = {
    searchForm: document.querySelector('.js-search-form'),
    articlesContainer: document.querySelector('.js-gallery'),
    // loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});
const imagesFinderApiService = new ImagesFinderApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();



    clearArticlesContainer();
    imagesFinderApiService.query = e.currentTarget.elements.query.value;

    if (imagesFinderApiService.query === '') {
        alert('Please enter what you are looking for');
        error({
            text: "Sorry, I can't find it:( Try again!",
             delay: 3000

        })
    }
    
    loadMoreBtn.show();
    imagesFinderApiService.resetPage();
    imagesFinderApiService.fetchImages()
        .then(appendArticlesMarkup);
}

function onLoadMore() {
    loadMoreBtn.disable();
    imagesFinderApiService.fetchImages()
        .then(appendArticlesMarkup);
        
    loadMoreBtn.enable();
    
    setTimeout(function () {
        window.scrollTo(0, 1000)
        window.scrollTo({
      top: 1000,
            behavior: 'smooth',
    })
        },0);

}

function appendArticlesMarkup(articles) {
    refs.articlesContainer.insertAdjacentHTML('beforeend', photoCard(articles));
}

function clearArticlesContainer() {
    refs.articlesContainer.innerHTML = '';
}