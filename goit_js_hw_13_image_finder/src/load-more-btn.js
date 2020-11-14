export default class LoadMoreBtn {
    constructor({ selector, hidden = false }) {
        this.refs = this.getRefs(selector);

        hidden && this.hide();
    }

    getRefs(selector) {
        const refs = {};
        refs.button = document.querySelector(selector);
        refs.searching = document.querySelector('.searching');

        return refs;
    }

    enable() {
        this.refs.button.disable = false;
        this.refs.searching.textContent = 'Show more';
    }

    disable() {
        this.refs.button.disable = true;
        this.refs.searching.textContent = 'Wait wait...';
    }

    show() {
        this.refs.button.classList.remove('is-hidden');
    }

    hide() {
        this.refs.button.classList.add('is-hidden');
    }
}