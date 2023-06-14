// import './DataSelector.css';

import { Autocomplete, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import OfferContext from '../../store/OfferContext';
import CurrencyContext from "../../store/CurrencyContext";

import { useTranslation } from "react-i18next";


const DataSelector = () => {
    const offerCtx = useContext(OfferContext)
    const currencyCtx = useContext(CurrencyContext)

    const [updatedContent, setupdatedContent] = useState(false)
    const [options, setOptions] = useState([])
    const [defaultCapacity, setDefaultCapacity] = useState(null)

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

    const convertUnits = (capacities) => {
        const converterdCapacity = capacities.map(capacity => (
            capacity.replace(/GB/g, "Go").replace(/MB/g, "Mo")
        ))

        return converterdCapacity
    }

    useEffect(() => {
        setupdatedContent(false)

        const selectedCountry = offerCtx.selectedCountry;
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

        if (currencyCtx.languageParentWindow === "fr") filteredCapacity = convertUnits(filteredCapacity)

        setOptions(filteredCapacity)

        const isCapacityInPlan = filteredCapacity.includes(offerCtx.selectedCapacity)

        if (isCapacityInPlan) {
            setDefaultCapacity(offerCtx.selectedCapacity)
        } else if (filteredList.length > 0) {
            setDefaultCapacity(filteredList[0].capacity)
        }





    }, [offerCtx.selectedCountry, offerCtx.data, updatedContent])

    const filterOptions = (options, { inputValue }) => {
        return options.filter((option) =>
            option.toLowerCase().startsWith(inputValue.toLowerCase())
        );
    };

    const handleChange = (event, value) => {
        offerCtx.changeCapacity(value);
        offerCtx.changeCountry(offerCtx.selectedCountry)
        setupdatedContent(true)
    }

    const { t, i18n } = useTranslation('common');

    return (
        <>
            {defaultCapacity && (
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    sx={{ width: 150 }}
                    filterOptions={filterOptions}

                    // defaultValue={defaultCapacity ?? " "}
                    value={offerCtx.selectedCapacity}
                    onChange={handleChange}
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
