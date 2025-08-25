import React from 'react'
import Quizzes from '../../course_info/quizzes/Quizzes'

const BeforePurchaseQuiz = ({ setLockModal,
    lockModal,
    course,
    selectedValidity, }) => {
    // console.log('Course', course)
    return (
        <div>
            <Quizzes batchId={course?.data?.id} prePurchase={true} setLockModal={setLockModal}
                lockModal={lockModal}
                course={course}
                selectedValidity={selectedValidity} />
        </div>
    )
}

export default BeforePurchaseQuiz