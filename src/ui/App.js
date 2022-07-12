import "./App.css";
import React from "react";
import { connect } from "react-redux";
import { Badge, Card, Col, Input, Layout, Menu, Row, Tag, Tooltip } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Aeternus_Continuum from "./Aeternus_Continuum.png";
import Cyphers from "./Cyphers.jpeg";
import Empyrean from "./Empyrean.png";
import Iron_Star_Alliance from "./Iron_Star_Alliance.png";
import Marcher_Worlds from "./Marcher_Worlds.png";
import Wild_Card from "./Wild_Card.png";
import { CardDragEnded, CardDragStarted, MenuItemClicked } from "../messages";
import { Dragging } from "../state/Dragging";
import { Lists } from "../state/Lists";
import { Menu as Menu2 } from "../state/Menu";

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
  dragging,
  typeColors,
  subtypeColors,
  menuCollapsed,
  menuItemClicked,
  toggleMenu,
  dragEnd,
  dragStart,
  lists,
  toggleCard,
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
            onClick={menuItemClicked}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            //defaultSelectedKeys={["item1"]}
            //defaultOpenKeys={["sub0"]}
            mode="inline"
          >
            {factions.map(([faction, models], i) => (
              <SubMenu
                key={faction}
                title={faction}
                icon={<FactionImage faction={faction} />}
              >
                {models.map(({ name, page, type, subtype }, j) => {
                  const shortName = name.slice(0, 20);

                  return (
                    <Menu.Item
                      key={faction + ":" + page}
                      page={page}
                      title={<Tag color={typeColors[type]}>{type}</Tag>}
                    >
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
                <Menu.Item key={":" + Cypher.page}>
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
                  <Droppable key={"trash"} droppableId={"trash"}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {dragging ? "TRASH" : "Warfaster"}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Col>
                <Col span={2}></Col>
              </Row>
            </Header>
            <Content>
              {lists.map(({ title, cards }, listIndex) => (
                <div className="cards" key={`cards${listIndex}`}>
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
                    key={`cards_${listIndex}`}
                    droppableId={`cards_${listIndex}`}
                  >
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {cards.map(
                          (
                            {
                              card,
                              hidden,
                              type,
                              title,
                              page,
                              subtype,
                              faction,
                            },
                            cardIndex
                          ) => (
                            <Draggable
                              key={`${page}_${listIndex}_${cardIndex}`}
                              draggableId={`${page}_${listIndex}_${cardIndex}`}
                              index={cardIndex}
                            >
                              {(provided, snapshot) => (
                                <div
                                  className="body"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Card
                                    hoverable
                                    className="card"
                                    onClick={toggleCard(
                                      listIndex,
                                      cardIndex,
                                      page,
                                      card
                                    )}
                                  >
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
                                    {hidden ? <></> : <p>Foo</p>}
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

function mergeArrayObjects(obj1, obj2) {
  const obj = {};
  for (const [key, list] of Object.entries(obj1)) {
    obj[key] = list;
  }
  for (const [key, list] of Object.entries(obj2)) {
    obj[key] = obj[key] ? obj[key].concat(list) : list;
  }
  return obj;
}

const App = connect(
  (state) => ({
    menuCollapsed: Menu2.selectCollapsed()(state),
    factions: Object.entries(
      mergeArrayObjects(state.data.factionModels, state.data.wildCardModels)
    )
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
    lists: Lists.select()(state).map(({ title, cards }) => ({
      title,
      cards: cards.flatMap(({ page, hidden }) => {
        const model = Object.entries(state.data.factionModels)
          .flatMap(([faction, models]) =>
            models.map((model) => ({ ...model, faction }))
          )
          .find(({ Name }) => Name.page === page);
        const wildCard = Object.entries(state.data.wildCardModels)
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
              hidden,
              type: model.Type.text,
              title: model.Name.text,
              page: model.Name.page,
              faction: model.faction,
              ...(model.Subtype ? { subtype: model.Subtype.text } : {}),
            },
          ];
        }

        if (wildCard) {
          return [
            {
              card: "model",
              hidden,
              type: wildCard.Type.text,
              title: wildCard.Name.text,
              page: wildCard.Name.page,
              faction: wildCard.faction,
              ...(wildCard.Subtype ? { subtype: wildCard.Subtype.text } : {}),
            },
          ];
        }

        if (cypher) {
          return [
            {
              card: "cypher",
              hidden,
              type: cypher.Type.text,
              title: cypher.Cypher.text,
              page: cypher.Cypher.page,
              ...(cypher.Faction.text === "Universal"
                ? {}
                : { faction: cypher.Faction.page }),
            },
          ];
        }

        return [];
      }),
    })),
    dragging: Dragging.select()(state),
  }),
  (dispatch) => ({
    toggleCard: (listIndex, cardIndex, page, card) => {
      return () =>
        dispatch(Lists.toggleCard({ listIndex, cardIndex, page, card }));
    },
    toggleMenu: () => dispatch(Menu2.toggleCollapsed()),
    dragStart: (event) => dispatch(CardDragStarted(event)),
    dragEnd: (event) => dispatch(CardDragEnded(event)),
    menuItemClicked: (event) => dispatch(MenuItemClicked(event)),
  })
)(AppPresentation);

export default App;
