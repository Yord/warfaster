import "./App.css";
import React from "react";
import { connect } from "react-redux";
import {
  Affix,
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
  CaretUpOutlined,
  CheckSquareOutlined,
  DeleteOutlined,
  FormOutlined,
  HeartFilled,
  MenuUnfoldOutlined,
  PlusSquareOutlined,
  SyncOutlined,
  TeamOutlined,
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
import { EditMode } from "../state/EditMode";
import { FactionModels } from "../state/FactionModels";
import { Factions } from "../state/Factions";
import { Lists } from "../state/Lists";
import { ToggleSections } from "../state/ToggleSections";
import { Url } from "../state/Url";
import { WildCardModels } from "../state/WildCardModels";
import { VehicleWeapons } from "../state/VehicleWeapons";
import { WarjackWeapons } from "../state/WarjackWeapons";
import { CadreModels } from "../state/CadreModels";
import { CadreCategoryMembers } from "../state/CadreCategoryMembers";
import { ListIndex } from "../state/ListIndex";
import { EnhancedLists } from "../state/selectors/EnhancedLists";

const { Header, Footer, Content } = Layout;
const { TextArea } = Input;
const { SubMenu } = Menu;

const factionImages = {
  Aeternus_Continuum: AeternusContinuum,
  Empyrean,
  Iron_Star_Alliance: IronStarAlliance,
  Lost_Legion: LostLegion,
  Marcher_Worlds: MarcherWorlds,
  Wild_Card: WildCard,
  Universal: Fallback,
};

function FactionImage({ faction, style, height = "35px" }) {
  const src = factionImages[faction] || Fallback;
  return <img src={src} height={height} alt={faction} style={style} />;
}

const spikes = {
  Aeternus_Continuum: AeternusContinuumSpike,
  Empyrean: EmpyreanSpike,
  Iron_Star_Alliance: IronStarAllianceSpike,
  Marcher_Worlds: MarcherWorldsSpike,
  Wild_Card: WildCardSpike,
};

function Spike({ faction, style, height = "18px" }) {
  return (
    <img
      src={spikes[faction] || WildCardSpike}
      height={height}
      alt={faction}
      style={{ ...style, marginTop: "-4px" }}
    />
  );
}

const chargedImages = {
  Aeternus_Continuum: AeternusContinuumCharged,
  Empyrean: EmpyreanCharged,
  Iron_Star_Alliance: IronStarAllianceCharged,
  Marcher_Worlds: MarcherWorldsCharged,
  Wild_Card: WildCardCharged,
};

function Charged({ faction, style, height = "18px" }) {
  return (
    <img
      src={chargedImages[faction] || WildCardCharged}
      height={height}
      alt={faction}
      style={{ ...style, marginTop: "-4px" }}
    />
  );
}

const advantageImages = {
  "Compound Armor": CompoundArmor,
  Flight,
  Pathfinder,
  Revelator,
  Stealth,
  "Weapon Expert": WeaponExpert,
};

function AdvantageImage({ title, text, style, height = "30px" }) {
  const src = advantageImages[title];

  if (src) {
    return (
      <Tooltip
        key={`${title}_tooltip`}
        placement="top"
        title={`${title} - ${text}`}
        trigger="click"
      >
        <img
          src={advantageImages[title]}
          className="metallic-img"
          alt={title}
          height={height}
          style={style}
          onClick={(event) => event.stopPropagation()}
        />
      </Tooltip>
    );
  }

  return <div className="metallic-circle" />;
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

function WeaponQuality({ title, text, style, height = "16px" }) {
  const src = weaponQualities[title];

  if (src) {
    return (
      <Tooltip
        key={`${title}_tooltip`}
        placement="top"
        title={`${title} - ${text}`}
        trigger="click"
      >
        <img
          src={src}
          className="metallic-img-tiny"
          alt={title}
          height={height}
          style={style}
          onClick={(event) => event.stopPropagation()}
        />
      </Tooltip>
    );
  }

  return <></>;
}

const BookmarkPresentation = ({ url, setUrl, open, bookmark }) => (
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
);

const Bookmark = connect(
  (state) => ({
    url: Url.select()(state),
  }),
  (dispatch) => ({
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
  })
)(BookmarkPresentation);

const FactionsMenuPresentation = ({
  factionModels,
  wildCardModels,
  cypherCodecs,
  menuItemClicked,
  allMenuItemsClicked,
  cadres,
  toggleEditMode,
  updateTargetList,
  editMode,
  lists,
  factions,
  targetList,
}) => {
  const [openDrawer, setOpenDrawer] = React.useState("");

  const onOpenChangeDrawers = (keys) => {
    if (keys.length > 0) {
      const key = keys[0];
      if (key === openDrawer) {
        setOpenDrawer("");
      } else {
        setOpenDrawer(key);
      }
    }
  };

  return (
    <Content>
      <Menu
        id="factions"
        openKeys={[]}
        onOpenChange={onOpenChangeDrawers}
        mode="horizontal"
        triggerSubMenuAction="click"
      >
        {Object.keys(factions).map((faction) => (
          <SubMenu key={faction} icon={<FactionImage faction={faction} />} />
        ))}
        <SubMenu
          className="edit"
          key="edit"
          icon={
            editMode ? (
              <CheckSquareOutlined
                onClick={toggleEditMode}
                style={{ fontSize: "30px" }}
              />
            ) : (
              <FormOutlined
                onClick={toggleEditMode}
                style={{ fontSize: "30px" }}
              />
            )
          }
          style={{
            marginLeft: "20px",
            paddingTop: "5px !important",
          }}
        />
      </Menu>
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
                <Select
                  defaultValue={targetList}
                  onChange={(event) => updateTargetList(event)}
                  options={lists.map(({ title, cards }, index) => ({
                    value: index,
                    label: `${index + 1} - ${
                      title ||
                      generateListNamePlaceholder(
                        cards,
                        factions,
                        "Name your list"
                      )
                    }`,
                  }))}
                />
              }
            />
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
              {models.map(({ name, page, type, subtype }) => (
                <Menu.Item key={faction + ":" + page} className={faction}>
                  <span onClick={menuItemClicked(page)}>
                    <span className="card">{name}</span>
                    <span className="types">
                      {subtype ? subtype : ""}
                      {type ? (subtype ? " " : "") + type : ""}
                    </span>
                  </span>
                </Menu.Item>
              ))}
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
                  {cadreModels.map(({ name, page, type, subtype }) => (
                    <Menu.Item
                      key={faction + ":" + page + ":cadre:" + cadrePageId}
                      className={faction}
                    >
                      <span onClick={menuItemClicked(page)}>
                        <span className="card">{name}</span>
                        <span className="types">
                          {subtype ? subtype : ""}
                          {type ? (subtype ? " " : "") + type : ""}
                        </span>
                      </span>
                    </Menu.Item>
                  ))}
                </Menu.ItemGroup>
              ))
            )}
            <Menu.ItemGroup
              title={
                <div
                  onClick={allMenuItemsClicked(
                    (wildCardModels[faction] || []).map((model) => model.page)
                  )}
                >
                  Wild Cards
                </div>
              }
            >
              {(wildCardModels[faction] || [])
                .sort((w1, w2) => (w1.type < w2.type ? -1 : 1))
                .map(({ name, page, type, subtype }) => (
                  <Menu.Item key={faction + ":" + page}>
                    <span onClick={menuItemClicked(page)}>
                      <span className="card">{name}</span>
                      <span className="types">
                        {subtype ? subtype : ""}
                        {type ? (subtype ? " " : "") + type : ""}
                      </span>
                    </span>
                  </Menu.Item>
                ))}
            </Menu.ItemGroup>
            {Object.entries(
              cypherCodecs
                .filter(
                  (cypher) =>
                    [factionName, "Universal"].indexOf(cypher.Faction.text) !==
                    -1
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
                    .sort((c1, c2) => (c1.Type.text < c2.Type.text ? -1 : 1))
                    .map(({ Cypher, Type }) => (
                      <Menu.Item key={":" + Cypher.page} className={Type.text}>
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
    </Content>
  );
};

const FactionsMenu = connect(
  (state) => ({
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
    cadres: CadreCategoryMembers.select()(state),
    editMode: EditMode.select()(state),
    lists: EnhancedLists.select()(state),
    factions: Factions.select()(state),
    targetList: ListIndex.select()(state),
  }),
  (dispatch) => ({
    menuItemClicked: (page) => (event) => {
      dispatch(MenuItemClicked({ page }));
      event.stopPropagation();
    },
    allMenuItemsClicked: (pages) => (event) => {
      pages.forEach((page) => dispatch(MenuItemClicked({ page })));
      event.stopPropagation();
    },
    toggleEditMode: () => dispatch(EditMode.toggle()),
    updateTargetList: (listIndex) => dispatch(ListIndex.set({ listIndex })),
  })
)(FactionsMenuPresentation);

function AppPresentation({
  initialized,
  lists,
  toggleCard,
  removeList,
  removeCard,
  addEmptyList,
  moveListBy,
  moveCardByOne,
  setListTitle,
  setCardCortex,
  setCardWarjackWeapons,
  setCardVehicleWeapon,
  factions,
  factionsPageByText,
  vehicleWeapons,
  warjackWeapons,
  editMode,
  toggledSections,
  toggleSection,
}) {
  return (
    <div className="App">
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
                      <div className="body">
                        <Card hoverable className="card">
                          <Card.Meta
                            avatar={
                              <div
                                style={{
                                  height: "25px",
                                  marginRight: "12px",
                                  textAlign: "center",
                                  width: "35px",
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
                                <div>Fetching data, please wait</div>
                                <div className="card-type">
                                  This may take up to 20 seconds
                                </div>
                              </>
                            }
                          />
                        </Card>
                      </div>
                    </div>
                    <div className="footer" />
                  </div>
                </Col>
              </Row>
            </Layout>
          </Content>
        ) : (
          <>
            <Affix>
              <FactionsMenu />
            </Affix>
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
                      <>
                        {!editMode ? (
                          <></>
                        ) : (
                          <div
                            key={`add_list_top${listIndex}`}
                            style={{
                              color: "white",
                              cursor: "pointer",
                              textAlign: "center",
                            }}
                          >
                            <span onClick={addEmptyList(listIndex)}>
                              <PlusSquareOutlined /> Add list
                            </span>
                          </div>
                        )}
                        <div className="cards" key={`cards${listIndex}`}>
                          <div style={{ cursor: "pointer" }} className="header">
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
                                {editMode ? (
                                  <>
                                    <CaretUpOutlined
                                      style={{
                                        fontSize: "18px",
                                        color: "white",
                                        marginRight: "16px",
                                        marginTop: "6px",
                                      }}
                                      onClick={moveListBy(listIndex, -1)}
                                    />
                                    <CaretDownOutlined
                                      style={{
                                        fontSize: "18px",
                                        color: "white",
                                        marginRight: "16px",
                                        marginTop: "6px",
                                      }}
                                      onClick={moveListBy(listIndex, 1)}
                                    />
                                    <DeleteOutlined
                                      style={{
                                        fontSize: "18px",
                                        color: "white",
                                        marginRight: "16px",
                                        marginTop: "6px",
                                      }}
                                      onClick={removeList(listIndex)}
                                    />
                                  </>
                                ) : (
                                  Object.entries(
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
                                    ))
                                )}
                              </Col>
                            </Row>
                          </div>

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
                                      onClick={
                                        editMode
                                          ? null
                                          : toggleCard(
                                              listIndex,
                                              cardIndex,
                                              pageId,
                                              card
                                            )
                                      }
                                      avatar={
                                        editMode ? (
                                          <div
                                            style={{
                                              height: "25px",
                                              width: "35px",
                                              textAlign: "center",
                                            }}
                                          >
                                            <CaretUpOutlined
                                              onClick={moveCardByOne(
                                                listIndex,
                                                cardIndex,
                                                true
                                              )}
                                              style={{ fontSize: "18px" }}
                                            />
                                            <CaretDownOutlined
                                              onClick={moveCardByOne(
                                                listIndex,
                                                cardIndex,
                                                false
                                              )}
                                              style={{ fontSize: "18px" }}
                                            />
                                          </div>
                                        ) : faction ? (
                                          <div
                                            style={{
                                              height: "25px",
                                              width: "35px",
                                              textAlign: "center",
                                              marginRight: "12px",
                                            }}
                                          >
                                            {!details ||
                                            !details.coreStats ||
                                            details.coreStats.length === 0 ||
                                            !details.coreStats[0]
                                              .deploymentCost ? (
                                              <FactionImage faction={faction} />
                                            ) : (
                                              <>
                                                <FactionImage
                                                  faction={faction}
                                                  height="23px"
                                                />
                                                <div className="deployment-cost">
                                                  DC{" "}
                                                  {
                                                    details.coreStats[0]
                                                      .deploymentCost
                                                  }
                                                </div>
                                              </>
                                            )}
                                          </div>
                                        ) : (
                                          <div
                                            style={{
                                              marginRight: "12px",
                                            }}
                                          >
                                            <FactionImage faction="Universal" />
                                          </div>
                                        )
                                      }
                                      title={
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginRight: "8px",
                                          }}
                                        >
                                          <div style={{ flex: 100 }}>
                                            <div>{title}</div>
                                            <div className="card-type">
                                              {(faction || "").replace(
                                                /_/g,
                                                " "
                                              )}
                                              {subtype ? " " + subtype : ""}
                                              {type ? " " + type : ""}
                                            </div>
                                            <div>
                                              <span className="subtitle">
                                                {[
                                                  ...(!details ||
                                                  !details.coreStats ||
                                                  !details.coreStats[0]
                                                    .vehicleWeaponSelection ||
                                                  !vehicleWeaponName(
                                                    details.coreStats[0]
                                                      .vehicleWeaponSelection,
                                                    vehicleWeaponId
                                                  )
                                                    ? []
                                                    : [
                                                        vehicleWeaponName(
                                                          details.coreStats[0]
                                                            .vehicleWeaponSelection,
                                                          vehicleWeaponId
                                                        ),
                                                      ]),
                                                  ...(!details ||
                                                  !details.coreStats ||
                                                  details.coreStats.length ===
                                                    0 ||
                                                  !details.coreStats[0]
                                                    .cortexSelections ||
                                                  !cortexName(
                                                    details.coreStats[0]
                                                      .cortexSelections,
                                                    cortexIds
                                                  )
                                                    ? []
                                                    : [
                                                        cortexName(
                                                          details.coreStats[0]
                                                            .cortexSelections,
                                                          cortexIds
                                                        ),
                                                      ]),
                                                  ...(!details ||
                                                  !details.coreStats ||
                                                  details.coreStats.length ===
                                                    0 ||
                                                  !details.coreStats[0]
                                                    .warjackWeaponSelections ||
                                                  !warjackWeaponIds ||
                                                  warjackWeaponIds.length === 0
                                                    ? []
                                                    : warjackWeaponNamesSubtitle(
                                                        details.coreStats[0]
                                                          .warjackWeaponSelections,
                                                        warjackWeaponIds
                                                      )),
                                                ].join(", ")}
                                              </span>
                                            </div>
                                          </div>
                                          {!editMode ? (
                                            <></>
                                          ) : (
                                            <div style={{ flex: 1 }}>
                                              <DeleteOutlined
                                                style={{
                                                  fontSize: "18px",
                                                }}
                                                onClick={removeCard(
                                                  listIndex,
                                                  cardIndex
                                                )}
                                              />
                                            </div>
                                          )}
                                        </div>
                                      }
                                    />
                                    {hidden || editMode ? (
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
                                        {!details.storeLinks ||
                                        details.storeLinks.length === 0 ? (
                                          <></>
                                        ) : (
                                          <div className="special-rules">
                                            <span
                                              onClick={toggleSection(
                                                "privateer press store"
                                              )}
                                            >
                                              Privateer Press Store
                                            </span>{" "}
                                            <span>
                                              -{" "}
                                              {toggledSections[
                                                "privateer press store"
                                              ]
                                                ? "Click to expand"
                                                : details.storeLinks.map(
                                                    (linkText, index) => (
                                                      <React.Fragment
                                                        key={`store_link_${listIndex}_${cardIndex}_${index}`}
                                                      >
                                                        <span
                                                          dangerouslySetInnerHTML={{
                                                            __html: linkText,
                                                          }}
                                                        />
                                                        {index ===
                                                        details.storeLinks
                                                          .length -
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
                                        {!details ||
                                        !details.coreStats ||
                                        details.coreStats.length === 0 ? (
                                          <></>
                                        ) : (
                                          details.coreStats.map(
                                            (coreStats, coreStatsIndex) => (
                                              <React.Fragment
                                                key={`core_stats_${coreStatsIndex}`}
                                              >
                                                {!coreStats.cardName ? (
                                                  <></>
                                                ) : (
                                                  <h3>{coreStats.cardName}</h3>
                                                )}
                                                {!coreStats.modelStats ||
                                                Object.keys(
                                                  coreStats.modelStats
                                                ).length === 0 ? (
                                                  <></>
                                                ) : (
                                                  <div className="model-stats">
                                                    {Object.entries(
                                                      coreStats.modelStats
                                                    ).map(
                                                      ([name, stat], index) => (
                                                        <div
                                                          key={`${name}_stat`}
                                                        >
                                                          <div>{name}</div>
                                                          <div>{stat}</div>
                                                        </div>
                                                      )
                                                    )}
                                                  </div>
                                                )}
                                                {!coreStats.cortexSelections ||
                                                Object.entries(
                                                  coreStats.cortexSelections
                                                ).length === 0 ? (
                                                  <></>
                                                ) : (
                                                  <>
                                                    <Select
                                                      suffixIcon={
                                                        <CaretDownOutlined />
                                                      }
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
                                                              coreStats.cortexSelections,
                                                              cortexIds
                                                            )
                                                      }
                                                      getPopupContainer={() =>
                                                        document
                                                          .querySelectorAll(
                                                            ".cards"
                                                          )
                                                          [
                                                            listIndex
                                                          ].querySelectorAll(
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
                                                        coreStats.cortexSelections
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
                                                              ({
                                                                categoryId,
                                                              }) => categoryId
                                                            )}
                                                            value={cortex}
                                                            onClick={(event) =>
                                                              event.stopPropagation()
                                                            }
                                                          >
                                                            <h3>{cortex}</h3>
                                                            <div className="card-icons">
                                                              {!advantages ? (
                                                                <></>
                                                              ) : (
                                                                Object.entries(
                                                                  advantages
                                                                )
                                                                  .filter(
                                                                    ([name]) =>
                                                                      advantageImages[
                                                                        name
                                                                      ]
                                                                  )
                                                                  .map(
                                                                    (
                                                                      [
                                                                        name,
                                                                        {
                                                                          text,
                                                                        },
                                                                      ],
                                                                      index
                                                                    ) => (
                                                                      <AdvantageImage
                                                                        key={`advantage_${index}`}
                                                                        title={
                                                                          name
                                                                        }
                                                                        text={
                                                                          text
                                                                        }
                                                                      />
                                                                    )
                                                                  )
                                                              )}
                                                            </div>
                                                            {Object.entries(
                                                              advantages
                                                            )
                                                              .filter(
                                                                ([rule]) =>
                                                                  !advantageImages[
                                                                    rule
                                                                  ]
                                                              )
                                                              .map(
                                                                (
                                                                  [
                                                                    rule,
                                                                    { text },
                                                                  ],
                                                                  advantageIndex
                                                                ) => (
                                                                  <div
                                                                    key={`cortex_${index}_advantage_${advantageIndex}`}
                                                                    className="model-cortex-special-rules"
                                                                  >
                                                                    <span
                                                                      onClick={toggleSection(
                                                                        rule
                                                                      )}
                                                                    >
                                                                      {markChargedOrSpike(
                                                                        faction,
                                                                        text
                                                                      )}
                                                                      {rule}
                                                                    </span>{" "}
                                                                    <span>
                                                                      -{" "}
                                                                      {toggledSections[
                                                                        rule
                                                                      ]
                                                                        ? "Click to expand"
                                                                        : text}
                                                                    </span>
                                                                  </div>
                                                                )
                                                              )}
                                                          </Select.Option>
                                                        )
                                                      )}
                                                    </Select>
                                                  </>
                                                )}
                                                {!coreStats.weaponPoints ? (
                                                  <></>
                                                ) : (
                                                  <div className="special-rules">
                                                    <span>Weapon Points</span>{" "}
                                                    <span>
                                                      - {coreStats.weaponPoints}
                                                    </span>
                                                  </div>
                                                )}
                                                {!coreStats.hardpointNames ? (
                                                  <></>
                                                ) : (
                                                  <>
                                                    {coreStats.hardpointNames.map(
                                                      (
                                                        hardpointName,
                                                        hardpointNameIndex
                                                      ) =>
                                                        !coreStats.warjackWeaponSelections ||
                                                        Object.keys(
                                                          coreStats.warjackWeaponSelections
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
                                                                  ? "none"
                                                                  : warjackWeaponNames(
                                                                      faction,
                                                                      warjackWeapons,
                                                                      coreStats.warjackWeaponSelections,
                                                                      warjackWeaponIds[
                                                                        hardpointNameIndex
                                                                      ],
                                                                      toggleSection,
                                                                      toggledSections
                                                                    )
                                                              }
                                                              getPopupContainer={() =>
                                                                document
                                                                  .querySelectorAll(
                                                                    ".cards"
                                                                  )
                                                                  [
                                                                    listIndex
                                                                  ].querySelectorAll(
                                                                    ".card"
                                                                  )[cardIndex]
                                                              }
                                                            >
                                                              <Select.Option
                                                                key={`warjack_weapon_${hardpointNameIndex}_-1`}
                                                                label={
                                                                  undefined
                                                                }
                                                                value="none"
                                                                onClick={(
                                                                  event
                                                                ) =>
                                                                  event.stopPropagation()
                                                                }
                                                              >
                                                                <div
                                                                  className="model-weapons"
                                                                  style={{
                                                                    height:
                                                                      "52px",
                                                                  }}
                                                                />
                                                              </Select.Option>
                                                              {Object.values(
                                                                coreStats.warjackWeaponSelections
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
                                                                      <>
                                                                        {warjackWeaponNames(
                                                                          faction,
                                                                          warjackWeapons,
                                                                          coreStats.warjackWeaponSelections,
                                                                          pageId,
                                                                          toggleSection,
                                                                          toggledSections
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
                                                {!coreStats.vehicleWeaponSelection ||
                                                coreStats.vehicleWeaponSelection
                                                  .length === 0 ? (
                                                  <></>
                                                ) : (
                                                  <div key="vehicle_weapon_selection">
                                                    <Select
                                                      suffixIcon={
                                                        <CaretDownOutlined />
                                                      }
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
                                                        !coreStats ||
                                                        !coreStats.vehicleWeaponSelection
                                                          ? "none"
                                                          : vehicleWeaponName2(
                                                              faction,
                                                              vehicleWeapons,
                                                              coreStats.vehicleWeaponSelection,
                                                              vehicleWeaponId,
                                                              toggleSection,
                                                              toggledSections
                                                            )
                                                      }
                                                      getPopupContainer={() =>
                                                        document
                                                          .querySelectorAll(
                                                            ".cards"
                                                          )
                                                          [
                                                            listIndex
                                                          ].querySelectorAll(
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
                                                        />
                                                      </Select.Option>
                                                      {coreStats.vehicleWeaponSelection.map(
                                                        (
                                                          {
                                                            text,
                                                            page,
                                                            pageId,
                                                          },
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
                                                              coreStats.vehicleWeaponSelection,
                                                              pageId,
                                                              toggleSection,
                                                              toggledSections
                                                            )}
                                                          </Select.Option>
                                                        )
                                                      )}
                                                    </Select>
                                                  </div>
                                                )}
                                                {!coreStats.weapons ||
                                                coreStats.weapons.length ===
                                                  0 ? (
                                                  <></>
                                                ) : (
                                                  coreStats.weapons.map(
                                                    (weapon, index) => (
                                                      <React.Fragment
                                                        key={`weapon_number_${index}`}
                                                      >
                                                        <div className="model-weapons">
                                                          <div>
                                                            {weapon[
                                                              "Attack Type"
                                                            ] === "Melee" ? (
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
                                                              {Object.entries(
                                                                weapon.specialRules ||
                                                                  {}
                                                              ).map(
                                                                (
                                                                  [rule, text],
                                                                  index2
                                                                ) => (
                                                                  <WeaponQuality
                                                                    key={`weapon_number_${index}_rule_${index2}`}
                                                                    title={rule}
                                                                    text={text}
                                                                  />
                                                                )
                                                              )}
                                                            </div>
                                                            <div>
                                                              {
                                                                weapon[
                                                                  "Damage Type"
                                                                ]
                                                              }
                                                            </div>
                                                          </div>
                                                          <div>
                                                            <div>RNG</div>
                                                            <div>
                                                              {weapon["Range"]}
                                                            </div>
                                                          </div>
                                                          <div>
                                                            <div>POW</div>
                                                            <div>
                                                              {weapon["POW"]}
                                                            </div>
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
                                                                !weaponQualities[
                                                                  rule
                                                                ]
                                                            )
                                                            .map(
                                                              (
                                                                [rule, text],
                                                                ruleIndex
                                                              ) => {
                                                                const textWithIcons =
                                                                  [
                                                                    ...Object.keys(
                                                                      weaponQualities
                                                                    ).map(
                                                                      (
                                                                        title
                                                                      ) => ({
                                                                        title,
                                                                        Tag: WeaponQuality,
                                                                      })
                                                                    ),
                                                                    ...Object.keys(
                                                                      advantageImages
                                                                    ).map(
                                                                      (
                                                                        title
                                                                      ) => ({
                                                                        title,
                                                                        Tag: AdvantageImage,
                                                                      })
                                                                    ),
                                                                  ].reduce(
                                                                    (
                                                                      texts,
                                                                      {
                                                                        title,
                                                                        Tag,
                                                                      }
                                                                    ) =>
                                                                      texts.flatMap(
                                                                        (
                                                                          text,
                                                                          index2
                                                                        ) => {
                                                                          if (
                                                                            typeof text !==
                                                                            "string"
                                                                          )
                                                                            return text;

                                                                          return text
                                                                            .split(
                                                                              new RegExp(
                                                                                `(\\s.\\s${title}:\\s.+[\\n]*)`,
                                                                                "g"
                                                                              )
                                                                            )
                                                                            .flatMap(
                                                                              (
                                                                                string,
                                                                                index
                                                                              ) => {
                                                                                if (
                                                                                  string.match(
                                                                                    new RegExp(
                                                                                      `(${title}:\\s.+[\\n]*)`
                                                                                    )
                                                                                  )
                                                                                ) {
                                                                                  const [
                                                                                    ,
                                                                                    ,
                                                                                    description,
                                                                                  ] =
                                                                                    string.split(
                                                                                      new RegExp(
                                                                                        `(${title}:\\s|\\n)`,
                                                                                        "g"
                                                                                      )
                                                                                    );
                                                                                  return [
                                                                                    ` • ${title}: `,
                                                                                    <Tag
                                                                                      key={`${index}_${index2}`}
                                                                                      title={
                                                                                        title
                                                                                      }
                                                                                      text={
                                                                                        description
                                                                                      }
                                                                                      height="16px"
                                                                                    />,
                                                                                    "\n",
                                                                                  ];
                                                                                }

                                                                                return string;
                                                                              }
                                                                            );
                                                                        }
                                                                      ),
                                                                    [text]
                                                                  );

                                                                return (
                                                                  <div
                                                                    key={`weapon_number_${index}_${ruleIndex}`}
                                                                    className="model-weapons-special-rules"
                                                                  >
                                                                    <span
                                                                      onClick={toggleSection(
                                                                        rule
                                                                      )}
                                                                    >
                                                                      {markChargedOrSpike(
                                                                        faction,
                                                                        text
                                                                      )}
                                                                      {rule}
                                                                    </span>{" "}
                                                                    <span>
                                                                      -{" "}
                                                                      {toggledSections[
                                                                        rule
                                                                      ]
                                                                        ? "Click to expand"
                                                                        : textWithIcons}
                                                                    </span>
                                                                  </div>
                                                                );
                                                              }
                                                            )
                                                        )}
                                                      </React.Fragment>
                                                    )
                                                  )
                                                )}
                                                <div className="card-icons">
                                                  {!coreStats.wildCardFactions ||
                                                  Object.values(
                                                    coreStats.wildCardFactions
                                                  ).length === 0 ? (
                                                    <></>
                                                  ) : (
                                                    Object.values(
                                                      coreStats.wildCardFactions
                                                    ).map(({ page }, index) => (
                                                      <Tooltip
                                                        key={`wild_card_faction_${index}_tooltip`}
                                                        placement="top"
                                                        title="Wild card faction"
                                                        trigger="click"
                                                      >
                                                        <FactionImage
                                                          key={`wild_card_faction_${index}`}
                                                          faction={page}
                                                          height="30px"
                                                          style={{
                                                            filter:
                                                              "drop-shadow(0px 3px 6px hsl(200,100%,25%))",
                                                          }}
                                                        />
                                                      </Tooltip>
                                                    ))
                                                  )}
                                                  {!coreStats.baseSize ? (
                                                    <></>
                                                  ) : (
                                                    <Tooltip
                                                      key="base_size_tooltip"
                                                      placement="top"
                                                      title={`Base size - ${coreStats.baseSize}`}
                                                      trigger="click"
                                                    >
                                                      <div className="metallic-circle">
                                                        {coreStats.baseSize.replace(
                                                          " mm",
                                                          ""
                                                        )}
                                                      </div>
                                                    </Tooltip>
                                                  )}
                                                  {!coreStats.health ? (
                                                    <></>
                                                  ) : (
                                                    <Tooltip
                                                      key="hp_tooltip"
                                                      placement="top"
                                                      title={`Health - ${coreStats.health}`}
                                                      trigger="click"
                                                    >
                                                      <div className="metallic-circle">
                                                        <HeartFilled
                                                          style={{
                                                            fontSize: "0.8em",
                                                          }}
                                                        />
                                                        {coreStats.health}
                                                      </div>
                                                    </Tooltip>
                                                  )}
                                                  {!coreStats.squadSize ? (
                                                    <></>
                                                  ) : (
                                                    <Tooltip
                                                      key="squad_size_tooltip"
                                                      placement="top"
                                                      title={`Squad size - ${coreStats.squadSize}`}
                                                      trigger="click"
                                                    >
                                                      <div className="metallic-circle">
                                                        <TeamOutlined
                                                          style={{
                                                            fontSize: "0.8em",
                                                          }}
                                                        />
                                                        {coreStats.squadSize}
                                                      </div>
                                                    </Tooltip>
                                                  )}
                                                  {!coreStats.advantages ||
                                                  Object.entries(
                                                    coreStats.advantages
                                                  ).length === 0 ? (
                                                    <></>
                                                  ) : (
                                                    Object.entries(
                                                      coreStats.advantages
                                                    ).map(
                                                      ([name, text], index) => (
                                                        <AdvantageImage
                                                          key={`advantage_${index}`}
                                                          title={name}
                                                          text={text}
                                                        />
                                                      )
                                                    )
                                                  )}
                                                  {!coreStats.chassisAdvantages ||
                                                  Object.entries(
                                                    coreStats.chassisAdvantages
                                                  ).length === 0 ? (
                                                    <></>
                                                  ) : (
                                                    Object.entries(
                                                      coreStats.chassisAdvantages
                                                    ).map(
                                                      ([name, text], index) => (
                                                        <AdvantageImage
                                                          key={`advantage_${index}`}
                                                          title={name}
                                                          text={text}
                                                        />
                                                      )
                                                    )
                                                  )}
                                                </div>
                                                {!coreStats.specialRules ||
                                                Object.entries(
                                                  coreStats.specialRules
                                                ).length === 0 ? (
                                                  <></>
                                                ) : (
                                                  Object.entries(
                                                    coreStats.specialRules
                                                  ).map(
                                                    ([rule, text], index) => (
                                                      <div
                                                        key={`special_rules_${index}`}
                                                        className="special-rules"
                                                      >
                                                        <span
                                                          onClick={toggleSection(
                                                            rule
                                                          )}
                                                        >
                                                          {markChargedOrSpike(
                                                            faction,
                                                            text
                                                          )}
                                                          {rule}
                                                        </span>{" "}
                                                        <span>
                                                          -{" "}
                                                          {toggledSections[rule]
                                                            ? "Click to expand"
                                                            : text}
                                                        </span>
                                                      </div>
                                                    )
                                                  )
                                                )}
                                                {!coreStats.chassisSpecialRules ||
                                                Object.entries(
                                                  coreStats.chassisSpecialRules
                                                ).length === 0 ? (
                                                  <></>
                                                ) : (
                                                  Object.entries(
                                                    coreStats.chassisSpecialRules
                                                  ).map(
                                                    ([rule, text], index) => (
                                                      <div
                                                        key={`chassis_special_rules_${index}`}
                                                        className="special-rules"
                                                      >
                                                        <span
                                                          onClick={toggleSection(
                                                            rule
                                                          )}
                                                        >
                                                          {markChargedOrSpike(
                                                            faction,
                                                            text
                                                          )}
                                                          {rule}
                                                        </span>{" "}
                                                        <span>
                                                          -{" "}
                                                          {toggledSections[rule]
                                                            ? "Click to expand"
                                                            : text}
                                                        </span>
                                                      </div>
                                                    )
                                                  )
                                                )}
                                                {!coreStats.maneuvers ||
                                                Object.values(
                                                  coreStats.maneuvers
                                                ).length === 0 ? (
                                                  <></>
                                                ) : (
                                                  <>
                                                    <h3>Maneuvers</h3>
                                                    <dl>
                                                      {Object.entries(
                                                        coreStats.maneuvers
                                                      ).map(
                                                        (
                                                          [rule, text],
                                                          index
                                                        ) => (
                                                          <div
                                                            key={`maneuvers_advantage_${index}`}
                                                            className="special-rules"
                                                          >
                                                            <span
                                                              onClick={toggleSection(
                                                                rule
                                                              )}
                                                            >
                                                              {markChargedOrSpike(
                                                                faction,
                                                                text
                                                              )}
                                                              {rule}
                                                            </span>{" "}
                                                            <span>
                                                              -{" "}
                                                              {toggledSections[
                                                                rule
                                                              ]
                                                                ? "Click to expand"
                                                                : text}
                                                            </span>
                                                          </div>
                                                        )
                                                      )}
                                                    </dl>
                                                  </>
                                                )}
                                                {!coreStats.factionAttachment ? (
                                                  <></>
                                                ) : (
                                                  <div className="special-rules">
                                                    <span
                                                      onClick={toggleSection(
                                                        "factionAttachment"
                                                      )}
                                                    >
                                                      <FactionImage
                                                        faction={faction}
                                                        height="18px"
                                                      />{" "}
                                                      Attachment
                                                    </span>
                                                    <span>
                                                      {" "}
                                                      -{" "}
                                                      {toggledSections[
                                                        "factionAttachment"
                                                      ]
                                                        ? "Click to expand"
                                                        : coreStats.factionAttachment
                                                            .map(
                                                              (attachment) =>
                                                                attachment.text
                                                            )
                                                            .join(", ")}
                                                    </span>
                                                  </div>
                                                )}
                                                {!coreStats.wildCardAttachment ? (
                                                  <></>
                                                ) : (
                                                  Object.entries(
                                                    coreStats.wildCardAttachment
                                                  ).map(
                                                    ([
                                                      faction,
                                                      attachments,
                                                    ]) => (
                                                      <div className="special-rules">
                                                        <span
                                                          onClick={toggleSection(
                                                            `wildCardAttachment ${faction}`
                                                          )}
                                                        >
                                                          <FactionImage
                                                            faction={
                                                              factionsPageByText[
                                                                faction
                                                              ]
                                                            }
                                                            height="18px"
                                                          />{" "}
                                                          Attachment
                                                        </span>
                                                        <span>
                                                          {" "}
                                                          -{" "}
                                                          {toggledSections[
                                                            `wildCardAttachment ${faction}`
                                                          ]
                                                            ? "Click to expand"
                                                            : attachments
                                                                .map(
                                                                  (
                                                                    attachment
                                                                  ) =>
                                                                    attachment.text
                                                                )
                                                                .join(", ")}
                                                        </span>
                                                      </div>
                                                    )
                                                  )
                                                )}
                                              </React.Fragment>
                                            )
                                          )
                                        )}

                                        {!details.release ? (
                                          <></>
                                        ) : (
                                          <div className="special-rules">
                                            <span
                                              onClick={toggleSection("release")}
                                            >
                                              Release
                                            </span>{" "}
                                            <span>
                                              -{" "}
                                              {toggledSections["release"]
                                                ? "Click to expand"
                                                : details.release}
                                            </span>
                                          </div>
                                        )}
                                        {!details.lore ? (
                                          <></>
                                        ) : (
                                          <div className="special-rules">
                                            <span
                                              onClick={toggleSection("lore")}
                                            >
                                              Lore
                                            </span>{" "}
                                            <span>
                                              -{" "}
                                              {toggledSections["lore"]
                                                ? "Click to expand"
                                                : details.lore}
                                            </span>
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
                        {!editMode || listIndex !== lists.length - 1 ? (
                          <></>
                        ) : (
                          <div
                            key={`add_list_bottom${listIndex + 1}`}
                            style={{
                              color: "white",
                              cursor: "pointer",
                              textAlign: "center",
                            }}
                          >
                            <span onClick={addEmptyList(listIndex + 1)}>
                              <PlusSquareOutlined /> Add list
                            </span>
                          </div>
                        )}
                      </>
                    </Col>
                  ))}
                </Row>
              </Layout>
            </Content>
          </>
        )}

        <div>
          <Footer>
            <Bookmark />
            <div className="copyright-notice">
              Images originating from the Privateer Press website are © 2001—
              <>{new Date().getFullYear()}</> Privateer Press, Inc. All Rights
              Reserved. Privateer Press, warcaster and their logos are
              trademarks of Privateer Press, Inc. Images and trademarks used
              without permission. This website is unofficial and is not endorsed
              by Privateer Press.
            </div>
          </Footer>
        </div>
      </Layout>
    </div>
  );
}

const App = connect(
  (state) => ({
    initialized: AppSync.selectDone()(state),
    lists: EnhancedLists.selectDetails()(state),
    factions: Factions.select()(state),
    factionsPageByText: Factions.selectPageByText()(state),
    vehicleWeapons: VehicleWeapons.select()(state),
    warjackWeapons: WarjackWeapons.select()(state),
    editMode: EditMode.select()(state),
    toggledSections: ToggleSections.select()(state),
  }),
  (dispatch) => ({
    toggleCard: (listIndex, cardIndex, pageId, card) => () =>
      dispatch(Lists.toggleCard({ listIndex, cardIndex, pageId, card })),
    toggleSection: (section) => () =>
      dispatch(ToggleSections.toggle({ section })),
    removeList: (listIndex) => () => dispatch(Lists.removeList({ listIndex })),
    removeCard: (listIndex, cardIndex) => () =>
      dispatch(
        Lists.removeCard({
          listIndex,
          cardIndex,
        })
      ),
    addEmptyList: (listIndex) => () =>
      dispatch(Lists.addEmptyList({ listIndex })),
    moveListBy: (listIndex, by) => () =>
      dispatch(Lists.moveListBy({ listIndex, by })),
    moveCardByOne: (listIndex, cardIndex, up) => () =>
      dispatch(Lists.moveCard({ listIndex, cardIndex, up })),
    setListTitle: (listIndex) => (event) =>
      dispatch(Lists.setListTitle({ listIndex, title: event.target.value })),
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
  vehicleWeaponId,
  toggleSection,
  toggledSections
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
                      {Object.entries(weapon.specialRules || {}).map(
                        ([rule, text], index2) => (
                          <WeaponQuality
                            key={`vehicle_weapon_selection_number_${index}_rule_${index2}`}
                            title={rule}
                            text={text}
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
                        <span onClick={toggleSection(rule)}>
                          {markChargedOrSpike(faction, text)}
                          {rule}
                        </span>{" "}
                        <span>
                          - {toggledSections[rule] ? "Click to expand" : text}
                        </span>
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
  weaponId,
  toggleSection,
  toggledSections
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
                    {Object.entries(weapon.specialRules || {}).map(
                      ([rule, text], index2) => (
                        <WeaponQuality
                          key={`weapon_selection_number_${index}_rule_${index2}`}
                          title={rule}
                          text={text}
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
                <>
                  <div className="card-icons">
                    {Object.entries(weapon.specialRules)
                      .filter(([name]) => advantageImages[name])
                      .map(([name, text], index) => (
                        <AdvantageImage
                          key={`advantage_${index}`}
                          title={name}
                          text={text}
                        />
                      ))}
                  </div>
                  {Object.entries(weapon.specialRules)
                    .filter(
                      ([name]) =>
                        !advantageImages[name] && !weaponQualities[name]
                    )
                    .map(([rule, text], index) => {
                      const textWithIcons = [
                        ...Object.keys(weaponQualities).map((title) => ({
                          title,
                          Tag: WeaponQuality,
                        })),
                        ...Object.keys(advantageImages).map((title) => ({
                          title,
                          Tag: AdvantageImage,
                        })),
                      ].reduce(
                        (texts, { title, Tag }) =>
                          texts.flatMap((text, index2) => {
                            if (typeof text !== "string") return text;

                            return text
                              .split(
                                new RegExp(`(\\s.\\s${title}:\\s.+[\\n]*)`, "g")
                              )
                              .flatMap((string, index) => {
                                if (
                                  string.match(
                                    new RegExp(`(${title}:\\s.+[\\n]*)`)
                                  )
                                ) {
                                  const [, , description] = string.split(
                                    new RegExp(`(${title}:\\s|\\n)`, "g")
                                  );
                                  return [
                                    ` • ${title}: `,
                                    <Tag
                                      key={`${index}_${index2}`}
                                      title={title}
                                      text={description}
                                      height="16px"
                                    />,
                                    "\n",
                                  ];
                                }

                                return string;
                              });
                          }),
                        [text]
                      );

                      return (
                        <div
                          key={`weapon_selection_number_${index}_${index}`}
                          className="model-weapons-special-rules"
                        >
                          <span onClick={toggleSection(rule)}>
                            {markChargedOrSpike(faction, text)}
                            {rule}
                          </span>{" "}
                          <span>
                            -{" "}
                            {toggledSections[rule]
                              ? "Click to expand"
                              : textWithIcons}
                          </span>
                        </div>
                      );
                    })}
                </>
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
            <div className="card-icons">
              {Object.entries(weaponConfig.specialRules)
                .filter(([name]) => advantageImages[name])
                .map(([name, text], index) => (
                  <AdvantageImage
                    key={`advantage_${index}`}
                    title={name}
                    text={text}
                  />
                ))}
            </div>
            {Object.entries(weaponConfig.specialRules)
              .filter(([rule]) => !weaponQualities[rule])
              .filter(([name]) => !advantageImages[name])
              .map(([rule, text], ruleIndex) => (
                <div
                  key={`weapon_selection_rules_number_${ruleIndex}`}
                  className="model-weapons-special-rules"
                >
                  <span onClick={toggleSection(rule)}>
                    {markChargedOrSpike(faction, text)}
                    {rule}
                  </span>{" "}
                  <span>
                    - {toggledSections[rule] ? "Click to expand" : text}
                  </span>
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
