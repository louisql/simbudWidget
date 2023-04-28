import React from 'react'
import { useState, useEffect } from 'react';

import Card from '../UI/Card';
import CheckAllOffers from '../CheckAllOffers/CheckAllOffers'
import classes from "./Offers.module.css";

const Offers = (props) => {
    const [offersData, setOffersData] = useState([]);
    const [nberOfOffers, setnberOfOffers] = useState([0])

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

    const offersList = offersData.map((offer) => (
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