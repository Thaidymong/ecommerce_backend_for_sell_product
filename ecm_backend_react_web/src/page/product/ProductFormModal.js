import { Input, Modal, Form, Divider, Space, Button } from "antd";

const ProductFormModal = ({ open, onFinishForm, onCancel, onFinish }) => {
  return (
    <div>
      <Modal
        title={"New Product"}
        open={open}
        maskClosable={true}
        footer={null}
      >
        <Form name="Product Form" layout="vertical" onFinish={onFinishForm}>
          <Divider />
          <Form.Item
            label={"Category ID"}
            name={"category_id"}
            rules={[
              {
                required: true,
                message: "Please choose category id",
              },
            ]}
          >
            <Input placeholder="category id"></Input>
          </Form.Item>
          <Form.Item
            label={"Product Name"}
            name={"name"}
            rules={[
              {
                required: true,
                message: "Please choose category id",
              },
            ]}
          >
            <Input placeholder="Product Name"></Input>
          </Form.Item>
          <Form.Item
            label={"Product Price"}
            name={"price"}
            rules={[
              {
                required: true,
                message: "Please fill in product price",
              },
            ]}
          >
            <Input placeholder="Product Price"></Input>
          </Form.Item>
          <Form.Item
            label={"Product Quantity"}
            name={"quantity"}
            rules={[
              {
                required: true,
                message: "Please fill in product quantity",
              },
            ]}
          >
            <Input placeholder="Product Quantity"></Input>
          </Form.Item>
          <Form.Item label={"Product Descriptoin"} name={"description"}>
            <Input placeholder="Product Quantity"></Input>
          </Form.Item>
          <Form.Item label={"Product Image"} name={"image"}>
            <Input placeholder="Product Image"></Input>
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={onCancel}>Cancel</Button>
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
export default ProductFormModal;
