import React from 'react'
import Doubt from '../../course_info/doubtbatch/Doubt'
import { useParams } from 'react-router-dom'
import LockPopupModal from '../lock-popup/LockPopup'

const PrePurchaseCommunity = ({ subjectId,
    setLockModal,
    lockModal,
    course,
    selectedValidity, }) => {

    const { batchSlug } = useParams()
    return (
        <div>
            <LockPopupModal setLockModal={setLockModal} lockModal={lockModal} text='Community' selectedValidity={selectedValidity} course={course} />
            <Doubt
                setLockModal={setLockModal}
                prePurchase={true}
                batchSlug={batchSlug}
                batchId={course?.data?.id}
            /></div>
    )
}

export default PrePurchaseCommunity