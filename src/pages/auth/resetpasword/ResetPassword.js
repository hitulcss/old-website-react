import React from 'react'
import login_bg from '../../../assets/login/login_bg.png';
import reset_password_img from '../../../assets/login/reset_password_img.png';
import './ResetPassword.css'
import { Button, Typography } from '@mui/material';

import OutlinedInput from '@mui/material/OutlinedInput';

const ResetPassword = () => {

    return (
        <div className='reset_password_container'>
            <div className='reset_password_left'>
                <img src={login_bg} style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
            </div>
            <div className='reset_password_right'>
                <div className='reset_password_right_img'>
                    <img src={reset_password_img} alt='reset_password' style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                </div>
                <Typography className='reset_password_right_title' mb={4} sx={{ fontWeight: '600', fontSize: '28px', }}>Reset Password </Typography>
                <div className='reset_password_right_input_container'>
                    <OutlinedInput className='reset_password_input' placeholder="Enter reset_password Code" />

                </div>

                <div className='reset_password_right_button_cont'>
                    <Button className='reset_password_right_button' sx={{
                        bordeRadius: '30px',
                        background: 'var(--Primary--Color, rgba(150, 3, 242, 0.75))'
                    }}>Verify</Button>
                </div>

            </div>
        </div >
    )
}

export default ResetPassword