import classes from './SeeMoreOffers.module.css'

import {useTranslation} from "react-i18next";

const SeeMoreOffers = (props) => {
    const {t, i18n} = useTranslation('common');


    return (
        <a onClick={props.onClickMoreOffers} className={classes.offerButton} /* href="https://simbud.com/"  */target="_blank"> {t('offer.showMore')} </a>
    )
}

export default SeeMoreOffers