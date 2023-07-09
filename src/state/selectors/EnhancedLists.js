import { CypherCodecs } from "../CypherCodecs";
import { Cyphers } from "../Cyphers";
import { FactionModels } from "../FactionModels";
import { Lists } from "../Lists";
import { Models } from "../Models";
import { PageIds } from "../PageIds";
import { WildCardModels } from "../WildCardModels";
import { StateShard } from "../utils";

const EnhancedLists = StateShard(
  "EnhancedLists",
  undefined,
  {},
  {},
  { select, selectDetails }
);

export { EnhancedLists };

// Selectors

function select(state) {
  const lists = Lists.select()(state);
  const pageIdByPage = PageIds.select()(state);
  const factionModels = FactionModels.select()(state);
  const wildCardModels = WildCardModels.select()(state);
  const cypherCodecs = CypherCodecs.select()(state);

  return lists.map(({ title, cards }) => ({
    title,
    cards: cards.flatMap(
      ({ pageId, cortexIds, warjackWeaponIds, vehicleWeaponId, hidden }) => {
        const page =
          Object.entries(pageIdByPage)
            .filter(([_, id]) => id === pageId)
            .map(([page, _]) => page)[0] || "";

        const model = Object.entries(factionModels)
          .flatMap(([faction, models]) =>
            models.map((model) => ({ ...model, faction }))
          )
          .find(({ Name }) => Name.page === page);

        if (model) {
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
            },
          ];
        }

        const wildCard = Object.entries(wildCardModels)
          .flatMap(([faction, models]) =>
            models.map((model) => ({ ...model, faction }))
          )
          .find(({ Name }) => Name.page === page);

        if (wildCard) {
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
            },
          ];
        }

        const cypher = cypherCodecs.find(({ Cypher }) => Cypher.page === page);

        if (cypher) {
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
            },
          ];
        }

        return [];
      }
    ),
  }));
}

function selectDetails(state) {
  const lists = select(state);

  return lists.map(({ title, cards }) => ({
    title,
    cards: cards.map((card) => {
      const pageIdByPage = PageIds.select()(state);

      const page =
        Object.entries(pageIdByPage)
          .filter(([_, id]) => id === card.pageId)
          .map(([page, _]) => page)[0] || "";

      let details = undefined;

      if (card.card === "model" && card.faction !== "Wild_Card") {
        details = Models.selectByPage(page)(state);
        if (details) {
          details = {
            ...details,
            ...(!details.coreStats
              ? {}
              : {
                  coreStats: details.coreStats.map((coreStats) => ({
                    ...coreStats,
                    ...(!coreStats.hardpoints
                      ? {}
                      : {
                          hardpointNames: parseHardpoints(coreStats.hardpoints),
                        }),
                    ...(!coreStats.cortexSelections
                      ? {}
                      : {
                          cortexSelections: Object.fromEntries(
                            Object.entries(coreStats.cortexSelections).map(
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
                    ...(!coreStats.warjackWeaponSelections
                      ? {}
                      : {
                          warjackWeaponSelections: Object.fromEntries(
                            Object.entries(
                              coreStats.warjackWeaponSelections
                            ).map(([page, selection]) => [
                              page.split("#")[0],
                              {
                                ...selection,
                                pageId: pageIdByPage[page.split("#")[0]],
                              },
                            ])
                          ),
                        }),
                    ...(!coreStats.vehicleWeaponSelection
                      ? {}
                      : {
                          vehicleWeaponSelection:
                            coreStats.vehicleWeaponSelection.map(
                              ({ text, page }) => ({
                                text,
                                page: page.split("#")[0],
                                pageId: pageIdByPage[page.split("#")[0]],
                              })
                            ),
                        }),
                  })),
                }),
          };
        }
      }

      if (card.card === "model" && card.faction === "Wild_Card") {
        details = Models.selectByPage(page)(state);
      }

      if (card.card === "cypher") {
        details = Cyphers.selectByPage(page)(state);
      }

      return {
        ...card,
        ...(!details ? {} : { details }),
      };
    }),
  }));
}

// Helpers

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
