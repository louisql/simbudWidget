import './CountrySelector.css';

import { Autocomplete, TextField } from "@mui/material"
import { useContext } from "react"
import OfferContext from '../../store/OfferContext';

const CountrySelector = () => {
    const offerCtx = useContext(OfferContext)

    const options = offerCtx.loadedCountries.map(
        (country) => (
            country.name
        )
    )

    const filterOptions = (options, { inputValue }) => {
        return options.filter((option) =>
            option.toLowerCase().startsWith(inputValue.toLowerCase())
        );
    };

    const handleChange = (event, value) => {
        if (value) offerCtx.changeCountry(value);
        // offerCtx.changeCapacity(offerCtx.selectedCapacity)
        offerCtx.changeCapacity(null);
        offerCtx.changeValidity(null);

    }

    if (offerCtx.error) {
        return <div>Error: {offerCtx.error}</div>
    } else if (!offerCtx.isLoaded) {
        return <div>Loading...</div>
    } else {
        return (
            <>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    sx={{ width: 250 }}
                    filterOptions={filterOptions}
                    defaultValue={offerCtx.selectedCountry}
                    onChange={handleChange}
                    renderInput={(params) =>

                        <TextField
                            {...params}
                            label="Choose your destination"
                            borderRadius="16px"
                            style={{
                                textAlign: "left",
                                color: "black"
                            }}
                        />}
                />
            </>
        )
    }
}

export default CountrySelector