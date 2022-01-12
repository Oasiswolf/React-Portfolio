import { faTrash, faSignOutAlt, faEdit, faFileUpload, faSpinner, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'


const Icons = () => {
    return library.add(faTrash, faSignOutAlt, faEdit, faFileUpload, faSpinner, faPlusSquare)
}

export default Icons;