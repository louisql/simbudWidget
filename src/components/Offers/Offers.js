import React from 'react'
import { useContext } from 'react';

import Card from '../UI/Card';
import CheckAllOffers from '../CheckAllOffers/CheckAllOffers'
import classes from "./Offers.module.css";

import OfferContext from '../../store/OfferContext';

import CurrencySelector from '../CurrencySelector/CurrencySelector';

const Offers = (props) => {

    const offerCtx = useContext(OfferContext)
    const selectedCountry = offerCtx.selectedCountry;
    

    let offersList

    const filteredList = offerCtx.data.filter(offer => {
        const countryMatch = offer.country.toLowerCase().includes(selectedCountry.toLowerCase())
        const capacityMatch = offer.capacity === offerCtx.selectedCapacity || !offerCtx.selectedCapacity;
        const validityMatch = offer.validity === offerCtx.selectedValidity || !offerCtx.selectedValidity

        return countryMatch && capacityMatch && validityMatch
    });


    if (filteredList.length > 0) {
        //Limiting display to 3 offers
        offersList = filteredList.slice(0, 3).map((offer) => (
            <Card
                id={offer.id}
                key={offer.id}
                logo={offer.logo}
                provider={offer.provider}
                capacity={offer.capacity}
                planName={offer.planName}
                location={offer.country}
                price={offer.price}
                validity={offer.validity}
                referal={offerCtx.referal}
                url={offer.url}
                backupUrl={offer.backupUrl}
            />
        ));

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