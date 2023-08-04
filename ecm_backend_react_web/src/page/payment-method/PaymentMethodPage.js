import React, { Children, useEffect, useState } from "react";
import { request } from "../../util/api";
import PageContainer from "../../component/page/PageContainer";
import { Button, Space, Table } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { dayForClient, dayForServer, getText } from "../../util/service";
import dayjs from "dayjs";

const PaymentMethodPage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getListPaymentMethod();
  }, []);

  const getListPaymentMethod = (text_search) => {
    setLoading(true);
    var params = "";
    if (text_search != null) {
      params = "?text_search=" + text_search;
    }
    request("get", "/payment-method/get-all" + params, {}).then((res) => {
      // console.log(res.data.list)
      setList(res.data.list);
      setLoading(false);
      //  setTimeout(()=>{
      //     setLoading(false)
      // },1000); // how to delay
    });
  };
  const onRemovePaymentMethod = (payment_method_id) => {
    console.log("Payment Method ID : " + payment_method_id);
    var url = "/payment-method/remove/" + payment_method_id;
    request("delete", url, {}).then((res) => {
      if (res) {
        alert(res.data.message);
        getListPaymentMethod();
      }
    });
  };

  return (
    <PageContainer
      title="PaymentMethod"
      // title={getText("title_category")}
      loading={loading}
      onSearch={getListPaymentMethod}
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
            title: "Payment Name",
            dataIndex: "name",
          },
          {
            key: 2,
            title: "Code",
            dataIndex: "code",
          },
          {
            key: 3,
            title: "Status",
            dataIndex: "status",
            render: (item) => {
              return item == 1 ? "Active" : "Disabled";
            },
          },
          {
            key: 4,
            title: "Sort Order",
            dataIndex: "sort_order",
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
                    onClick={() =>
                      onRemovePaymentMethod(items.payment_method_id)
                    }
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
export default PaymentMethodPage;
