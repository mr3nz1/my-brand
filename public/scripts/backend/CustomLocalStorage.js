const customLocalStorage = {
    setItem(key, value) {
        localStorage.setItem(key, value);
        const event = new CustomEvent("pageChange", {
            detail: { key, newValue: value },
        });
        window.dispatchEvent(event);
    },
    getItem(key) {
        return localStorage.getItem(key);
    },
    removeItem(key) {
        localStorage.removeItem(key);
    },
};
export default customLocalStorage;
