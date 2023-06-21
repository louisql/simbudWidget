import { Autocomplete, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import OfferContext from '../../store/OfferContext'
import CurrencyContext from '../../store/CurrencyContext';

import { useTranslation } from "react-i18next";


const DurationSelector = (props) => {
    const offerCtx = useContext(OfferContext)
    const currencyCtx = useContext(CurrencyContext)

    const { t, i18n } = useTranslation('common');

    const [updatedContent, setupdatedContent] = useState(false)
    const [options, setOptions] = useState([])
    const languageParentWindow = currencyCtx.languageParentWindow

    const [resetKey, setResetKey] = useState(Date.now());

    const handleReset = () => {
      setResetKey(Date.now());
    };

    useEffect(() => {
        setupdatedContent(false)

        const filteredDuration = Array.from(new Set(offerCtx.data.map(offer => offer.validity)))
        filteredDuration.sort((a, b) => {
            const numA = parseInt(a)
            const numB = parseInt(b)

            return numA - numB
        })

        //Adding a value and option to the option to have a translated 
        const optionsWithLabel = filteredDuration.map(
            (option) => {
                if (languageParentWindow === 'eng') {
                    return {
                        label: option,
                        value: option
                    }
                } else {
                    if (option === '1 day') {
                        return {
                            label: parseInt(option) + ' ' + t('offer.day'),
                            value: option
                        }
                    } else return {
                        label: parseInt(option) + ' ' + t('offer.days'),
                        value: option
                    }
                }
            }
        )


        setOptions(optionsWithLabel)

    }, [offerCtx.selectedValidity, offerCtx.data, updatedContent, props.key])

    const filterOptions = (options, { inputValue }) => {
        return options.filter((option) =>
            option.value.toLowerCase().startsWith(inputValue.toLowerCase())
        );
    };

    const handleChange = (event, value) => {
        // offerCtx.changeCapacity(value);
        if (value) offerCtx.changeValidity(value.value);
        else {
            offerCtx.changeValidity(null)
            handleReset()       
        }
        setupdatedContent(true)
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
                        openText={t('label.open')}
                        closeText={t('label.close')}
                        clearText={t('label.clear')}
                        key={props.key}
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