import React from "react";

const CurrencyContext = React.createContext({
    data: [],
    isLoaded: false,
    error: null,
    selectedCurrency: '',
    setSelectedCurrency: () => {}
})

export default CurrencyContext;