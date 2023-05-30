import { Autocomplete, TextField } from "@mui/material"
import { useContext } from 'react';

import CurrencyContext from "../../store/CurrencyContext";

import {useTranslation} from "react-i18next";

const CurrencySelector = () => {

    const currencyCtx = useContext(CurrencyContext)

    const selectedCurrency = currencyCtx.selectedCurrency
    const currencies = currencyCtx.loadedCurrencies


    // const filterOptions = (options, { inputValue }) => {
    //     return options.filter((option) =>
    //         option.toLowerCase().startsWith(inputValue.toLowerCase())
    //     );
    // };

    const handleChange = (event, value) => {
        if(value !== null) currencyCtx.changeCurrency(value);
    }

    const {t, i18n} = useTranslation('common');
    
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={currencies}
            sx={{ width: 150 }}
            // filterOptions={filterOptions}
            defaultValue={selectedCurrency}
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