import OfferContext from "./OfferContext";

import { useEffect, useReducer, useContext } from "react";

/**
 * Getting the parameters from the url
 */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const urlCountry = urlParams.get('country')
const urlReferal = urlParams.get('referal')


//Setting Canada as default country if no country is passed
const country = (urlCountry === null ? 'Canada' : urlCountry.charAt(0).toUpperCase() + urlCountry.slice(1));
const referal = (urlReferal === null ? '' : urlReferal.toLocaleLowerCase());

const URL_COUNTRIES = 'https://restcountries.com/v3.1/all'
const PLANS_JSON = 'plans.json' 

/**
 * Seting up default Offer State
 */
const defaultOfferState = {
    data: [],
    loadedCountries: [],
    isLoaded: false,
    error: null,
    selectedCountry: country,
    selectedCountryCode: undefined,
    selectedValidity: undefined,
    selectedCapacity: undefined,
    referal: referal,
    nbreOffersDisplayed: 3
}


/**
 * Seting up the Reducer
 */
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
                selectedValidity: action.validity
            }

        case 'CHANGE_CAPACITY':
            return {
                ...state,
                selectedCapacity: action.capacity
            }

        case 'CHANGE_NBRE_OFFERS_DISPLAYED':
            return {
                ...state,
                nbreOffersDisplayed: action.nbreOffersDisplayed
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


/**
 * Setting up Provider
 */
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

    const changeNberOfferstoOfferHandler = (nbreOffers) => {
        dispatchOfferAction({
            type: "CHANGE_NBRE_OFFERS_DISPLAYED",
            nbreOffersDisplayed: nbreOffers
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

/**
 * Setting up Context
 */
    const offerContext = {
        data: offerState.data,
        isLoaded: offerState.isLoaded,
        error: offerState.error,
        selectedCountry: offerState.selectedCountry,
        loadedCountries: offerState.loadedCountries,
        selectedCapacity: offerState.selectedCapacity,
        selectedValidity: offerState.selectedValidity,
        nbreOffersDisplayed: offerState.nbreOffersDisplayed,
        referal: offerState.referal,
        changeCountry: changeCountryToOfferHandler,
        changeValidity: changeValiditytoOfferHandler,
        changeCapacity: changeCapacitytoOfferHandler,
        changeNberOffers: changeNberOfferstoOfferHandler
    }


/**
 * Fetching data for the context
 */

    useEffect(() => {
        //Implementing simultaneous fetching

        Promise.all([
            fetch(URL_COUNTRIES),
            fetch(PLANS_JSON)
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