import { Children, createContext, isValidElement, useContext, useEffect, useMemo, useState } from 'react'

const RouterContext = createContext(null)

const readLocation = () => ({
  pathname: window.location.pathname || '/',
  search: window.location.search,
  hash: window.location.hash,
})

const isPlainLeftClick = (event) =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey

export function BrowserRouter({ children }) {
  const [location, setLocation] = useState(readLocation)

  useEffect(() => {
    const handleNavigation = () => setLocation(readLocation())
    window.addEventListener('popstate', handleNavigation)
    window.addEventListener('app:navigate', handleNavigation)
    return () => {
      window.removeEventListener('popstate', handleNavigation)
      window.removeEventListener('app:navigate', handleNavigation)
    }
  }, [])

  const navigate = (destination, { replace = false } = {}) => {
    const url = new URL(destination, window.location.origin)
    if (url.origin !== window.location.origin) {
      window.location.assign(url.href)
      return
    }

    window.history[replace ? 'replaceState' : 'pushState']({}, '', `${url.pathname}${url.search}${url.hash}`)
    window.dispatchEvent(new Event('app:navigate'))
  }

  const value = useMemo(() => ({ location, navigate }), [location])
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useLocation() {
  const router = useContext(RouterContext)
  if (!router) throw new Error('useLocation must be used inside BrowserRouter')
  return router.location
}

export function Link({ to, onClick, target, children, ...props }) {
  const router = useContext(RouterContext)
  const href = typeof to === 'string' ? to : `${to.pathname || ''}${to.search || ''}${to.hash || ''}`

  const handleClick = (event) => {
    onClick?.(event)
    if (event.defaultPrevented || !router || target === '_blank' || !isPlainLeftClick(event)) return

    const destination = new URL(href, window.location.origin)
    if (destination.origin !== window.location.origin) return

    event.preventDefault()
    router.navigate(`${destination.pathname}${destination.search}${destination.hash}`)
  }

  return (
    <a href={href} target={target} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}

export function NavLink({ to, end = false, className, children, ...props }) {
  const { pathname } = useLocation()
  const targetPath = new URL(typeof to === 'string' ? to : to.pathname, window.location.origin).pathname
  const isActive = end ? pathname === targetPath : pathname === targetPath || pathname.startsWith(`${targetPath}/`)
  const resolvedClassName = typeof className === 'function' ? className({ isActive }) : className
  const resolvedChildren = typeof children === 'function' ? children({ isActive }) : children

  return (
    <Link to={to} className={resolvedClassName} aria-current={isActive ? 'page' : undefined} {...props}>
      {resolvedChildren}
    </Link>
  )
}

export function Route() {
  return null
}

export function Routes({ children, location }) {
  const currentLocation = useLocation()
  const pathname = location?.pathname || currentLocation.pathname
  const routes = Children.toArray(children).filter(isValidElement)
  const matchedRoute = routes.find((route) => route.props.path === pathname)
  return matchedRoute?.props.element ?? null
}

export function useSearchParams() {
  const { search } = useLocation()
  const router = useContext(RouterContext)
  const params = useMemo(() => new URLSearchParams(search), [search])

  const setSearchParams = (nextParams, options) => {
    const resolved = typeof nextParams === 'function' ? nextParams(new URLSearchParams(search)) : nextParams
    const query = resolved instanceof URLSearchParams ? resolved.toString() : new URLSearchParams(resolved).toString()
    router.navigate(`${window.location.pathname}${query ? `?${query}` : ''}`, options)
  }

  return [params, setSearchParams]
}
