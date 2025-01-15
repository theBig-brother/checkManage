import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, Image, Pagination, Spin, message, Layout, Typography } from "antd";
import styles from "./SafetyGallery.module.css"; // 引入样式

const { Footer } = Layout;
const { Title } = Typography;

const SafetyGallery: React.FC = () => {
  // 页码状态
  const [page, setPage] = useState<number>(1);
  // 图片数据状态
  const [images, setImages] = useState<string[]>([]);
  // 总页数状态
  const [totalPages, setTotalPages] = useState<number>(0);
  // 加载状态
  const [loading, setLoading] = useState<boolean>(false);

  // 后端 API URL
  const apiUrl = "http://127.0.0.1:8000/api/images/";

  // 请求图片数据
  const fetchImages = async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl, { params: { page: pageNumber } });
      const { images = [], totalImages = 0 } = response.data;

      setImages(images);
      setTotalPages(Math.ceil(totalImages / 20)); // 每页 20 张图片
    } catch (error) {
      console.error("图片加载失败:", error);
      message.error("图片加载失败，请检查服务器");
    } finally {
      setLoading(false);
    }
  };

  // 删除图片
  const handleDelete = async (imageUrl: string) => {
    try {
      // 发送 DELETE 请求
      await axios.delete(apiUrl, { data: { imageUrl } });
      // 删除成功后更新图片列表
      setImages((prevImages) => prevImages.filter((item) => item !== imageUrl));
      message.success("图片删除成功");
    } catch (error) {
      console.error("删除图片失败:", error);
      message.error("删除图片失败，请检查服务器");
    }
  };

  // 页码变化时触发
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    fetchImages(pageNumber);
  };

  // 组件加载时请求第一页数据
  useEffect(() => {
    fetchImages(page);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f0f2f5" }}>
      {/* 页面内容 */}
      <div className={styles.container}>
        <Title level={2} className={styles.title}>
          工地安全检查图库
        </Title>
        {loading ? (
          <div className={styles.loading}>
            <Spin tip="加载中..." size="large" />
          </div>
        ) : (
          <div className={styles.imageGrid}>
            {images.map((item, index) => (
              <div key={index} className={styles.imageItem}>
                <Image
                  src={item}
                  alt={`工地图片 ${index + 1}`}
                  className={styles.image}
                />
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(item)}
                >
                  删除
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 分页组件 */}
      <Footer className={styles.footer}>
        <Pagination
          current={page}
          total={totalPages * 20} // 每页 20 张图片
          pageSize={20}
          onChange={handlePageChange}
          className={styles.pagination}
        />
      </Footer>
    </Layout>
  );
};

export default SafetyGallery;
