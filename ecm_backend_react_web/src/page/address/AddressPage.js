import React, { Children, useEffect, useState } from "react";
import { request } from "../../util/api";
import PageContainer from "../../component/page/PageContainer";
import { Button, Space, Table } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { dayForClient, dayForServer, getText } from "../../util/service";
import dayjs from "dayjs";
import AddressForm from "./AddressForm";

const AddressPage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getListAddress();
  }, []);
  const getListAddress = (text_search) => {
    setLoading(true);
    var params = "";
    if (text_search != null) {
      params = "?text_search=" + text_search;
    }

    request("get", "/address/get-all" + params, {}).then((res) => {
      console.log(res.data.list);
      setList(res.data.list);
      setLoading(false);
    });
  };
  const onRemoveAddress = (address_id) => {
    console.log("Address ID : " + address_id);
    var url = "/address/remove/" + address_id;
    request("delete", url, {}).then((res) => {
      if (res) {
        alert(res.data.message);
        getListAddress();
      }
    });
  };

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  return (
    <PageContainer
      title="AddressPage"
      // title={getText("title_category")}
      loading={loading}
      onSearch={getListAddress}
      btnRight={"New Address"}
      onBtnRight={handleOpenModal}
    >
      <Table
        columns={[
          {
            key: 0,
            title: "Address NO",
            render: (item, items, index) => index + 1,
          },
          {
            key: 1,
            title: "Customer Id",
            dataIndex: "customer_id",
          },
          {
            key: 2,
            title: "Privince Id",
            dataIndex: "province_id",
          },
          {
            key: 3,
            title: "First Name",
            dataIndex: "firstname",
          },
          {
            key: 4,
            title: "Last Name",
            dataIndex: "lastname",
          },
          {
            key: 5,
            title: "Telephone",
            dataIndex: "tel",
          },
          {
            key: 6,
            title: "Email",
            dataIndex: "email",
          },
          {
            key: 7,
            title: "Address Description",
            dataIndex: "address_description",
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
                    onClick={() => onRemoveAddress(items.address_id)}
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

      {/* < AddressForm
                open={visible}
                onCancle={handleCloseModal}
            
            
            /> */}

      {/* <div>
                {
                    list.map((item,index)=>{
                        return(
                            <div key={index}>
                                <div>{item.address_description}</div>
                            </div>
                        )
                    })
                }
            </div> */}
    </PageContainer>
  );
};
export default AddressPage;
