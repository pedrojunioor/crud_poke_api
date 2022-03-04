import React from 'react'
import './Button.scss'

export function Button({ estilo, ...props }) {

    return (
        <div>
            <button
                className={`${estilo}`}
                {...props}
            />
        </div>
    )
}