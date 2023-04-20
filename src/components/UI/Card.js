import classes from "./Card.module.css"

const Card = props => {
    console.log(props)

    return (
        <div className={classes.card}>

            <div className={classes.flexContainer}> {/* Container 1st line */}
                <div className={`${classes.flexContainer} ${classes.firstColumn}`}> {/* Container 1st column */}
                    <img className="" src={props.logo} />
                    <span>
                        {props.provider}
                    </span>
                </div>
                <div className={classes.secondColumn}> {/* Container 2nd column */}
                    <span> <b>{props.planName}</b> </span>

                    {/*                     <ul>
                        <li>Validite</li>
                        <li>Prix</li>
                        <li>Pays</li>
                    </ul> */}

                    <div className={classes.description}>

                        <div className={classes.inlineContainer}> 
                            <span className={classes.materialSymbolsOutlined}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cell-signal-5" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M20 20h-15.269a.731 .731 0 0 1 -.517 -1.249l14.537 -14.537a.731 .731 0 0 1 1.249 .517v15.269z"></path>
                                    <path d="M16 7v13"></path>
                                    <path d="M12 20v-9"></path>
                                    <path d="M8 20v-5"></path>
                                </svg>
                            </span>{props.capacity}
                        </div>

                        <div className={classes.inlineContainer} >
                            <span class="ph-icon-tag-outline">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-currency-dollar" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2"></path>
                                    <path d="M12 3v3m0 12v3"></path>
                                </svg>
                            </span> <strong><span>10</span></strong>
                        </div>

                        <div className={classes.inlineContainer}>
                            <span class="ph-icon-location">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                    <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                                </svg>
                            </span> {props.location}
                        </div>

                        
                    </div>
                </div>
            </div>

            <div className={` ${classes.flexContainer} ${classes.scdLineContainer}`}> {/* Container 2nd line */}
                <div className={` ${classes.firstColumn} ${classes.planSizeContainer}`}><b>{props.capacity}</b></div>
                {/* <span className={classes.secondColumn}><a href="#"> Check Offer </a> </span> */}
                <a className={classes.secondColumn} href="#"> Check Offer </a>
            </div>
        </div>
    )
}

export default Card;