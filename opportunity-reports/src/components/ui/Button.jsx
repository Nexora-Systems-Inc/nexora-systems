import { Link } from 'react-router-dom'
import './Button.css'

export function Button({
  children,
  to,
  href,
  variant = 'primary',
  className = '',
  ...props
}) {
  const classes = `btn btn-${variant} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
