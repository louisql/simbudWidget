import OfferContext from "./OfferContext";

import { useEffect, useReducer } from "react";

const defaultOfferState = {
    data: [],
    loadedCountries: [],
    isLoaded: false,
    error: null,
    selectedCountry: 'Canada',
    validity: "7 days",
    selectedCapacity: "1 GB"
}

const offerReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_COUNTRY':
            return {
                ...state,
                selectedCountry: action.country
            }

        case 'CHANGE_VALIDITY':
            return { 
                ...state,
                validity: action.validity
            }

        case 'CHANGE_CAPACITY':
            console.log(action.capacity)
            return { 
                ...state,
                selectedCapacity: action.capacity
            }

        case 'INIT':
            return {
                ...state,
                data: action.data,
                loadedCountries: action.loadedCountries,
                isLoaded: action.isLoaded
            }

        case 'ERROR':
            return {
                ...state,
                error: action.error,
                isLoaded: action.isLoaded
            }

        default:
            return state
    }
}

const OfferProvider = (props) => {
    const [offerState, dispatchOfferAction] = useReducer(
        offerReducer,
        defaultOfferState
    )


    const changeCountryToOfferHandler = (country) => {
        dispatchOfferAction({
            type: "CHANGE_COUNTRY",
            country: country
        })
    }

    const changeValiditytoOfferHandler = (validity) => {
        dispatchOfferAction({
            type: "CHANGE_VALIDITY",
            validity: validity
        })
    }
    
    const changeCapacitytoOfferHandler = (capacity) => {
        dispatchOfferAction({
            type: "CHANGE_CAPACITY",
            capacity: capacity
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

    const setErrorHandler = (isLoaded, error) => {
        dispatchOfferAction({
            type: "ERROR",
            isLoaded: isLoaded,
            error: error
        })
    }

    const offerContext = {
        data: offerState.data,
        isLoaded: offerState.isLoaded,
        error: offerState.error,
        selectedCountry: offerState.selectedCountry,
        loadedCountries: offerState.loadedCountries,
        selectedCapacity: offerState.selectedCapacity,
        changeCountry: changeCountryToOfferHandler,
        changeValidity: changeValiditytoOfferHandler,
        changeCapacity: changeCapacitytoOfferHandler
    }

    useEffect(() => {
        //Implementing simultaneous fetching

        Promise.all([
            fetch('https://restcountries.com/v3.1/all'),
            fetch('offers.json')
        ]).then((responses) => {
            // Get a JSON object from each of the responses
            return Promise.all(responses.map((response) => {
                return response.json();
            }));
        }).then((dataJSON) => {
            const loadedCountries = [];

            for (const key in dataJSON[0]) {
                loadedCountries.push({
                    id: key,
                    name: dataJSON[0][key].name.common,
                    code: dataJSON[0][key].cca3
                })
            }

            loadedCountries.sort((a, b) => {
                return a.name.localeCompare(b.name)
            })

            initiateDataHandler(dataJSON[1], loadedCountries, true)


        }).catch((error) => {
            setErrorHandler(true, error);
        });

    }, [])

    return (
        <OfferContext.Provider value={offerContext}>
            {props.children}

        </OfferContext.Provider>
    )
}

export default OfferProvider