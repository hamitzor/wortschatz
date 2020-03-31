window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('_id').focus();
    document.getElementById('_id').addEventListener('change', e => {
        document.getElementById('singular').value = e.target.value;
        document.getElementById('plural').value = e.target.value;
    });
});