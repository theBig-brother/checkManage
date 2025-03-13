// import React, { useState } from "react";
// import { Button, Upload, message, Space } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import axios from "axios";
// import { UploadFile } from "antd/es/upload/interface"; // 导入类型
// // 显式声明 fileList 类型为 UploadFile[]


// const ImageUploader = () => {
//   // 上传文件的状态
//   const [fileList, setFileList] = useState<UploadFile[]>([]);

//   // 上传文件时触发的函数
//   const handleFileChange = ({ fileList: newFileList }) => {
//     console.log("文件列表：", newFileList);
//     setFileList(newFileList);
//   };

//   // 上传图片到服务器的函数
//   const handleUpload = () => {
//     if (fileList.length === 0) {
//       message.error("请先选择图片文件");
//       return;
//     }
   
//     const formData = new FormData();
//   // 确保 fileList[0] 存在并且不是 undefined
//   if (fileList[0] && fileList[0].originFileObj) {
//     formData.append("image", fileList[0].originFileObj); // 现在可以安全地使用 originFileObj
//   }
//     console.log("文件列表1：", formData.get("image"));
//     axios({
//       method: "post",
//       url: "http://127.0.0.1:8000/api/images/",
//       data: formData,
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//       .then((response) => {
//         message.success("图片上传成功");
//         setFileList([]);
//       })
//       .catch((error) => {
//         console.error("错误信息：", error.response ? error.response.data : error.message);
//         message.error("图片上传失败，请检查服务器");
//       });
//   };
  
//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
//       <h1>图片上传</h1>
//       <Space direction="vertical" size="large" style={{ width: "100%" }}>
//         <Upload
//           fileList={fileList}
//           onChange={handleFileChange}
//           beforeUpload={() => false} // 禁止自动上传，手动点击上传
//           accept="image/*" // 限制上传图片类型
//         >
//           <Button icon={<UploadOutlined />}>选择图片</Button>
//         </Upload>

//         <Button
//           type="primary"
//           onClick={handleUpload}
//           disabled={fileList.length === 0} // 没有选择文件时禁用按钮
//         >
//           上传图片
//         </Button>
//       </Space>
//     </div>
//   );
// };

// export default ImageUploader;
