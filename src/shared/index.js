//ASSETS//
import DeleteIcon from './assets/delete.png'
import DropDownMenuIcon from './assets/dropDownMenu.png'
import EmailIcon from './assets/email.png'
import GroupIcon from './assets/group.png'
import LogoutIcon from './assets/logout.png'
import MenuBarIcon from './assets/menuBar.png'
import PhoneIcon from './assets/phone.png'
import SendMessageIcon from './assets/send.png'
import FavoriteIcon from './assets/star.png'
import UserIcon from './assets/user.png'
import UserNameIcon from './assets/userName.png'
import WebSiteIcon from './assets/website.png'
import EditIcon from './assets/editIcon.png'
import PasswordIcon from './assets/password.png'
import EnterMessageIcon from './assets/enterMessageIcon.png'
import AddImageIcon from './assets/addImageIcon.png'

export {
    DeleteIcon,
    DropDownMenuIcon,
    EmailIcon,
    GroupIcon,
    LogoutIcon,
    MenuBarIcon,
    PhoneIcon,
    SendMessageIcon,
    FavoriteIcon,
    UserIcon,
    UserNameIcon,
    WebSiteIcon,
    EditIcon,
    PasswordIcon,
    EnterMessageIcon,
    AddImageIcon
}

//UI//
export { SearchInput } from './ui/search-input/search-input'
export { FormInput } from './ui/form-input/form-input'
export { ItemInList } from './ui/item-in-list/item-in-list'
export { ResizableElement } from './ui/resizable-element/resizable-element'
export { Button } from './ui/button/button'
export { ScrollBar } from './ui/scroll-bar/scroll-bar'
export { Loader } from './ui/loader/loader'

//LIB//
export { useObserver } from './lib/hooks/use-observer'
export { useFormatNumber } from './lib/hooks/use-format-number'
export { useAuth } from './lib/firebase-hooks/use-auth'
export { useFetchChats } from './lib/firebase-hooks/use-fetch-chats'
export { useFetchUserByUid } from './lib/firebase-hooks/use-fetch-user-by-uid'
export { useFavorites } from './lib/firebase-hooks/use-favorites'
export { useUpdateProfile } from './lib/firebase-hooks/use-update-profile'
export { useMessages } from './lib/firebase-hooks/use-messages'
export { useCreateGroup } from './lib/firebase-hooks/use-create-group'

//CONSTANTS//
export { SuccessConstants, FirebaseConstants, RouteConstants, SuccessConstantsKey } from './constants/constants'

//CONTEXTS//
export { AuthContext } from './contexts/auth-context'

