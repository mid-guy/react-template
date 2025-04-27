import { InputHTMLAttributes } from "react"

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export default function Input(props: InputProps) {
  const { className = '', ...rest } = props
  return (
    <input className={`flex-1 min-w-0 text-center outline-0 ${className}`} {...rest} />
  )
}