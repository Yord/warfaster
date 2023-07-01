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
  CaretDownOutlined,
  DeleteOutlined,
  DownSquareOutlined,
  HeartFilled,
  MenuUnfoldOutlined,
  PlusSquareOutlined,
  SyncOutlined,
  TeamOutlined,
  UpSquareOutlined,
} from "@ant-design/icons";
import CompoundArmor from "./img/advantages/Compound_Armor.png";
import Flight from "./img/advantages/Flight.png";
import Pathfinder from "./img/advantages/Pathfinder.png";
import Revelator from "./img/advantages/Revelator.png";
import Stealth from "./img/advantages/Stealth.png";
import WeaponExpert from "./img/advantages/Weapon_Expert.png";
import AeternusContinuum from "./img/factions/Aeternus_Continuum.png";
import Fallback from "./img/factions/Fallback.png";
import Empyrean from "./img/factions/Empyrean.png";
import IronStarAlliance from "./img/factions/Iron_Star_Alliance.png";
import LostLegion from "./img/factions/Lost_Legion.png";
import MarcherWorlds from "./img/factions/Marcher_Worlds.png";
import WildCard from "./img/factions/Wild_Card.png";
import AeternusContinuumCharged from "./img/faction_icons/Aeternus_Continuum_Charged.png";
import AeternusContinuumSpike from "./img/faction_icons/Aeternus_Continuum_Spike.png";
import EmpyreanCharged from "./img/faction_icons/Empyrean_Charged.png";
import EmpyreanSpike from "./img/faction_icons/Empyrean_Spike.png";
import IronStarAllianceCharged from "./img/faction_icons/Iron_Star_Alliance_Charged.png";
import IronStarAllianceSpike from "./img/faction_icons/Iron_Star_Alliance_Spike.png";
import MarcherWorldsCharged from "./img/faction_icons/Marcher_Worlds_Charged.png";
import MarcherWorldsSpike from "./img/faction_icons/Marcher_Worlds_Spike.png";
import WildCardCharged from "./img/faction_icons/Wild_Card_Charged.png";
import WildCardSpike from "./img/faction_icons/Wild_Card_Spike.png";
import BlastWeapon from "./img/weapon_qualities/Blast_Weapon.png";
import Corrosion from "./img/weapon_qualities/Corrosion.png";
import Fire from "./img/weapon_qualities/Fire.png";
import LockDown from "./img/weapon_qualities/Lock_Down.png";
import Repulsor from "./img/weapon_qualities/Repulsor.png";
import SprayWeapon from "./img/weapon_qualities/Spray_Weapon.png";
import Strafe from "./img/weapon_qualities/Strafe.png";
import SystemFailure from "./img/weapon_qualities/System_Failure.png";
import { MenuItemClicked } from "../messages";
import { AppSync } from "../state/AppSync";
import { CypherCodecs } from "../state/CypherCodecs";
import { Cyphers } from "../state/Cyphers";
import { FactionModels } from "../state/FactionModels";
import { Factions } from "../state/Factions";
import { Lists } from "../state/Lists";
import { PageIds } from "../state/PageIds";
import { Url } from "../state/Url";
import { WildCardModels } from "../state/WildCardModels";
import { Models } from "../state/Models";
import { VehicleWeapons } from "../state/VehicleWeapons";
import { WarjackWeapons } from "../state/WarjackWeapons";
import { CadreModels } from "../state/CadreModels";
import { CadreCategoryMembers } from "../state/CadreCategoryMembers";

const { Header, Footer, Content } = Layout;
const { TextArea } = Input;
const { SubMenu } = Menu;

function FactionImage({ faction, style, height = "35px" }) {
  switch (faction) {
    case "Aeternus_Continuum":
      return (
        <img
          src={AeternusContinuum}
          height={height}
          alt={faction}
          style={style}
        />
      );
    case "Empyrean":
      return <img src={Empyrean} height={height} alt={faction} style={style} />;
    case "Iron_Star_Alliance":
      return (
        <img
          src={IronStarAlliance}
          height={height}
          alt={faction}
          style={style}
        />
      );
    case "Lost_Legion":
      return (
        <img src={LostLegion} height={height} alt={faction} style={style} />
      );
    case "Marcher_Worlds":
      return (
        <img src={MarcherWorlds} height={height} alt={faction} style={style} />
      );
    case "Wild_Card":
      return <img src={WildCard} height={height} alt={faction} style={style} />;
    case "Universal":
      return <img src={Fallback} height={height} alt={faction} style={style} />;
    default:
      return <img src={Fallback} height={height} alt={faction} style={style} />;
  }
}

function Spike({ faction, style: style2, height = "18px" }) {
  const style = { ...style2, marginTop: "-4px" };
  switch (faction) {
    case "Aeternus_Continuum":
      return (
        <img
          src={AeternusContinuumSpike}
          height={height}
          alt={faction}
          style={style}
        />
      );
    case "Empyrean":
      return (
        <img src={EmpyreanSpike} height={height} alt={faction} style={style} />
      );
    case "Iron_Star_Alliance":
      return (
        <img
          src={IronStarAllianceSpike}
          height={height}
          alt={faction}
          style={style}
        />
      );
    case "Marcher_Worlds":
      return (
        <img
          src={MarcherWorldsSpike}
          height={height}
          alt={faction}
          style={style}
        />
      );
    case "Wild_Card":
      return (
        <img src={WildCardSpike} height={height} alt={faction} style={style} />
      );
    default:
      return (
        <img src={WildCardSpike} height={height} alt={faction} style={style} />
      );
  }
}

function Charged({ faction, style: style2, height = "18px" }) {
  const style = { ...style2, marginTop: "-4px" };
  switch (faction) {
    case "Aeternus_Continuum":
      return (
        <img
          src={AeternusContinuumCharged}
          height={height}
          alt={faction}
          style={style}
        />
      );
    case "Empyrean":
      return (
        <img
          src={EmpyreanCharged}
          height={height}
          alt={faction}
          style={style}
        />
      );
    case "Iron_Star_Alliance":
      return (
        <img
          src={IronStarAllianceCharged}
          height={height}
          alt={faction}
          style={style}
        />
      );
    case "Marcher_Worlds":
      return (
        <img
          src={MarcherWorldsCharged}
          height={height}
          alt={faction}
          style={style}
        />
      );
    case "Wild_Card":
      return (
        <img
          src={WildCardCharged}
          height={height}
          alt={faction}
          style={style}
        />
      );
    default:
      return (
        <img
          src={WildCardCharged}
          height={height}
          alt={faction}
          style={style}
        />
      );
  }
}

function AdvantageImage({ advantage, style, height = "30px" }) {
  switch (advantage) {
    case "Compound Armor":
      return (
        <img
          src={CompoundArmor}
          className="metallic-img"
          alt={advantage}
          height={height}
          style={style}
        />
      );
    case "Flight":
      return (
        <img
          src={Flight}
          className="metallic-img"
          alt={advantage}
          height={height}
          style={style}
        />
      );
    case "Pathfinder":
      return (
        <img
          src={Pathfinder}
          className="metallic-img"
          alt={advantage}
          height={height}
          style={style}
        />
      );
    case "Revelator":
      return (
        <img
          src={Revelator}
          className="metallic-img"
          alt={advantage}
          height={height}
          style={style}
        />
      );
    case "Stealth":
      return (
        <img
          src={Stealth}
          className="metallic-img"
          alt={advantage}
          height={height}
          style={style}
        />
      );
    case "Weapon Expert":
      return (
        <img
          src={WeaponExpert}
          className="metallic-img"
          alt={advantage}
          height={height}
          style={style}
        />
      );
    default:
      return <div className="metallic-circle"></div>;
  }
}

const weaponQualities = {
  "Blast Weapon": BlastWeapon,
  Corrosion,
  Fire,
  "Lock Down": LockDown,
  Repulsor,
  "Spray Weapon": SprayWeapon,
  Strafe,
  "System Failure": SystemFailure,
};

function WeaponQuality({ weaponQuality, style, height = "16px" }) {
  const src = weaponQualities[weaponQuality];

  if (src) {
    return (
      <img
        src={src}
        className="metallic-img-tiny"
        alt={weaponQuality}
        height={height}
        style={style}
      />
    );
  }

  return <></>;
}

function AppPresentation({
  initialized,
  syncReasons,
  factionModels,
  wildCardModels,
  cypherCodecs,
  menuItemClicked,
  allMenuItemsClicked,
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
  vehicleWeapons,
  warjackWeapons,
  cadres,
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
          <Header>
            <div>
              <a className="logo" href="/">
                WARFASTER
              </a>
            </div>
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

                          <div key={`cards_${listIndex}`}>
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
                                <div
                                  className="body"
                                  key={`${page}_${listIndex}_${cardIndex}`}
                                >
                                  <Card
                                    hoverable
                                    className={["card", faction, type]}
                                  >
                                    <Card.Meta
                                      onClick={toggleCard(
                                        listIndex,
                                        cardIndex,
                                        pageId,
                                        card
                                      )}
                                      avatar={
                                        faction ? (
                                          <div
                                            style={{
                                              height: "25px",
                                              width: "35px",
                                              textAlign: "center",
                                            }}
                                          >
                                            {!details ||
                                            !details.deploymentCost ? (
                                              <FactionImage faction={faction} />
                                            ) : (
                                              <>
                                                <FactionImage
                                                  faction={faction}
                                                  height="23px"
                                                />
                                                <div className="deployment-cost">
                                                  DC {details.deploymentCost}
                                                </div>
                                              </>
                                            )}
                                          </div>
                                        ) : (
                                          <FactionImage faction="Universal" />
                                        )
                                      }
                                      title={
                                        <>
                                          <div>{title}</div>
                                          <div className="card-type">
                                            {(faction || "").replace(/_/g, " ")}
                                            {subtype ? " " + subtype : ""}
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
                                                warjackWeaponIds.length === 0
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
                                        {!details.modelStats ||
                                        Object.keys(details.modelStats)
                                          .length === 0 ? (
                                          <></>
                                        ) : (
                                          <div className="model-stats">
                                            {Object.entries(
                                              details.modelStats
                                            ).map(([name, stat], index) => (
                                              <div key={`${name}_stat`}>
                                                <div>{name}</div>
                                                <div>{stat}</div>
                                              </div>
                                            ))}
                                          </div>
                                        )}
                                        {!details.cortexSelections ||
                                        Object.entries(details.cortexSelections)
                                          .length === 0 ? (
                                          <></>
                                        ) : (
                                          <>
                                            <Select
                                              suffixIcon={<CaretDownOutlined />}
                                              className="select-warjack-cortex"
                                              defaultValue="none"
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
                                                  ? "none"
                                                  : cortexName(
                                                      details.cortexSelections,
                                                      cortexIds
                                                    )
                                              }
                                              getPopupContainer={() =>
                                                document.querySelectorAll(
                                                  ".card"
                                                )[cardIndex]
                                              }
                                            >
                                              <Select.Option
                                                key={"cortex_-1"}
                                                label={undefined}
                                                value="none"
                                                onClick={(event) =>
                                                  event.stopPropagation()
                                                }
                                              >
                                                <div>
                                                  <h3>Select Cortex</h3>
                                                </div>
                                              </Select.Option>
                                              {Object.entries(
                                                details.cortexSelections
                                              ).map(
                                                (
                                                  [cortex, advantages],
                                                  index
                                                ) => (
                                                  <Select.Option
                                                    key={`cortex_${index}`}
                                                    label={Object.values(
                                                      advantages
                                                    ).map(
                                                      ({ categoryId }) =>
                                                        categoryId
                                                    )}
                                                    value={cortex}
                                                    onClick={(event) =>
                                                      event.stopPropagation()
                                                    }
                                                  >
                                                    <h3>{cortex}</h3>
                                                    {Object.entries(
                                                      advantages
                                                    ).map(
                                                      (
                                                        [rule, { text }],
                                                        advantageIndex
                                                      ) => (
                                                        <div
                                                          key={`cortex_${index}_advantage_${advantageIndex}`}
                                                          className="model-cortex-special-rules"
                                                        >
                                                          <span>
                                                            {markChargedOrSpike(
                                                              faction,
                                                              text
                                                            )}
                                                            {rule}
                                                          </span>{" "}
                                                          <span>- {text}</span>
                                                        </div>
                                                      )
                                                    )}
                                                  </Select.Option>
                                                )
                                              )}
                                            </Select>
                                          </>
                                        )}
                                        {!details.weaponPoints ? (
                                          <></>
                                        ) : (
                                          <div className="special-rules">
                                            <span>Weapon Points</span>{" "}
                                            <span>
                                              - {details.weaponPoints}
                                            </span>
                                          </div>
                                        )}
                                        {!details.hardpointNames ? (
                                          <></>
                                        ) : (
                                          <>
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
                                                      suffixIcon={
                                                        <CaretDownOutlined />
                                                      }
                                                      className="select-warjack-weapon"
                                                      defaultValue="none"
                                                      onClick={(event) =>
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
                                                          ? "none"
                                                          : warjackWeaponNames(
                                                              faction,
                                                              warjackWeapons,
                                                              details.warjackWeaponSelections,
                                                              warjackWeaponIds[
                                                                hardpointNameIndex
                                                              ]
                                                            )
                                                      }
                                                      getPopupContainer={() =>
                                                        document.querySelectorAll(
                                                          ".card"
                                                        )[cardIndex]
                                                      }
                                                    >
                                                      <Select.Option
                                                        key={`warjack_weapon_${hardpointNameIndex}_-1`}
                                                        label={undefined}
                                                        value="none"
                                                        onClick={(event) =>
                                                          event.stopPropagation()
                                                        }
                                                      >
                                                        <div
                                                          className="model-weapons"
                                                          style={{
                                                            height: "52px",
                                                          }}
                                                        ></div>
                                                      </Select.Option>
                                                      {Object.values(
                                                        details.warjackWeaponSelections
                                                      )
                                                        .filter(
                                                          ({ location }) =>
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
                                                              label={pageId}
                                                              value={name}
                                                              onClick={(
                                                                event
                                                              ) =>
                                                                event.stopPropagation()
                                                              }
                                                            >
                                                              <>
                                                                {warjackWeaponNames(
                                                                  faction,
                                                                  warjackWeapons,
                                                                  details.warjackWeaponSelections,
                                                                  pageId
                                                                )}
                                                              </>
                                                            </Select.Option>
                                                          )
                                                        )}
                                                    </Select>
                                                  </div>
                                                )
                                            )}
                                          </>
                                        )}
                                        {!details.vehicleWeaponSelection ||
                                        details.vehicleWeaponSelection
                                          .length === 0 ? (
                                          <></>
                                        ) : (
                                          <div key="vehicle_weapon_selection">
                                            <Select
                                              suffixIcon={<CaretDownOutlined />}
                                              className="select-warjack-weapon"
                                              defaultValue="none"
                                              onClick={(event) =>
                                                event.stopPropagation()
                                              }
                                              onSelect={setCardVehicleWeapon(
                                                listIndex,
                                                cardIndex,
                                                pageId
                                              )}
                                              value={
                                                !vehicleWeaponId ||
                                                !details ||
                                                !details.vehicleWeaponSelection
                                                  ? "none"
                                                  : vehicleWeaponName2(
                                                      faction,
                                                      vehicleWeapons,
                                                      details.vehicleWeaponSelection,
                                                      vehicleWeaponId
                                                    )
                                              }
                                              getPopupContainer={() =>
                                                document.querySelectorAll(
                                                  ".card"
                                                )[cardIndex]
                                              }
                                            >
                                              <Select.Option
                                                key={
                                                  "vehicle_weapon_selection_-1"
                                                }
                                                label={undefined}
                                                value="none"
                                                onClick={(event) =>
                                                  event.stopPropagation()
                                                }
                                              >
                                                <div
                                                  className="model-weapons"
                                                  style={{
                                                    height: "52px",
                                                  }}
                                                ></div>
                                              </Select.Option>
                                              {details.vehicleWeaponSelection.map(
                                                (
                                                  { text, page, pageId },
                                                  index
                                                ) => (
                                                  <Select.Option
                                                    key={`vehicle_weapon_selection_${index}`}
                                                    label={pageId}
                                                    value={text}
                                                    onClick={(event) =>
                                                      event.stopPropagation()
                                                    }
                                                  >
                                                    {vehicleWeaponName2(
                                                      faction,
                                                      vehicleWeapons,
                                                      details.vehicleWeaponSelection,
                                                      pageId
                                                    )}
                                                  </Select.Option>
                                                )
                                              )}
                                            </Select>
                                          </div>
                                        )}
                                        {!details.weapons ||
                                        details.weapons.length === 0 ? (
                                          <></>
                                        ) : (
                                          details.weapons.map(
                                            (weapon, index) => (
                                              <React.Fragment
                                                key={`weapon_number_${index}`}
                                              >
                                                <div className="model-weapons">
                                                  <div>
                                                    {weapon["Attack Type"] ===
                                                    "Melee" ? (
                                                      <img
                                                        className="faction-melee"
                                                        alt=" "
                                                      />
                                                    ) : (
                                                      <img
                                                        className="faction-ranged"
                                                        alt=" "
                                                      />
                                                    )}
                                                  </div>
                                                  <div>
                                                    <div>
                                                      {weapon["Name"]}
                                                      {Object.keys(
                                                        weapon.specialRules ||
                                                          {}
                                                      ).map((rule, index2) => (
                                                        <WeaponQuality
                                                          key={`weapon_number_${index}_rule_${index2}`}
                                                          weaponQuality={rule}
                                                        />
                                                      ))}
                                                    </div>
                                                    <div>
                                                      {weapon["Damage Type"]}
                                                    </div>
                                                  </div>
                                                  <div>
                                                    <div>RNG</div>
                                                    <div>{weapon["Range"]}</div>
                                                  </div>
                                                  <div>
                                                    <div>POW</div>
                                                    <div>{weapon["POW"]}</div>
                                                  </div>
                                                </div>
                                                {!weapon.specialRules ? (
                                                  <></>
                                                ) : (
                                                  Object.entries(
                                                    weapon.specialRules
                                                  )
                                                    .filter(
                                                      ([rule]) =>
                                                        !weaponQualities[rule]
                                                    )
                                                    .map(
                                                      (
                                                        [rule, text],
                                                        ruleIndex
                                                      ) => (
                                                        <div
                                                          key={`weapon_number_${index}_${ruleIndex}`}
                                                          className="model-weapons-special-rules"
                                                        >
                                                          <span>
                                                            {markChargedOrSpike(
                                                              faction,
                                                              text
                                                            )}
                                                            {rule}
                                                          </span>{" "}
                                                          <span>- {text}</span>
                                                        </div>
                                                      )
                                                    )
                                                )}
                                              </React.Fragment>
                                            )
                                          )
                                        )}
                                        <div className="card-icons">
                                          {!details.wildCardFactions ||
                                          Object.values(
                                            details.wildCardFactions
                                          ).length === 0 ? (
                                            <></>
                                          ) : (
                                            Object.values(
                                              details.wildCardFactions
                                            ).map(({ page }, index) => (
                                              <FactionImage
                                                key={`wild_card_faction_${index}`}
                                                faction={page}
                                                height="30px"
                                                style={{
                                                  filter:
                                                    "drop-shadow(0px 3px 6px hsl(200,100%,25%))",
                                                }}
                                              />
                                            ))
                                          )}
                                          {!details.baseSize ? (
                                            <></>
                                          ) : (
                                            <div className="metallic-circle">
                                              {details.baseSize.replace(
                                                " mm",
                                                ""
                                              )}
                                            </div>
                                          )}
                                          {!details.health ? (
                                            <></>
                                          ) : (
                                            <div className="metallic-circle">
                                              <HeartFilled
                                                style={{
                                                  fontSize: "0.8em",
                                                }}
                                              />
                                              {details.health}
                                            </div>
                                          )}
                                          {!details.squadSize ? (
                                            <></>
                                          ) : (
                                            <div className="metallic-circle">
                                              <TeamOutlined
                                                style={{
                                                  fontSize: "0.8em",
                                                }}
                                              />
                                              {details.squadSize}
                                            </div>
                                          )}
                                          {!details.advantages ||
                                          Object.entries(details.advantages)
                                            .length === 0 ? (
                                            <></>
                                          ) : (
                                            Object.entries(
                                              details.advantages
                                            ).map(([name, text], index) => (
                                              <AdvantageImage
                                                key={`advantage_${index}`}
                                                advantage={name}
                                              />
                                            ))
                                          )}
                                          {!details.chassisAdvantages ||
                                          Object.entries(
                                            details.chassisAdvantages
                                          ).length === 0 ? (
                                            <></>
                                          ) : (
                                            Object.entries(
                                              details.chassisAdvantages
                                            ).map(([name, text], index) => (
                                              <AdvantageImage
                                                key={`advantage_${index}`}
                                                advantage={name}
                                              />
                                            ))
                                          )}
                                        </div>
                                        {!details.specialRules ||
                                        Object.entries(details.specialRules)
                                          .length === 0 ? (
                                          <></>
                                        ) : (
                                          Object.entries(
                                            details.specialRules
                                          ).map(([rule, text], index) => (
                                            <div
                                              key={`special_rules_${index}`}
                                              className="special-rules"
                                            >
                                              <span>
                                                {markChargedOrSpike(
                                                  faction,
                                                  text
                                                )}
                                                {rule}
                                              </span>{" "}
                                              <span>- {text}</span>
                                            </div>
                                          ))
                                        )}
                                        {!details.chassisSpecialRules ||
                                        Object.entries(
                                          details.chassisSpecialRules
                                        ).length === 0 ? (
                                          <></>
                                        ) : (
                                          Object.entries(
                                            details.chassisSpecialRules
                                          ).map(([rule, text], index) => (
                                            <div
                                              key={`chassis_special_rules_${index}`}
                                              className="special-rules"
                                            >
                                              <span>
                                                {markChargedOrSpike(
                                                  faction,
                                                  text
                                                )}
                                                {rule}
                                              </span>{" "}
                                              <span>- {text}</span>
                                            </div>
                                          ))
                                        )}
                                        {!details.maneuvers ||
                                        Object.values(details.maneuvers)
                                          .length === 0 ? (
                                          <></>
                                        ) : (
                                          <>
                                            <h3>Maneuvers</h3>
                                            <dl>
                                              {Object.entries(
                                                details.maneuvers
                                              ).map(([rule, text], index) => (
                                                <div
                                                  key={`maneuvers_advantage_${index}`}
                                                  className="special-rules"
                                                >
                                                  <span>
                                                    {markChargedOrSpike(
                                                      faction,
                                                      text
                                                    )}
                                                    {rule}
                                                  </span>{" "}
                                                  <span>- {text}</span>
                                                </div>
                                              ))}
                                            </dl>
                                          </>
                                        )}
                                        {!details.storeLinks ||
                                        details.storeLinks.length === 0 ? (
                                          <></>
                                        ) : (
                                          <div className="special-rules">
                                            <span>Privateer Press Store</span>{" "}
                                            <span>
                                              -{" "}
                                              {details.storeLinks.map(
                                                (linkText, index) => (
                                                  <React.Fragment
                                                    key={`store_link_${index}`}
                                                  >
                                                    <span
                                                      dangerouslySetInnerHTML={{
                                                        __html: linkText,
                                                      }}
                                                    />
                                                    {index ===
                                                    details.storeLinks.length -
                                                      1 ? (
                                                      <></>
                                                    ) : (
                                                      <> </>
                                                    )}
                                                  </React.Fragment>
                                                )
                                              )}
                                            </span>
                                          </div>
                                        )}
                                        {!details.release ? (
                                          <></>
                                        ) : (
                                          <div className="special-rules">
                                            <span>Release</span>{" "}
                                            <span>- {details.release}</span>
                                          </div>
                                        )}
                                        {!details.lore ? (
                                          <></>
                                        ) : (
                                          <div className="special-rules">
                                            <span>Lore</span>{" "}
                                            <span>- {details.lore}</span>
                                          </div>
                                        )}
                                        {!details.pow ? (
                                          <></>
                                        ) : (
                                          <div className="special-rules">
                                            <span>Pow</span>{" "}
                                            <span>- {details.pow.text}</span>
                                          </div>
                                        )}
                                        {!details.effect ||
                                        details.effect.length === 0 ? (
                                          <></>
                                        ) : (
                                          details.effect.map(
                                            (effect, index) => (
                                              <p
                                                className="cypher-effect"
                                                key={`cypher_effect_${listIndex}_${cardIndex}_${index}`}
                                              >
                                                {effect}
                                              </p>
                                            )
                                          )
                                        )}
                                      </div>
                                    )}
                                  </Card>
                                </div>
                              )
                            )}
                          </div>

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

          <div>
            <Footer>
              <div className="bookmark">
                <Layout>
                  <Row>
                    <Col xs={24} sm={24} md={18} lg={18} xl={16} xxl={16}>
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
                Images originating from the Privateer Press website are © 2001—
                <>{new Date().getFullYear()}</> Privateer Press, Inc. All Rights
                Reserved. Privateer Press, warcaster and their logos are
                trademarks of Privateer Press, Inc. Images and trademarks used
                without permission. This website is unofficial and is not
                endorsed by Privateer Press.
              </div>
            </Footer>
          </div>

          {factionModels.map(([factionName, faction, models, cadreModels]) => (
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
                <Menu.ItemGroup
                  title={
                    <div
                      onClick={allMenuItemsClicked(
                        models.map((model) => model.page)
                      )}
                    >
                      {factionName}
                    </div>
                  }
                >
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
                {!cadreModels ? (
                  <></>
                ) : (
                  cadreModels.map(({ cadrePageId, cadreModels }) => (
                    <Menu.ItemGroup
                      key={`Cadre:${cadrePageId}`}
                      title={
                        <div
                          onClick={allMenuItemsClicked(
                            cadreModels.map((model) => model.page)
                          )}
                        >
                          {cadres[cadrePageId]}
                        </div>
                      }
                    >
                      {cadreModels.map(({ name, page, type, subtype }) => {
                        const shortName = name.slice(0, 40);

                        return (
                          <Menu.Item
                            key={faction + ":" + page + ":cadre:" + cadrePageId}
                            className={faction}
                          >
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
                  ))
                )}
                <Menu.ItemGroup
                  title={
                    <div
                      onClick={allMenuItemsClicked(
                        (wildCardModels[faction] || []).map(
                          (model) => model.page
                        )
                      )}
                    >
                      Wild Cards
                    </div>
                  }
                >
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
                    <Menu.ItemGroup
                      title={
                        <div
                          onClick={allMenuItemsClicked(
                            cyphers
                              .sort((c1, c2) =>
                                c1.Type.text < c2.Type.text ? -1 : 1
                              )
                              .map(({ Cypher }) => Cypher.page)
                          )}
                        >
                          {`${faction} Cyphers`}
                        </div>
                      }
                      key={faction}
                    >
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
        models
          .map((model) => ({
            name: model.Name.text,
            page: model.Name.page,
            type: model.Type.text,
            ...(model.Subtype
              ? { subtype: model.Subtype.map((_) => _.text).join(" ") }
              : {}),
          }))
          .filter(
            (model) =>
              !Object.values(CadreModels.select()(state))
                .flatMap((models) =>
                  models.map((cadreModel) => cadreModel.title)
                )
                .includes(model.name)
          ),
        Object.entries(CadreModels.select()(state)).flatMap(
          ([cadrePageId, cadreModels]) => {
            const cadre = cadreModels.map((model) => model.title);
            const allCadreModels = models
              .filter((model) => cadre.includes(model.Name.text))
              .map((model) => ({
                name: model.Name.text,
                page: model.Name.page,
                type: model.Type.text,
                ...(model.Subtype
                  ? { subtype: model.Subtype.map((_) => _.text).join(" ") }
                  : {}),
              }));

            if (allCadreModels.length === cadreModels.length)
              return [{ cadrePageId, cadreModels: allCadreModels }];

            return [];
          }
        ),
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

          const model = Object.entries(FactionModels.select()(state))
            .flatMap(([faction, models]) =>
              models.map((model) => ({ ...model, faction }))
            )
            .find(({ Name }) => Name.page === page);
          const wildCard = Object.entries(WildCardModels.select()(state))
            .flatMap(([faction, models]) =>
              models.map((model) => ({ ...model, faction }))
            )
            .find(({ Name }) => Name.page === page);
          const cypher = CypherCodecs.select()(state).find(
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
                                  page.split("#")[0],
                                  {
                                    ...selection,
                                    pageId: pageIdByPage[page.split("#")[0]],
                                  },
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
                                    page: page.split("#")[0],
                                    pageId: pageIdByPage[page.split("#")[0]],
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
            const details = Cyphers.selectByPage(page)(state);
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
    url: Url.select()(state),
    factions: Factions.select()(state),
    vehicleWeapons: VehicleWeapons.select()(state),
    warjackWeapons: WarjackWeapons.select()(state),
    cadres: CadreCategoryMembers.select()(state),
  }),
  (dispatch) => ({
    toggleCard: (listIndex, cardIndex, pageId, card) => {
      return () =>
        dispatch(Lists.toggleCard({ listIndex, cardIndex, pageId, card }));
    },
    menuItemClicked: (page) => (event) => {
      dispatch(MenuItemClicked({ page }));
      event.stopPropagation();
    },
    allMenuItemsClicked: (pages) => (event) => {
      pages.forEach((page) => dispatch(MenuItemClicked({ page })));
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

function vehicleWeaponName2(
  faction,
  vehicleWeapons,
  vehicleWeaponSelection,
  vehicleWeaponId
) {
  const vehicleWeapon = vehicleWeaponSelection.find(
    ({ pageId }) => pageId === vehicleWeaponId
  );

  if (vehicleWeapon) {
    const { page } = vehicleWeapon;
    const weaponConfig = vehicleWeapons[page.split("#")[0]];
    if (weaponConfig) {
      const { pointCost: cost } = weaponConfig;

      return (
        <>
          {!weaponConfig ||
          !weaponConfig.weapons ||
          weaponConfig.weapons.length === 0 ? (
            <></>
          ) : (
            weaponConfig.weapons.map((weapon, index) => (
              <React.Fragment key={`vehicle_weapon_selection_number_${index}`}>
                <div className="model-weapons">
                  <div>
                    {weapon["Attack Type"] === "Melee" ? (
                      <img className="faction-melee" alt=" " />
                    ) : (
                      <img className="faction-ranged" alt=" " />
                    )}
                  </div>
                  <div>
                    <div>
                      {weapon["Name"]}
                      {Object.keys(weapon.specialRules || {}).map(
                        (rule, index2) => (
                          <WeaponQuality
                            key={`vehicle_weapon_selection_number_${index}_rule_${index2}`}
                            weaponQuality={rule}
                          />
                        )
                      )}
                    </div>
                    <div>
                      <span className="cost">Cost {cost}</span>{" "}
                      {weapon["Damage Type"].join
                        ? weapon["Damage Type"].join(" ")
                        : weapon["Damage Type"]}
                    </div>
                  </div>
                  <div>
                    <div>RNG</div>
                    <div>{weapon["Range"]}</div>
                  </div>
                  <div>
                    <div>POW</div>
                    <div>{weapon["POW"]}</div>
                  </div>
                </div>
                {!weapon.specialRules ? (
                  <></>
                ) : (
                  Object.entries(weapon.specialRules)
                    .filter(([rule]) => !weaponQualities[rule])
                    .map(([rule, text], ruleIndex) => (
                      <div
                        key={`vehicle_weapon_selection_number_${index}_${ruleIndex}`}
                        className="model-weapons-special-rules"
                      >
                        <span>
                          {markChargedOrSpike(faction, text)}
                          {rule}
                        </span>{" "}
                        <span>- {text}</span>
                      </div>
                    ))
                )}
              </React.Fragment>
            ))
          )}
          {!weaponConfig ||
          !weaponConfig.specialRules ||
          weaponConfig.specialRules.length === 0 ? (
            <></>
          ) : (
            <>
              {!weaponConfig.weapons || weaponConfig.weapons.length === 0 ? (
                <div className="model-weapons-special-rules">
                  <span>Cost</span> <span>- {cost}</span>
                </div>
              ) : (
                <></>
              )}
              {Object.entries(weaponConfig.specialRules)
                .filter(([rule]) => !weaponQualities[rule])
                .map(([rule, text], ruleIndex) => (
                  <div
                    key={`vehicle_weapon_selection_rules_number_${ruleIndex}`}
                    className="model-weapons-special-rules"
                  >
                    <span>
                      {markChargedOrSpike(faction, text)}
                      {rule}
                    </span>{" "}
                    <span>- {text}</span>
                  </div>
                ))}
            </>
          )}
        </>
      );
    }
    return undefined;
  }
  return undefined;
}

function markCharged(faction, text) {
  return text.includes("charged") ? (
    <>
      <Charged faction={faction} />{" "}
    </>
  ) : (
    <></>
  );
}

function markSpike(faction, text) {
  return text.includes("spike") ? (
    <>
      <Spike faction={faction} />{" "}
    </>
  ) : (
    <></>
  );
}

function markChargedOrSpike(faction, text) {
  return (
    <>
      {markCharged(faction, text)}
      {markSpike(faction, text)}
    </>
  );
}

function warjackWeaponNames(
  faction,
  warjackWeapons,
  warjackWeaponSelections,
  weaponId
) {
  const weapon = Object.values(warjackWeaponSelections).find(
    ({ pageId }) => pageId === weaponId
  );
  if (weapon) {
    const { cost, page } = weapon;
    const weaponConfig = warjackWeapons[page.split("#")[0]];

    return (
      <>
        {!weaponConfig ||
        !weaponConfig.weapons ||
        weaponConfig.weapons.length === 0 ? (
          <></>
        ) : (
          weaponConfig.weapons.map((weapon, index) => (
            <React.Fragment key={`weapon_selection_number_${index}`}>
              <div className="model-weapons">
                <div>
                  {weapon["Attack Type"] === "Melee" ? (
                    <img className="faction-melee" alt=" " />
                  ) : (
                    <img className="faction-ranged" alt=" " />
                  )}
                </div>
                <div>
                  <div>
                    {weapon["Name"]}
                    {Object.keys(weapon.specialRules || {}).map(
                      (rule, index2) => (
                        <WeaponQuality
                          key={`weapon_selection_number_${index}_rule_${index2}`}
                          weaponQuality={rule}
                        />
                      )
                    )}
                  </div>
                  <div>
                    <span className="cost">Cost {cost}</span>{" "}
                    {weapon["Damage Type"].join
                      ? weapon["Damage Type"].join(" ")
                      : weapon["Damage Type"]}
                  </div>
                </div>
                <div>
                  <div>RNG</div>
                  <div>{weapon["Range"]}</div>
                </div>
                <div>
                  <div>POW</div>
                  <div>{weapon["POW"]}</div>
                </div>
              </div>
              {!weapon.specialRules ? (
                <></>
              ) : (
                Object.entries(weapon.specialRules)
                  .filter(([rule]) => !weaponQualities[rule])
                  .map(([rule, text], ruleIndex) => (
                    <div
                      key={`weapon_selection_number_${index}_${ruleIndex}`}
                      className="model-weapons-special-rules"
                    >
                      <span>
                        {markChargedOrSpike(faction, text)}
                        {rule}
                      </span>{" "}
                      <span>- {text}</span>
                    </div>
                  ))
              )}
            </React.Fragment>
          ))
        )}
        {!weaponConfig ||
        !weaponConfig.specialRules ||
        weaponConfig.specialRules.length === 0 ? (
          <></>
        ) : (
          <>
            {!weaponConfig.weapons || weaponConfig.weapons.length === 0 ? (
              <div className="model-weapons-special-rules">
                <span>Cost</span> <span>- {cost}</span>
              </div>
            ) : (
              <></>
            )}
            {Object.entries(weaponConfig.specialRules)
              .filter(([rule]) => !weaponQualities[rule])
              .map(([rule, text], ruleIndex) => (
                <div
                  key={`weapon_selection_rules_number_${ruleIndex}`}
                  className="model-weapons-special-rules"
                >
                  <span>
                    {markChargedOrSpike(faction, text)}
                    {rule}
                  </span>{" "}
                  <span>- {text}</span>
                </div>
              ))}
          </>
        )}
      </>
    );
  }
  return undefined;
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
