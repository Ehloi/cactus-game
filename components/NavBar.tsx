import Link from "next/link";

const Navbar = () => {
  const menuItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Opened", href: "/opened-games" },
    { name: "Private Games", href: "/private-games" },
    { name: "Create Game", href: "/create-game" },
  ];

  return (
    <nav className="bg-white shadow mb-6">
      <ul className="flex space-x-4">
        {menuItems.map((item, index) => (
          <li key={index} className="text-blue-600 hover:text-blue-800">
            <Link href={item.href} className="py-4 px-6 block">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
