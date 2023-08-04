import { Modal, Form, Input, Divider, Space, Button } from "antd";

const CustomerFormModal = ({ open, onCancel, onFinish }) => {
  const onFinishForm = (items) => {
    onFinish(items);
  };
  return (
    <div>
      <Modal
        title="New Customer"
        open={open}
        onCancel={onCancel}
        maskClosablet={true}
        footer={null}
      >
        <Form name="Customer Form" layout="vertical" onFinish={onFinishForm}>
          <Divider />
          <Form.Item
            label={"First Name"}
            name={"firstname"}
            rules={[
              {
                required: true,
                message: "Please fill your First Name!!!",
              },
            ]}
          >
            <Input placeholder="First Name"></Input>
          </Form.Item>
          <Form.Item
            label={"Last Name"}
            name={"lastname"}
            rules={[
              {
                required: true,
                message: "Please fill your Last Name!!!",
              },
            ]}
          >
            <Input placeholder="Last Name"></Input>
          </Form.Item>
          <Form.Item
            label={"Gender"}
            name={"gender"}
            rules={[
              {
                required: true,
                message: "Please fill your Gender",
              },
            ]}
          >
            <Input placeholder="Gender"></Input>
          </Form.Item>

          <Form.Item
            label={"Username"}
            name={"username"}
            rules={[
              {
                required: true,
                message: "Please fill in username",
              },
            ]}
          >
            <Input placeholder="Username"></Input>
          </Form.Item>
          <Form.Item
            label={"Password"}
            name={"password"}
            rules={[
              {
                required: true,
                message: "Please fill in Password",
              },
            ]}
          >
            <Input placeholder="Password"></Input>
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Space>
              <Button onCanPlay={onCancel}>Cancel</Button>
              <Button htmlType="submit" type="primary">
                Save
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default CustomerFormModal;
