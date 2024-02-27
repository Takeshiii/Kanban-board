const normalizedBoards = [
  {
    id: "znYeVPD09DMvkWOObi5xF",
    name: "Platform launch",
    columns: [
      "MkdO7cpTNwVByeHmWEo_E",
      "YxcrrVzWPF_9tTlq9xUWL",
      "ykHm0upOIEOkllx7QVGBz",
    ],
  },
];

const normalizedColumns = [
  {
    id: "MkdO7cpTNwVByeHmWEo_E",
    name: "Todo",
    cards: [
      "Io3JnZaVWASZnVSWg2OWI",
      "D-wAqTWqJMcseUF84ujJk",
      "W-Nu7CWrkVEyc6t5RIwjb",
      "XG1XT4pK9wVvDmsF5eBBX",
    ],
  },
  {
    id: "YxcrrVzWPF_9tTlq9xUWL",
    name: "Doing",
    cards: [
      "DZubLodae9HjAMYydiNFo",
      "PYeWdiqrKRgo4dr1IloIL",
      "mpkW_wWUCnNEF0iFon9HV",
    ],
  },
  {
    id: "ykHm0upOIEOkllx7QVGBz",
    name: "Done",
    cards: ["6i8DpEbISWZdQsiMGSsR3", "TD9ILt8VCc_up5oCakLVa"],
  },
];

const normalizedCards = [
  {
    id: "Io3JnZaVWASZnVSWg2OWI",
    name: "Build UI for search",
    tasks: ["w5yNPBNcYv2vwDsb_gN8Y"],
  },
  {
    id: "D-wAqTWqJMcseUF84ujJk",
    name: "QA and test all major issues",
    tasks: ["68DqpFXIoYss3PEBO13mG", "tN-q3yHOSMikeCwj3DDaV"],
  },
  {
    id: "W-Nu7CWrkVEyc6t5RIwjb",
    name: "Build settings UI",
    tasks: ["-tG8dImxgxaVqw52HpsLl", "ZHslKWnYlmzb5A0Cj4dOo"],
  },
  {
    id: "XG1XT4pK9wVvDmsF5eBBX",
    name: "Add search endpoints",
    tasks: ["YKe2ePz6xjWu-T7A__5aQ", "tmVwtqm7TspZa0S0zRByX"],
  },
  {
    id: "DZubLodae9HjAMYydiNFo",
    name: "Research pricing points",
    tasks: ["mmf9HpQtr5Mn8AUepkKHc", "VgtkNnzbo-bgVNNsXEYG_"],
  },
  {
    id: "PYeWdiqrKRgo4dr1IloIL",
    name: "Design onboarding flow",
    tasks: [
      "V4r9KTzkUpoKyHc7n9o4s",
      "KOHzIUX9Lre2PzRp84tfH",
      "znVEwnI3-Kzb5Kj7bm2gr",
    ],
  },
  {
    id: "mpkW_wWUCnNEF0iFon9HV",
    name: "Design settings pages",
    tasks: ["Id3nPLugr4mExP5pHBKHc", "xz_TuBv3yejZkjuSpPeXu"],
  },
  {
    id: "6i8DpEbISWZdQsiMGSsR3",
    name: "Market discovery",
    tasks: ["Nfs3-pDu54rKfZe5QLUmR"],
  },
  {
    id: "TD9ILt8VCc_up5oCakLVa",
    name: "Research the market",
    tasks: ["zpaBXAGDqWopxJote9I2w"],
  },
];

const normalizedTasks = [
  {
    id: "w5yNPBNcYv2vwDsb_gN8Y",
    name: "Search page",
    done: false,
  },
  {
    id: "68DqpFXIoYss3PEBO13mG",
    name: "Internal testing",
    done: false,
  },
  {
    id: "tN-q3yHOSMikeCwj3DDaV",
    name: "External testing",
    done: false,
  },
  {
    id: "-tG8dImxgxaVqw52HpsLl",
    name: "Account page",
    done: false,
  },
  {
    id: "ZHslKWnYlmzb5A0Cj4dOo",
    name: "Billing page",
    done: false,
  },
  {
    id: "YKe2ePz6xjWu-T7A__5aQ",
    name: "Add search endpoint",
    done: false,
  },
  {
    id: "tmVwtqm7TspZa0S0zRByX",
    name: "Define search filters",
    done: false,
  },
  {
    id: "mmf9HpQtr5Mn8AUepkKHc",
    name: "Research competitor pricing and business models",
    done: false,
  },
  {
    id: "VgtkNnzbo-bgVNNsXEYG_",
    name: "Outline a business model that works for our solution",
    done: true,
  },
  {
    id: "V4r9KTzkUpoKyHc7n9o4s",
    name: "Sign up page",
    done: false,
  },
  {
    id: "KOHzIUX9Lre2PzRp84tfH",
    name: "Sign in page",
    done: true,
  },
  {
    id: "znVEwnI3-Kzb5Kj7bm2gr",
    name: "Welcome page",
    done: true,
  },
  {
    id: "Id3nPLugr4mExP5pHBKHc",
    name: "Settings - Account page",
    done: true,
  },
  {
    id: "xz_TuBv3yejZkjuSpPeXu",
    name: "Settings - Billing page",
    done: true,
  },
  {
    id: "Nfs3-pDu54rKfZe5QLUmR",
    name: "Interview 10 prospective customers",
    done: true,
  },
  {
    id: "zpaBXAGDqWopxJote9I2w",
    name: "Write up research analysis",
    done: true,
  },
];

module.exports = {
  boards: normalizedBoards,
  columns: normalizedColumns,
  cards: normalizedCards,
  tasks: normalizedTasks,
};
