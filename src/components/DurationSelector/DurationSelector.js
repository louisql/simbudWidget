import { Autocomplete, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import OfferContext from '../../store/OfferContext'


const DurationSelector = () => {
    const offerCtx = useContext(OfferContext)
    const [options, setOptions] = useState([])
    const [defaultDuration, setDefaultDuration] = useState(null)

    useEffect(() => {
        const selectedValidity = offerCtx.selectedValidity;
        const filteredList = offerCtx.data.filter(offer => offer.validity.toLowerCase().includes(selectedValidity.toLowerCase()))
        console.log(filteredList)
        console.log(offerCtx)

        const filteredDuration = Array.from(new Set(offerCtx.data.map(offer => offer.validity)))
        // console.log(filteredDuration)

        setOptions(filteredDuration)


        // if (offerCtx.selectedDuration) {
        //     setDefaultDuration(offerCtx.selectedDuration)
        // } else 
        if (filteredList.length > 0) {
            console.log(filteredList[0])
            setDefaultDuration(filteredList[0].validity)
        }


        const isvalidityInPlan = filteredDuration.includes(offerCtx.selectedvalidity)
        // console.log(filteredList)
        if (isvalidityInPlan) {
            setDefaultDuration(offerCtx.selectedvalidity)
        }  

    }, [offerCtx.selectedValidity, offerCtx.data])


    const filterOptions = (options, { inputValue }) => {
        return options.filter((option) =>
            option.toLowerCase().startsWith(inputValue.toLowerCase())
        );
    };

    const handleChange = (event, value) => {
        if (value) {
            offerCtx.changeValidity(value);
            offerCtx.changeCountry(offerCtx.selectedCountry)
        }
    }




    if (offerCtx.error) {
        return <div>Error: {offerCtx.error}</div>
    } else if (!offerCtx.isLoaded) {
        return <div>Loading...</div>
    } else {
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