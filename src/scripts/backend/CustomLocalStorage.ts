const customLocalStorage = {
    setItem(key: string, value: string): void {
      localStorage.setItem(key, value);
  
      const event = new CustomEvent("pageChange", {
        detail: { key, newValue: value },
      });
      window.dispatchEvent(event);
    },
    getItem(key: string): string | null {
      return localStorage.getItem(key);
    },
    removeItem(key: string): void {
      localStorage.removeItem(key);
    },
  };
  
  export default customLocalStorage;
  