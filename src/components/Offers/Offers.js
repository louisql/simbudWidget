import React from 'react'
import { useContext, useEffect, useState, useMemo } from 'react';
import { useTranslation } from "react-i18next";

import Card from '../UI/Card';
import SeeMoreOffers from '../SeeMoreOffers/SeeMoreOffers'
import classes from "./Offers.module.css";

import OfferContext from '../../store/OfferContext';

import CurrencySelector from '../CurrencySelector/CurrencySelector';
import CurrencyContext from '../../store/CurrencyContext';

const Offers = (props) => {

    const offerCtx = useContext(OfferContext)
    const currencyCtx = useContext(CurrencyContext)

    // const {t, i18n} = useTranslation('common');

    const selectedCountry = offerCtx.selectedCountry
    const nbreOffersDisplayed = offerCtx.nbreOffersDisplayed
    const currentConversionRate = currencyCtx.currentConversionRate
    const selectedCurrency = currencyCtx.selectedCurrency
    const currencies = currencyCtx.loadedCurrencies
    const languageParentWindow = currencyCtx.languageParentWindow


    let location;
    let offersList
    let buttonIsActive = true
    let resetText
    let countryHasOffer
    let filteredList

    // Getting the country name based on the country code
    // console.log(location)
    // console.log(offerCtx.loadedCountries)


    const allCountries = offerCtx.loadedCountries

    const selectedCountryName = allCountries.find(country => country.code === selectedCountry)

    const compareByPrice = (a, b) => a.USDPrice - b.USDPrice

    //Sorting data so they appear by ascending price
    const sortedData = offerCtx.data.sort(compareByPrice)
    const convertToGB = (capacity) => {
        const numericValue = parseFloat(capacity);
        if (capacity !== undefined && capacity !== null) {
            let unit
            if (typeof (capacity) === 'object') unit = capacity.value.match(/[a-zA-Z]+/)[0].toLowerCase();
            else unit = capacity.match(/[a-zA-Z]+/)[0].toLowerCase();

            if (unit === 'gb') {
                return numericValue;
            } else if (unit === 'mb') {
                return numericValue / 1000;
            }

        }
        return capacity;
    }

    //Removing elements with similar id 
    const uniqueData = sortedData.filter((offer, index, self) => {
        return index === self.findIndex((o) => o.id === offer.id);
    });

    if (offerCtx.isLoaded && selectedCountryName) {
        let selectedCountryFrenchName = selectedCountryName.nameFrench.common
        let selectedCountryEnglishName = selectedCountryName.name
        // console.log(selectedCountryName)

        if (languageParentWindow === 'fr') {
            location = selectedCountryFrenchName
            resetText = "Réinitialiser capacité et durée"
        } else if (languageParentWindow === 'en') {
            location = selectedCountryEnglishName
            resetText = "Reset capacity and duration"
        }

        // console.log(selectedCountry)
        // Checking if the country has offer to display reset button for country with offers
        countryHasOffer = uniqueData.some(element => element.country.includes(selectedCountryEnglishName.toLowerCase()))

        filteredList = uniqueData.filter(offer => {
            const capacity = convertToGB(offer.capacity);
            // console.log(offer.country)
            // Next line reformat country by removing Capitalized letters, replacing hyphen by space and check if there's a match
            const countryMatch = offer.country.toLowerCase().replace(/-/g, ' ').includes(selectedCountryEnglishName.toLowerCase())
            const capacityMatch = capacity >= convertToGB(offerCtx.selectedCapacity) || !offerCtx.selectedCapacity;
            const validityMatch = parseFloat(offer.validity) >= parseFloat(offerCtx.selectedValidity) || !offerCtx.selectedValidity

            return countryMatch && capacityMatch && validityMatch
        });

        // console.log(uniqueData)
        // console.log(filteredList)

        // Deactivating the display more button if no more offers to display
        if (filteredList.length < nbreOffersDisplayed || nbreOffersDisplayed === 12) {
            buttonIsActive = false
        }
    }




    // Checking language to use French names for countries in Card if required
    // if (languageParentWindow === 'fr') {
    //     const allCountries = offerCtx.loadedCountries
    //     const selectedCountryObj = allCountries.find(country => country.nameFrench && country.name === selectedCountry);
    //     // console.log(selectedCountryObj)
    //     const selectedCountryFrench = selectedCountryObj?.nameFrench.common;
    //     location = selectedCountryFrench

    //     resetText = "Réinitialiser capacité et durée"
    // }


    // const {t, i18n} = useTranslation('common');


    const resetField = () => {
        offerCtx.changeCapacity(null);
        offerCtx.changeValidity(null);
        offerCtx.changeCountry(offerCtx.selectedCountry)
    }

    const seeMoreOffers = () => {
        offerCtx.changeNberOffers(nbreOffersDisplayed + 3)
    }

    if (offerCtx.isLoaded && filteredList) {
        if (filteredList.length > 0) {
            //Limiting display to 3 offers
            offersList = filteredList.slice(0, nbreOffersDisplayed).map((offer) => {
                let trimmedPlanName = offer.planName + " "
                trimmedPlanName = trimmedPlanName.substring(0, 22)
                trimmedPlanName = trimmedPlanName.substring(0, Math.min(trimmedPlanName.length, trimmedPlanName.lastIndexOf(" ")))

                let capacityConverted
                if (languageParentWindow === 'en') {
                    capacityConverted = offer.capacity
                } else {
                    capacityConverted = offer.capacity.replace(/GB/g, "Go").replace(/MB/g, "Mo")
                }


                return (
                    <Card
                        id={offer.id}
                        key={offer.id}
                        logo={offer.logo}
                        provider={offer.provider}
                        capacity={capacityConverted}
                        planName={trimmedPlanName}
                        location={location}
                        // Rounding the price to 2 digits & applying conversion rate 
                        price={(Math.round(offer.USDPrice * currentConversionRate * 100) / 100).toFixed(2)}
                        validity={offer.validity}
                        referal={offerCtx.referal}
                        url={offer.url}
                        backupUrl={offer.backupUrl}
                        currencySymbol={currencies[selectedCurrency]?.Symbol || ''}
                    />
                )
            });

            props.onSendData(offersList.length)

        } else {
            offersList = (
                <>
                    <span className={classes.hideSmallScreens}> </span>
                    <div className={classes.errorContainer}>
                        {countryHasOffer && <button className={classes.resetButton} onClick={resetField}>{resetText}</button>}
                    </div>
                </>
            )
            props.onSendData(offersList.length)
        }
    }



    return (
        <div className={classes.mainContainer}>
            <div className={classes.proposal_plans}>
                {offersList}
            </div>
            <div className={classes.offersNCurrencyContainer}>
                <SeeMoreOffers onClickMoreOffers={seeMoreOffers} buttonIsActive={buttonIsActive} />
                <CurrencySelector />
            </div>
        </div>
    )
}

export default Offers; 