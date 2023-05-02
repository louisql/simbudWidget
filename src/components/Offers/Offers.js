import React from 'react'
import { useState, useEffect, useContext } from 'react';

import Card from '../UI/Card';
import CheckAllOffers from '../CheckAllOffers/CheckAllOffers'
import classes from "./Offers.module.css";
import OfferContext from '../../store/OfferContext';

const Offers = (props) => {
    const [offersData, setOffersData] = useState([]);
    const [nberOfOffers, setnberOfOffers] = useState([0])
    const offerCtx = useContext(OfferContext)

    const selectedCountry = offerCtx.selectedCountry;

    useEffect(() => {
        fetch("offers.json")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error while fetching the data');
                }
            })
            .then((dataJSON) => {
                setnberOfOffers(dataJSON.length);
                props.onSendData(nberOfOffers)
                setOffersData(dataJSON);
            })
            .catch((error) => {
                console.error(error);
                // console.log(response.body);
            });
    }, [nberOfOffers])

    const filteredList = offersData.filter(offer => offer.country.toLowerCase().includes(selectedCountry.toLowerCase()))

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
    } else {
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