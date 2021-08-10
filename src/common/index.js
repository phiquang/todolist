export function formatDate(date) {
    const options = { dateStyle: 'long' };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
}

export function getDateNow() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}