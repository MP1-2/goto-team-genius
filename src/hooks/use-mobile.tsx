
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

// Helper function to check if the user is on a mobile device
export function checkIsMobileDevice() {
  if (typeof navigator === 'undefined') return false
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

// Combined hook that checks both screen size and device type
export function useIsMobileOrMobileDevice() {
  const isMobileScreen = useIsMobile()
  const [isMobileDevice, setIsMobileDevice] = React.useState<boolean>(false)
  
  React.useEffect(() => {
    setIsMobileDevice(checkIsMobileDevice())
  }, [])
  
  return isMobileScreen || isMobileDevice
}
