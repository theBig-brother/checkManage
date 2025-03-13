import React from 'react';
import { Button,  Card, Avatar } from 'antd';

  // 后端 API URL

const Users: React.FC = () => {

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
    <Card className="w-full max-w-md shadow-lg rounded-2xl" bordered={false}>
      <div className="flex flex-col items-center">
        <Avatar size={96} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="User Avatar" />
        <h2 className="text-xl font-semibold mt-4">用户名</h2>
        <p className="text-gray-500">user@example.com</p>
      </div>
    </Card>

    <Card className="w-full max-w-md shadow-lg rounded-2xl" bordered={false}>
      <h3 className="text-lg font-medium">个人信息</h3>
      <ul className="mt-2 text-gray-600 space-y-2">
        <li>性别: 男</li>
        <li>年龄: 25</li>
        <li>所在地: 北京</li>
      </ul>
    </Card>

    <Button type="primary" danger className="w-full max-w-md">
      退出登录
    </Button>
  </div>
  );
};

export default Users;
