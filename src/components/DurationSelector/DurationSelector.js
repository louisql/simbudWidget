import { Autocomplete, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import OfferContext from '../../store/OfferContext'
import CurrencyContext from '../../store/CurrencyContext';

import {useTranslation} from "react-i18next";


const DurationSelector = () => {
    const offerCtx = useContext(OfferContext)
    const currencyCtx = useContext(CurrencyContext)

    const {t, i18n} = useTranslation('common');

    const [options, setOptions] = useState([])
    const languageParentWindow = currencyCtx.languageParentWindow

    useEffect(() => {
        const filteredDuration = Array.from(new Set(offerCtx.data.map(offer => offer.validity)))
        filteredDuration.sort((a, b) => {
            const numA = parseInt(a)
            const numB = parseInt(b)

            return numA - numB
        })

        const optionsWithLabel = filteredDuration.map(
            (option) => {
                console.log(option)
                if (languageParentWindow === 'eng') {
                    return { 
                        label: option, 
                        value: option
                    }
                } else {
                    return {
                        label: parseInt(option) + ' ' + t('offer.days'),
                        value: option
                    }
                }
            }
        )

        console.log(optionsWithLabel)

        setOptions(optionsWithLabel)

    }, [offerCtx.selectedValidity, offerCtx.data])

    const filterOptions = (options, { inputValue }) => {
        return options.filter((option) =>
            option.value.toLowerCase().startsWith(inputValue.toLowerCase())
        );
    };

    const handleChange = (event, value) => {
        // offerCtx.changeCapacity(value);
        offerCtx.changeValidity(value);
    }


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