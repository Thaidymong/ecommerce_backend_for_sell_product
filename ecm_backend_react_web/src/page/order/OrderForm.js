import { Modal, Form, Input, Space, Button, Divider } from "antd";
import { useEffect } from "react";

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
            label={"Customer ID"}
            name={"Customer_id"}
            rules={[
              {
                required: true,
                message: "Please fill in Customer ID",
              },
            ]}
          >
            <Input placeholder="Cudtomer ID"></Input>
          </Form.Item>
          <Form.Item label={"First Name"} name={"firstname"}>
            <Input placeholder="First Name"></Input>
          </Form.Item>
          <Form.Item label={"Last Name"} name={"lastname"}>
            <Input placeholder="Last Name"></Input>
          </Form.Item>
          <Form.Item label={"Telephone"} name={"tel"}>
            <Input placeholder="Telephone"></Input>
          </Form.Item>
          <Form.Item label={"Email"} name={"email"}>
            <Input placeholder="Please fill in Email"></Input>
          </Form.Item>
          <Form.Item label={"Address"} name={"address"}>
            <Input placeholder="Address"></Input>
          </Form.Item>
          <Form.Item label={"Comment"} name={"comment"}>
            <Input placeholder="Comment"></Input>
          </Form.Item>
          <Form.Item label={"Total Order"} name={"total_order"}>
            <Input placeholder="Total Order"></Input>
          </Form.Item>
          <Form.Item label={"Payment Method"} name={"payment_method"}>
            <Input placeholder="Payment Method"></Input>
          </Form.Item>
          <Form.Item label={"Order Status"} name={"order_status"}>
            <Input placeholder="Order Status"></Input>
          </Form.Item>

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
