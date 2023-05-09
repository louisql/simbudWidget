import { Autocomplete, TextField } from "@mui/material"

import {useTranslation} from "react-i18next";

const CurrencySelector = () => {

    let options = [];

    // const filterOptions = (options, { inputValue }) => {
    //     return options.filter((option) =>
    //         option.toLowerCase().startsWith(inputValue.toLowerCase())
    //     );
    // };

    const handleChange = (event, value) => {
        // offerCtx.changeCapacity(value);
        console.log('updating currency')
    }

    const {t, i18n} = useTranslation('common');
    
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            sx={{ width: 150 }}
            // filterOptions={filterOptions}
            defaultValue='USD'
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