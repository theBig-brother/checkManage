import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { PictureOutlined, UserOutlined, SettingOutlined, AppstoreAddOutlined } from '@ant-design/icons';

const Sidebar: React.FC = () => {
  const menuItems = [
    { key: '1', icon: <PictureOutlined />, label:  <Link to={'/'}>ImageViewer</Link>,path:"/" },  // Image Viewer
    // { key: '2', icon: <UploadOutlined />, path: '/uploader', label: 'Uploader' }, // File Upload
    { key: '3', icon: <UserOutlined />,  label:<Link to={'/users'}>Users</Link> ,path:"/users" },      // User Management
    { key: '4', icon: <SettingOutlined />,  label:<Link to={'/settings'}>Settings</Link>  ,path:"/settings"}, // Settings
    { key: '5', icon: <AppstoreAddOutlined />, label: <Link to={'/test'}>Test</Link>,path:"/test" },  // Test / Tools

  ];
  let keys="0";
  const location = useLocation(); // 获取当前路由路径
  for (let index = 0; index < menuItems.length; index++) {
    const element = menuItems[index];
    if(element.path===location.pathname){
      keys=element.key;
    }
  }
  // selectedKeys={[location.pathname]} 
  return (
    <Menu theme="dark" selectedKeys={[keys]}  mode="inline" items={menuItems} />
    // <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
    //   {menuItems.map(item => (
    //     <Menu.Item key={item.key} icon={item.icon}>
    //       <Link to={item.path}>{item.label}</Link>
    //     </Menu.Item>
    //   ))}
    // </Menu>
  );
};

export default Sidebar;
