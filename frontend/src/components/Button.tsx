import React, { MouseEventHandler } from "react"

type ButtonProps = {
    onClick: MouseEventHandler,
    text: string,
}

const Button = ({ onClick, text }: ButtonProps) => (
    <button className="btn indian" onClick={onClick}>
        {text}
    </button>
)

export default Button
