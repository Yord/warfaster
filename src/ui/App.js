import "./App.css";
import React from "react";
import { connect } from "react-redux";
import { Badge, Card, Col, Input, Layout, Menu, Row, Tag, Tooltip } from "antd";
import {
  DeleteOutlined,
  DownSquareOutlined,
  PlusSquareOutlined,
  UpSquareOutlined,
} from "@ant-design/icons";
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
import { FactionModels } from "../state/FactionModels";
import { WildCardModels } from "../state/WildCardModels";
import { Factions } from "../state/Factions";

const { Header, Footer, Content } = Layout;
const { TextArea } = Input;
const { SubMenu } = Menu;

function FactionImage({ faction }) {
  switch (faction) {
    case "Aeternus_Continuum":
      return <img src={Aeternus_Continuum} alt={faction} height="35px" />;
    case "Empyrean":
      return <img src={Empyrean} alt={faction} height="35px" />;
    case "Iron_Star_Alliance":
      return <img src={Iron_Star_Alliance} alt={faction} height="35px" />;
    case "Marcher_Worlds":
      return <img src={Marcher_Worlds} alt={faction} height="35px" />;
    case "Wild_Card":
      return <img src={Wild_Card} alt={faction} height="35px" />;
    case "Universal":
      return <img src={Cyphers} alt={faction} height="35px" />;
    default:
      return <img src={Cyphers} alt={faction} height="35px" />;
  }
}

function AppPresentation({
  factionModels,
  wildCardModels,
  cypherCodecs,
  cypherColors,
  dragging,
  typeColors,
  subtypeColors,
  menuItemClicked,
  dragEnd,
  dragStart,
  lists,
  toggleCard,
  removeCard,
  removeList,
  addEmptyList,
  moveListBy,
  setListTitle,
}) {
  const rootSubmenuKeys = [
    ...[...factionModels, ...Object.entries(wildCardModels)].map(
      (_, i) => `sub${i}`
    ),
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
        <Layout>
          <DragDropContext onDragStart={dragStart} onDragEnd={dragEnd}>
            <Header>
              <Droppable key={"trash"} droppableId={"trash"}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {dragging ? (
                      <div
                        style={{
                          backgroundColor: "rgb(235, 236, 240)",
                          animation:
                            "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
                        }}
                      >
                        <DeleteOutlined />
                      </div>
                    ) : (
                      "WARFASTER"
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Header>
            <Content>
              <Menu
                id="factions"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                mode="horizontal"
                triggerSubMenuAction="click"
              >
                {factionModels.map(([factionName, faction, models], i) => (
                  <SubMenu
                    key={faction}
                    icon={<FactionImage faction={faction} />}
                  >
                    <Menu.ItemGroup title={factionName}>
                      {models.map(({ name, page, type, subtype }, j) => {
                        const shortName = name.slice(0, 40);

                        return (
                          <Menu.Item
                            key={faction + ":" + page}
                            page={page}
                            title={<Tag color={typeColors[type]}>{type}</Tag>}
                          >
                            <Tag color={typeColors[type]}>{type}</Tag>
                            <span
                              className="card"
                              onClick={menuItemClicked(page)}
                            >
                              {shortName.length === name.length ? (
                                shortName
                              ) : (
                                <Tooltip placement="top" title={name}>
                                  {shortName}...
                                </Tooltip>
                              )}
                            </span>
                            {subtype ? (
                              <Tag color={subtypeColors[subtype]}>
                                {subtype}
                              </Tag>
                            ) : (
                              ""
                            )}
                          </Menu.Item>
                        );
                      })}
                    </Menu.ItemGroup>
                    <Menu.ItemGroup title="Wild Cards">
                      {(wildCardModels[faction] || [])
                        .sort((w1, w2) => (w1.type < w2.type ? -1 : 1))
                        .map(({ name, page, type, subtype }, j) => {
                          const shortName = name.slice(0, 40);

                          return (
                            <Menu.Item
                              key={faction + ":" + page}
                              page={page}
                              title={<Tag color={typeColors[type]}>{type}</Tag>}
                            >
                              <Tag color={typeColors[type]}>{type}</Tag>
                              <span
                                className="card"
                                onClick={menuItemClicked(page)}
                              >
                                {shortName.length === name.length ? (
                                  shortName
                                ) : (
                                  <Tooltip placement="top" title={name}>
                                    {shortName}...
                                  </Tooltip>
                                )}
                              </span>
                              {subtype ? (
                                <Tag color={subtypeColors[subtype]}>
                                  {subtype}
                                </Tag>
                              ) : (
                                ""
                              )}
                            </Menu.Item>
                          );
                        })}
                    </Menu.ItemGroup>
                  </SubMenu>
                ))}
                <SubMenu
                  key="cypher_codecs"
                  icon={<FactionImage faction="Cyphers" />}
                >
                  {Object.entries(
                    cypherCodecs.reduce(
                      (acc, cypher) => ({
                        ...acc,
                        [cypher.Faction.text]: [
                          ...(acc[cypher.Faction.text] || []),
                          cypher,
                        ],
                      }),
                      {}
                    )
                  )
                    .sort()
                    .map(([faction, cyphers], j) => (
                      <Menu.ItemGroup title={faction} key={faction}>
                        {cyphers
                          .sort((c1, c2) =>
                            c1.Type.text < c2.Type.text ? -1 : 1
                          )
                          .map(({ Cypher, Type }) => (
                            <Menu.Item key={":" + Cypher.page}>
                              <Tag color={cypherColors[Type.text]}>
                                {Type.text}
                              </Tag>
                              <span
                                className="card"
                                onClick={menuItemClicked(Cypher.page)}
                              >
                                {Cypher.text}
                              </span>
                            </Menu.Item>
                          ))}
                      </Menu.ItemGroup>
                    ))}
                </SubMenu>
              </Menu>
            </Content>
            <Content>
              {lists.map(({ title, cards }, listIndex) => (
                <div className="cards" key={`cards${listIndex}`}>
                  <Tooltip
                    placement="top"
                    color="crimson"
                    trigger="click"
                    align={{ offset: [0, 4] }}
                    title={
                      <>
                        <div
                          onClick={removeList(listIndex)}
                          style={{
                            cursor: "pointer",
                            display: "inline-block",
                            paddingRight: "4px",
                            fontSize: "1.5em",
                          }}
                        >
                          <DeleteOutlined />
                        </div>
                        <div
                          onClick={addEmptyList(listIndex)}
                          style={{
                            cursor: "pointer",
                            display: "inline-block",
                            padding: "0 4px",
                            fontSize: "1.5em",
                          }}
                        >
                          <PlusSquareOutlined />
                        </div>
                        <div
                          onClick={moveListBy(listIndex, -1)}
                          style={{
                            cursor: "pointer",
                            display: "inline-block",
                            padding: "0 4px",
                            fontSize: "1.5em",
                          }}
                        >
                          <UpSquareOutlined />
                        </div>
                        <div
                          onClick={moveListBy(listIndex, 1)}
                          style={{
                            cursor: "pointer",
                            display: "inline-block",
                            paddingLeft: "4px",
                            fontSize: "1.5em",
                          }}
                        >
                          <DownSquareOutlined />
                        </div>
                      </>
                    }
                  >
                    <div style={{ cursor: "pointer" }} className="header">
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
                              onChange={setListTitle(listIndex)}
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
                          )
                            .sort()
                            .map(([faction, count], i) => (
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
                  </Tooltip>

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
                                  <Tooltip
                                    placement="top"
                                    color="crimson"
                                    trigger="click"
                                    align={{ offset: [0, 4] }}
                                    title={
                                      <div
                                        onClick={removeCard(
                                          listIndex,
                                          cardIndex
                                        )}
                                        style={{
                                          cursor: "pointer",
                                          fontSize: "1.5em",
                                        }}
                                      >
                                        <DeleteOutlined />
                                      </div>
                                    }
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
                                                <FactionImage
                                                  faction={faction}
                                                />
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
                                  </Tooltip>
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
    factionModels: Object.entries(FactionModels.select()(state))
      .sort()
      .map(([faction, models]) => [
        Factions.select()(state)[faction].text,
        faction,
        models.map((model) => ({
          name: model.Name.text,
          page: model.Name.page,
          type: model.Type.text,
          ...(model.Subtype ? { subtype: model.Subtype.text } : {}),
        })),
      ]),
    wildCardModels: Object.fromEntries(
      Object.entries(WildCardModels.select()(state))
        .sort()
        .map(([faction, models]) => [
          faction,
          models.map((model) => ({
            name: model.Name.text,
            page: model.Name.page,
            type: model.Type.text,
            ...(model.Subtype ? { subtype: model.Subtype.text } : {}),
          })),
        ])
    ),
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
    dragStart: (event) => dispatch(CardDragStarted(event)),
    dragEnd: (event) => dispatch(CardDragEnded(event)),
    menuItemClicked: (page) => (event) => {
      dispatch(MenuItemClicked({ page }));
      event.stopPropagation();
    },
    removeCard: (listIndex, cardIndex) => () =>
      dispatch(
        Lists.removeCard({
          source: { listIndex, cardIndex },
        })
      ),
    removeList: (listIndex) => () => dispatch(Lists.removeList({ listIndex })),
    addEmptyList: (listIndex) => () =>
      dispatch(Lists.addEmptyList({ listIndex })),
    moveListBy: (listIndex, by) => () =>
      dispatch(Lists.moveListBy({ listIndex, by })),
    setListTitle: (listIndex) => (event) =>
      dispatch(Lists.setListTitle({ listIndex, title: event.target.value })),
  })
)(AppPresentation);

export default App;
