import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import user from './iconos/login.svg'
import profile from './iconos/userPanel.svg'
import carrito from './iconos/carrito2.svg';
import './modal.css'
import { Link } from 'react-router-dom';

export default function UserModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        <>
            <div className='div-user button' onClick={handleShow}>
                <img src={user} alt='logo de usuario' />
            </div>
            {/* <div className='button'>
                <Button variant="outline-info" onClick={handleShow}>
                    <img src={user} alt='imagen de usuario' />
                </Button>
            </div> */}

            <div className='div-modal'>
                <Modal
                    show={show}
                    onHide={handleClose}
                    animation={false}
                    // contentClassName='prueba'
                    centered
                    // className='prueba'
                    style={{ left: '35%', top: '-10%' }}
                    size='sm'
                >
                    <Modal.Header className='modal-header'>
                        <div className='modal-header-div'>
                            {/* Cambiar por una imagen diferente o placeholder */}
                            <img src={user}
                                alt="imagen usuario"
                                width={100}
                                height={100} />
                            <h2>Nombre de usuario</h2>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='modal-body-div'>
                            {/* <Link to='/Editarperfil'>
                                <Button variant="outline-primary" className='modal-body-div-buttom'>
                                    <img src={profile} alt='imagen usuario' />
                                    Mi Perfil
                                </Button>
                            </Link> */}
                            {/* <Link to=''>
                                <Button variant="outline-primary" className='modal-body-div-buttom'>
                                    <img src={carrito} alt='carrito de compras' />
                                    Mi carrito
                                </Button>
                            </Link> */}
                        </div>

                    </Modal.Body>
                    <Modal.Footer className='modal-footer-yo'>
                        <div className='d-flex flex-row align-items-center justify-content-center pb-4 mb-4'>
                            <div>
                                {/* <Link to='/'>
                                    <Button variant="outline-danger" className='mx-2'>
                                        Cerrar Sesión
                                    </Button>
                                </Link> */}
                                <Link to='/Register'>
                                    <Button variant="success" className='mx-2'>
                                        {/* <img src={profile} alt='imagen usuario' /> */}
                                        Registrarse
                                    </Button>
                                </Link>
                            </div>
                            <div>
                                <Link to='/Login'>
                                    <Button variant="outline-success" className='mx-2'>
                                        {/* <img src={profile} alt='imagen usuario' /> */}
                                        Iniciar Sesión
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}