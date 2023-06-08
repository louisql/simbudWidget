import classes from './SeeMoreOffers.module.css'

import {useTranslation} from "react-i18next";

const SeeMoreOffers = (props) => {
    const {t, i18n} = useTranslation('common');

    const active = props.buttonIsActive
    // const active = true

    console.log(active)

    return (
        <a onClick={props.onClickMoreOffers} className={classes.offerButton} disabled={!active} > {active ? t('offer.showMore') : t('offer.noMoreOffer')} </a>
    )
}

export default SeeMoreOffers