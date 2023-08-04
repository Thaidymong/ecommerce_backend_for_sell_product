import React, { Children, useEffect, useState } from "react";
import { request } from "../../util/api";
import PageContainer from "../../component/page/PageContainer";
import { Button, Space, Table } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { dayForClient, dayForServer, getText } from "../../util/service";
import dayjs from "dayjs";

const CartPage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getListCart();
  }, []);
  const getListCart = (text_search) => {
    setLoading(true);
    var params = "";
    if (text_search != null) {
      params = "?text_search=" + text_search;
    }

    request("get", "/cart/get-all" + params, {}).then((res) => {
      console.log(res.data.list);
      setList(res.data.list);
      setLoading(false);
    });
  };
  const onRemoveCart = (cart_id) => {
    console.log("Cart ID : " + cart_id);
    var url = "/cart/remove/" + cart_id;
    request("delete", url, {}).then((res) => {
      if (res) {
        alert(res.data.message);
        getListCart();
      }
    });
  };

  return (
    <PageContainer
      title="CartPage"
      // title={getText("title_category")}
      loading={loading}
      onSearch={getListCart}
    >
      <Table
        columns={[
          {
            key: 0,
            title: "NO",
            render: (item, items, index) => index + 1,
          },
          {
            key: 1,
            title: "Customer Id",
            dataIndex: "customer_id",
          },
          {
            key: 2,
            title: "Product Id",
            dataIndex: "product_id",
          },
          {
            key: 3,
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            key: 4,
            title: "Created",
            dataIndex: "create_at",
            render: (item) => {
              return dayForClient(item);
            },
          },

          {
            key: 5,
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
                    onClick={() => onRemoveCart(items.cart_id)}
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
    </PageContainer>
  );
};
export default CartPage;
