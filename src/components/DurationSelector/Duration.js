import classes from './DurationSelector.module.css'

import { Autocomplete, TextField } from "@mui/material"
import { useContext } from 'react'
import OfferContext from '../../store/OfferContext'


const DurationSelector = (props) => {
    const offerCtx = useContext(OfferContext)

    

    return (
        <span>Duration selection</span>
    )
}

export default DurationSelector;