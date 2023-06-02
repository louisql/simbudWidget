import React from 'react'
import { useContext } from 'react';

import Card from '../UI/Card';
import CheckAllOffers from '../CheckAllOffers/CheckAllOffers'
import classes from "./Offers.module.css";

import OfferContext from '../../store/OfferContext';

import CurrencySelector from '../CurrencySelector/CurrencySelector';
import CurrencyContext from '../../store/CurrencyContext';

const Offers = (props) => {

    const offerCtx = useContext(OfferContext)
    const currencyCtx = useContext(CurrencyContext)
    const selectedCountry = offerCtx.selectedCountry;
    const currentConversionRate = currencyCtx.currentConversionRate

    // console.log(offerCtx)

    let offersList

    const compareByPrice = (a, b) => a.USDPrice - b.USDPrice

    //Sorting data so they appear by ascending price
    const sortedData = offerCtx.data.sort(compareByPrice)
    const convertToGB = (capacity) => {
        const numericValue = parseFloat(capacity);
        if (capacity !== undefined && capacity !== null){
        // console.log(capacity)
            const unit = capacity.match(/[a-zA-Z]+/)[0].toLowerCase();
            
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
      

    const filteredList = uniqueData.filter(offer => {
        const capacity = convertToGB(offer.capacity);

        // Next line reformat country by removing Capitalized letters, replacing hyphen by space and check if there's a match
        const countryMatch = offer.country.toLowerCase().replace(/-/g, ' ').includes(selectedCountry.toLowerCase())
        const capacityMatch = capacity >= convertToGB(offerCtx.selectedCapacity) || !offerCtx.selectedCapacity;
        const validityMatch = offer.validity >= offerCtx.selectedValidity || !offerCtx.selectedValidity

        return countryMatch && capacityMatch && validityMatch
    });

    
    
    if (filteredList.length > 0) {
        //Limiting display to 3 offers
        offersList = filteredList.slice(0, 3).map((offer) => {
            let trimmedPlanName = offer.planName + " "
            trimmedPlanName = trimmedPlanName.substring(0,22)
            trimmedPlanName = trimmedPlanName.substring(0, Math.min(trimmedPlanName.length, trimmedPlanName.lastIndexOf(" ")))
            
            return(
                <Card
                    id={offer.id}
                    key={offer.id}
                    logo={offer.logo}
                    provider={offer.provider}
                    capacity={offer.capacity}
                    planName={trimmedPlanName}
                    location={selectedCountry}
                    // Rounding the price to 2 digits & applying conversion rate 
                    price={(Math.round(offer.USDPrice * currentConversionRate * 100) / 100).toFixed(2)}
                    validity={offer.validity}
                    referal={offerCtx.referal}
                    url={offer.url}
                    backupUrl={offer.backupUrl}
                />
            )
        });

        props.onSendData(offersList.length)

    } else if (offerCtx.isLoaded) {
        offersList = (
            <div> No result <br /> Reset the Capacity & Duration filters or click below</div>
        )
        props.onSendData(offersList.length)
    }


    return (
        <div className={classes.mainContainer}>
            <div className={classes.proposal_plans}>
                {offersList}
            </div>
            <div className={classes.offersNCurrencyContainer}>
                <CheckAllOffers />
                <CurrencySelector />
            </div>
        </div>
    )
}

export default Offers; 