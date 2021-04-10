# Simple Floating Pages
Hold your pages in place while scrolling, when the next page is up, transition to it. This simple example will always hold one page in the center of the viewport, like a powerpoint presentation.

Credit me if you fork/use it.

## Api
valid directions (as attribute):

- `p-down`
- `p-up`
- `p-left`
- `p-right`
```html
<div class="pages" p-down>
    <div class="page"></div>
    <div class="page"></div>
</div>
```

```js
const pages = new Pages({
    container: document.querySelector(".pages"),
    scroll: window,
    onPageChange: instance => console.log(instance.index)
});

pages.index // the current page
```

## Tools used
 - Vite.js
 - Vanilla js
 - SASS