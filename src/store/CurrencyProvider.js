import CurrencyContext from "./CurrencyContext";

import { useEffect, useReducer } from "react";
const defaultCurrencyState = {
    isLoaded: false,
    error: null,
    loadedCurrencies: [],
    conversionRates: {},
    selectedCurrency: 'USD',
    currentConversionRate: 1,
    setSelectedCurrency: () => { }
}

const currencyReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_CURRENCY':
            console.log(state.conversionRates)
            return {
                ...state,
                selectedCurrency: action.currency,
                currentConversionRate: state.conversionRates[action.currency]
            }

        case 'INIT':
            return {
                ...state,
                isLoaded: action.isLoaded,
                loadedCurrencies: action.loadedCurrencies,
                conversionRates: action.conversionRates
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

const CurrencyProvider = (props) => {
    const [currencyState, dispatchCurrencyAction] = useReducer(
        currencyReducer,
        defaultCurrencyState
    )

    const changeCurrencyToCurrencyHandler = (currency) => {
        dispatchCurrencyAction({
            type: "CHANGE_CURRENCY",
            currency: currency,
        })
    }

    const initiateDataHandler = (loadedCurrencies, conversionRates, isLoaded) => {
        dispatchCurrencyAction({
            type: "INIT",
            loadedCurrencies: loadedCurrencies,
            conversionRates: conversionRates,
            isLoaded: isLoaded
        })
    }

    const setErrorHandler = (isLoaded, error) => {
        dispatchCurrencyAction({
            type: "ERROR",
            isLoaded: isLoaded,
            error: error
        })
    }

    const currencyContext = {
        loadedCurrencies: currencyState.loadedCurrencies,
        selectedCurrency: currencyState.selectedCurrency,
        conversionRates: currencyState.conversionRates,
        currentConversionRate: currencyState.currentConversionRate,
        isLoaded: currencyState.isLoaded,
        error: currencyState,
        changeCurrency: changeCurrencyToCurrencyHandler,
    }


    const APP_ID = "7442e02609d741798356b6a559dfd211"
    const URL_CURRENCIES = "https://openexchangerates.org/api/latest.json?app_id=" + APP_ID
    const CURRENCY_SYMBOL_JSON = "world_currency_symbols.json"

    useEffect(() => {

        Promise.all([
            fetch(URL_CURRENCIES),
            fetch(CURRENCY_SYMBOL_JSON)
        ]).then((responses) => {
            return Promise.all(responses.map((response) => {
                return response.json();
            }));
        }).then((dataJSON) => {
            const loadedCurrencies = [];
            const conversionRates = dataJSON[0].rates
            const currencySymbol = {}


            for (const key in dataJSON[1]) {
                loadedCurrencies[dataJSON[1][key].Code] = {
                    Symbol: dataJSON[1][key].Symbol
                }
            }


            console.log(dataJSON)
            console.log(loadedCurrencies)
            console.log(conversionRates)

            initiateDataHandler(loadedCurrencies, conversionRates)
        }).catch((error) => {
            setErrorHandler(true, error);
        })


        // fetch(CURRENCY_SYMBOL_JSON)
        //     .then((response) => {
        //         return response.json();
        //     }).then((dataJSON) => {
        //         let loadedCurrencies = {};
        //         const conversionRates = dataJSON.conversion_rates

        //         for (const key in dataJSON) {
        //             loadedCurrencies[dataJSON[key].Code] = {
        //                 Symbol: dataJSON[key].Symbol
        //             }
        //         }

        //         console.log(dataJSON)
        //         // console.log(loadedCurrencies)
        //         console.log(conversionRates)

        //         initiateDataHandler(loadedCurrencies, conversionRates, true)
        //     }).catch((error) => {
        //         setErrorHandler(true, error);
        //     });
    }, [])

    return (
        <CurrencyContext.Provider value={currencyContext}>
            {props.children}
        </CurrencyContext.Provider>
    )
}

export default CurrencyProvider;