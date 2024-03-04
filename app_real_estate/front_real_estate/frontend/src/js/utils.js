
export function jsonToData(data) {
    return JSON.parse(data);
};
 
export function setStorageData(listName, data) {
    return localStorage.setItem(listName, JSON.stringify(data));
};

export function deleteStorageData (dataId, key) {
    let storage = jsonToData(localStorage[key]);
    storage.forEach(function(elem, index) {
        if (elem.id == dataId) {
            storage.splice(index, 1);
        };
    });
setStorageData(key, storage)
};