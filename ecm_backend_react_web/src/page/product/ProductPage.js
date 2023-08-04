import React, { Children, useEffect, useState } from "react";
import { request } from "../../util/api";
import PageContainer from "../../component/page/PageContainer";
import { Button, Space, Table } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { dayForClient, dayForServer, getText } from "../../util/service";
import ProductFormModal from "./ProductFormModal";

const ProductPage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getListProduct();
  }, []);

  const handleOpenModal = () => {
    setVisible(true);
  };
  const handleCloseModal = () => {
    setVisible(false);
  };

  const getListProduct = (text_search) => {
    var params = "";
    if (text_search != null) {
      params = "?text_search=" + text_search;
    }
    request("get", "/product/get-all" + params, {}).then((res) => {
      setList(res.data.list);
      // setList(true)
    });
  };

  const onRemoveProduct = (product_id) => {
    console.log("Product ID : " + product_id);
    var url = "/product/remove/" + product_id;
    // var url = `/customer/remove/${customer_id}` // same like the one below
    request("delete", url, {}).then((res) => {
      if (res) {
        alert(res.data.message);
        getListProduct();
      }
    });
  };

  const onFinish = (items) => {
    handleCloseModal(true);
  };

  return (
    <PageContainer
      // title="ProductPage"
      title={getText("product")}
      loading={loading}
      onSearch={getListProduct}
      onBtnRight={handleOpenModal}
      btnRight={"New Product"}
    >
      <Table
        columns={[
          {
            key: 0,
            title: "Product NO",
            render: (item, items, index) => index + 1,
          },
          {
            key: 1,
            title: "Category_ID",
            dataIndex: "category_id",
          },
          {
            key: 2,
            title: "Product Name ",
            dataIndex: "name",
          },
          {
            key: 3,
            title: "Price",
            dataIndex: "price",
          },
          {
            key: 4,
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            key: 5,
            title: "Description",
            dataIndex: "description",
          },
          {
            key: 6,
            title: "Image",
            dataIndex: "image",
          },
          {
            key: 7,
            title: "Status",
            dataIndex: "status",
            render: (item) => {
              return item == 1 ? "Active" : "Disabled";
            },
          },
          {
            key: 8,
            title: "Created",
            dataIndex: "create_at",
            render: (item) => {
              return dayForClient(item);
            },
          },
          {
            key: 9,
            title: "Action",
            render: (items, index) => {
              return (
                <Space>
                  <Button type="primary" size="small">
                    <EditFilled />
                  </Button>
                  <Button
                    danger={true}
                    size="small"
                    onClick={() => onRemoveProduct(items.product_id)}
                  >
                    <DeleteFilled />
                  </Button>
                </Space>
              );
            },
          },
        ]}
        dataSource={list}
      />

      <ProductFormModal
        open={visible}
        onFinishForm={handleCloseModal}
        onCancel={handleCloseModal}
        onFinish={onFinish}
      />
    </PageContainer>
  );
};
export default ProductPage;
