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


                setCountries(loadedCountries);
            })
            .catch((error) => {
                setIsLoaded(true)

                setError(error);
                // console.log(response.body);
            });
    }, [])

    if (error) {
        return <div>Error: {error}</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        console.log(JSON.stringify({countries}))
        return (
            <input type='text' placeholder='Which country are you going to?'></input>
        )

    }


}

export default CountrySelector