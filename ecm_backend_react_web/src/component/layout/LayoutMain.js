import {
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  ProjectOutlined,
  SettingOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Dropdown, Image } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LayoutMain.css";
import { getText } from "../../util/service";

const { Header, Sider, Content } = Layout;
const App = ({ children }) => {
  var navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // const profile = localStorage.getItem("profile") // catch like string
  const profile = JSON.parse(localStorage.getItem("profile")); // convert in object form that we can use
  // debugger
  const handdleLogout = () => {
    localStorage.setItem("isLogin", "0");
    localStorage.setItem("profile", "{}");
    window.location.href = "/login";
  };

  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Profile
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Setting
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Change Password
        </a>
      ),
    },
    {
      key: "4",
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={handdleLogout}>
          Logout
        </a>
      ),
    },
  ];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              // label: 'Home',
              label: getText("home", "Home"),
              onClick: () => navigate("/"),
            },
            {
              key: "2",
              icon: <ProjectOutlined />,
              // label: 'Category',
              label: getText("category", "Category"),
              onClick: () => navigate("/category"),
            },
            {
              key: "3",
              icon: <UsergroupAddOutlined />,
              // label: 'Product',
              label: getText("product", "Product"),
              onClick: () => navigate("/product"),
            },
            {
              key: "4",
              icon: <UsergroupAddOutlined />,
              // label: 'Customer',
              label: getText("customer", "Customer"),
              onClick: () => navigate("/customer"),
            },
            {
              key: "5",
              icon: <UsergroupAddOutlined />,
              label: getText("cart", "Cart"),
              onClick: () => navigate("/cart"),
            },
            {
              key: "6",
              icon: <OrderedListOutlined />,
              label: getText("order", "Order"),
              onClick: () => navigate("/order"),
            },
            {
              key: "7",
              icon: <OrderedListOutlined />,
              label: getText("paymentmethod", "PaymentMethod"),
              onClick: () => navigate("/payment-method"),
            },
            {
              key: "8",
              icon: <LogoutOutlined />,
              label: getText("orderstatus", "Order Status"),
              onClick: () => navigate("/order-status"),
            },
            {
              key: "9",
              icon: <SettingOutlined />,
              label: getText("address", "Address"),
              onClick: () => navigate("/address"),
            },
            {
              key: "10",
              icon: <SettingOutlined />,
              label: getText("setting", "Setting"),
              onClick: () => navigate("/setting"),
            },
            {
              key: "11",
              icon: <LogoutOutlined />,
              label: getText("logout", "Logout"),
              onClick: () => navigate("/logout"),
            },
          ]}
        />
      </Sider>
      <Layout>
        <div className="header-container">
          <div>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
              }}
            />
          </div>
          <Dropdown placement="bottomRight" arrow menu={{ items }}>
            <a className="profile-header">
              <UserOutlined
                style={{
                  fontSize: "18px",
                  marginRight: "10px",
                }}
              />
              <div>{profile.username}</div>
            </a>
          </Dropdown>
        </div>
        <Content
          style={{
            minHeight: "100vh",
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
