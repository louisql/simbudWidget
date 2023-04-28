import './CountrySelector.css';

import { Autocomplete, TextField } from "@mui/material"
import { useEffect, useState, useContext } from "react"
import OfferContext from '../../store/OfferContext';

const CountrySelector = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)
    const [countries, setCountries] = useState([])
    const offerCtx = useContext(OfferContext)

    console.log(offerCtx)

    const widgetDefaultCountry = 'Canada'

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error while fetching the data');
                }
            })
            .then((dataJSON) => {
                setIsLoaded(true)

                const loadedCountries = [];

                for (const key in dataJSON) {
                    loadedCountries.push({
                        id: key,
                        name: dataJSON[key].name.common,
                        code: dataJSON[key].cca3
                    })
                }

                loadedCountries.sort((a, b) => {
                    return a.name.localeCompare(b.name)
                })
                console.log(dataJSON)
                setCountries(loadedCountries);
            })
            .catch((error) => {
                setIsLoaded(true)
                setError(error);
                // console.log(response.body);
            });
    }, [])


    //Code here to update things when a
    useEffect(() => {
        
    }, [countries])

    const options = countries.map(
        (country) => (
            country.name
        )
    )

    const filterOptions = (options, { inputValue }) => {
        return options.filter((option) =>
            option.toLowerCase().startsWith(inputValue.toLowerCase())
        );
    };


    if (error) {
        return <div>Error: {error}</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        // console.log(options)
        return (
            <>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    sx={{ width: 300 }}
                    filterOptions={filterOptions}
                    defaultValue={widgetDefaultCountry}
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