import "./App.css";
import React from "react";
import { connect } from "react-redux";
import { Menu, Tag, Tooltip } from "antd";
const { SubMenu } = Menu;

function AppPresentation({ factions, typeColors, subtypeColors }) {
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
      <Menu
        id="factions"
        //onClick={this.handleClick}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{ width: 300 }}
        //defaultSelectedKeys={["item1"]}
        //defaultOpenKeys={["sub0"]}
        mode="inline"
      >
        {factions.map(([faction, models], i) => (
          <SubMenu key={`sub${i}`} title={faction}>
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

const App = connect((state) => ({
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
          .flatMap((model) => (model.Subtype ? [[model.Subtype.text, ""]] : []))
      )
    ).map(([subtype], index) => [
      subtype,
      subtypeColors[index % subtypeColors.length],
    ])
  ),
}))(AppPresentation);

export default App;
