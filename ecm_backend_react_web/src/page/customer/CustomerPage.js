import React, { useEffect, useState } from "react";
import { request } from "../../util/api";
import "./CustomerPage.css";
import PageContainer from "../../component/page/PageContainer";
import { Table, Space, Button } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { dayForClient } from "../../util/service";
import CustomerFormModal from "./CustomerFormModal";

const CustomerPage = () => {
  const [list, setList] = useState([]); // store data from database and show in page
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getListCustomer();
  }, []);

  const getListCustomer = (text_search) => {
    setLoading(true);
    var params = "";
    if (text_search != null) {
      params = "?text_search=" + text_search;
    }
    request("get", "/customer/get-list" + params, {}).then((res) => {
      // console.log(res)
      setList(res.data.list);
      setLoading(false);
    });
  };

  const onClickEdit = (items) => {
    // alert(item.firstname)
    console.log(items);
    setVisible(true);
    // setTimeout
  };
  const handleOpenModal = () => {
    setVisible(true);
  };
  const handleCloseModal = () => {
    setVisible(false);
  };

  const onFinish = (items) => {
    // alert(items.firstname)
    // return
    handleCloseModal(true);
    setLoading(true);
    var data = {
      firstname: items.firstname,
      lastname: items.lastname,
      gender: items.gender,
      username: items.username,
      password: items.password,
    };
    request("post", "/customer/create", data).then((res) => {
      if (res.data) {
        getListCustomer();
        setLoading(false);
      }
    }); // bos data by body json
  };
  const onRemoveCustomer = (customer_id) => {
    console.log("Customer ID : " + customer_id);
    var url = "/customer/remove/" + customer_id;
    // var url = `/customer/remove/${customer_id}` // same like the one below
    request("delete", url, {}).then((res) => {
      if (res) {
        alert(res.data.message);
        getListCustomer();
      }
    });
  };
  return (
    <PageContainer
      title="Customer"
      onSearch={getListCustomer}
      onBtnRight={handleOpenModal}
      btnRight={"New Customer"}
    >
      <Table
        columns={[
          {
            key: "0",
            title: "NO",
            // dataIndex: ""
            render: (item, items, index) => index + 1,
          },
          {
            key: "1",
            title: "First Name",
            dataIndex: "firstname",
          },
          {
            key: "2",
            title: "Last Name",
            dataIndex: "lastname",
          },
          {
            key: "3",
            title: "Gender",
            dataIndex: "gender",
            render: (item) => {
              return item == 1 ? "Male" : "Female";
            },
          },
          {
            key: "4",
            title: "Username",
            dataIndex: "username",
          },
          {
            key: "5",
            title: "Created",
            dataIndex: "create_at",
            render: (item) => {
              return dayForClient(item);
            },
          },
          {
            key: "6",
            title: "Action",
            render: (items, index) => {
              return (
                <Space>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => onClickEdit(items)}
                  >
                    <EditFilled />
                  </Button>
                  <Button
                    danger={true}
                    size="small"
                    color="red"
                    onClick={() => onRemoveCustomer(items.customer_id)}
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
      <CustomerFormModal
        open={visible}
        onCancel={handleCloseModal}
        onFinish={onFinish}
      />
    </PageContainer>
  );
};
export default CustomerPage;

//  <table border={1}>
// <thead>
//     <tr>
//         <th>No</th>
//         <th>First Name</th>
//         <th>Lst Name</th>
//         <th>Gender</th>
//         <th>Username</th>
//         <th>Password</th>
//         <th>Create</th>
//         <th>Action</th>
//     </tr>
// </thead>
//  <tbody>
//      {
//         list.map((item, index) => {
//             return (
//                 <tr className="border_bottom" key={index}>
//  <td>{index + 1}</td>
//                     <td>{item.firstname}</td>
//                     <td>{item.lastname}</td>
//                     <td>{item.gender == 1 ? "Male" : "Female"}</td>
//                     <td>{item.username}</td>
//                     <td>{item.password}</td>
//                     <td>{item.create_at}</td>
//                     <td>
//                         <button onClick={() => onClickEdit(item)}>Edit</button>
//                         <button onClick={() => onRemoveCustomer(item.customer_id)}>Remove</button>
//                     </td>
//                 </tr>
//             )
//         })
//     }
// </tbody>
// </table>
// {list.map((item,index)=>{
//     return(
//         <div key={index}>
//             <div>{item.firstname}</div>
//             <div>{item.lastname}</div> <br/>
//         </div>
//     )
// })}
