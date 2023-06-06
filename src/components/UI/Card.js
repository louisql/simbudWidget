import classes from "./Card.module.css"
import { useState, useEffect } from "react";
import {useTranslation} from "react-i18next";

const Card = props => {
    const [urlModified, setUrlModified] = useState(false)
    const [adjustedURL, setAdjustedURL] = useState('')

    const {t, i18n} = useTranslation('common');

    const url = props.url;
    const referal = props.referal
    const backupUrl = props.backupUrl
    
    const parsedValidity = parseInt(props.validity)

    const priceWithComma = props.price.replace(".", ",")

    useEffect(() => {
        if (referal) {
            const adjustedURL = url.replace("actualite", referal);
            setAdjustedURL(adjustedURL)
            setUrlModified(true)
        } 
    }, [])

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
                    <span className={classes.offerTitle}> <b>{props.planName}</b> </span>

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


                        <div className={classes.inlineContainer}>
                            <span class="ph-icon-location">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                    <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                                </svg>
                            </span> {props.location}
                        </div>

                        <div className={classes.inlineContainer} >
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5"></path>
                                <path d="M16 3v4"></path>
                                <path d="M8 3v4"></path>
                                <path d="M4 11h16"></path>
                                <path d="M16 19h6"></path>
                                <path d="M19 16v6"></path>
                            </svg>
                        <span>{t('offer.validity')} {parsedValidity} {t('offer.days')}</span>
                        </div>

                    </div>
                </div>
            </div>

            <div className={` ${classes.flexContainer} ${classes.scdLineContainer}`}> {/* Container 2nd line */}
                <div className={` ${classes.firstColumn} ${classes.planSizeContainer}`}><b>{priceWithComma} $ </b></div>
                {!urlModified && (<a className={classes.secondColumn} href={backupUrl} target="_blank">{t('offer.check')}</a>)}
                {urlModified && (<a className={classes.secondColumn} href={adjustedURL} target="_blank">{t('offer.check')}</a>)}
                
            </div>
        </div>
    )
}

export default Card;