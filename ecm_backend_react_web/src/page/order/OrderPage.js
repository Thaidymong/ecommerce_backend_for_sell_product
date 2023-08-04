import React, { Children, useEffect, useState } from "react";
import { request } from "../../util/api";
import PageContainer from "../../component/page/PageContainer";
import { Button, Space, Table } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { dayForClient } from "../../util/service";

const OrderPage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getListOrder();
  }, []);
  const getListOrder = (text_search) => {
    setLoading(true);
    var params = "";
    if (text_search != null) {
      params = "?text_search=" + text_search;
    }

    request("get", "/order/get-all" + params, {}).then((res) => {
      console.log(res.data.list);
      setList(res.data.list);
      setLoading(false);
    });
  };
  const onRemoveOrder = (order_id) => {
    console.log("Order ID : " + order_id);
    var url = "/order/remove/" + order_id;
    request("delete", url, {}).then((res) => {
      if (res) {
        alert(res.data.message);
        getListOrder();
      }
    });
  };

  return (
    <PageContainer
      title="OrderPage"
      // title={getText("title_category")}
      loading={loading}
      // onSearch={getListOrder}
      //  onBtnRight={handleOpenModal}
      btnRight={"New Order"}
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
            title: "Customer ID",
            dataIndex: "customer_id",
          },
          {
            key: 2,
            title: "First Name",
            dataIndex: "firstname",
          },
          {
            key: 3,
            title: "last Name",
            dataIndex: "lastname",
          },
          {
            key: 4,
            title: "Telephone",
            dataIndex: "tel",
          },
          {
            key: 5,
            title: "Email",
            dataIndex: "email",
          },
          {
            key: 6,
            title: "Address",
            dataIndex: "address",
          },
          {
            key: 7,
            title: "Comment",
            dataIndex: "comment",
          },
          {
            key: 8,
            title: "Total Order",
            dataIndex: "total_order",
          },
          {
            key: 9,
            title: "Payment Method",
            dataIndex: "payment_method",
          },
          {
            key: 10,
            title: "Order Status",
            dataIndex: "order_status",
          },
          {
            key: 11,
            title: "Created",
            dataIndex: "create_at",
            render: (item) => {
              return dayForClient(item);
            },
          },
          {
            key: 12,
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
                    onClick={() => onRemoveOrder(items.order_id)}
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
      {/* <OrderForm
                 itemUpdate={itemUpdate}
                 open={visible}
                 onCancle={handleCloseModal}
                 onFinish={onFinish}
                 onChangeImage = {onChangeImage}
                 imagePreView={imageObject && URL.createObjectURL(imageObject)}
                 // onClickRemoveImage={onClickRemoveImage}
            
            /> */}
    </PageContainer>
  );
};
export default OrderPage;
