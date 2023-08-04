import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import React, { useState } from "react";
import { request } from "../../util/api";

import "./LoginPage.css";
const LoginPage = () => {
  const [message, setMessage] = useState("");

  const onFinish = (values) => {
    // console.log('Received values of form: ', values);
    // var username = values.username
    // var password = values.password
    setMessage("");
    var body = {
      username: values.username,
      password: values.password,
    };
    request("post", "/customer/login", body).then((res) => {
      var data = res.data;
      console.log(data);
      // debugger
      if (data.error) {
        if (data.messsage.username) {
          setMessage(data.messsage.username);
        } else if (data.messsage.password) {
          setMessage(data.messsage.password);
        }
      } else {
        // save data in local storage
        // direct to homePage
        // data.message
        // data.profile
        localStorage.setItem("isLogin", "1");
        localStorage.setItem("language_id", "1");
        localStorage.setItem("profile", JSON.stringify(data.profile));
        // JSON.stringify convert Object to String Object JSON
        window.location.href = "/";
      }
    });
  };
  return (
    <div className="text-form">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <div className="txt_login">Login</div>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>
        {message != "" && (
          <div style={{ color: "red", marginBottom: "10px" }}>{message}</div>
        )}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <div>
            Or <a href="">register now!</a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
export default LoginPage;
