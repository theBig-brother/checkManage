import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { PictureOutlined, UserOutlined, SettingOutlined, AppstoreAddOutlined, UploadOutlined } from '@ant-design/icons';

const Sidebar: React.FC = () => {
  const menuItems = [
    { key: '1', icon: <PictureOutlined />, path: '/', label: 'ImageViewer' },  // Image Viewer
    { key: '2', icon: <UploadOutlined />, path: '/uploader', label: 'Uploader' }, // File Upload
    { key: '3', icon: <UserOutlined />, path: '/users', label: 'Users' },      // User Management
    { key: '4', icon: <SettingOutlined />, path: '/settings', label: 'Settings' }, // Settings
    { key: '5', icon: <AppstoreAddOutlined />, path: '/test', label: 'Test' },  // Test / Tools
 
  ];

  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      {menuItems.map(item => (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.path}>{item.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default Sidebar;
