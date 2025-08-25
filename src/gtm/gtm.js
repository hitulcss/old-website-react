export const pushToDataLayer = (data) => {
    if (window && window.dataLayer) {
        window.dataLayer.push(data);
    }
};