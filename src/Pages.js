import "../styles/main.scss";


/**
 * Dummy class for state only
 */
export default class Pages {
    index = 0;

    constructor(config) {

        this.config = config
        newObject(this);
        
        return this;
    }
}


export const newObject = state => {

    const { config } = state;
    const { container } = config;
    state.pages = config.container.querySelectorAll(":scope > *");

    config.container.classList.add("active");
    attachScroll(state);

    

    addPlaceholders(wrapPages(state, container), container);

}

const wrapPages = (state, container) => {

    const { pages } = state;
    const wrapper = document.createElement("div");

    wrapper.classList.add("page-wrapper");

    for (const [i, page] of [...pages].entries()) {
        const clone = page.cloneNode(true);

        clone.style.setProperty("--page", i)
        page.remove();

        wrapper.appendChild(clone);
    }

    container.appendChild(wrapper);
    state.wrapper = wrapper;
    state.pages = wrapper.querySelectorAll(":scope > *");

    return pages;

}

const addPlaceholders = (pages, container) => {

    const placeholder = document.createElement("div");
    placeholder.classList.add("placeholder");

    pages.forEach(() => container.appendChild(placeholder.cloneNode()));
}

const attachScroll = (state) => {

    const { scroll } = state.config;
    scroll.addEventListener("scroll", e => handleScroll(e, state));



}


const handleScroll = (e, state) => {

    const { container } = state.config;
    const { pages } = state;
    const y = e.currentTarget.scrollY;
    const { top } = container.getBoundingClientRect();
    const offset = -top;

    state.index = clamp(0, ~~(offset / window.innerHeight), pages.length - 1);

    reflectState(state);

}

const clamp = (start, val, end) => Math.max(start, Math.min(val, end));

const reflectState = state => {

    const { container } = state.config;
    const { index } = state;

    if (container.style.getPropertyValue("--index") !== index + "") {
        container.style.setProperty("--index", index);
        if (state.config.onPageChange) {
            state.config.onPageChange(state);
        }
    }

}