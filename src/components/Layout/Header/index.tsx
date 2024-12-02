import DropDownMenu from "./DropDownMenu";

const Header = () => {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <DropDownMenu />
        
      </div>
    </header>
  )
}

export default Header;