import { Autocomplete, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import OfferContext from '../../store/OfferContext'

import {useTranslation} from "react-i18next";


const DurationSelector = () => {
    const offerCtx = useContext(OfferContext)
    const [options, setOptions] = useState([])
    const [defaultDuration, setDefaultDuration] = useState(null)

    useEffect(() => {
        
        const filteredDuration = Array.from(new Set(offerCtx.data.map(offer => offer.validity)))
        
        setOptions(filteredDuration)
        
        
        // const selectedValidity = offerCtx.selectedValidity;
        // if (selectedValidity) {
        //     const filteredList = offerCtx.data.filter(offer => offer.validity.toLowerCase().includes(selectedValidity.toLowerCase()))
        //     const isvalidityInPlan = filteredDuration.includes(offerCtx.selectedvalidity)
        //     if (isvalidityInPlan) {
        //         setDefaultDuration(offerCtx.selectedvalidity)
        //     }
        //     if (filteredList.length > 0) {
        //         setDefaultDuration(filteredList[0].validity)
        //     }

        // }
    }, [offerCtx.selectedValidity, offerCtx.data])

    const filterOptions = (options, { inputValue }) => {
        return options.filter((option) =>
            option.toLowerCase().startsWith(inputValue.toLowerCase())
        );
    };

    const handleChange = (event, value) => {
        offerCtx.changeValidity(value);
        offerCtx.changeCountry(offerCtx.selectedCountry)
    }

    const {t, i18n} = useTranslation('common');

    if (offerCtx.error) {
        return <div>Error: {offerCtx.error}</div>
    } else if (!offerCtx.isLoaded) {
        return <div>Loading...</div>
    } else {
        return (
            <>
                {(
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={options}
                        sx={{ width: 250 }}
                        filterOptions={filterOptions}
                        // defaultValue={defaultDuration}
                        onChange={handleChange}
                        renderInput={(params) =>

                            <TextField
                                {...params}
                                // label="Select duration"
                                label={t('duration.choose')}
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