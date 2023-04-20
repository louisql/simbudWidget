import React from 'react'
import { useState, useEffect } from 'react';

import Card from '../UI/Card';
import CheckAllOffers from '../CheckAllOffers/CheckAllOffers'
import classes from "./Offers.module.css";

const Offers = () => {
    const [offersData, setOffersData] = useState([]);

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
                // console.log(dataJSON);
                setOffersData(dataJSON);
            })
            .catch((error) => {
                console.error(error);
                // console.log(response.body);
            });
    }, [])

    const offersList = offersData.map((offer) => (
        <Card
            id={offer.id}
            key={offer.id}
            logo={offer.logo}
            provider={offer.provider}
            capacity={offer.capacity}
            planName={offer.planName}
            location={offer.country}
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