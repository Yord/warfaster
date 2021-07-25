/*
TODO:
+ Parse all factionModel types instead of only the first.
+ Parse Wild_Cards.
+ Drag and Drop Lists.
+ Multi-Drag and Drop Cards.
  + Make faction logos and badges into buttons that trigger multi-select.
+ Add cards to (bottom of first?) list with click on menu item.
+ Show details of cards.
+ Make lists renameable.
+ Find a way to delete cards from lists (e.g. by replacing the Warfaster title with a recicle bin).
+ Add a button for adding new lists.
  + find a way to delete lists (e.g. by replacing the Warfaster title with a recicle bin).
+ Only fetch the Warcaster and Cypher_Codecs pages at the start and build from there.
  + Fetch all factions found on the Warcaster page after parsing the Warcaster page.
+ Add text to the footer (copyright notices for Privateer Press, contact infos, etc.).
+ Make menu items filterable by adding a filter input field to the top of the menu.
+ Web design.
+ Disable list selection on click in menu and menu items (no blue overlay).
*/

import "./App.css";
import React from "react";
import { connect } from "react-redux";
import { Badge, Card, Col, Input, Layout, Menu, Row, Tag, Tooltip } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ToggleMenuCollapse } from "../store/actions";
import Aeternus_Continuum from "./Aeternus_Continuum.png";
import Cyphers from "./Cyphers.jpeg";
import Empyrean from "./Empyrean.png";
import Iron_Star_Alliance from "./Iron_Star_Alliance.png";
import Marcher_Worlds from "./Marcher_Worlds.png";
import Wild_Card from "./Wild_Card.png";
import { CardDragEnded, CardDragStarted } from "./events";

const { Header, Footer, Sider, Content } = Layout;
const { TextArea } = Input;
const { SubMenu } = Menu;

function FactionImage({ faction }) {
  switch (faction) {
    case "Aeternus_Continuum":
      return <img src={Aeternus_Continuum} alt={faction} height="80%" />;
    case "Empyrean":
      return <img src={Empyrean} alt={faction} height="80%" />;
    case "Iron_Star_Alliance":
      return <img src={Iron_Star_Alliance} alt={faction} height="80%" />;
    case "Marcher_Worlds":
      return <img src={Marcher_Worlds} alt={faction} height="80%" />;
    case "Wild_Card":
      return <img src={Wild_Card} alt={faction} height="80%" />;
    case "Universal":
      return <img src={Cyphers} alt={faction} height="80%" />;
    default:
      return <img src={Cyphers} alt={faction} height="80%" />;
  }
}

function AppPresentation({
  factions,
  cypherCodecs,
  cypherColors,
  typeColors,
  subtypeColors,
  menuCollapsed,
  toggleMenu,
  dragEnd,
  dragStart,
  lists,
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
              icon={<FactionImage faction="Cyphers" />}
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
          <DragDropContext onDragStart={dragStart} onDragEnd={dragEnd}>
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
              {lists.map(({ title, cards }, index) => (
                <div className="cards" key={`cards${index}`}>
                  <div className="header">
                    <Row>
                      <Col span={12} className="army-list-title">
                        <Tooltip
                          trigger={["focus"]}
                          title={"Rename your list"}
                          placement="topLeft"
                        >
                          <TextArea
                            placeholder="Name your list"
                            value={title}
                            maxLength={30}
                            autoSize
                          />
                        </Tooltip>
                      </Col>
                      <Col span={12} className="faction-icons">
                        {Object.entries(
                          cards.reduce(
                            (acc, card) => ({
                              ...acc,
                              ...(card.faction
                                ? {
                                    [card.faction]:
                                      (acc[card.faction] || 0) + 1,
                                  }
                                : {}),
                            }),
                            {}
                          )
                        ).map(([faction, count], i) => (
                          <Badge
                            size="small"
                            key={`badge${i}`}
                            count={count}
                            offset={[0, 23]}
                          >
                            <FactionImage faction={faction} />
                          </Badge>
                        ))}
                      </Col>
                    </Row>
                  </div>

                  <Droppable
                    key={`cards_${index}`}
                    droppableId={`cards_${index}`}
                  >
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {cards.map(
                          ({ card, type, title, subtype, faction }, j) => (
                            <Draggable
                              key={`${title}_${index}_${j}`}
                              draggableId={`${title}_${index}_${j}`}
                              index={j}
                            >
                              {(provided, snapshot) => (
                                <div
                                  className="body"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Card hoverable className="card">
                                    <Card.Meta
                                      title={
                                        <Row>
                                          <Col span={12}>{title}</Col>
                                          <Col className="details" span={12}>
                                            {card === "model" && subtype ? (
                                              <Tag
                                                color={subtypeColors[subtype]}
                                              >
                                                {subtype}
                                              </Tag>
                                            ) : (
                                              <></>
                                            )}
                                            {card === "cypher" && faction ? (
                                              <FactionImage faction={faction} />
                                            ) : (
                                              <></>
                                            )}
                                          </Col>
                                        </Row>
                                      }
                                      avatar={
                                        <Tag
                                          color={
                                            (card === "model"
                                              ? typeColors
                                              : cypherColors)[type]
                                          }
                                        >
                                          {type}
                                        </Tag>
                                      }
                                    />
                                  </Card>
                                </div>
                              )}
                            </Draggable>
                          )
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  <div className="footer">
                    <Badge size="small" key="_badge" count={cards.length}>
                      <Tag color="default">Cards</Tag>
                    </Badge>
                    {Object.entries(
                      cards.reduce(
                        (acc, card) => ({
                          ...acc,
                          [card.type]: (acc[card.type] || 0) + 1,
                        }),
                        {}
                      )
                    )
                      .sort()
                      .map(([type, count], i) => (
                        <Badge size="small" key={`badge${i}`} count={count}>
                          <Tag color={typeColors[type] || cypherColors[type]}>
                            {type}
                          </Tag>
                        </Badge>
                      ))}
                  </div>
                </div>
              ))}
            </Content>
            <Footer>Footer</Footer>
          </DragDropContext>
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
    lists: state.ui.lists.map(({ title, cards }) => ({
      title,
      cards: cards.flatMap((page) => {
        const model = Object.entries(state.data.factionModels)
          .flatMap(([faction, models]) =>
            models.map((model) => ({ ...model, faction }))
          )
          .find(({ Name }) => Name.page === page);
        const cypher = state.data.cypherCodecs.find(
          ({ Cypher }) => Cypher.page === page
        );

        if (model) {
          return [
            {
              card: "model",
              type: model.Type.text,
              title: model.Name.text,
              faction: model.faction,
              ...(model.Subtype ? { subtype: model.Subtype.text } : {}),
            },
          ];
        }

        if (cypher) {
          return [
            {
              card: "cypher",
              type: cypher.Type.text,
              title: cypher.Cypher.text,
              ...(cypher.Faction.text === "Universal"
                ? {}
                : { faction: cypher.Faction.page }),
            },
          ];
        }

        return [];
      }),
    })),
  }),
  (dispatch) => ({
    toggleMenu: () => dispatch(ToggleMenuCollapse()),
    dragStart: (event) => dispatch(CardDragStarted(event)),
    dragEnd: (event) => dispatch(CardDragEnded(event)),
  })
)(AppPresentation);

export default App;
