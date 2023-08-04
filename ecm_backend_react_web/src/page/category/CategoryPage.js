import React, { useEffect, useState } from "react";
import { request } from "../../util/api";
import PageContainer from "../../component/page/PageContainer";
import { Button, Space, Table, notification, Modal, Image } from "antd";
import {
  EditFilled,
  DeleteFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { dayForClient, getText } from "../../util/service";
import CategoryFormModal from "./CategoryFormModal";
import { image_path } from "../../util/service";

const CategoryPage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [api, contextHolder] = notification.useNotification(); // notification
  const { confirm } = Modal; // For ask yes or no before delete category
  const [itemUpdate, setItemUpdate] = useState(null); // for change on form New Category and Update Category
  const [imageObject, setImageObject] = useState(null);

  useEffect(() => {
    getListCategory();
  }, []);

  const getListCategory = (text_search) => {
    setLoading(true);
    var params = "";
    if (text_search != null) {
      params = "?text_search=" + text_search;
    }

    request("get", "/category/get-all" + params, {}).then((res) => {
      // then is block of server to respone data
      // console.log(res)
      // to know data that we catch from database example  easy to know like =>res.data.list by inspect in point right mouse in res
      //  debugger
      // console.log(res.data.list)
      setList(res.data.list);
      console.log(res.data.list);

      // setTimeout(()=>{
      //     setLoading(false)
      // },500); // how to delay
      setLoading(false);
    });
  };

  // const onClickRemoveImage=()=>{
  //     setImageObject(null)
  // }

  const onRemoveCategory = (category_id) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: "Are you sure to remove?",
      onOk() {
        var url = "/category/remove/" + category_id;
        request("delete", url, {}).then((res) => {
          if (res.data) {
            api["success"]({
              message: "Delete",
              description: res.data.message,
            });
            getListCategory();
          }
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });

    // // console.log("Category ID : " + category_id)
    // var url = "/category/remove/" + category_id
    // // var url = `/customer/remove/${customer_id}` // same like the one below
    // request("delete", url, {}).then(res => {
    //     if (res.data) {
    //         // alert(res.data.message)
    //         // message.success(res.data.message)
    //         api["success"]({
    //             message : "Delete",
    //             description : res.data.message
    //         })
    //         getListCategory()
    //         setLoading(false)
    //     }
    // })
  };
  const onChangeImage = (even) => {
    var fileObject = even.target.files[0];
    // console.log(fileObject)
    setImageObject(fileObject);
  };

  const handleOpenModal = () => {
    setVisible(true);
  };
  const handleCloseModal = () => {
    setVisible(false);
    setItemUpdate(null);
  };
  const onClickBtnEdit = (items) => {
    setItemUpdate(items);
    setVisible(true);
  };
  const onFinish = (items) => {
    // alert(items.name)
    // var name = items.name
    handleCloseModal(true);
    setLoading(true);
    // var data = { // body json data // for insert data in react with no picture
    //     "name": items.name,
    //     "description": items.description,
    //     "image": items.image
    // }

    var myFormdata = new FormData();
    myFormdata.append("name", items.name);
    myFormdata.append("description", items.description);
    myFormdata.append("image_upload", imageObject, imageObject.filename);

    var method = "post",
      url = "/category/create"; //  for both create and update on (OnFinish)
    if (itemUpdate != null) {
      method = "put";
      url = "/category/update";
      myFormdata["category_id"] = itemUpdate.category_id; // add new property to object data
    }
    request(method, url, myFormdata).then((res) => {
      if (res.data) {
        getListCategory();
        setLoading(false);
        api["success"]({
          message: itemUpdate == null ? "Created" : "Updated",
          description: res.data.message,
        });
      }
    }); // bos data by body json
  };
  return (
    <PageContainer
      // title="Category"
      title={getText("title_category")}
      loading={loading}
      onBtnRight={handleOpenModal}
      btnRight={"New Category"}
      onSearch={getListCategory}
    >
      {contextHolder}
      <Table
        columns={[
          {
            key: 0,
            title: "NO",
            render: (item, items, index) => index + 1,
          },
          {
            key: 1,
            title: "Category Name",
            dataIndex: "name",
          },
          {
            key: 2,
            title: "Image",
            dataIndex: "image",
            render: (item, items, index) => {
              return (
                <Image
                  src={image_path + item}
                  width={90}
                  // height={80}
                />
              );
            },
          },
          {
            key: 3,
            title: "Description",
            dataIndex: "description",
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
                  <Button
                    onClick={() => onClickBtnEdit(items)}
                    type="primary"
                    size="small"
                  >
                    <EditFilled />
                  </Button>
                  <Button
                    danger={true}
                    size="small"
                    onClick={() => onRemoveCategory(items.category_id)}
                  >
                    <DeleteFilled />
                  </Button>
                  {/* <Button danger={true} size="small"><DeleteFilled/>{getText("btn_save")} </Button> */}
                </Space>
              );
            },
          },
        ]}
        dataSource={list}
      />

      <CategoryFormModal
        itemUpdate={itemUpdate}
        open={visible}
        onCancle={handleCloseModal}
        onFinish={onFinish}
        onChangeImage={onChangeImage}
        imagePreView={imageObject && URL.createObjectURL(imageObject)}
        // onClickRemoveImage={onClickRemoveImage}
      />

      {/* <div>
             {list.map((item,index)=>{
                return(
                    <div key={index}>
                        <div>{item.name}</div>
                    </div>
                )
            })}
           </div> */}
    </PageContainer>
  );
};
export default CategoryPage;
