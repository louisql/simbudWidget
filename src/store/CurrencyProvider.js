import CurrencyContext from "./CurrencyContext";

import { useEffect, useReducer } from "react";
const defaultCurrencyState = {
    isLoaded: false,
    error: null,
    selectedCurrency: '',
    loadedCurrencies: [],
    selectedCurrency: 'USD',
    setSelectedCurrency: () => { }
}

const currencyReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_CURRENCY':
            return {
                ...state,
                selectedCurrency: action.currency
            }

        case 'INIT':
            return {
                ...state,
                isLoaded: action.isLoaded,
                loadedCurrencies: action.loadedCurrencies,
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
            currency: currency
        })
    }

    const initiateDataHandler = (loadedCurrencies, isLoaded) => {
        dispatchCurrencyAction({
            type: "INIT",
            loadedCurrencies: loadedCurrencies,
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
        isLoaded: currencyState.isLoaded,
        error: currencyState,
        changeCurrency: changeCurrencyToCurrencyHandler,
    }




    useEffect(() => {

        fetch('https://v6.exchangerate-api.com/v6/828f80c7ea1d5bf55ef4c1aa/latest/' + currencyState.selectedCurrency)
            .then((response) => {
                return response.json();
            }).then((dataJSON) => {
                const loadedCurrencies = [];

                for (const key in dataJSON.conversion_rates) {
                    loadedCurrencies.push(key)
                }
                initiateDataHandler(loadedCurrencies, true)
            }).catch((error) => {
                setErrorHandler(true, error);
            });
    }, [])

    return (
        <CurrencyContext.Provider value={currencyContext}>
            {props.children}
        </CurrencyContext.Provider>
    )
}

export default CurrencyProvider;