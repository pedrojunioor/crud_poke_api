import React from "react";

import { Button } from "../Button/Button"

import './Modal.scss'

export function Modal({ children, closeModal }) {
    return (
        <div className="modal">
            <div>
                <Button estilo='btn2' onClick={e =>  closeModal(e) }>X</Button>
            </div>
            <div className='content'>
                {children}
            </div>
        </div>
    )
}