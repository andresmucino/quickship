export const menuList = [
  { link: "#", title: "Inicio" },
  { link: "#", title: "Nosotros" },
  { link: "#", title: "Servicios" },
  { link: "#", title: "Contacto" },
];

export const Menu = () => {
  return (
    <>
      {menuList.map((i, index) => (
        <div key={index}>
          <a href={i.link} className="text-slate-50 hover:text-gray-400">
            {i.title}
          </a>
        </div>
      ))}
    </>
  );
};
