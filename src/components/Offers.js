import React from 'react'
import Card from './UI/Card';
import classes from "./Offers.module.css";

import airaloLogo from '../assets/logo/airaloLogo-100x100.png';
import flexiroamLogo from '../assets/logo/flexiroamLogo-100x100.png';
import nomad from '../assets/logo/nomad-100x100.png'

const Offers = () => {
    return (
        <div className={classes.proposal_plans}>
            <Card
                logo={airaloLogo}
            >
                Offre 1
            </Card>
            
            <Card
                logo={flexiroamLogo}
            >
                Offre 2
            </Card>

            <Card
                logo={nomad}
            >
                Offre 3
            </Card>
        </div>
    )
}

export default Offers;