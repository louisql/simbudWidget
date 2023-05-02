// import './DataSelector.css';

import { Autocomplete, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import OfferContext from '../../store/OfferContext';

const DataSelector = () => {
    const offerCtx = useContext(OfferContext)
    const [updatedContent, setupdatedContent] = useState(false)
    const [options, setOptions] = useState([])
    const [defaultCapacity, setDefaultCapacity] = useState(null)

    let toBeDisplayed;

    useEffect(() => {
        setupdatedContent(false)

        const selectedCountry = offerCtx.selectedCountry;
        const filteredList = offerCtx.data.filter(offer => offer.country.toLowerCase().includes(selectedCountry.toLowerCase()))
        if (filteredList.length > 0) {
            console.log('pas dans plan')
            console.log(filteredList)
            // console.log(filteredList[0].capacity)
            setDefaultCapacity(filteredList[0].capacity)
            // setupdatedContent(true)
        }
        //Using set to get the unique values
        const filteredCapacity = Array.from(new Set(filteredList.map(offer => offer.capacity)))

        setOptions(filteredCapacity)

        console.log(filteredCapacity)
        const isCapacityInPlan = filteredCapacity.includes(offerCtx.selectedCapacity)

        console.log(isCapacityInPlan)


        console.log(filteredList)
        if (isCapacityInPlan) {
            setDefaultCapacity(offerCtx.selectedCapacity)
        }  

        
        

    }, [offerCtx.selectedCountry, offerCtx.data])

    const filterOptions = (options, { inputValue }) => {
        return options.filter((option) =>
            option.toLowerCase().startsWith(inputValue.toLowerCase())
        );
    };

    const handleChange = (event, value) => {
        console.log(value)
        if (value) {
            offerCtx.changeCapacity(value);
            offerCtx.changeCountry(offerCtx.selectedCountry)
        }
        // value=
    }

    toBeDisplayed = (
        <>
            {defaultCapacity && (
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    sx={{ width: 150 }}
                    filterOptions={filterOptions}
                    // defaultValue={defaultCapacity ?? " "}
                    // displayEmpty
                    value={defaultCapacity}
                    onChange={handleChange}
                    renderInput={(params) =>

                        <TextField
                            {...params}
                            label="Select capacity"
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
    return (
        <>
            {toBeDisplayed}
        </>
    )
}

export default DataSelector
