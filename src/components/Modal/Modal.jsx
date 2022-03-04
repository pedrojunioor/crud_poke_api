import React from "react";

import './Modal.scss'

export function Modal({ children, closeModal }) {
    return (
        <div className="modal">
            <div>
                <button onClick={() => { closeModal() }}>X</button>
            </div>
            <div className="modal-content">
                {children}
            </div>
        </div>
    )
}