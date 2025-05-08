export const setLocalStorage = <T>(key: string, value?: T): boolean => {
	try {
		if (value === undefined) {
			window.localStorage.removeItem(key);
		} else {
			window.localStorage.setItem(key, JSON.stringify(value));
		}
		return true;
	} catch {
		return false;
	}
};

export const getLocalStorage = <T>(key: string, defaultValue?: T) => {
	try {
		const storedValue = window.localStorage.getItem(key);
		if (storedValue) {
			return JSON.parse(storedValue) as T;
		}
		setLocalStorage(key, defaultValue);
		return defaultValue;
	} catch {
		return defaultValue;
	}
};

export const clearLocalStorage = () => {
	try {
		window.localStorage.clear();
	} catch (error) {
		console.error('Error clearing local storage:', error);
	}
};
