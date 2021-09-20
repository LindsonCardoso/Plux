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
      { name: "statements",  path: "#", label: "Statements", onClick },
      { name: "reports", path: "#", label: "Reports", onClick }
    ]
  },
  "divider",
  {
    name: "settings",
    label: "Settings",
    Icon: SettingsIcon,
    path: "#",
    items: [
      { name: "profile", label: "Profile", path:"/profile" },
      { name: "insurance", label: "Insurance",  path: "#", onClick },
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