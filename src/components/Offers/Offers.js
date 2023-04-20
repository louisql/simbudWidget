import React from 'react'
import Card from '../UI/Card';
import CheckAllOffers from '../CheckAllOffers/CheckAllOffers'
import classes from "./Offers.module.css";

import airaloLogo from '../../assets/logo/airalo-100x100.png';
import flexiroamLogo from '../../assets/logo/flexiroam-100x100.png';
import nomad from '../../assets/logo/nomad-100x100.png'

const Offers = () => {
    return (
        <div className={classes.mainContainer}>
            <div className={classes.proposal_plans}>
                <Card
                    logo={airaloLogo}
                    provider="Airalo"
                    capacity="1 GB"
                    planName="Tuque Mobile - 1 GB"
                    location="Canada"
                >
                    Offre 1
                </Card>

                <Card
                    logo={flexiroamLogo}
                    provider="Flexiroam"
                    capacity="3 GB"
                    planName="3GB Global Plan"
                    location="Canada"
                >
                    Offre 2
                </Card>

                <Card
                    logo={nomad}
                    provider="Nomad"
                    capacity="2 GB"
                    planName="CANADA 2GB "
                    location="Canada"
                >
                    Offre 3
                </Card>
            </div>

            <CheckAllOffers />

        </div>
    )
}

export default Offers;