import "./App.css";
import React from "react";
import { connect } from "react-redux";
import {
  Badge,
  Card,
  Col,
  Drawer,
  Input,
  Layout,
  Menu,
  Row,
  Select,
  Tooltip,
} from "antd";
import {
  DeleteOutlined,
  DownSquareOutlined,
  MenuUnfoldOutlined,
  PlusSquareOutlined,
  SyncOutlined,
  UpSquareOutlined,
} from "@ant-design/icons";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Aeternus_Continuum from "./Aeternus_Continuum.png";
import Fallback from "./Fallback.png";
import Empyrean from "./Empyrean.png";
import Iron_Star_Alliance from "./Iron_Star_Alliance.png";
import Lost_Legion from "./Lost_Legion.png";
import Marcher_Worlds from "./Marcher_Worlds.png";
import Wild_Card from "./Wild_Card.png";
import { CardDragEnded, CardDragStarted, MenuItemClicked } from "../messages";
import { AppSync } from "../state/AppSync";
import { CypherCodecs } from "../state/CypherCodecs";
import { Cyphers as Cyphers2 } from "../state/Cyphers";
import { Dragging } from "../state/Dragging";
import { FactionModels } from "../state/FactionModels";
import { Factions } from "../state/Factions";
import { Lists } from "../state/Lists";
import { PageIds } from "../state/PageIds";
import { Url } from "../state/Url";
import { WildCardModels } from "../state/WildCardModels";
import { Models } from "../state/Models";
import { WarjackWeapons } from "../state/WarjackWeapons";

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
    case "Lost_Legion":
      return <img src={Lost_Legion} alt={faction} height="35px" />;
    case "Marcher_Worlds":
      return <img src={Marcher_Worlds} alt={faction} height="35px" />;
    case "Wild_Card":
      return <img src={Wild_Card} alt={faction} height="35px" />;
    case "Universal":
      return <img src={Fallback} alt={faction} height="35px" />;
    default:
      return <img src={Fallback} alt={faction} height="35px" />;
  }
}

function AppPresentation({
  initialized,
  syncReasons,
  factionModels,
  wildCardModels,
  cypherCodecs,
  dragging,
  menuItemClicked,
  dragEnd,
  dragStart,
  lists,
  toggleCard,
  removeList,
  addEmptyList,
  moveListBy,
  setListTitle,
  setUrl,
  url,
  bookmark,
  open,
  setCardCortex,
  setCardWarjackWeapons,
  setCardVehicleWeapon,
  factions,
  warjackWeapons,
}) {
  const [openDrawer, setOpenDrawer] = React.useState("");

  const onOpenChangeDrawers = (keys) => {
    if (keys.length > 0) {
      const key = keys[0];
      if (key === openDrawer) {
        setOpenDrawer("");
      } else {
        setOpenDrawer(keys[0]);
      }
    }
  };

  return (
    <div className="App">
      <Layout>
        <Layout>
          <DragDropContext onDragStart={dragStart} onDragEnd={dragEnd}>
            <Header>
              <Droppable key={"trash_header"} droppableId={"trash_header"}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {dragging ? (
                      <div
                        style={{
                          animation:
                            "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
                          color: "white",
                        }}
                      >
                        <DeleteOutlined />
                      </div>
                    ) : (
                      <a className="logo" href="/">
                        WARFASTER
                      </a>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Header>
            {!initialized ? (
              <Content>
                <Layout>
                  <Row>
                    <Col xs={24} sm={12} md={12} lg={12} xl={8} xxl={8}>
                      <div className="cards" key="cards0">
                        <div style={{ cursor: "pointer" }} className="header">
                          <Row>
                            <Col span={16} className="army-list-title">
                              <TextArea
                                value={"Setting up Warfaster"}
                                maxLength={30}
                                autoSize
                              />
                            </Col>
                            <Col span={8} className="faction-icons">
                              <SyncOutlined
                                spin
                                style={{
                                  color: "#d1c5b1",
                                  fontSize: "23px",
                                  margin: "3px 10px 0 0",
                                }}
                              />
                            </Col>
                          </Row>
                        </div>

                        <div>
                          {syncReasons.map(({ reason, description }, index) => (
                            <div className="body" key={`reason${index}`}>
                              <Card hoverable className="card">
                                <Card.Meta
                                  avatar={
                                    <div
                                      style={{
                                        height: "25px",
                                        width: "35px",
                                        textAlign: "center",
                                      }}
                                    >
                                      <SyncOutlined
                                        spin
                                        style={{
                                          color: "#d1c5b1",
                                          fontSize: "35px",
                                        }}
                                      />
                                    </div>
                                  }
                                  title={
                                    <>
                                      <div>{reason}</div>
                                      <div className="card-type">
                                        {description}
                                      </div>
                                    </>
                                  }
                                />
                              </Card>
                            </div>
                          ))}
                        </div>
                        <div className="footer">
                          <Badge
                            size="small"
                            key="_badge"
                            count={syncReasons.length}
                            offset={[10, 5]}
                          >
                            Loading:
                          </Badge>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Layout>
              </Content>
            ) : (
              <>
                <Content>
                  <Menu
                    id="factions"
                    openKeys={[]}
                    onOpenChange={onOpenChangeDrawers}
                    mode="horizontal"
                    triggerSubMenuAction="click"
                  >
                    {factionModels.map(([factionName, faction, models]) => (
                      <SubMenu
                        key={faction}
                        icon={<FactionImage faction={faction} />}
                      ></SubMenu>
                    ))}
                  </Menu>
                </Content>
                <Content>
                  <Layout>
                    <Row gutter={16}>
                      {lists.map(({ title, cards }, listIndex) => (
                        <Col
                          key={`lists_col_${listIndex}`}
                          xs={24}
                          sm={12}
                          md={12}
                          lg={12}
                          xl={8}
                          xxl={8}
                        >
                          <div className="cards" key={`cards${listIndex}`}>
                            <Tooltip
                              placement="top"
                              color="transparent"
                              trigger="click"
                              align={{ offset: [0, 17] }}
                              title={
                                <div className="ant-tooltip-inner-box">
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
                                </div>
                              }
                            >
                              <div
                                style={{ cursor: "pointer" }}
                                className="header"
                              >
                                <Row>
                                  <Col span={16} className="army-list-title">
                                    <TextArea
                                      placeholder={generateListNamePlaceholder(
                                        cards,
                                        factions,
                                        "Name your list"
                                      )}
                                      value={title}
                                      maxLength={30}
                                      autoSize
                                      onChange={setListTitle(listIndex)}
                                    />
                                  </Col>
                                  <Col span={8} className="faction-icons">
                                    {Object.entries(
                                      cards.reduce(
                                        (acc, card) => ({
                                          ...acc,
                                          ...(card.faction
                                            ? {
                                                [card.faction]:
                                                  (acc[card.faction] || 0) + 1,
                                              }
                                            : {
                                                Universal:
                                                  (acc.Universal || 0) + 1,
                                              }),
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
                                          offset={[0, 10]}
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
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                >
                                  {cards.map(
                                    (
                                      {
                                        card,
                                        hidden,
                                        type,
                                        title,
                                        page,
                                        pageId,
                                        cortexIds,
                                        vehicleWeaponId,
                                        warjackWeaponIds,
                                        subtype,
                                        faction,
                                        details,
                                      },
                                      cardIndex
                                    ) => (
                                      <Draggable
                                        key={`${page}_${listIndex}_${cardIndex}`}
                                        draggableId={`${page}_${listIndex}_${cardIndex}`}
                                        index={cardIndex}
                                      >
                                        {(provided) => (
                                          <div
                                            className="body"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                          >
                                            <Card
                                              hoverable
                                              className={[
                                                "card",
                                                faction,
                                                type,
                                              ]}
                                              onClick={toggleCard(
                                                listIndex,
                                                cardIndex,
                                                pageId,
                                                card
                                              )}
                                            >
                                              <Card.Meta
                                                avatar={
                                                  faction ? (
                                                    <div
                                                      style={{
                                                        height: "25px",
                                                        width: "35px",
                                                        textAlign: "center",
                                                      }}
                                                    >
                                                      <FactionImage
                                                        faction={faction}
                                                      />
                                                    </div>
                                                  ) : (
                                                    <FactionImage faction="Universal" />
                                                  )
                                                }
                                                title={
                                                  <>
                                                    <div>{title}</div>
                                                    <div className="card-type">
                                                      {(faction || "").replace(
                                                        /_/g,
                                                        " "
                                                      )}
                                                      {subtype
                                                        ? " " + subtype
                                                        : ""}
                                                      {type ? " " + type : ""}
                                                    </div>
                                                    <div>
                                                      <span className="subtitle">
                                                        {[
                                                          ...(!details ||
                                                          !details.vehicleWeaponSelection ||
                                                          !vehicleWeaponName(
                                                            details.vehicleWeaponSelection,
                                                            vehicleWeaponId
                                                          )
                                                            ? []
                                                            : [
                                                                vehicleWeaponName(
                                                                  details.vehicleWeaponSelection,
                                                                  vehicleWeaponId
                                                                ),
                                                              ]),
                                                          ...(!details ||
                                                          !details.cortexSelections ||
                                                          !cortexName(
                                                            details.cortexSelections,
                                                            cortexIds
                                                          )
                                                            ? []
                                                            : [
                                                                cortexName(
                                                                  details.cortexSelections,
                                                                  cortexIds
                                                                ),
                                                              ]),
                                                          ...(!details ||
                                                          !details.warjackWeaponSelections ||
                                                          !warjackWeaponIds ||
                                                          warjackWeaponIds.length ===
                                                            0
                                                            ? []
                                                            : warjackWeaponNamesSubtitle(
                                                                details.warjackWeaponSelections,
                                                                warjackWeaponIds
                                                              )),
                                                        ].join(", ")}
                                                      </span>
                                                    </div>
                                                  </>
                                                }
                                              />
                                              {hidden ? (
                                                <></>
                                              ) : !details ? (
                                                <div
                                                  style={{
                                                    margin: "10px 0",
                                                    textAlign: "center",
                                                  }}
                                                >
                                                  <SyncOutlined
                                                    spin
                                                    style={{ fontSize: "23px" }}
                                                  />
                                                </div>
                                              ) : (
                                                <div className="card-content">
                                                  {!details.pow ? (
                                                    <></>
                                                  ) : (
                                                    <p>
                                                      Pow: {details.pow.text}
                                                    </p>
                                                  )}
                                                  {!details.effect ||
                                                  details.effect.length ===
                                                    0 ? (
                                                    <></>
                                                  ) : (
                                                    details.effect.map(
                                                      (effect, index) => (
                                                        <p
                                                          key={`effect_${index}`}
                                                        >
                                                          {effect}
                                                        </p>
                                                      )
                                                    )
                                                  )}
                                                  {!details.squadSize ? (
                                                    <></>
                                                  ) : (
                                                    <dl>
                                                      <dt>Squad Size</dt>
                                                      <dd>
                                                        {details.squadSize}
                                                      </dd>
                                                    </dl>
                                                  )}
                                                  {!details.deploymentCost ? (
                                                    <></>
                                                  ) : (
                                                    <dl>
                                                      <dt>DC</dt>
                                                      <dd>
                                                        {details.deploymentCost}
                                                      </dd>
                                                    </dl>
                                                  )}
                                                  {!details.baseSize ? (
                                                    <></>
                                                  ) : (
                                                    <dl>
                                                      <dt>Base Size</dt>
                                                      <dd>
                                                        {details.baseSize}
                                                      </dd>
                                                    </dl>
                                                  )}
                                                  {!details.health ? (
                                                    <></>
                                                  ) : (
                                                    <dl>
                                                      <dt>Health</dt>
                                                      <dd>{details.health}</dd>
                                                    </dl>
                                                  )}
                                                  {!details.wildCardFactions ||
                                                  Object.values(
                                                    details.wildCardFactions
                                                  ).length === 0 ? (
                                                    <></>
                                                  ) : (
                                                    <>
                                                      <p>Wild Card Factions</p>
                                                      <ul>
                                                        {Object.values(
                                                          details.wildCardFactions
                                                        ).map(
                                                          ({ text }, index) => (
                                                            <li
                                                              key={`wild_card_faction_${index}`}
                                                            >
                                                              {text}
                                                            </li>
                                                          )
                                                        )}
                                                      </ul>
                                                    </>
                                                  )}
                                                  {!details.hardpoints ? (
                                                    <></>
                                                  ) : (
                                                    <dl>
                                                      <dt>Hardpoints</dt>
                                                      <dd>
                                                        {details.hardpoints}
                                                      </dd>
                                                    </dl>
                                                  )}
                                                  {!details.weaponPoints ? (
                                                    <></>
                                                  ) : (
                                                    <dl>
                                                      <dt>Weapon Points</dt>
                                                      <dd>
                                                        {details.weaponPoints}
                                                      </dd>
                                                    </dl>
                                                  )}
                                                  {!details.modelStats ||
                                                  Object.keys(
                                                    details.modelStats
                                                  ).length === 0 ? (
                                                    <></>
                                                  ) : (
                                                    <table>
                                                      <thead>
                                                        <tr>
                                                          {Object.keys(
                                                            details.modelStats
                                                          ).map(
                                                            (name, index) => (
                                                              <th
                                                                key={`${name}_stat_${index}`}
                                                              >
                                                                {name}
                                                              </th>
                                                            )
                                                          )}
                                                        </tr>
                                                      </thead>
                                                      <tbody>
                                                        <tr>
                                                          {Object.entries(
                                                            details.modelStats
                                                          ).map(
                                                            (
                                                              [name, stat],
                                                              index
                                                            ) => (
                                                              <td
                                                                key={`${name}_stat_value_${index}`}
                                                              >
                                                                {stat}
                                                              </td>
                                                            )
                                                          )}
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  )}
                                                  {!details.specialRules ||
                                                  Object.entries(
                                                    details.specialRules
                                                  ).length === 0 ? (
                                                    <></>
                                                  ) : (
                                                    <>
                                                      <p>Special Rules</p>
                                                      <dl>
                                                        {Object.entries(
                                                          details.specialRules
                                                        ).map(
                                                          (
                                                            [name, text],
                                                            index
                                                          ) => (
                                                            <React.Fragment
                                                              key={`special_rules_${index}`}
                                                            >
                                                              <dt>{name}</dt>
                                                              <dd>{text}</dd>
                                                            </React.Fragment>
                                                          )
                                                        )}
                                                      </dl>
                                                    </>
                                                  )}
                                                  {!details.weapons ||
                                                  details.weapons.length ===
                                                    0 ? (
                                                    <></>
                                                  ) : (
                                                    <>
                                                      <p>Weapons</p>
                                                      <table>
                                                        <thead>
                                                          <tr>
                                                            <th>Name</th>
                                                            <th>Attack Type</th>
                                                            <th>Damage Type</th>
                                                            <th>Range</th>
                                                            <th>POW</th>
                                                          </tr>
                                                        </thead>
                                                        <tbody>
                                                          {details.weapons.map(
                                                            (weapon, index) => (
                                                              <React.Fragment
                                                                key={`weapon_number_${index}`}
                                                              >
                                                                <tr>
                                                                  <td>
                                                                    {
                                                                      weapon[
                                                                        "Name"
                                                                      ]
                                                                    }
                                                                  </td>
                                                                  <td>
                                                                    {
                                                                      weapon[
                                                                        "Attack Type"
                                                                      ]
                                                                    }
                                                                  </td>
                                                                  <td>
                                                                    {
                                                                      weapon[
                                                                        "Damage Type"
                                                                      ]
                                                                    }
                                                                  </td>
                                                                  <td>
                                                                    {
                                                                      weapon[
                                                                        "Range"
                                                                      ]
                                                                    }
                                                                  </td>
                                                                  <td>
                                                                    {
                                                                      weapon[
                                                                        "POW"
                                                                      ]
                                                                    }
                                                                  </td>
                                                                </tr>
                                                                {!weapon.specialRules ? (
                                                                  <></>
                                                                ) : (
                                                                  Object.entries(
                                                                    weapon.specialRules
                                                                  ).map(
                                                                    (
                                                                      [
                                                                        rule,
                                                                        text,
                                                                      ],
                                                                      ruleIndex
                                                                    ) => (
                                                                      <tr
                                                                        key={`weapon_number_${index}_rule_${ruleIndex}`}
                                                                      >
                                                                        <td colSpan="5">
                                                                          <dl>
                                                                            <dt>
                                                                              {
                                                                                rule
                                                                              }
                                                                            </dt>
                                                                            <dd>
                                                                              {
                                                                                text
                                                                              }
                                                                            </dd>
                                                                          </dl>
                                                                        </td>
                                                                      </tr>
                                                                    )
                                                                  )
                                                                )}
                                                              </React.Fragment>
                                                            )
                                                          )}
                                                        </tbody>
                                                      </table>
                                                    </>
                                                  )}
                                                  {!details.advantages ||
                                                  Object.entries(
                                                    details.advantages
                                                  ).length === 0 ? (
                                                    <></>
                                                  ) : (
                                                    <>
                                                      <p>Advantages</p>
                                                      <dl>
                                                        {Object.entries(
                                                          details.advantages
                                                        ).map(
                                                          (
                                                            [name, text],
                                                            index
                                                          ) => (
                                                            <React.Fragment
                                                              key={`advantage_${index}`}
                                                            >
                                                              <dt>{name}</dt>
                                                              <dd>{text}</dd>
                                                            </React.Fragment>
                                                          )
                                                        )}
                                                      </dl>
                                                    </>
                                                  )}
                                                  {!details.maneuvers ||
                                                  Object.values(
                                                    details.maneuvers
                                                  ).length === 0 ? (
                                                    <></>
                                                  ) : (
                                                    <>
                                                      <p>Maneuvers</p>
                                                      <dl>
                                                        {Object.entries(
                                                          details.maneuvers
                                                        ).map(
                                                          (
                                                            [name, text],
                                                            index
                                                          ) => (
                                                            <React.Fragment
                                                              key={`advantage_${index}`}
                                                            >
                                                              <dt>{name}</dt>
                                                              <dd>{text}</dd>
                                                            </React.Fragment>
                                                          )
                                                        )}
                                                      </dl>
                                                    </>
                                                  )}

                                                  {!details.vehicleWeaponSelection ||
                                                  details.vehicleWeaponSelection
                                                    .length === 0 ? (
                                                    <></>
                                                  ) : (
                                                    <>
                                                      <p>
                                                        Vehicle Weapon
                                                        Selections
                                                      </p>
                                                      <Select
                                                        defaultValue={
                                                          <span
                                                            style={{
                                                              color: "gray",
                                                              fontStyle:
                                                                "italic",
                                                            }}
                                                          >
                                                            Vehicle Weapon
                                                          </span>
                                                        }
                                                        onClick={(event) =>
                                                          event.stopPropagation()
                                                        }
                                                        onSelect={setCardVehicleWeapon(
                                                          listIndex,
                                                          cardIndex,
                                                          pageId
                                                        )}
                                                        value={
                                                          !vehicleWeaponId
                                                            ? undefined
                                                            : vehicleWeaponName(
                                                                details.vehicleWeaponSelection,
                                                                vehicleWeaponId
                                                              )
                                                        }
                                                      >
                                                        {details.vehicleWeaponSelection.map(
                                                          (
                                                            { text, pageId },
                                                            index
                                                          ) => (
                                                            <Select.Option
                                                              key={`vehicle_weapon_${index}`}
                                                              label={pageId}
                                                              value={text}
                                                              onClick={(
                                                                event
                                                              ) =>
                                                                event.stopPropagation()
                                                              }
                                                            >
                                                              {text}
                                                              {
                                                                // TODO
                                                              }
                                                            </Select.Option>
                                                          )
                                                        )}
                                                      </Select>
                                                    </>
                                                  )}

                                                  {!details.vehicleWeaponSelection ||
                                                  Object.values(
                                                    details.vehicleWeaponSelection
                                                  ).length === 0 ? (
                                                    <></>
                                                  ) : (
                                                    <>
                                                      <p>
                                                        Vehicle Weapon Selection
                                                      </p>
                                                      <ol>
                                                        {Object.values(
                                                          details.vehicleWeaponSelection
                                                        ).map(
                                                          (
                                                            { text, page },
                                                            index
                                                          ) => (
                                                            <li
                                                              key={`weapon_selection_${index}`}
                                                            >
                                                              <a href={page}>
                                                                {text}
                                                              </a>
                                                            </li>
                                                          )
                                                        )}
                                                      </ol>
                                                    </>
                                                  )}
                                                  {!details.cortexes ||
                                                  Object.entries(
                                                    details.cortexes
                                                  ).length === 0 ? (
                                                    <></>
                                                  ) : (
                                                    <>
                                                      <p>Cortex</p>
                                                      <ol>
                                                        {Object.entries(
                                                          details.cortexes
                                                        ).map(
                                                          (
                                                            [
                                                              cortex,
                                                              advantages,
                                                            ],
                                                            index
                                                          ) => (
                                                            <li
                                                              key={`cortex_${index}`}
                                                            >
                                                              {cortex}
                                                              <dl>
                                                                {Object.entries(
                                                                  advantages
                                                                ).map(
                                                                  (
                                                                    [
                                                                      name,
                                                                      text,
                                                                    ],
                                                                    advantageIndex
                                                                  ) => (
                                                                    <React.Fragment
                                                                      key={`cortex_${index}_advantage_${advantageIndex}`}
                                                                    >
                                                                      <dt>
                                                                        {name}
                                                                      </dt>
                                                                      <dd>
                                                                        {text}
                                                                      </dd>
                                                                    </React.Fragment>
                                                                  )
                                                                )}
                                                              </dl>
                                                            </li>
                                                          )
                                                        )}
                                                      </ol>
                                                    </>
                                                  )}
                                                  {!details.cortexSelections ||
                                                  Object.entries(
                                                    details.cortexSelections
                                                  ).length === 0 ? (
                                                    <></>
                                                  ) : (
                                                    <>
                                                      <p>Cortex Selections</p>
                                                      <Select
                                                        defaultValue={
                                                          <span
                                                            style={{
                                                              color: "gray",
                                                              fontStyle:
                                                                "italic",
                                                            }}
                                                          >
                                                            Cortex
                                                          </span>
                                                        }
                                                        onClick={(event) =>
                                                          event.stopPropagation()
                                                        }
                                                        onSelect={setCardCortex(
                                                          listIndex,
                                                          cardIndex,
                                                          pageId
                                                        )}
                                                        value={
                                                          !cortexIds
                                                            ? undefined
                                                            : cortexName(
                                                                details.cortexSelections,
                                                                cortexIds
                                                              )
                                                        }
                                                      >
                                                        {Object.entries(
                                                          details.cortexSelections
                                                        ).map(
                                                          (
                                                            [
                                                              cortex,
                                                              advantages,
                                                            ],
                                                            index
                                                          ) => (
                                                            <Select.Option
                                                              key={`cortex_${index}`}
                                                              label={Object.values(
                                                                advantages
                                                              ).map(
                                                                ({
                                                                  categoryId,
                                                                }) => categoryId
                                                              )}
                                                              value={cortex}
                                                              onClick={(
                                                                event
                                                              ) =>
                                                                event.stopPropagation()
                                                              }
                                                            >
                                                              {cortex}
                                                              <dl>
                                                                {Object.entries(
                                                                  advantages
                                                                ).map(
                                                                  (
                                                                    [
                                                                      name,
                                                                      { text },
                                                                    ],
                                                                    advantageIndex
                                                                  ) => (
                                                                    <React.Fragment
                                                                      key={`cortex_${index}_advantage_${advantageIndex}`}
                                                                    >
                                                                      <dt>
                                                                        {name}
                                                                      </dt>
                                                                      <dd>
                                                                        {text}
                                                                      </dd>
                                                                    </React.Fragment>
                                                                  )
                                                                )}
                                                              </dl>
                                                            </Select.Option>
                                                          )
                                                        )}
                                                      </Select>
                                                    </>
                                                  )}
                                                  {!details.chassisSpecialRules ||
                                                  Object.entries(
                                                    details.chassisSpecialRules
                                                  ).length === 0 ? (
                                                    <></>
                                                  ) : (
                                                    <>
                                                      <p>
                                                        Chassis Special Rules
                                                      </p>
                                                      <dl>
                                                        {Object.entries(
                                                          details.chassisSpecialRules
                                                        ).map(
                                                          (
                                                            [name, text],
                                                            index
                                                          ) => (
                                                            <React.Fragment
                                                              key={`advantage_${index}`}
                                                            >
                                                              <dt>{name}</dt>
                                                              <dd>{text}</dd>
                                                            </React.Fragment>
                                                          )
                                                        )}
                                                      </dl>
                                                    </>
                                                  )}
                                                  {!details.hardpointNames ? (
                                                    <></>
                                                  ) : (
                                                    <>
                                                      <p>
                                                        Warjack Weapon
                                                        Selections
                                                      </p>
                                                      {details.hardpointNames.map(
                                                        (
                                                          hardpointName,
                                                          hardpointNameIndex
                                                        ) =>
                                                          !details.warjackWeaponSelections ||
                                                          Object.keys(
                                                            details.warjackWeaponSelections
                                                          ).length === 0 ? (
                                                            <></>
                                                          ) : (
                                                            <div
                                                              key={`warjack_weapon_${hardpointNameIndex}`}
                                                            >
                                                              <Select
                                                                defaultValue={
                                                                  <span
                                                                    style={{
                                                                      color:
                                                                        "gray",
                                                                      fontStyle:
                                                                        "italic",
                                                                    }}
                                                                  >
                                                                    {
                                                                      hardpointName
                                                                    }
                                                                  </span>
                                                                }
                                                                onClick={(
                                                                  event
                                                                ) =>
                                                                  event.stopPropagation()
                                                                }
                                                                onSelect={setCardWarjackWeapons(
                                                                  listIndex,
                                                                  cardIndex,
                                                                  hardpointNameIndex,
                                                                  pageId
                                                                )}
                                                                value={
                                                                  !warjackWeaponIds ||
                                                                  !warjackWeaponIds[
                                                                    hardpointNameIndex
                                                                  ]
                                                                    ? undefined
                                                                    : warjackWeaponNames(
                                                                        details.warjackWeaponSelections,
                                                                        warjackWeaponIds[
                                                                          hardpointNameIndex
                                                                        ]
                                                                      )
                                                                }
                                                              >
                                                                {Object.values(
                                                                  details.warjackWeaponSelections
                                                                )
                                                                  .filter(
                                                                    ({
                                                                      location,
                                                                    }) =>
                                                                      location ===
                                                                      hardpointName
                                                                  )
                                                                  .map(
                                                                    (
                                                                      {
                                                                        name,
                                                                        page,
                                                                        pageId,
                                                                        cost,
                                                                        location,
                                                                      },
                                                                      index
                                                                    ) => (
                                                                      <Select.Option
                                                                        key={`warjack_weapon_${hardpointNameIndex}_${index}`}
                                                                        label={
                                                                          pageId
                                                                        }
                                                                        value={
                                                                          name
                                                                        }
                                                                        onClick={(
                                                                          event
                                                                        ) =>
                                                                          event.stopPropagation()
                                                                        }
                                                                      >
                                                                        <h3>
                                                                          {warjackWeaponName(
                                                                            name,
                                                                            cost
                                                                          )}
                                                                        </h3>
                                                                        <div>
                                                                          {!warjackWeapons[
                                                                            page.split(
                                                                              "#"
                                                                            )[0]
                                                                          ] ? (
                                                                            "Weapon details missing!"
                                                                          ) : (
                                                                            <>
                                                                              <div>
                                                                                Location:{" "}
                                                                                {
                                                                                  warjackWeapons[
                                                                                    page.split(
                                                                                      "#"
                                                                                    )[0]
                                                                                  ]
                                                                                    .location
                                                                                }
                                                                              </div>
                                                                              {!warjackWeapons[
                                                                                page.split(
                                                                                  "#"
                                                                                )[0]
                                                                              ]
                                                                                .specialRules ? (
                                                                                ""
                                                                              ) : (
                                                                                <dl>
                                                                                  {Object.entries(
                                                                                    warjackWeapons[
                                                                                      page.split(
                                                                                        "#"
                                                                                      )[0]
                                                                                    ]
                                                                                      .specialRules
                                                                                  ).map(
                                                                                    (
                                                                                      [
                                                                                        name,
                                                                                        rule,
                                                                                      ],
                                                                                      index
                                                                                    ) => (
                                                                                      <React.Fragment
                                                                                        key={`special_rules_${page}_${index}`}
                                                                                      >
                                                                                        <dt>
                                                                                          {
                                                                                            name
                                                                                          }
                                                                                        </dt>
                                                                                        <dd>
                                                                                          {
                                                                                            rule
                                                                                          }
                                                                                        </dd>
                                                                                      </React.Fragment>
                                                                                    )
                                                                                  )}
                                                                                </dl>
                                                                              )}
                                                                              {!warjackWeapons[
                                                                                page.split(
                                                                                  "#"
                                                                                )[0]
                                                                              ]
                                                                                .weapons ? (
                                                                                ""
                                                                              ) : (
                                                                                <table>
                                                                                  <thead>
                                                                                    <tr>
                                                                                      <th>
                                                                                        Name
                                                                                      </th>
                                                                                      <th>
                                                                                        Attack
                                                                                        Type
                                                                                      </th>
                                                                                      <th>
                                                                                        Damage
                                                                                        Type
                                                                                      </th>
                                                                                      <th>
                                                                                        Range
                                                                                      </th>
                                                                                      <th>
                                                                                        POW
                                                                                      </th>
                                                                                    </tr>
                                                                                  </thead>
                                                                                  <tbody>
                                                                                    {warjackWeapons[
                                                                                      page.split(
                                                                                        "#"
                                                                                      )[0]
                                                                                    ].weapons.map(
                                                                                      (
                                                                                        weapon,
                                                                                        index
                                                                                      ) => (
                                                                                        <React.Fragment
                                                                                          key={`warjack_weapons_weapon_${page}_${index}`}
                                                                                        >
                                                                                          <tr>
                                                                                            <td>
                                                                                              {
                                                                                                weapon[
                                                                                                  "Name"
                                                                                                ]
                                                                                              }
                                                                                            </td>
                                                                                            <td>
                                                                                              {
                                                                                                weapon[
                                                                                                  "Attack Type"
                                                                                                ]
                                                                                              }
                                                                                            </td>
                                                                                            <td>
                                                                                              {weapon[
                                                                                                "Damage Type"
                                                                                              ]
                                                                                                .join
                                                                                                ? weapon[
                                                                                                    "Damage Type"
                                                                                                  ].join(
                                                                                                    " "
                                                                                                  )
                                                                                                : weapon[
                                                                                                    "Damage Type"
                                                                                                  ]}
                                                                                            </td>
                                                                                            <td>
                                                                                              {
                                                                                                weapon[
                                                                                                  "Range"
                                                                                                ]
                                                                                              }
                                                                                            </td>
                                                                                            <td>
                                                                                              {
                                                                                                weapon[
                                                                                                  "POW"
                                                                                                ]
                                                                                              }
                                                                                            </td>
                                                                                          </tr>
                                                                                          {!weapon.specialRules ? (
                                                                                            <>

                                                                                            </>
                                                                                          ) : (
                                                                                            <tr>
                                                                                              <td colSpan="5">
                                                                                                <dl>
                                                                                                  {Object.entries(
                                                                                                    weapon.specialRules
                                                                                                  ).map(
                                                                                                    (
                                                                                                      [
                                                                                                        name,
                                                                                                        rule,
                                                                                                      ],
                                                                                                      index
                                                                                                    ) => (
                                                                                                      <React.Fragment
                                                                                                        key={`warjack_weapons_weapon_${weapon["Name"]}_special_rules_${page}_${index}`}
                                                                                                      >
                                                                                                        {
                                                                                                          <>
                                                                                                            <dt>
                                                                                                              {
                                                                                                                name
                                                                                                              }
                                                                                                            </dt>
                                                                                                            <dd>
                                                                                                              {
                                                                                                                rule
                                                                                                              }
                                                                                                            </dd>
                                                                                                          </>
                                                                                                        }
                                                                                                      </React.Fragment>
                                                                                                    )
                                                                                                  )}
                                                                                                </dl>
                                                                                              </td>
                                                                                            </tr>
                                                                                          )}
                                                                                        </React.Fragment>
                                                                                      )
                                                                                    )}
                                                                                  </tbody>
                                                                                </table>
                                                                              )}
                                                                            </>
                                                                          )}
                                                                        </div>
                                                                        {
                                                                          // TODO
                                                                        }
                                                                      </Select.Option>
                                                                    )
                                                                  )}
                                                              </Select>
                                                            </div>
                                                          )
                                                      )}
                                                    </>
                                                  )}
                                                  {!details.weaponDetails ||
                                                  details.weaponDetails
                                                    .length === 0 ? (
                                                    <></>
                                                  ) : (
                                                    <>
                                                      <p>Weapon Details</p>
                                                      <table>
                                                        <thead>
                                                          <tr>
                                                            <th>Weapon</th>
                                                            <th>Location</th>
                                                            <th>Cost</th>
                                                            <th>Weapon Pack</th>
                                                          </tr>
                                                        </thead>
                                                        <tbody>
                                                          {details.weaponDetails.map(
                                                            (weapon, index) => (
                                                              <React.Fragment
                                                                key={`weapon_details_number_${index}`}
                                                              >
                                                                <tr>
                                                                  <td>
                                                                    {
                                                                      weapon[
                                                                        "Weapon"
                                                                      ].text
                                                                    }
                                                                  </td>
                                                                  <td>
                                                                    {
                                                                      weapon[
                                                                        "Location"
                                                                      ].text
                                                                    }
                                                                  </td>
                                                                  <td>
                                                                    {
                                                                      weapon[
                                                                        "Cost"
                                                                      ].text
                                                                    }
                                                                  </td>
                                                                  <td>
                                                                    {
                                                                      weapon[
                                                                        "Weapon Pack"
                                                                      ].text
                                                                    }
                                                                  </td>
                                                                </tr>
                                                              </React.Fragment>
                                                            )
                                                          )}
                                                        </tbody>
                                                      </table>
                                                    </>
                                                  )}
                                                  {!details.release ? (
                                                    <></>
                                                  ) : (
                                                    <>
                                                      <p>Release</p>
                                                      <p>{details.release}</p>
                                                    </>
                                                  )}
                                                  {!details.lore ? (
                                                    <></>
                                                  ) : (
                                                    <>
                                                      <p>Lore</p>
                                                      <p>{details.lore}</p>
                                                    </>
                                                  )}
                                                </div>
                                              )}
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

                            {cards.length > 0 ? (
                              <div className="footer">
                                <Badge
                                  size="small"
                                  key="_badge"
                                  count={cards.length}
                                  offset={[10, 5]}
                                >
                                  Card:
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
                                    <Badge
                                      size="small"
                                      key={`badge${i}`}
                                      count={count}
                                      offset={[10, 5]}
                                    >
                                      {type}:
                                    </Badge>
                                  ))}
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Layout>
                </Content>
              </>
            )}
            <Droppable key={"trash_footer"} droppableId={"trash_footer"}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {dragging ? (
                    <>
                      <div className="trash-footer">
                        <div
                          style={{
                            animation:
                              "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
                            color: "white",
                          }}
                        >
                          <DeleteOutlined />
                          <div style={{ display: "none" }}>
                            {provided.placeholder}
                          </div>
                        </div>
                      </div>
                      <Footer>
                        <div className="copyright-notice">
                          Images originating from the Privateer Press website
                          are © 2001—
                          <>{new Date().getFullYear()}</> Privateer Press, Inc.
                          All Rights Reserved. Privateer Press, warcaster and
                          their logos are trademarks of Privateer Press, Inc.
                          Images and trademarks used without permission. This
                          website is unofficial and is not endorsed by Privateer
                          Press.
                        </div>
                      </Footer>
                    </>
                  ) : (
                    <Footer>
                      <div className="bookmark">
                        <Layout>
                          <Row>
                            <Col
                              xs={24}
                              sm={24}
                              md={18}
                              lg={18}
                              xl={16}
                              xxl={16}
                            >
                              <input
                                value={url}
                                onChange={setUrl}
                                onKeyDown={open}
                                onClick={bookmark}
                              />
                            </Col>
                          </Row>
                        </Layout>
                      </div>
                      <div className="copyright-notice">
                        Images originating from the Privateer Press website are
                        © 2001—
                        <>{new Date().getFullYear()}</> Privateer Press, Inc.
                        All Rights Reserved. Privateer Press, warcaster and
                        their logos are trademarks of Privateer Press, Inc.
                        Images and trademarks used without permission. This
                        website is unofficial and is not endorsed by Privateer
                        Press.
                      </div>
                    </Footer>
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {factionModels.map(([factionName, faction, models]) => (
            <Drawer
              key={`drawer_${faction}`}
              visible={openDrawer === faction}
              placement="right"
              onClose={setOpenDrawer}
              width="80%"
              mask={false}
              closeIcon={<MenuUnfoldOutlined />}
            >
              <Menu
                id={`faction_${faction}`}
                mode="inline"
                triggerSubMenuAction="click"
              >
                <Menu.ItemGroup title={factionName}>
                  {models.map(({ name, page, type, subtype }) => {
                    const shortName = name.slice(0, 40);

                    return (
                      <Menu.Item key={faction + ":" + page} className={faction}>
                        <span onClick={menuItemClicked(page)}>
                          <span className="card">
                            {shortName.length === name.length ? (
                              shortName
                            ) : (
                              <Tooltip placement="top" title={name}>
                                {shortName}...
                              </Tooltip>
                            )}
                          </span>
                          <span className="types">
                            {subtype ? subtype : ""}
                            {type ? (subtype ? " " : "") + type : ""}
                          </span>
                        </span>
                      </Menu.Item>
                    );
                  })}
                </Menu.ItemGroup>
                <Menu.ItemGroup title={`${factionName} Wild Cards`}>
                  {(wildCardModels[faction] || [])
                    .sort((w1, w2) => (w1.type < w2.type ? -1 : 1))
                    .map(({ name, page, type, subtype }, j) => {
                      const shortName = name.slice(0, 40);

                      return (
                        <Menu.Item key={faction + ":" + page}>
                          <span onClick={menuItemClicked(page)}>
                            <span className="card">
                              {shortName.length === name.length ? (
                                shortName
                              ) : (
                                <Tooltip placement="top" title={name}>
                                  {shortName}...
                                </Tooltip>
                              )}
                            </span>
                            <span className="types">
                              {subtype ? subtype : ""}
                              {type ? (subtype ? " " : "") + type : ""}
                            </span>
                          </span>
                        </Menu.Item>
                      );
                    })}
                </Menu.ItemGroup>
                {Object.entries(
                  cypherCodecs
                    .filter(
                      (cypher) =>
                        [factionName, "Universal"].indexOf(
                          cypher.Faction.text
                        ) !== -1
                    )
                    .reduce(
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
                  .sort(([a], [b]) =>
                    a === "Universal" ? 1 : b === "Universal" ? -1 : 1
                  )
                  .map(([faction, cyphers]) => (
                    <Menu.ItemGroup title={`${faction} Cyphers`} key={faction}>
                      {cyphers
                        .sort((c1, c2) =>
                          c1.Type.text < c2.Type.text ? -1 : 1
                        )
                        .map(({ Cypher, Type }) => (
                          <Menu.Item
                            key={":" + Cypher.page}
                            className={Type.text}
                          >
                            <span onClick={menuItemClicked(Cypher.page)}>
                              <span className="card">{Cypher.text}</span>
                              <span className="types">{Type.text}</span>
                            </span>
                          </Menu.Item>
                        ))}
                    </Menu.ItemGroup>
                  ))}
              </Menu>
            </Drawer>
          ))}
          <Drawer
            key="drawer_cyphers"
            visible={openDrawer === "cypher_codecs"}
            placement="right"
            onClose={setOpenDrawer}
            width="80%"
            mask={false}
            closeIcon={<MenuUnfoldOutlined />}
          >
            <Menu
              id={`faction_cyphers`}
              mode="inline"
              triggerSubMenuAction="click"
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
                .map(([faction, cyphers]) => (
                  <Menu.ItemGroup title={`${faction} Cyphers`} key={faction}>
                    {cyphers
                      .sort((c1, c2) => (c1.Type.text < c2.Type.text ? -1 : 1))
                      .map(({ Cypher, Type }) => (
                        <Menu.Item
                          key={":" + Cypher.page}
                          className={Type.text}
                        >
                          <span onClick={menuItemClicked(Cypher.page)}>
                            <span className="card">{Cypher.text}</span>
                            <span className="types">{Type.text}</span>
                          </span>
                        </Menu.Item>
                      ))}
                  </Menu.ItemGroup>
                ))}
            </Menu>
          </Drawer>
        </Layout>
      </Layout>
    </div>
  );
}

const App = connect(
  (state) => ({
    initialized: AppSync.selectDone()(state),
    syncReasons: AppSync.selectReasons()(state),
    factionModels: Object.entries(FactionModels.select()(state))
      .sort()
      .map(([faction, models]) => [
        Factions.select()(state)[faction].text,
        faction,
        models.map((model) => ({
          name: model.Name.text,
          page: model.Name.page,
          type: model.Type.text,
          ...(model.Subtype
            ? { subtype: model.Subtype.map((_) => _.text).join(" ") }
            : {}),
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
            ...(model.Subtype
              ? { subtype: model.Subtype.map((_) => _.text).join(" ") }
              : {}),
          })),
        ])
    ),
    cypherCodecs: CypherCodecs.select()(state),
    lists: Lists.select()(state).map(({ title, cards }) => ({
      title,
      cards: cards.flatMap(
        ({ pageId, cortexIds, warjackWeaponIds, vehicleWeaponId, hidden }) => {
          const pageIdByPage = PageIds.select()(state);

          const page =
            Object.entries(pageIdByPage)
              .filter(([_, id]) => id === pageId)
              .map(([page, _]) => page)[0] || "";

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
            const details = Models.selectByPage(page)(state);
            return [
              {
                card: "model",
                hidden,
                type: model.Type.text,
                title: model.Name.text,
                page: model.Name.page,
                pageId,
                cortexIds,
                warjackWeaponIds,
                vehicleWeaponId,
                faction: model.faction,
                ...(model.Subtype
                  ? { subtype: model.Subtype.map((_) => _.text).join(" ") }
                  : {}),
                ...(!details
                  ? {}
                  : {
                      details: {
                        ...details,
                        ...(!details.hardpoints
                          ? {}
                          : {
                              hardpointNames: parseHardpoints(
                                details.hardpoints
                              ),
                            }),
                        ...(!details.cortexSelections
                          ? {}
                          : {
                              cortexSelections: Object.fromEntries(
                                Object.entries(details.cortexSelections).map(
                                  ([cortex, advantages]) => [
                                    cortex,
                                    Object.fromEntries(
                                      Object.entries(advantages).map(
                                        ([advantage, { text, category }]) => [
                                          advantage,
                                          {
                                            text,
                                            categoryId: pageIdByPage[category],
                                          },
                                        ]
                                      )
                                    ),
                                  ]
                                )
                              ),
                            }),
                        ...(!details.warjackWeaponSelections
                          ? {}
                          : {
                              warjackWeaponSelections: Object.fromEntries(
                                Object.entries(
                                  details.warjackWeaponSelections
                                ).map(([page, selection]) => [
                                  page,
                                  { ...selection, pageId: pageIdByPage[page] },
                                ])
                              ),
                            }),
                        ...(!details.vehicleWeaponSelection
                          ? {}
                          : {
                              vehicleWeaponSelection:
                                details.vehicleWeaponSelection.map(
                                  ({ text, page }) => ({
                                    text,
                                    page,
                                    pageId: pageIdByPage[page],
                                  })
                                ),
                            }),
                      },
                    }),
              },
            ];
          }

          if (wildCard) {
            const details = Models.selectByPage(page)(state);
            return [
              {
                card: "model",
                hidden,
                type: wildCard.Type.text,
                title: wildCard.Name.text,
                page: wildCard.Name.page,
                pageId,
                faction: "Wild_Card",
                ...(wildCard.Subtype
                  ? { subtype: wildCard.Subtype.map((_) => _.text).join(" ") }
                  : {}),
                details,
              },
            ];
          }

          if (cypher) {
            const details = Cyphers2.selectByPage(page)(state);
            return [
              {
                card: "cypher",
                hidden,
                type: cypher.Type.text,
                title: cypher.Cypher.text,
                page: cypher.Cypher.page,
                pageId,
                ...(cypher.Faction.text === "Universal"
                  ? { faction: "Universal" }
                  : { faction: cypher.Faction.page }),
                details,
              },
            ];
          }

          return [];
        }
      ),
    })),
    dragging: Dragging.select()(state),
    url: Url.select()(state),
    factions: Factions.select()(state),
    warjackWeapons: WarjackWeapons.select()(state),
  }),
  (dispatch) => ({
    toggleCard: (listIndex, cardIndex, pageId, card) => {
      return () =>
        dispatch(Lists.toggleCard({ listIndex, cardIndex, pageId, card }));
    },
    dragStart: (event) => dispatch(CardDragStarted(event)),
    dragEnd: (event) => dispatch(CardDragEnded(event)),
    menuItemClicked: (page) => (event) => {
      dispatch(MenuItemClicked({ page }));
      event.stopPropagation();
    },
    removeList: (listIndex) => () => dispatch(Lists.removeList({ listIndex })),
    addEmptyList: (listIndex) => () =>
      dispatch(Lists.addEmptyList({ listIndex })),
    moveListBy: (listIndex, by) => () =>
      dispatch(Lists.moveListBy({ listIndex, by })),
    setListTitle: (listIndex) => (event) =>
      dispatch(Lists.setListTitle({ listIndex, title: event.target.value })),
    setUrl: (event) => dispatch(Url.set({ url: event.target.value })),
    bookmark: () => {
      const bookmark = document.querySelector(".bookmark input");
      if (bookmark) {
        if (navigator.userAgent.match(/ipad|iphone/i)) {
          const range = document.createRange();
          range.selectNodeContents(bookmark);

          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
          bookmark.setSelectionRange(0, 999999);
        } else {
          bookmark.select();
        }
      }
    },
    open: (event) => {
      if (event.key === "Enter") {
        const url = document.querySelector(".bookmark input").value;
        if (url) window.open(url, "_self");
      }
    },
    setCardCortex:
      (listIndex, cardIndex, pageId) =>
      (_, { label }) =>
        dispatch(
          Lists.setCardCortex({
            listIndex,
            cardIndex,
            pageId,
            cortexIds: label,
          })
        ),
    setCardWarjackWeapons:
      (listIndex, cardIndex, hardpointNameIndex, pageId) =>
      (_, { label }) =>
        dispatch(
          Lists.setCardWarjackWeapons({
            listIndex,
            cardIndex,
            hardpointNameIndex,
            pageId,
            warjackWeaponId: label,
          })
        ),
    setCardVehicleWeapon:
      (listIndex, cardIndex, pageId) =>
      (_, { label }) =>
        dispatch(
          Lists.setCardVehicleWeapon({
            listIndex,
            cardIndex,
            pageId,
            vehicleWeaponId: label,
          })
        ),
  })
)(AppPresentation);

export default App;

function generateListNamePlaceholder(cards, factionNames, defaultValue) {
  const factions = cards.map((card) => card.faction);
  if (factions.length === 0) return defaultValue;

  const justFactions = factions.filter(
    (faction) => ["Universal", "Wild_Card"].indexOf(faction) === -1
  );
  if (justFactions.length === 0) {
    const justCyphers = factions.filter((faction) => faction === "Universal");
    if (justCyphers.length === factions.length) return "Universal Cyphers";

    return defaultValue;
  }

  const factionsPresent = justFactions.reduce(
    (acc, faction) => ({ ...acc, [faction]: true }),
    {}
  );
  if (Object.keys(factionsPresent).length > 1) return "Several factions";

  const factionName = factionNames[Object.keys(factionsPresent)[0]].text;
  if (factionName) {
    const types = cards.map((card) => card.type);

    const cyperTypes = ["Fury", "Geometric", "Harmonic", "Overdrive"];
    const noCyphers = types.filter((type) => cyperTypes.indexOf(type) === -1);
    if (noCyphers.length === types.length) return factionName + " Models";

    const justCyphers = types.filter((type) => cyperTypes.indexOf(type) > -1);
    if (justCyphers.length === types.length) return factionName + " Cyphers";

    return factionName;
  }

  return defaultValue;
}

function cortexName(cortexSelections, cortexIds) {
  return (Object.entries(cortexSelections).find(
    ([cortex, advantages]) =>
      Object.values(advantages)
        .map((advantage) => advantage.categoryId)
        .join("") === (cortexIds || []).join("")
  ) || [undefined])[0];
}

function vehicleWeaponName(vehicleWeaponSelection, vehicleWeaponId) {
  const vehicleWeapon = vehicleWeaponSelection.find(
    ({ pageId }) => pageId === vehicleWeaponId
  );
  if (!vehicleWeapon) return undefined;
  return vehicleWeapon.text;
}

function warjackWeaponNames(warjackWeaponSelections, weaponId) {
  const weapon = Object.values(warjackWeaponSelections).find(
    ({ pageId }) => pageId === weaponId
  );
  if (weapon) {
    return warjackWeaponName(weapon.name, weapon.cost);
  }
  return weaponId;
}

function warjackWeaponNamesSubtitle(warjackWeaponSelections, weaponIds) {
  return weaponIds.flatMap((weaponId) => {
    const weapon = Object.values(warjackWeaponSelections).find(
      ({ pageId }) => pageId === weaponId
    );
    if (weapon) {
      return [weapon.name];
    }
    return [];
  });
}

function warjackWeaponName(name, cost) {
  return `${name} (cost ${cost})`;
}

function parseHardpoints(hardpoints) {
  // Parses strings of the following type: "3 : 2 Arm, 1 Back"

  const rHardpointCount = "\\s*(\\d+)\\s*";
  const rHardpointGroup = "\\s*(\\d+)\\s*(\\w+)\\s*";

  let results = null;
  for (let n = 1; n <= 10; n++) {
    const regexp = new RegExp(
      `^${rHardpointCount}:${rHardpointGroup}${repeat(
        `,${rHardpointGroup}`,
        n - 1
      )}$`
    );
    results = regexp.exec(hardpoints);
    if (results !== null) {
      break;
    }
  }

  if (results === null) {
    return undefined;
  }

  const hardpointCount = parseInt(results[1], 10);

  const hardpointNames = [];
  for (let n = 2; n < results.length; n += 2) {
    const groupCount = parseInt(results[n], 10);
    const groupName = results[n + 1];

    for (let i = 1; i <= groupCount; i++) {
      hardpointNames.push(groupName);
    }
  }

  if (hardpointCount !== hardpointNames.length) {
    console.error(
      "Hardpoints do not add up!",
      hardpoints,
      hardpointCount,
      hardpointNames
    );
  }

  return hardpointNames;

  function repeat(s, n) {
    if (n === 0) return "";
    return s + repeat(s, n - 1);
  }
}
