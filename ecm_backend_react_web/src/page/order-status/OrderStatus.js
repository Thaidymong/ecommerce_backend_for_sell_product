import React, { Children, useEffect, useState } from "react";
import { request } from "../../util/api";
import PageContainer from "../../component/page/PageContainer";
import { Button, Space, Table } from "antd";
import { EditFilled, DeleteFilled, SelectOutlined } from "@ant-design/icons";
import { dayForClient, dayForServer, getText } from "../../util/service";
import dayjs from "dayjs";

const OrderStatus = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getListOrderStatus();
  }, []);

  const getListOrderStatus = (text_search) => {
    setLoading(true);
    var params = "";
    if (text_search != null) {
      params = "?text_search=" + text_search;
    }
    request("get", "/order-status/get-all" + params, {}).then((res) => {
      setList(res.data.list);
      setLoading(false);
    });
  };
  const onRemoveOrderStatus = (order_status_id) => {
    console.log("Order Status ID : " + order_status_id);
    var url = "/order_status/remove/" + order_status_id;
    // var url = `/customer/remove/${customer_id}` // same like the one below
    request("delete", url, {}).then((res) => {
      if (res) {
        alert(res.data.message);
        getListOrderStatus();
      }
    });
    // http://localhost:8088/api/customer/remove/10
  };

  return (
    <PageContainer
      title="OrderStatus"
      loading={loading}
      onSearch={getListOrderStatus}
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
            title: "Order Status Name",
            dataIndex: "name",
          },
          {
            key: 2,
            title: "Code",
            dataIndex: "code",
          },
          {
            key: 3,
            title: "Description",
            dataIndex: "description",
          },
          {
            key: 4,
            title: "Status",
            dataIndex: "status",
            render: (item) => {
              return item == 1 ? "Active" : "Disabled";
            },
          },
          {
            key: 5,
            title: "Created",
            dataIndex: "create_at",
            render: (item) => {
              return dayForClient(item);
            },
          },
          {
            key: 6,
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
                    onClick={() => onRemoveOrderStatus(items.order_status_id)}
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
export default OrderStatus;
