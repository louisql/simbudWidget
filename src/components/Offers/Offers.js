import React from 'react'
import { useState, useEffect, useContext } from 'react';

import Card from '../UI/Card';
import CheckAllOffers from '../CheckAllOffers/CheckAllOffers'
import classes from "./Offers.module.css";
import OfferContext from '../../store/OfferContext';

const Offers = () => {

    const offerCtx = useContext(OfferContext)

    const selectedCountry = offerCtx.selectedCountry;

    // OLD WAY OF COUNTING NUMBER OF OFFERS
    // const [offersData, setOffersData] = useState([]);
    // const [nberOfOffers, setnberOfOffers] = useState([0])

    // useEffect(() => {
    //     fetch("offers.json")
    //         .then((response) => {
    //             if (response.ok) {
    //                 return response.json();
    //             } else {
    //                 throw new Error('Error while fetching the data');
    //             }
    //         })
    //         .then((dataJSON) => {
    //             setnberOfOffers(dataJSON.length);
    //             props.onSendData(nberOfOffers)
    //             setOffersData(dataJSON);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             // console.log(response.body);
    //         });
    // }, [nberOfOffers])

    const filteredList = offerCtx.data.filter(offer => {
       const countryMatch = offer.country.toLowerCase().includes(selectedCountry.toLowerCase()) 
       const capacityMatch = offer.capacity === offerCtx.selectedCapacity || !offerCtx.selectedCapacity;
       console.log(offerCtx)
       console.log(offerCtx.selectedCapacity)
       return countryMatch && capacityMatch
    });

    let offersList

    if (filteredList.length > 0){
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
            />
        ));
    } else if (offerCtx.isLoaded) {
        offersList = (
            <div> No results - Go to our website to find some more</div>
        )
    }

    return (
        <div className={classes.mainContainer}>
            <div className={classes.proposal_plans}>
                {offersList}

            </div>

            <CheckAllOffers />

        </div>
    )
}

export default Offers;