window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('_id').focus();
    document.getElementById('_id').addEventListener('change', e => {
        document.getElementById('praesens').value = e.target.value;
    });
});