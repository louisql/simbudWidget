import './CountrySelector.css';

import { Autocomplete, TextField } from "@mui/material"
import { useContext } from "react"
import OfferContext from '../../store/OfferContext';
import CurrencyContext from '../../store/CurrencyContext';

import { useTranslation } from "react-i18next";

const CountrySelector = (props) => {
    const offerCtx = useContext(OfferContext)
    const currencyCtx = useContext(CurrencyContext)
    const languageParentWindow = currencyCtx.languageParentWindow
    // const nbreOffersDisplayed = offerCtx.nbreOffersDisplayed

    let defaultCountry

    const defaultCountryCode = offerCtx.selectedCountry
    const defaultCountryObject = offerCtx.loadedCountries.find(country => country.code === defaultCountryCode)
    // console.log(offerCtx.loadedCountries)

    if (languageParentWindow === 'eng' && offerCtx.isLoaded) {
        defaultCountry = defaultCountryObject.name

    } else if (languageParentWindow === 'fr' && offerCtx.isLoaded) {
        defaultCountry = defaultCountryObject.nameFrench.common

    }


    // console.log(offerCtx.loadedCountries)

    const options = offerCtx.loadedCountries.map(
        (country) => {
            if (languageParentWindow === 'en') {
                return {
                    label: country.name,
                    value: country.code
                }
            }
            else {
                return {
                    label: country.nameFrench.common,
                    value: country.code
                }
            }
        }
    )

    const filterOptions = (options, { inputValue }) => {
        return options.filter((option) => {
            const optionNormalized = toNormalForm(option.label)
            const inputValueNormalized = toNormalForm(inputValue)
            return optionNormalized.toLowerCase().startsWith(inputValueNormalized.toLowerCase())
        });
    };

    const handleChange = (event, value) => {
        if (value) offerCtx.changeCountry(value.value);
        offerCtx.changeCapacity(null);
        offerCtx.changeValidity(null);
        // offerCtx.changeNberOffers(nbreOffersDisplayed)

    }

    const toNormalForm = (str) => {
        console.log(str)
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }


    const { t, i18n } = useTranslation('common');

    if (offerCtx.error) {
        return <div>Error: {offerCtx.error}</div>
    } else if (!offerCtx.isLoaded) {
        return <div>Loading...</div>
    } else {
        return (
            <>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    sx={{ width: 250 }}
                    filterOptions={filterOptions}
                    defaultValue={defaultCountry}
                    onChange={handleChange}
                    renderInput={(params) =>

                        <TextField
                            {...params}
                            // label="Choose your destination"
                            label={t('country.choose')}
                            borderRadius="16px"
                            style={{
                                textAlign: "left",
                                color: "black"
                            }}
                        />}
                />
            </>
        )
    }
}

export default CountrySelector