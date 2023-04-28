import OfferContext from "./OfferContext";

import { useState, useEffect, useReducer } from "react";

const defaultOfferState = {
    data: [],
    isLoaded: false,
    error: null,
    selectedCountry: 'Canada',
}

const offerReducer = (state, action) => {
    if (action.type === 'CHANGE'){
        console.log(action)
        // const updatedSelectedCOuntry = action.country

        return {
            ...state,
            selectedCountry: action.country
        }
    }

    if (action.type === "INIT"){
        console.log(action)
    }

    return state
}

const OfferProvider = (props) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)
    const [offerState, dispatchOfferAction] = useReducer(
        offerReducer,
        defaultOfferState
    )

    const [offer, setOffer] = useState("Canada")

    const changeCountryToOfferHandler = (country) => {
        dispatchOfferAction({
            type: "CHANGE",
            country: country
        })
    }

    const initiateDataHandler = (data, loadedCountries, isLoaded) => {
        dispatchOfferAction({
            type: "INIT",
            data: data,
            loadedCountries: loadedCountries,
            isLoaded: isLoaded
        })
    }

    const offerContext = {
        data: offerState.data,
        isLoaded: offerState.isLoaded,
        error: offerState.error,
        selectedCountry: offerState.selectedCountry,
        changeCountry: changeCountryToOfferHandler
    }

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error while fetching the data');
                }
            })
            .then((dataJSON) => {
                setIsLoaded(true)

                const loadedCountries = [];

                for (const key in dataJSON) {
                    loadedCountries.push({
                        id: key,
                        name: dataJSON[key].name.common,
                        code: dataJSON[key].cca3
                    })
                }

                loadedCountries.sort((a, b) => {
                    return a.name.localeCompare(b.name)
                })
                initiateDataHandler(dataJSON, loadedCountries, true)
            })
            .catch((error) => {
                setIsLoaded(true)
                setError(error);
                // console.log(response.body);
            });
    }, [])

    return (
        <OfferContext.Provider value={offerContext}>
            {props.children}

        </OfferContext.Provider>
    )
}

export default OfferProvider