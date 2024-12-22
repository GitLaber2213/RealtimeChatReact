import React from "react"
import classes from './search-input.module.css'

export const SearchInput = ({placeholder, value, onChange}) => {
    return <input className={classes.searchInput} type="text" placeholder={placeholder} value={value} onChange={onChange} />
}

export default SearchInput