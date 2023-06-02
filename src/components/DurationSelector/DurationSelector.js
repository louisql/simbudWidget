import { Autocomplete, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import OfferContext from '../../store/OfferContext'

import {useTranslation} from "react-i18next";


const DurationSelector = () => {
    const offerCtx = useContext(OfferContext)
    const [options, setOptions] = useState([])

    useEffect(() => {
        const filteredDuration = Array.from(new Set(offerCtx.data.map(offer => offer.validity)))
        filteredDuration.sort((a, b) => {
            const numA = parseInt(a)
            const numB = parseInt(b)

            return numA - numB
        })
        setOptions(filteredDuration)

    }, [offerCtx.selectedValidity, offerCtx.data])

    const filterOptions = (options, { inputValue }) => {
        return options.filter((option) =>
            option.toLowerCase().startsWith(inputValue.toLowerCase())
        );
    };

    const handleChange = (event, value) => {
        // offerCtx.changeCapacity(value);
        offerCtx.changeValidity(value);
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
                        value={offerCtx.selectedValidity}
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