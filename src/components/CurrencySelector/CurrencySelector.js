import { Autocomplete, TextField } from "@mui/material"


const CurrencySelector = () => {

    let options = 'USD';

    const filterOptions = (options, { inputValue }) => {
        return options.filter((option) =>
            option.toLowerCase().startsWith(inputValue.toLowerCase())
        );
    };

    const handleChange = (event, value) => {
        // offerCtx.changeCapacity(value);
        console.log('updating currency')
    }
    
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            sx={{ width: 150 }}
            filterOptions={filterOptions}
            // defaultValue={defaultCapacity ?? " "}
            onChange={handleChange}
            renderInput={(params) =>

                <TextField
                    {...params}
                    isOptionEqualToValue={(option, value) => option === value}
                    // label="Select capacity"
                    label={options}
                    borderRadius="16px"
                    style={{
                        textAlign: "left",
                        color: "black"
                    }}
                />}
        />
    )
}

export default CurrencySelector