import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CoursesData } from '../../context/courses/Courses';
import './NameModal.css'
import toast, { Toaster } from "react-hot-toast";
const style = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    // border: '3px solid lightgray',
    boxShadow: 24,
    borderRadius: '20px',
    p: 4,
};

export default function NameModal({ updateName, setUpdateName }) {
    const [open, setOpen] = React.useState(updateName);
    const handleOpen = () => setUpdateName(true);
    const handleClose = () => setUpdateName(false);
    const [name, setName] = React.useState('');
    const handleChange = (e) => { setName(e.target.value) }
    const { updateUserName } = React.useContext(CoursesData);

    const handleUpdate = () => {
        if (name.trim() === '') {
            // Display an error message or take appropriate action for empty input
            // console.error('Name cannot be empty');
            toast.dismiss()
            toast.error("Please Enter Your Name")
            return;
        }

        updateUserName(name, window.location.href);
        handleClose();
    }

    return (
        <div>
            <Modal
                open={updateName}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ textAlign: 'center', fontSize: '20px', fontWeight: '500' }}>
                        Update Your Name
                    </Typography>

                    <input
                        type='text'
                        required
                        value={name}
                        onChange={(e) => handleChange(e)}
                        style={{ width: '100%', height: '40px', mt: 2, outline: 'none', paddingLeft: 2, marginTop: '20px', marginBottom: '20px', borderRadius: '5px' }}
                    />

                    <Button
                        variant='rounded'
                        className='updateButton'
                        sx={{ background: '#9603f2', color: ' white' }}
                        onClick={handleUpdate}
                    >
                        Update
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
