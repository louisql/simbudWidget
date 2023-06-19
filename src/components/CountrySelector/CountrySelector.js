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
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(false)
        const defaultCountryCode = offerCtx.selectedCountry
        const temp = offerCtx.loadedCountries.find(country => {
            return country.name === defaultCountryCode
        })

        setDefaultCountryObject(temp)
        setIsLoaded(true)
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
    // console.log(defaultCountry)

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
        // console.log(option)
        // console.log(value)
        return option?.value === value?.value;
    };

    const { t, i18n } = useTranslation('common');


    // let testDefault = {
    //     label: offerCtx.selectedCountryName.name,
    //     value: offerCtx.selectedCountryName
    // }
    console.log(offerCtx.selectedCountryName)
    console.log(options)
    let testDefault = offerCtx.selectedCountryName
    console.log(testDefault)

    if (languageParentWindow === "fr" && offerCtx.isLoaded){
        console.log(testDefault)
        const testDefault2 = {
            ...testDefault,
            label: testDefault.labelFrench
        } 
    } else if (languageParentWindow === "en" && offerCtx.isLoaded){
        const testDefault2 = {
            ...testDefault,
            label: testDefault.labelEnglish
        } 
        
    }


    // console.log(offerCtx.selectedCountryName)
    if (offerCtx.error) {
        return <div>Error: {offerCtx.error}</div>
    } else if (!offerCtx.isLoaded) {
        return <div>Loading...</div>
    } else {
        return (
            <>
                <Autocomplete
                                        isOptionEqualToValue={isOptionEqualToValue}

                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    sx={{ width: 250 }}
                    filterOptions={filterOptions}
                    defaultValue={testDefault2}
                    // value={offerCtx.selectedCountryName}
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
        )
    }
}

export default CountrySelector
