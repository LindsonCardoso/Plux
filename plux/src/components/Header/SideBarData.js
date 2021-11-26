import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import ReceiptIcon from "@material-ui/icons/Receipt";
import BusinessIcon from '@material-ui/icons/Business';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import SettingsIcon from "@material-ui/icons/Settings";
import Sidebar from "./Sidebar";

function onClick(e, item) {
  window.alert(JSON.stringify(item, null, 2));
}

const items = [
  { name: "dashboard",  label: "Dashboard", path: "/dashboard", Icon: HomeIcon },
  "divider",
  
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
  "divider",
  {
    name: "Empresa",
    label: "Empresa",
    Icon: BusinessIcon,
    path: "#",
    items: [
      "divider",
      {
        name: "Funcionario",
        label: "Funcionario",
        Icon: GroupAddIcon,
        path: "#",
        items: [
          { name: "Cadastro de Funcionário", label: "Cadastro de funcionário", path: "/cadastro-de-funcionario"},
          { name: "Cadastro", label: "Cadastro" }
        ]
      },
    
      {
        name: "Parametrizações",
        label: "Parametrizações",
        Icon: "",
        path: "#",
        items: [
          { name: "Departamentos", label: "Departamentos", onClick },
          { name: "Cargos", label: "Cargos" },
          { name: "Turnos", label: "Turnos" },
          { name: "Motivos de ajustes", label: "Motivos de ajustes" },
          { name: "Regra de ponto", label: "Regra de ponto", onClick },
         
        ]
      },
      {
        name: "Administrativo",
        label: "Administrativo",
        Icon: GroupAddIcon,
        path: "/administrativo",   
    }, 
  
    
    ]
  },   "divider",
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
  { name: "Bater ponto",  label: "Bater ponto", path: "/registrar-ponto", Icon: HomeIcon },
  "divider",
  {
    name: "Configuração",
    label: "Configuração",
    Icon: SettingsIcon,
    path: "#",
    items: [
      { name: "Profile", label: "Profile", path:"/profile" },
    
      {
        name: "notifications",
        label: "Notifications",
        Icon: "",
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