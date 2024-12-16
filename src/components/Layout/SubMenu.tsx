import { NavLink, useLocation } from "react-router-dom"

const SubMenu = () => {
  const { pathname } = useLocation();
  const endpoint = pathname.split('/')[2]

  return (
    <div className="fixed top-[74px] font-chakraPetch px-4 sm:px-10 flex items-center gap-2 right-0 left-0 z-50 bg-backgroundSecondary">
      <NavLink to={`/chat/${endpoint}`} className="text-lg font-bold">
        {({ isActive }) => (
          <button className={`${isActive ? 'bg-buttonPrimary border-borderPrimary text-fontPrimary hover:border-borderSecondary hover:bg-buttonSecondary hover:text-fontSecondary' : 'bg-transparent text-fontTertiary hover:border-borderPrimary hover:bg-buttonPrimary'}  my-2 py-1`}>
            Chat
          </button>
        )}
      </NavLink>
      <NavLink to={`/chat/${endpoint}/history`} className="text-lg font-bold">
        {({ isActive }) => (
          <button className={`${isActive ? 'bg-buttonPrimary border-borderPrimary text-fontPrimary hover:border-borderSecondary hover:bg-buttonSecondary hover:text-fontSecondary' : 'bg-transparent text-fontTertiary hover:border-borderPrimary hover:bg-buttonPrimary'}  my-2 py-1`}>
            History
          </button>
        )}
      </NavLink>
      <NavLink to={`/chat/${endpoint}/setting`} className="text-lg font-bold">
        {({ isActive }) => (
          <button className={`${isActive ? 'bg-buttonPrimary border-borderPrimary text-fontPrimary hover:border-borderSecondary hover:bg-buttonSecondary hover:text-fontSecondary' : 'bg-transparent text-fontTertiary hover:border-borderPrimary hover:bg-buttonPrimary'}  my-2 py-1`}>
            Settings
          </button>
        )}
      </NavLink>
    </div>
  )
}

export default SubMenu