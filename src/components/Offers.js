import React from 'react'
import Card from './UI/Card';
import classes from "./Offers.module.css";

import airaloLogo from '../assets/logo/airalo-100x100.png';
import flexiroamLogo from '../assets/logo/flexiroam-100x100.png';
import nomad from '../assets/logo/nomad-100x100.png'

const Offers = () => {
    return (
        <div className={classes.proposal_plans}>
            <Card
                logo={airaloLogo}
                provider="Airalo"
            >
                Offre 1
            </Card>
            
            <Card
                logo={flexiroamLogo}
                provider="Flexiroam"
            >
                Offre 2
            </Card>

            <Card
                logo={nomad}
                provider="Nomad"
            >
                Offre 3
            </Card>
        </div>
    )
}

export default Offers;