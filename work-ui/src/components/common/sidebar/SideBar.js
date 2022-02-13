import { Layout, Menu } from "antd";

const { Sider } = Layout;

const SideBar = () => {
  return (
    <Sider trigger={null} collapsible>
      <div className="logo"></div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
          <Menu.Item key="0">
            Quản lí công việc
          </Menu.Item>
          <Menu.Item key="1">
            Option 1
          </Menu.Item>
          <Menu.Item key="2">
            Option 2
          </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;