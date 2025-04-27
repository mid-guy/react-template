import { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export default function Button(props: ButtonProps) {
  const { className = '', ...rest } = props
  return (
    <button
      className={`flex items-center justify-center cursor-pointer ${className}`}
      type="button"
      {...rest}
    />
  )
}
