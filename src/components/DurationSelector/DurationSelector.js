import { Autocomplete, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import OfferContext from '../../store/OfferContext'


const DurationSelector = () => {
    const offerCtx = useContext(OfferContext)
    const [options, setOptions] = useState([])
    const [defaultDuration, setDefaultDuration] = useState(null)

    useEffect(() => {
        const selectedCountry = offerCtx.selectedCountry;
        const filteredList = offerCtx.data.filter(offer => offer.country.toLowerCase().includes(selectedCountry.toLowerCase()))

        const filteredDuration = Array.from(new Set(filteredList.map(offer => offer.validity)))
        // console.log(filteredDuration)

        setOptions(filteredDuration)


        if (offerCtx.selectedDuration) {
            setDefaultDuration(offerCtx.selectedDuration)
        } else if (filteredList.length > 0) {
            setDefaultDuration(filteredList[0].duration)
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




    if (offerCtx.error) {
        return <div>Error: {offerCtx.error}</div>
    } else if (!offerCtx.isLoaded) {
        return <div>Loading...</div>
    } else {
        // console.log(defaultDuration)
        return (
            <>
                {defaultDuration && (
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={options}
                        sx={{ width: 250 }}
                        filterOptions={filterOptions}
                        defaultValue={defaultDuration}
                        onChange={handleChange}
                        renderInput={(params) =>
    
                            <TextField
                                {...params}
                                label="Select duration"
                                borderRadius="16px"
                                style={{
                                    textAlign: "left",
                                    color: "black"
                                }}
                            />}
                    />
                )}
            </>
        )
    }
}

export default DurationSelector;