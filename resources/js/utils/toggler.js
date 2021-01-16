
/**
 * Init the togglers
 * 
 * @function
 * @param {HTMLElement} container
 */
export default function initTogglers(container) {
    let Togglers = container.querySelectorAll('[data-toggle]')
    console.log(Togglers);
    Togglers.forEach(toggler => {
        console.log(toggler.dataset.toggle);
        console.log(toggler);
        toggler.addEventListener('click', function (event) {
            let toggles = container.querySelectorAll('[data-toggled=' + toggler.dataset.toggle +']')
            let toggleClass = toggler.dataset.toggleClass ? toggler.dataset.toggleClas.s : 'hidden';
            toggles.forEach(node => node.classList.toggle(toggleClass));
        })
    })
}