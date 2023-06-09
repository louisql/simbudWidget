import React from "react";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const urlLanguage = urlParams.get('language')
const languageParentWindow = (urlLanguage === null ? 'fr' : urlLanguage.toLowerCase())

const CurrencyContext = React.createContext({
    data: [],
    isLoaded: false,
    error: null,
    selectedCurrency: '',
    languageParentWindow: languageParentWindow,
    setSelectedCurrency: () => {}
})

export default CurrencyContext;