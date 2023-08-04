import { Modal, Form, Input, Space, Button, Divider } from "antd";
import { useEffect, DeleteFilled } from "react";

const CategoryFormModal = ({
  open,
  onCancle,
  onFinish,
  itemUpdate,
  onChangeImage,
  imagePreView,
  onClickRemoveImage,
}) => {
  useEffect(() => {
    // for catch data and store on form update
    if (itemUpdate != null) {
      form.setFieldsValue({
        name: itemUpdate.name,
        description: itemUpdate.description,
      });
    }
  }, [itemUpdate]);

  const [form] = Form.useForm();
  const onFinishForm = (items) => {
    // console.log(items)
    onFinish(items);
    form.resetFields();
  };

  return (
    <div>
      <Modal
        title={itemUpdate == null ? "New Category" : "Update Category"}
        open={open}
        onCancel={() => [
          // reset fill after click on update and then click new category
          onCancle(),
          form.resetFields(),
        ]}
        maskClosable={true} // if user dont click on button X or cancel, It doesnot close model
        footer={null} // hide defult footer button
      >
        <Form
          name="Category form"
          layout="vertical"
          onFinish={onFinishForm}
          form={form}
        >
          <Divider />
          <Form.Item
            label={"Category Name"}
            name={"name"}
            rules={[
              {
                required: true,
                message: "Please fill in category name",
              },
            ]}
          >
            <Input placeholder="Category name"></Input>
          </Form.Item>
          <Form.Item label={"Category Description"} name={"description"}>
            <Input placeholder="Category Description"></Input>
          </Form.Item>
          <Form.Item label={"Select Image Category"}>
            <label
              style={{
                display: "inline-block",
                backgroundColor: "#eee",
                cursor: "pointer",
                height: 80,
                width: 80,
                position: "relative",
                borderRadius: 10,
              }}
              for="upload"
            >
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              >
                {/* <Dropdown
                                    menu={{
                                        items,
                                    }}
                                    placement="topCenter"
                                    arrow
                                > */}
                {imagePreView ? (
                  <div>
                    <img src={imagePreView} alt={imagePreView} width={80} />
                  </div>
                ) : (
                  <div>Image</div>
                )}
                {/* </Dropdown> */}
              </div>
              <input
                onChange={onChangeImage}
                style={{ display: "none" }}
                type="file"
                id="upload"
              />
            </label>
          </Form.Item>
          {/* <Form.Item
                        label={"Select Category Image"}
                    >
                        <Input type='file'
                            onChange={onChangeImage}
                        />

                        {imagePreView && 
                            <div>
                                <Image
                                    src={imagePreView}
                                    alt={imagePreView}
                                    width={100}
                                />
                            </div>
                        }
                    </Form.Item> */}
          <Form.Item style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={onCancle}>Cancel</Button>
              <Button htmlType="submit" type="primary">
                {itemUpdate == null ? "Save" : "Update"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryFormModal;
