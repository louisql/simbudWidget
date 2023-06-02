// import './DataSelector.css';

import { Autocomplete, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import OfferContext from '../../store/OfferContext';

import {useTranslation} from "react-i18next";


const DataSelector = () => {
    const offerCtx = useContext(OfferContext)
    const [updatedContent, setupdatedContent] = useState(false)
    const [options, setOptions] = useState([])
    const [defaultCapacity, setDefaultCapacity] = useState(null)

    useEffect(() => {
        setupdatedContent(false)

        const selectedCountry = offerCtx.selectedCountry;
        const filteredList = offerCtx.data.filter(offer => offer.country.toLowerCase().includes(selectedCountry.toLowerCase()))
        if (filteredList.length > 0) {
            setDefaultCapacity(filteredList[0].capacity)
        }
        //Using set to get the unique values
        const filteredCapacity = Array.from(new Set(filteredList.map(offer => offer.capacity)))

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

    const {t, i18n} = useTranslation('common');

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
