import CurrencyContext from "./CurrencyContext";

import { useEffect, useReducer } from "react";

const defaultCurrencyState = {
    data: [],
    isLoaded: false,
    error: null,
    selectedCurrency: '',
    setSelectedCurrency: () => {}
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
                data: action.data,
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

const currencyProvider = (props) => {
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

    const initiateDataHandler = (data, isLoaded) => {
        dispatchCurrencyAction({
            type: "INIT",
            data: data,
            isLoaded: isLoaded
        })
    }

    const setAppHeight
}