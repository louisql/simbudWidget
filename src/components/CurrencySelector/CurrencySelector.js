import { Autocomplete, TextField } from "@mui/material"
import { useContext, useEffect } from 'react';

import CurrencyContext from "../../store/CurrencyContext";

import {useTranslation} from "react-i18next";

const CurrencySelector = () => {

    const currencyCtx = useContext(CurrencyContext)

    const selectedCurrency = currencyCtx.selectedCurrency
    const currencies = currencyCtx.loadedCurrencies
    const options = Object.keys(currencies)

    const handleChange = (event, value) => {
        if(value !== null) currencyCtx.changeCurrency(value);
    }

    const {t, i18n} = useTranslation('common');
    
    return (
        <Autocomplete
            disablePortal
            openText={t('label.open')}
            closeText={t('label.close')}
            clearText={t('label.clear')}
            id="combo-box-demo"
            options={options}
            sx={{ width: 150 }}
            // filterOptions={filterOptions}
            value={selectedCurrency}
            onChange={handleChange}
            renderInput={(params) =>

                <TextField
                    {...params}
                    isOptionEqualToValue={(option, value) => option === value}
                    // label="Select capacity"
                    label={t('offer.currency')}
                    borderRadius="16px"
                    style={{
                        textAlign: "left",
                        color: "black"
                    }}
                />
            }
        />
    )
}

export default CurrencySelector