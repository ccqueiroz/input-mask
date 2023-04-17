import React, { InputHTMLAttributes } from 'react'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string
}

function Input(props: Props) {
    console.log('props', props)
    return <div>
        <input {...props} />
    </div>
}

export default Input;