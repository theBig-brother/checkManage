import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import SafetyGallery from './pages/SafetyGallery';
import Users from './pages/Users';
import Test from './pages/Test';
import Settings from './pages/Settings';
import './App.css';

const { Content, Sider } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }} className='theBack'>
        <Sider collapsible>
          <Sidebar />
        </Sider>
        <Layout>
          <Content style={{ margin: '16px' }}>
            <Routes>
              <Route path="/" element={<SafetyGallery />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/test" element={<Test />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
