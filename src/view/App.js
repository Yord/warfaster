import "./App.css";
import React from "react";
import { connect } from "react-redux";
import { Badge, Col, Input, Layout, List, Menu, Row, Tag, Tooltip } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { ToggleMenuCollapse } from "../store/actions";
import Aeternus_Continuum from "./Aeternus_Continuum.png";
import Cyphers from "./Cyphers.jpeg";
import Empyrean from "./Empyrean.png";
import Iron_Star_Alliance from "./Iron_Star_Alliance.png";
import Marcher_Worlds from "./Marcher_Worlds.png";
import Wild_Card from "./Wild_Card.png";

const { Header, Footer, Sider, Content } = Layout;
const { TextArea } = Input;
const { SubMenu } = Menu;

function FactionImage({ faction }) {
  switch (faction) {
    case "Aeternus_Continuum":
      return <img src={Aeternus_Continuum} height="80%" />;
    case "Empyrean":
      return <img src={Empyrean} height="80%" />;
    case "Iron_Star_Alliance":
      return <img src={Iron_Star_Alliance} height="80%" />;
    case "Marcher_Worlds":
      return <img src={Marcher_Worlds} height="80%" />;
    case "Wild_Card":
      return <img src={Wild_Card} height="80%" />;
    default:
      return <img src={Marcher_Worlds} height="80%" />;
  }
}

const models = [
  { type: "Squad", title: "Vassal Raiders" },
  { type: "Solo", title: "Grafter" },
  { type: "Solo", title: "Hierotheos Raxis", subtype: "Hero" },
  { type: "Vehicle", title: "Aenigma", subtype: "Hero" },
  { type: "Warjack", title: "Nemesis" },
];

const cyphers = [
  {
    type: "Geometric",
    title: "Acheronian Venediction",
    faction: "Aeternus_Continuum",
  },
  { type: "Harmonic", title: "Aggression Theorem" },
  { type: "Overdrive", title: "Annihilation Vector" },
  { type: "Harmonic", title: "Arcane Synthesis" },
  { type: "Harmonic", title: "Arcanesscent Regenerator", faction: "Empyrean" },
  { type: "Overdrive", title: "Ascension Catalyst" },
  { type: "Fury", title: "Atrophic Decomposer", faction: "Aeternus_Continuum" },
  { type: "Fury", title: "Cacophonic Declination", faction: "Empyrean" },
];

function AppPresentation({
  factions,
  cypherCodecs,
  cypherColors,
  typeColors,
  subtypeColors,
  menuCollapsed,
  toggleMenu,
}) {
  const rootSubmenuKeys = [
    ...factions.map((_, i) => `sub${i}`),
    "cypher_codecs",
  ];

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
                    <Menu.Item key={`sub${i}_model${j}`}>
                      <Tag color={typeColors[type]}>{type}</Tag>
                      <span className="card">
                        {shortName.length === name.length ? (
                          shortName
                        ) : (
                          <Tooltip placement="top" title={name}>
                            {shortName}...
                          </Tooltip>
                        )}
                      </span>
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
            <SubMenu
              key="cypher_codecs"
              title="Cyphers"
              icon={<img src={Cyphers} height="80%" />}
            >
              {cypherCodecs.map(({ Cypher, Type, Faction }, j) => (
                <Menu.Item key={`cypher_codecs_${j}`}>
                  <Tag color={cypherColors[Type.text]}>{Type.text}</Tag>
                  <span className="card">{Cypher.text}</span>
                </Menu.Item>
              ))}
            </SubMenu>
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
          <Content>
            <List
              size="small"
              header={
                <Row>
                  <Col span={12} className="army-list-title">
                    <Tooltip
                      trigger={["focus"]}
                      title={"Rename your list"}
                      placement="topLeft"
                    >
                      <TextArea
                        placeholder="Name your list"
                        value="My fancy model list"
                        maxLength={30}
                        autoSize
                      />
                    </Tooltip>
                  </Col>
                  <Col span={12} className="faction-icons">
                    <img src={Aeternus_Continuum} />
                    <img src={Empyrean} />
                    <img src={Iron_Star_Alliance} />
                    <img src={Marcher_Worlds} />
                    <img src={Wild_Card} />
                  </Col>
                </Row>
              }
              footer={
                <div>
                  <Badge size="small" count={5}>
                    <Tag color={typeColors["Cards"]}>Cards</Tag>
                  </Badge>
                  <Badge size="small" count={1}>
                    <Tag color={typeColors["Squad"]}>Squad</Tag>
                  </Badge>
                  <Badge size="small" count={2}>
                    <Tag color={typeColors["Solo"]}>Solo</Tag>
                  </Badge>
                  <Badge size="small" count={1}>
                    <Tag color={typeColors["Vehicle"]}>Vehicle</Tag>
                  </Badge>
                  <Badge size="small" count={1}>
                    <Tag color={typeColors["Warjack"]}>Warjack</Tag>
                  </Badge>
                </div>
              }
              bordered
              dataSource={models}
              renderItem={({ type, title, subtype }) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Tag color={typeColors[type]}>{type}</Tag>}
                    title={title}
                  />
                  {subtype ? (
                    <Tag color={subtypeColors[subtype]}>{subtype}</Tag>
                  ) : (
                    ""
                  )}
                </List.Item>
              )}
            />
            <List
              size="small"
              header={
                <Row>
                  <Col span={12} className="army-list-title">
                    <Tooltip
                      trigger={["focus"]}
                      title={"Rename your list"}
                      placement="topLeft"
                    >
                      <TextArea
                        placeholder="Name your list"
                        value="My fancy cypher list"
                        maxLength={30}
                        autoSize
                      />
                    </Tooltip>
                  </Col>
                  <Col span={12} className="faction-icons">
                    <img src={Aeternus_Continuum} />
                    <img src={Empyrean} />
                    <img src={Iron_Star_Alliance} />
                    <img src={Marcher_Worlds} />
                    <img src={Wild_Card} />
                  </Col>
                </Row>
              }
              footer={
                <div>
                  <Badge size="small" count={8}>
                    <Tag color={cypherColors["Cards"]}>Cards</Tag>
                  </Badge>
                  <Badge size="small" count={1}>
                    <Tag color={cypherColors["Geometric"]}>Geometric</Tag>
                  </Badge>
                  <Badge size="small" count={3}>
                    <Tag color={cypherColors["Harmonic"]}>Harmonic</Tag>
                  </Badge>
                  <Badge size="small" count={2}>
                    <Tag color={cypherColors["Overdrive"]}>Overdrive</Tag>
                  </Badge>
                  <Badge size="small" count={2}>
                    <Tag color={cypherColors["Fury"]}>Fury</Tag>
                  </Badge>
                </div>
              }
              bordered
              dataSource={cyphers}
              renderItem={({ type, title, faction }) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Tag color={cypherColors[type]}>{type}</Tag>}
                    title={title}
                  />
                  {faction ? <FactionImage faction={faction} /> : ""}
                </List.Item>
              )}
            />
          </Content>
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
    cypherCodecs: state.data.cypherCodecs,
    cypherColors: {
      Harmonic: "purple",
      Fury: "red",
      Geometric: "orange",
      Overdrive: "blue",
    },
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
