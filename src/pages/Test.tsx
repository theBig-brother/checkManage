import React, { useState } from 'react';
import { Button, Input, Card, message } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const Test: React.FC = () => {
  const [userText, setUserText] = useState<string>('No data available.');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUserText = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get<{ text: string }>('http://127.0.0.1:8000/testapi'); // 替换为实际 API
      const data = response.data;
console.log("data",data);

      if (data) {
        setUserText(data.toString());
      } else {
        setUserText('No data available from the server.');
      }
    } catch (error) {
      console.error('Error fetching user text:', error);
      message.error('Failed to fetch user data.');
      setUserText('No data available.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Card title="Test" style={{ width: '100%' }}>
        <Button type="primary" onClick={fetchUserText} loading={isLoading}>
          Fetch User Text
        </Button>
        <TextArea
          rows={8}
          value={userText}
          placeholder="The user data will be displayed here."
          readOnly
          style={{ marginTop: 20 }}
        />
      </Card>
    </div>
  );
};

export default Test;
