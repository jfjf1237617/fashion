function debounce(method, debounceTime=200,context) {
    clearTimeout(method.tId);
    method.tId = setTimeout(() => {
        method.call(context);
    }, debounceTime)
}
export default debounce;
