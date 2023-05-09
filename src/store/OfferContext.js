import React from "react";

const OfferContext = React.createContext({
    data: [],
    isLoaded: false,
    error: null,
    selectedCountry: '',
    setSelectedCountry: () => {}
})

export default OfferContext;