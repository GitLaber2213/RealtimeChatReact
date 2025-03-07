import React from "react"
import classes from './menu-list.module.css'
import MenuItem from "./menu-item"
import { DeleteIcon, FavoriteIcon, useFavorites, useMessages } from "../../../../shared"
import { useParams } from "react-router-dom"


export const MenuList = ({ groupChatEdit }) => {
    const { id } = useParams()
    const { loading, addFavorite, deleteFavorite, isFavorite } = useFavorites(id)
    const { deleteChat } = useMessages()


    const handleDeleteMessages = async () => {
        if (!loading) await deleteChat()
    }

    const handleAddFavorite = async () => {
        if (!loading) await addFavorite(id)
    }

    const handleDeleteFavorite = async () => {
        if (!loading) await deleteFavorite(id)
    }

    return (
        <div className={classes.menuList}>
            <MenuItem
                handleClick={isFavorite ? handleDeleteFavorite : handleAddFavorite}
                image={FavoriteIcon}
                text={isFavorite ? "Delete from favorite" : "Add in favorite"}
                imgHeight={25}
                imgWidth={25}
                loading={loading} />

            {groupChatEdit &&
                <MenuItem handleClick={handleDeleteMessages}
                    image={DeleteIcon}
                    text={"Delete chat"}
                    imgHeight={25}
                    imgWidth={25} />
            }
        </div>
    )
}

export default MenuList