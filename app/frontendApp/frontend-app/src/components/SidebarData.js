import React from "react";

import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";

export const SidebarData = [
    {
        title : 'Início',
        path: '/',
        icon: <MdIcons.MdOutlineDriveFolderUpload/>,
        cName: 'nav-text'
    },
    {
        title : 'Relatório',
        path: '/relatorio',
        icon: <IoIcons.IoIosPaper/>,
        cName: 'nav-text'
    },
    {
        title : 'Políticas',
        path: '/politicas',
        icon: <IoIcons.IoIosAlert/>,
        cName: 'nav-text'
    },
]