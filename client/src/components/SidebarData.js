import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { IoMdHelp } from "react-icons/io";

export const SidebarData = [
    
  {
    
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
//   {
//     title: 'Projects',
//     path: 'projects',
//     icon: <AiIcons.AiFillProject />,
//     cName: 'nav-text'
//   },
  
  
  {
    title: 'Team',
    path: '/team',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
 
//   {
//     title: 'Tasks',
//     path: '/tasks',
//     icon: <FaIcons. FaTasks/>,
//     cName: 'nav-text'
//   },
 
  {
    title: 'Repository',
    path: '/repository',
    icon: <RiIcons. RiGitRepositoryPrivateLine/>,
    cName: 'nav-text'
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  
  {
    title: 'Calendar',
    path: '/calendar',
    icon: <FaIcons.FaCalendarAlt/>,
    cName: 'nav-text'
  },
  // {
  //   title: 'Reminders',
  //   path: '/reminders',
  //   icon: <FaIcons.FaBell/>,
  //   cName: 'nav-text'
  // },
  {
    title: 'FAQ',
    path: '/faq',
    icon: <IoMdHelp/>,
    cName: 'nav-text'
  },
  {
    title: 'Settings',
    path: '/setting',
    icon: <IoIcons.IoIosSettings />,
    cName: 'nav-text'
  },
{
    title: 'Logout',
    path: '/logout',
    icon: <AiIcons.AiOutlineLogout />,
    cName: 'nav-text'
  }

];