window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementsByClassName('article')[0])
        document.getElementsByClassName('article')[0].addEventListener('click', () => {
            document.getElementsByClassName('color-hidden')[0].classList.remove('color-hidden');;
        });
    document.querySelectorAll('.text-hidden').forEach(el => {
        el.addEventListener('click', () => {
            el.classList.remove('text-hidden');
        });
    });
    document.querySelectorAll('.image-hidden').forEach(el => {
        el.addEventListener('click', () => {
            el.classList.remove('image-hidden');
        });
    });
});

document.addEventListener('keydown', e => {
    if (e.key === 'f')
        location.replace('/word/random/noun');
    if (e.key === 'v')
        location.replace('/word/random/verb');
    if (e.key === 'c')
        location.replace('/word/random/other');
});