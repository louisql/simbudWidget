import './CountrySelector.css';

import { Autocomplete, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import OfferContext from '../../store/OfferContext';
import CurrencyContext from '../../store/CurrencyContext';

import { useTranslation } from "react-i18next";

const CountrySelector = (props) => {
    const offerCtx = useContext(OfferContext)
    const currencyCtx = useContext(CurrencyContext)
    const languageParentWindow = currencyCtx.languageParentWindow

    const [defaultCountryObject, setDefaultCountryObject] = useState(null)
    const [defaultCountry, setDefaultCountry] = useState(null)

    const { t, i18n } = useTranslation('common');

    let ctxSelectedCountry = offerCtx.selectedCountryName

    useEffect(() => {
        const defaultCountryCode = offerCtx.selectedCountry
        const temp = offerCtx.loadedCountries.find(country => {
            return country.name === defaultCountryCode
        })

        setDefaultCountryObject(temp)
    }, [offerCtx])

    useEffect(() => {
        if (defaultCountryObject) {
            if (languageParentWindow === 'eng') {
                setDefaultCountry(defaultCountryObject.name)
            } else if (languageParentWindow === 'fr') {
                setDefaultCountry(defaultCountryObject.nameFrench.common)
            }
        }

    }, [defaultCountryObject, languageParentWindow])

    const options = offerCtx.loadedCountries.map((country) => {
        if (languageParentWindow === 'en') {
            return {
                label: country.name,
                value: country.code
            }
        } else {
            return {
                label: country.nameFrench.common,
                value: country.code
            }
        }
    })

    options.sort((a, b) => {
        const labelA = a.label.toLowerCase();
        const labelB = b.label.toLowerCase();

        if (labelA < labelB) {
            return -1;
        }
        if (labelA > labelB) {
            return 1;
        }
        return 0;
    });

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
    }

    const toNormalForm = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const isOptionEqualToValue = (option, value) => {
        return option?.value === value?.value;
    };

    useEffect(() => {
        if (languageParentWindow === "fr" && offerCtx.isLoaded) {
            const defaultCountryObj = {
                value: ctxSelectedCountry.value,
                label: ctxSelectedCountry.labelFrench
            }
            setDefaultCountry(defaultCountryObj);
            handleChange(defaultCountry)

        } else if (languageParentWindow === "en" && offerCtx.isLoaded) {
            const defaultCountryObj = {
                value: ctxSelectedCountry.value,
                label: ctxSelectedCountry.labelEnglish
            }
            setDefaultCountry(defaultCountryObj);
            handleChange(defaultCountry)
        }
    }, [languageParentWindow, offerCtx.selectedCountryName]);


    useEffect(() => {
        if (defaultCountry) {
            // Call handleChange with the default value
            handleChange(null, defaultCountry);
        }
    }, [defaultCountry]);

    if (offerCtx.error) {
        return <div>Error: {offerCtx.error}</div>
    } else if (!offerCtx.isLoaded) {
        return <div>Loading...</div>
    } 

    if (offerCtx.error) {
        return <div>Error: {offerCtx.error}</div>;
    } else if (!offerCtx.isLoaded) {
        return <div>Loading...</div>;
    } else if (defaultCountry === null) {
        return <div>Waiting for default country...</div>;
    } else {
        return (
            <>
                <Autocomplete
                    // configuring autocomplete search function
                    isOptionEqualToValue={isOptionEqualToValue}
                    disablePortal

                    // translating the autocomplete labels
                    openText={t('label.open')}
                    closeText={t('label.close')}
                    clearText={t('label.clear')}

                    id="combo-box-demo"
                    options={options}
                    sx={{ width: 250 }}
                    filterOptions={filterOptions}
                    defaultValue={defaultCountry.label}
                    onChange={handleChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={t('country.choose')}
                            borderRadius="16px"
                            style={{
                                textAlign: "left",
                                color: "black"
                            }}
                        />
                    )}
                />
            </>
        );
    }

}

export default CountrySelector
