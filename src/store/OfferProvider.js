import OfferContext from "./OfferContext";

import { useState, useEffect } from "react";

const OfferProvider = (props) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)
    const [countries, setCountries] = useState([])
    const [fetchedData, setFetchedData] = useState([])

    const [offer, setOffer] = useState("Canada")

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
                setFetchedData(dataJSON)
                setCountries(loadedCountries);
            })
            .catch((error) => {
                setIsLoaded(true)
                setError(error);
                // console.log(response.body);
            });
    }, [])

    return (
        <OfferContext.Provider value={offer}>
            {props.children}

        </OfferContext.Provider>
    )
}

export default OfferProvider