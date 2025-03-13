import React, { useState, useEffect } from "react";
import { Row, Col, Button, Image, Pagination, Spin, message, Layout, Typography, Modal } from "antd";
import styles from "./SafetyGallery.css"; // 引入样式
import axiosInstance from "../axios/axios"
const { Footer } = Layout;
const { Title } = Typography;
const images_per_page = 18;
const SafetyGallery: React.FC = () => {
  // 页码状态
  const [page, setPage] = useState<number>(1);
  // 图片数据状态
  const [imageInfo, setImageInfo] = useState<string[]>([]);
  // 总页数状态
  const [totalPages, setTotalPages] = useState<number>(0);
  // 加载状态
  const [loading, setLoading] = useState<boolean>(false);
  //删除弹窗
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 删除哪个
  const [imageId, setImageId] = useState<number>(1);
  // 后端 API URL
  const apiUrl = "/management/images";

  // 请求图片数据
  const fetchImages = async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(apiUrl,
        { params: { page: pageNumber, quantity: images_per_page } });
      const { imageInfo = null, totalImages = 0 } = response.data;
      setImageInfo(imageInfo);
      setTotalPages(Math.ceil(totalImages / images_per_page)); // 每页 20 张图片
    } catch (error) {
      console.error("图片加载失败:", error);
      message.error("图片加载失败，请检查服务器");
    } finally {
      setLoading(false);
    }
  };

  // 删除图片
  const handleDelete = async () => {
    axiosInstance
      .delete(apiUrl, { data: { imageId } })
      .then(() => {
        // 删除成功后更新图片列表
        fetchImages(page);
        message.success("图片删除成功");
      })
      .catch((error) => {
        console.error("删除图片失败:", error);
        message.error("删除图片失败，请检查服务器");
      });
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
  useEffect(() => {
    if (imageInfo.length === 0 && totalPages >= 1) {
      setPage(page - 1);
      fetchImages(page);
    }

  }, [imageInfo]); // 依赖于 imageInfo，当它变化时触发

  const showModal = (id: string) => {
    setImageId(Number(id));
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleDelete();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    // <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f0f2f5" }} className="">
    <Layout className={styles.theBig}>
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
          <div>
            <Row gutter={16}>
              {imageInfo.map((item, index) => (
                <Col span={4} key={index}>
                  <div className={styles.imageItem}>
                    <Image
                      src={axiosInstance.defaults.baseURL + item[1]}
                      alt={`工地图片 ${index + 1}`}
                      className={styles.image}

                    />
                    {/* () => handleDelete(item[0]) */}
                    <Button
                      className={styles.deleteButton}
                      onClick={() => showModal(item[0])}
                    >
                      删除
                    </Button>

                  </div>
                </Col>
              ))}
            </Row>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
          </div>
        )}
      </div>
      {/* 分页组件 */}
      <Footer className={styles.footer}>
        <Pagination
          current={page}
          total={totalPages * images_per_page} // 每页 20 张图片
          pageSize={20}
          onChange={handlePageChange}
          className={styles.pagination}
        />
      </Footer>
    </Layout>
  );
};

export default SafetyGallery;
