import { Autocomplete, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import OfferContext from '../../store/OfferContext';
import CurrencyContext from "../../store/CurrencyContext";

import { useTranslation } from "react-i18next";


const DataSelector = () => {
    const offerCtx = useContext(OfferContext)
    const currencyCtx = useContext(CurrencyContext)

    const [options, setOptions] = useState([])
    const [defaultCapacity, setDefaultCapacity] = useState(null)

    let optionsWithLabel

    const convertToGB = (capacity) => {
        const numericValue = parseFloat(capacity);
        if (capacity !== undefined && capacity !== null) {
            const unit = capacity.match(/[a-zA-Z]+/)[0].toLowerCase();

            if (unit === 'gb') {
                return numericValue;
            } else if (unit === 'mb') {
                return numericValue / 1000;
            }

        }
        return capacity;
    }

    const convertUnits = (capacity) => {
        const converterdCapacity = capacity.replace(/GB/g, "Go").replace(/MB/g, "Mo")

        return converterdCapacity
    }

    useEffect(() => {
        let selectedCountry = offerCtx;

        if (selectedCountry.selectedCountryName) {
            selectedCountry = selectedCountry.selectedCountryName.labelEnglish
        }

        const filteredList = offerCtx.data.filter(offer => offer.country.toLowerCase().includes(selectedCountry.toLowerCase()))
        if (filteredList.length > 0) {
            setDefaultCapacity(filteredList[0].capacity)
        }
        //Using set to get the unique values
        let filteredCapacity = Array.from(new Set(filteredList.map(offer => offer.capacity)))

        filteredCapacity.sort((a, b) => {
            const numA = convertToGB(a)
            const numB = convertToGB(b)

            return numA - numB
        })


        //Adding a value and option to the option to have a translated 
        optionsWithLabel = filteredCapacity.map(
            (option) => {
                if (currencyCtx.languageParentWindow === "fr") {
                    return {
                        label: convertUnits(option),
                        value: option
                    }
                } else {
                    return {
                        label: option,
                        value: option
                    }
                }
            }
        )
        setOptions(optionsWithLabel)
    }, [offerCtx.isLoaded, offerCtx.data, optionsWithLabel])

    const filterOptions = (options, { inputValue }) => {
        return options.filter((option) =>
            option.value.toLowerCase().startsWith(inputValue.toLowerCase())
        );
    };

    const handleChange = (event, value) => {
        //Two cases: case 1 we send the value of the option (value.value) - case 2 we send value which is null
        if (value) offerCtx.changeCapacity(value.value)
        else offerCtx.changeCapacity(value)
        offerCtx.changeCountry(offerCtx.selectedCountry)
    }

    const { t, i18n } = useTranslation('common');

    return (
        <>
            {defaultCapacity && (
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    openText={t('label.open')}
                    closeText={t('label.close')}
                    clearText={t('label.clear')}

                    options={options}
                    sx={{ width: 150 }}
                    filterOptions={filterOptions}

                    // defaultValue={defaultCapacity ?? " "}
                    // value={defaultCapacity}
                    onChange={handleChange}
                    noOptionsText={t('offer.noResult')}
                    renderInput={(params) =>

                        <TextField
                            {...params}
                            isOptionEqualToValue={(option, value) => option === value}
                            // label="Select capacity"
                            label={t('capacity.choose')}
                            borderRadius="16px"
                            style={{
                                textAlign: "left",
                                color: "black"
                            }}
                        />}
                />)
            }
        </>
    )
}

export default DataSelector
