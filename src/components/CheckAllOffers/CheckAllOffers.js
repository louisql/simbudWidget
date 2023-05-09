import classes from './CheckAllOffers.module.css'

import {useTranslation} from "react-i18next";

const CheckAllOffers = () => {
    const {t, i18n} = useTranslation('common');

    return (
        <a className={classes.offerButton} href="https://simbud.com/" target="_blank"> {t('offer.checkall')} </a>
    )
}

export default CheckAllOffers