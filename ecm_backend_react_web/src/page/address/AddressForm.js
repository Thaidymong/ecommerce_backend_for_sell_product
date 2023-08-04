import { Modal, Form, Input, Space, Button, Divider } from "antd";
import { useEffect } from "react";

const AddressPage = (open, onCancle) => {
  return (
    <div>
      <Modal
        title={"New Address"}
        open={open}
        maskClosable={true}
        onCancel={onCancle}
        footer={null}
      >
        <Form name="Adress Form" layout="vertical">
          <Divider />
          <Form.Item
            label={"Customer ID"}
            name={"customer_id"}
            rules={[
              {
                required: true,
                message: "Please fill in customer ID",
              },
            ]}
          >
            <Input placeholder="Customer id"></Input>
          </Form.Item>
          <Form.Item label={"Province ID"} name={"province_id"}>
            <Input placeholder="Province id"></Input>
          </Form.Item>
          <Form.Item label={"First Name"} name={"firstname"}>
            <Input placeholder="First Name"></Input>
          </Form.Item>
          <Form.Item label={"Last Name"} name={"lastname"}>
            <Input placeholder="Last Name"></Input>
          </Form.Item>
          <Form.Item label={"Teleohone"} name={"tel"}>
            <Input placeholder="Telephone"></Input>
          </Form.Item>
          <Form.Item label={"Email"} name={"email"}>
            <Input placeholder="Email"></Input>
          </Form.Item>
          <Form.Item label={"Address Description"} name={"address_description"}>
            <Input placeholder="Address Description"></Input>
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={onCancle}>Cancel</Button>
              <Button htmlType="submit" type="primary"></Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddressPage;
