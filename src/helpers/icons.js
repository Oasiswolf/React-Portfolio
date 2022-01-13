import {
	faTrash,
	faSignOutAlt,
	faEdit,
	faFileUpload,
	faSpinner,
	faPlusSquare,
	faPhoneSquare,
	faEnvelopeSquare,
	faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

const Icons = () => {
	return library.add(
		faTrash,
		faSignOutAlt,
		faEdit,
		faFileUpload,
		faSpinner,
		faPlusSquare,
		faPhoneSquare,
		faEnvelopeSquare,
		faMapMarkerAlt
	);
};

export default Icons;
