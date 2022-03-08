import React from "react";

import { Button } from "../Button/Button"

import './ModalAdd.scss'

export function ModalAdd({ children, closeModal }) {
    return (
        <div style={{width: '100%', display:'flex', position: 'fixed', justifyContent:'center'}}>
            <div className="modaladd">
                <div>
                    <Button estilo='btn2' onClick={e => closeModal(e)}>X</Button>
                </div>
                <div className='content'>
                    {children}
                </div>
            </div>
        </div>
    )
}