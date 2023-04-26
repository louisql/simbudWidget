import { Autocomplete, TextField, styled } from "@mui/material"
import { useEffect, useState } from "react"

const CountrySelector = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)
    const [countries, setCountries] = useState([])


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


                setCountries(loadedCountries);
            })
            .catch((error) => {
                setIsLoaded(true)

                setError(error);
                // console.log(response.body);
            });
    }, [])



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

    const CustomListbox = styled("ul")({
        padding: 0,
        margin: 0,
        listStyle: "none",
        textAlign: "left",
      });

    if (error) {
        return <div>Error: {error}</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        console.log(options)
        return (
            <>
                <input type='text' placeholder='Which country are you going to?'></input>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    sx={{ width: 300 }}
                    filterOptions={filterOptions}
                    ListboxComponent={CustomListbox}
                    renderInput={(params) => <TextField {...params} label="Countries" />}
                />
            </>

        )

    }


}

export default CountrySelector