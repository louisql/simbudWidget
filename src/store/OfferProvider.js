import OfferContext from "./OfferContext";

import { useEffect, useReducer } from "react";

const defaultOfferState = {
    data: [],
    loadedCountries: [],
    isLoaded: false,
    error: null,
    selectedCountry: 'Canada',
}

const offerReducer = (state, action) => {
    if (action.type === 'CHANGE') {
        console.log(action.country)
        // const updatedSelectedCOuntry = action.country

        return {
            ...state,
            selectedCountry: action.country
        }
    }

    if (action.type === "INIT") {
        // console.log(JSON.stringify(action.data))
        // console.log(JSON.stringify(action.loadedCountries))

        return {
            ...state,
            data: action.data,
            loadedCountries: action.loadedCountries,
            isLoaded: action.isLoaded
        }
    }

    if (action.type === "ERROR") {
        return {
            ...state,
            error: action.error,
            isLoaded: action.isLoaded
        }
    }

    return state
}

const OfferProvider = (props) => {
    const [offerState, dispatchOfferAction] = useReducer(
        offerReducer,
        defaultOfferState
    )


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
        changeCountry: changeCountryToOfferHandler
    }

    useEffect(() => {
        // fetch("https://restcountries.com/v3.1/all")
        //     .then((response) => {
        //         if (response.ok) {
        //             return response.json();
        //         } else {
        //             throw new Error('Error while fetching the data');
        //         }
        //     })
        //     .then((dataJSON) => {
        //         const loadedCountries = [];

        //         //
        //         for (const key in dataJSON) {
        //             loadedCountries.push({
        //                 id: key,
        //                 name: dataJSON[key].name.common,
        //                 code: dataJSON[key].cca3
        //             })
        //         }

        //         loadedCountries.sort((a, b) => {
        //             return a.name.localeCompare(b.name)
        //         })

        //         initiateDataHandler(dataJSON, loadedCountries, true)
        //     })
        //     .catch((error) => {
        //         setErrorHandler(true, error)
        //     });



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
            // Log the data to the console
            // You would do something with both sets of data here

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
            // if there's an error, log it
            console.log(error);
        });

    }, [])

    return (
        <OfferContext.Provider value={offerContext}>
            {props.children}

        </OfferContext.Provider>
    )
}

export default OfferProvider