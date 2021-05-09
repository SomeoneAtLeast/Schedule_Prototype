import React from "react";
import {connect} from "react-redux"

import "./unsaved-changes-modal.scss"


const UnsavedChangesModal = () => {


    return (
        <div className="unsaved-changes-modal">
            У вас есть несохраненные изменения.
        </div>
    )

}


export default connect()(UnsavedChangesModal);