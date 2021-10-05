import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import ReceiptIcon from "@material-ui/icons/Receipt";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import SettingsIcon from "@material-ui/icons/Settings";
import Sidebar from "./Sidebar";

function onClick(e, item) {
  window.alert(JSON.stringify(item, null, 2));
}

const items = [
  { name: "dashboard",  label: "Dashboard", path: "/dashboard", Icon: HomeIcon },
  {
    name: "ponto",
    label: "Ponto",
    Icon: ReceiptIcon,
    path: "#",
    items: [
      { name: "Controle de ponto",  path: "#", label: "Statements", onClick },
      { name: "reports", path: "#", label: "Reports", onClick }
    ]
  },
  {
    name: "Empresa",
    label: "Empresa",
    Icon: ReceiptIcon,
    path: "#",
    items: [
      "divider",
      {
        name: "Funcionario",
        label: "Funcionario",
        Icon: NotificationsIcon,
        path: "#",
        items: [
          { name: "Cadastro de Funcionário", label: "Cadastro de funcionário", onClick },
          { name: "sms", label: "SMS" }
        ]
      },
      "divider",
      {
        name: "Parametrizações",
        label: "Parametrizações",
        Icon: NotificationsIcon,
        path: "#",
        items: [
          { name: "Departamentos", label: "Departamentos", onClick },
          { name: "Cargos", label: "Cargos" },
          { name: "Turnos", label: "Turnos" },
          { name: "Motivos de ajustes", label: "Motivos de ajustes" },
          { name: "Regra de ponto", label: "Regra de ponto", onClick },
         
        ]
      },
    ]
  },
  {
    name: "Relatórios",
    label: "Relatórios",
    Icon: ReceiptIcon,
    path: "#",
    items: [
      { name: "Horas/funcionários",  path: "#", label: "Horas/funcionário", onClick },
      { name: "Ajustes", path: "#", label: "Ajustes", onClick },
      { name: "Registro fora da empresa", path: "#", label: "Registro fora da empresa", onClick }
    ]
  },
  "divider",
  {
    name: "settings",
    label: "Settings",
    Icon: SettingsIcon,
    path: "#",
    items: [
      { name: "Administrativo", label: "Adminstrativo", path:"/profile" },
      "divider",
      {
        name: "notifications",
        label: "Notifications",
        Icon: NotificationsIcon,
        path: "#",
        items: [
          { name: "email", label: "Email", onClick },
          { name: "sms", label: "SMS" }
        ]
      }
    ]
  }
];

function SidebarItem() {
  return (
    <div>
      <Sidebar items={items} />
    </div>
  );
}

export default SidebarItem;