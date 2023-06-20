import OfferContext from "./OfferContext";

import { useEffect, useReducer} from "react";

/**
 * Getting the parameters from the url
 */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const urlCountry = urlParams.get('country')
const urlReferal = urlParams.get('referal')
const urlNberOffer = urlParams.get('nberOffer')


// console.log(urlCountry)

//Setting Canada as default country if no country is passed
const country = (urlCountry === null ? 'USA' : urlCountry.toUpperCase());
const referal = (urlReferal === null ? '' : urlReferal.toLowerCase());
const nberOffer = (urlNberOffer === null ? 6 : Number(urlNberOffer));

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
    selectedCountryName: undefined,
    selectedValidity: undefined,
    selectedCapacity: undefined,
    referal: referal,
    nbreOffersDisplayed: nberOffer
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
            if (state.nbreOffersDisplayed >= 18 && action.nbreOffersDisplayed !== 3) return state;
            else return {
                ...state,
                nbreOffersDisplayed: action.nbreOffersDisplayed
            }

        case 'INIT':
            return {
                ...state,
                data: action.data,
                loadedCountries: action.loadedCountries,
                selectedCountryName: action.selectedCountryName,
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
            country: country,
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

    const initiateDataHandler = (data, loadedCountries, selectedCountryName, isLoaded) => {
        dispatchOfferAction({
            type: "INIT",
            data: data,
            loadedCountries: loadedCountries,
            selectedCountryName: selectedCountryName,
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
        selectedCountryName: offerState.selectedCountryName,
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
                    nameFrench: dataJSON[0][key].translations.fra,
                    code: dataJSON[0][key].cca3
                })
            }

            loadedCountries.sort((a, b) => {
                return a.name.localeCompare(b.name)
            })

            let selectedCountryName = loadedCountries.find(item => item.code === country.toUpperCase())

            let selectedCountryNameFrench ={
                labelFrench: selectedCountryName.nameFrench.common,
                labelEnglish: selectedCountryName.name,
                value: selectedCountryName.code
            }

            initiateDataHandler(dataJSON[1], loadedCountries, selectedCountryNameFrench, true)

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