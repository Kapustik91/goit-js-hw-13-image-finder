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
    currentHeight: document.documentElement.clientHeight
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

    imagesFinderApiService.query = e.currentTarget.elements.query.value;


    if (imagesFinderApiService.query === '') {
        clearArticlesContainer();
        loadMoreBtn.hide();
        alert({
            text: 'Please enter what you are looking for',
            delay: 2000
        });
        return
    };
    imagesFinderApiService.resetPage();
    clearArticlesContainer();
    imagesFinderApiService.fetchImages()
        .then(appendArticlesMarkup);
     loadMoreBtn.show();

}

function onLoadMore() {
    loadMoreBtn.show();
    loadMoreBtn.disable();
    imagesFinderApiService.fetchImages()
        .then(appendArticlesMarkup);
    window.scrollTo(0, refs.currentHeight + pageYOffset - 800);
    loadMoreBtn.enable();
    onErrorSearch(images);
}

function appendArticlesMarkup(articles) {
    refs.articlesContainer.insertAdjacentHTML('beforeend', photoCard(articles));
}

function clearArticlesContainer() {
    refs.articlesContainer.innerHTML = '';
}

function onErrorSearch(images) {
    const numberOfImages = images.hits.length;
    if (numberOfImages === 0) {
        loadMoreBtn.hide();
        error({
            text: 'I can not find it:( Try again!',
            delay: 2000
        });
    
    }
}
