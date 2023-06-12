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

    const options = offerCtx.loadedCountries.map(
        (country) => {
            if (languageParentWindow === 'eng') {
                return { label: country.name, value: country.name }
            }
            else {
                return {
                    label: country.nameFrench.common,
                    value: country.name
                }
            }
        }
    )


    /*  
    const test = Object.keys(options)
    .sort(function(a,b) {return options[a] - options[b]})
    .map(key => options[key]); 
    */


    const test = Object.keys(options)
        .sort((a, b) => {
            const labelA = options[a].label;
            const labelB = options[b].label;
            return labelA.localeCompare(labelB);
        })
        .map(key => options[key]); 
        
        const filterOptions = (options, { inputValue }) => {
        return options.filter((option) =>
            option.value.toLowerCase().startsWith(inputValue.toLowerCase())
        );
    };

    const handleChange = (event, value) => {
        if (value) offerCtx.changeCountry(value.value);
        offerCtx.changeCapacity(null);
        offerCtx.changeValidity(null);
        offerCtx.changeNberOffers(3)

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
                    defaultValue={offerCtx.selectedCountry}
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