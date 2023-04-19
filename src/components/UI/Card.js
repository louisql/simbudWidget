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
                    <span> {props.planName} </span>

                    {/*                     <ul>
                        <li>Validite</li>
                        <li>Prix</li>
                        <li>Pays</li>
                    </ul> */}

                    <div className={classes.description}>
                        <div><span class="ph-icon-bar_chart"></span>12<span class="unit"> GB</span> </div>
                        <div class="upfront"><span class="ph-icon-tag-outline"></span> <strong><span>$</span><span>10</span></strong> </div>
                        <div><span class="ph-icon-location"></span> British Columbia</div>
                    </div>
                </div>
            </div>

            <div className={classes.flexContainer}> {/* Container 2nd line */}
                <div className={classes.firstColumn}>{props.capacity}</div>
                <span className={classes.secondColumn}><a href="#"> Check Out The Offer </a> </span>
            </div>
        </div>
    )
}

export default Card;