import { MenuIcon } from "../../assets/icons/MenuIcon";
import logo from "../../assets/logo.svg";

export default function Header() {
  return (
    <header className="h-[68px] flex items-center p-[10px] border-b border-gray-200">
      <img src={logo} alt="logo" className="h-[18px]" />
      <nav className="flex items-center ml-auto">
        <ul className="flex gap-8 text-[0.9rem] text-gray-500 font-light">
          <li>Signup</li>
          <li>About</li>
          <li>Products</li>
          <li>Pricing</li>
          <li>Support</li>
        </ul>
        <MenuIcon className="text-2xl ml-8 text-gray-700"/>
      </nav>
    </header>
  );
}
