import {
  IconHome,
  IconDashboard,
  IconBox,
  IconFileText,
  IconFile,
  IconSettings,
  IconUser,
  IconNotes,
  IconChartPie,
  IconClipboard,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Recursos",
  },
  {
    id: uniqueId(),
    title: "Produtos",
    icon: IconBox,
    href: "/recursos/products",
  },
  {
    id: uniqueId(),
    title: "Documentação",
    icon: IconFileText, 
    href: "/recursos/documentation",
  },
  {
    id: uniqueId(),
    title: "Relatórios",
    icon: IconChartPie, 
    href: "/recursos/reports",
  },
  {
    id: uniqueId(),
    title: "Notas",
    icon: IconClipboard, 
    href: "/recursos/notes",
  },
  {
    navlabel: true,
    subheader: "Outros",
  },
  {
    id: uniqueId(),
    title: "Configurações",
    icon: IconSettings, 
    href: "/settings",
  },
  {
    id: uniqueId(),
    title: "Perfil",
    icon: IconUser, 
    href: "/profile",
  },
];

export default Menuitems;
