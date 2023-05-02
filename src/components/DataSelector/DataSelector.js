// import './DataSelector.css';

import { Autocomplete, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import OfferContext from '../../store/OfferContext';

const DataSelector = () => {
    const offerCtx = useContext(OfferContext)
    const [options, setOptions] = useState([])
    const [defaultCapacity, setDefaultCapacity] = useState(null)

    useEffect(() => {
        const selectedCountry = offerCtx.selectedCountry;
        const filteredList = offerCtx.data.filter(offer => offer.country.toLowerCase().includes(selectedCountry.toLowerCase()))

        //Using set to get the unique values
        const filteredCapacity = filteredList.map(offer => offer.capacity)

        setOptions(filteredCapacity)

        if (offerCtx.selectedCapacity) {
            setDefaultCapacity(offerCtx.selectedCapacity)
            console.log(defaultCapacity)
        } else if (filteredList.length > 0) {
            setDefaultCapacity(filteredList[0].capacity)
            console.log(filteredList[0].capacity)
        }

    }, [offerCtx.selectedCountry, offerCtx.data])

    const filterOptions = (options, { inputValue }) => {
        return options.filter((option) =>
            option.toLowerCase().startsWith(inputValue.toLowerCase())
        );
    };

    const handleChange = (event, value) => {
        if (value) offerCtx.changeCapacity(value);
    }



    return (
        <>
            {defaultCapacity &&(
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    sx={{ width: 300 }}
                    filterOptions={filterOptions}
                    defaultValue={defaultCapacity}
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
}

export default DataSelector
