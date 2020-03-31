window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('_id').addEventListener('change', e => {
        document.getElementById('word').value = e.target.value;
    });
});