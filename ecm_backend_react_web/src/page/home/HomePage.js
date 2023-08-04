import { Button, Input, Space, Modal } from "antd";

import {
  SaveFilled,
  SaveOutlined,
  DeleteFilled,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import PageContainer from "../../component/page/PageContainer";

const HomePage = () => {
  const [visible, setVisible] = useState(false);

  const onClickA = () => {
    alert(3434);
  };

  return (
    <PageContainer title="HomePage">
      <h2>Button and Save</h2>
      <Space>
        <Button
          onClick={() => {
            localStorage.setItem("language_id", 2);
            window.location.reload();
          }}
        >
          KH
        </Button>
        <Button
          onClick={() => {
            localStorage.setItem("language_id", 1);
            window.location.reload();
          }}
        >
          EN
        </Button>

        <Button onClick={onClickA} shape="round" type="primary">
          A
        </Button>
        <DeleteFilled
          className="test"
          style={{
            fontSize: 32,
            color: "red",
          }}
        />
      </Space>
      <h2>Data Entry</h2>
      <Space direction="horizontal">
        <Input
          prefix={<UserOutlined />}
          suffix={<SaveOutlined />}
          placeholder="Username"
          onChange={(event) => {
            console.log(event.target.value);
          }}
        />
        <Input.Password
          placeholder="Username"
          onChange={(event) => {
            console.log(event.target.value);
          }}
        />
        <Input.TextArea
          placeholder="Address"
          onChange={(event) => {
            console.log(event.target.value);
          }}
        />
        <Input.Search
          placeholder="Search BarCode"
          loading={false}
          onChange={(event) => {
            console.log(event.target.value);
          }}
        />
        <Button type="primary" onClick={() => setVisible(true)}>
          Open Modal
        </Button>
      </Space>
      <Modal
        title="Form Create Product"
        open={visible}
        onCancel={() => setVisible(false)}
      >
        <h1>Content</h1>
        <h1>Content</h1>
        <h1>Content</h1>
        <h1>Content</h1>
        <h1>Content</h1>
      </Modal>
    </PageContainer>
  );
};
// size : small , middle , large
// type : primay, default, dashed
// shape : round, default, circle
export default HomePage;
