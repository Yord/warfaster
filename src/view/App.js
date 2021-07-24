import "./App.css";
import React from "react";
import { connect } from "react-redux";
import { Layout, Menu, Tag, Tooltip } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { ToggleMenuCollapse } from "../store/actions";
import { Row, Col, Image } from "antd";
import Aeternus_Continuum from "./Aeternus_Continuum.png";
import Empyrean from "./Empyrean.png";
import Iron_Star_Alliance from "./Iron_Star_Alliance.png";
import Marcher_Worlds from "./Marcher_Worlds.png";

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

function FactionImage({ faction }) {
  switch (faction) {
    case "Aeternus_Continuum":
      return <img src={Aeternus_Continuum} height="80%" />;
    case "Empyrean":
      return <img src={Empyrean} height="80%" />;
    case "Iron_Star_Alliance":
      return <img src={Iron_Star_Alliance} height="80%" />;
    case Marcher_Worlds:
      return <img src={Marcher_Worlds} height="80%" />;
    default:
      return <img src={Marcher_Worlds} height="80%" />;
  }
}

function AppPresentation({
  factions,
  typeColors,
  subtypeColors,
  menuCollapsed,
  toggleMenu,
}) {
  const rootSubmenuKeys = factions.map((_, i) => `sub${i}`);

  const [openKeys, setOpenKeys] = React.useState(["sub0"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <div className="App">
      <Layout>
        <Sider
          width={300}
          trigger={null}
          collapsible={true}
          collapsed={menuCollapsed}
          theme="light"
          breakpoint="md"
        >
          <Menu
            id="factions"
            //onClick={this.handleClick}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            //defaultSelectedKeys={["item1"]}
            //defaultOpenKeys={["sub0"]}
            mode="inline"
          >
            {factions.map(([faction, models], i) => (
              <SubMenu
                key={`sub${i}`}
                title={faction}
                icon={<FactionImage faction={faction} />}
              >
                {models.map(({ name, page, type, subtype }, j) => {
                  const shortName = name.slice(0, 20);

                  return (
                    <Menu.Item key={`sub${i}_item${j}`}>
                      <Tag color={typeColors[type]}>{type}</Tag>
                      {shortName.length === name.length ? (
                        shortName
                      ) : (
                        <Tooltip placement="top" title={name}>
                          {shortName}...
                        </Tooltip>
                      )}
                      {subtype ? (
                        <Tag color={subtypeColors[subtype]}>{subtype}</Tag>
                      ) : (
                        ""
                      )}
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Header>
            <Row>
              <Col span={2}>
                {React.createElement(
                  menuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    onClick: toggleMenu,
                  }
                )}
              </Col>
              <Col span={20} className="logo">
                Warfaster
              </Col>
              <Col span={2}></Col>
            </Row>
          </Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </div>
  );
}

const typeColors = [
  "volcano",
  "gold",
  "green",
  "cyan",
  "blue",
  "purple",
  "magenta",
  "red",
];

const subtypeColors = ["orange", "lime", "geekblue"];

const App = connect(
  (state) => ({
    menuCollapsed: state.ui.menuCollapsed,
    factions: Object.entries(state.data.factionModels)
      .sort()
      .map(([faction, models]) => [
        faction,
        models.map((model) => ({
          name: model.Name.text,
          page: model.Name.page,
          type: model.Type.text,
          ...(model.Subtype ? { subtype: model.Subtype.text } : {}),
        })),
      ]),
    //cyphers: Object.
    typeColors: Object.fromEntries(
      Object.entries(
        Object.fromEntries(
          Object.values(state.data.factionModels)
            .flat()
            .map((model) => [model.Type.text, ""])
        )
      ).map(([type], index) => [type, typeColors[index % typeColors.length]])
    ),
    subtypeColors: Object.fromEntries(
      Object.entries(
        Object.fromEntries(
          Object.values(state.data.factionModels)
            .flat()
            .flatMap((model) =>
              model.Subtype ? [[model.Subtype.text, ""]] : []
            )
        )
      ).map(([subtype], index) => [
        subtype,
        subtypeColors[index % subtypeColors.length],
      ])
    ),
  }),
  (dispatch) => ({
    toggleMenu: () => dispatch(ToggleMenuCollapse()),
  })
)(AppPresentation);

export default App;
