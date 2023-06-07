import classes from './CheckAllOffers.module.css'

import {useTranslation} from "react-i18next";

const CheckAllOffers = (props) => {
    const {t, i18n} = useTranslation('common');


    return (
        <a onClick={props.onClickMoreOffers} className={classes.offerButton} /* href="https://simbud.com/"  */target="_blank"> {t('offer.checkall')} </a>
    )
}

export default CheckAllOffers