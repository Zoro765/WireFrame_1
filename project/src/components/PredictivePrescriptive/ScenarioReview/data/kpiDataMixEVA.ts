export const fetchKpiData = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/kpis');
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch KPI data", error);
    return [];
  }
};


/* export const kpiDataMixEVA = [
  {
    mainLabel: 'Sell Out',
    value: '201,948',
    subLabel: 'Volume',
    yoyLabel: 'Base: 208,819 (-3.29%)',
    change: -3.29,
    mdlzLabel: 'Sell In (Mdlz)',
    mdlzValue: '30,292',
    mdlzsubLabel: 'Volume (Mdlz)',
    mdlzYoyChange: 'Base: 31,323 (-3.29%)',
    mdlzIsPositive: false,
  },
  {
    mainLabel: 'Sell Out',
    value: 'R$280,326',
    subLabel: 'Value',
    yoyLabel: 'Base: R$281,420 (-0.39%)',
    change: -0.39,
    mdlzLabel: 'Sell Out (Mdlz)',
    mdlzValue: 'R$899,434',
    mdlzsubLabel: 'Value (Mdlz)',
    mdlzYoyChange: 'Base: R$902,944 (-0.39%)',
    mdlzIsPositive: false,
  },
  {
    mainLabel: 'Avg Price',
    value: 'R$1.39',
    subLabel: 'Profit',
    yoyLabel: 'Base: R$1.35 (3.00%)',
    change: 2.91,
    mdlzLabel: 'Avg Price (Mdlz)',
    mdlzValue: 'R$478,708',
    mdlzsubLabel: 'Profit (Mdlz)',
    mdlzYoyChange: 'Base: R$467,905 (2.31%)',
    mdlzIsPositive: true,
  },
];

export const kpiDataMixEVA = [
  {
      "mainLabel": "Sell Out",
      "value": "1,453K",
      "subLabel": "Volume",
      "yoyLabel": "YoY: -1,053K (-42.04%)",
      "change": -42.03677776429041,
      "mdlzLabel": "Sell Out (Mdlz)",
      "mdlzValue": "28K",
      "mdlzsubLabel": "Volume (Mdlz)",
      "mdlzYoyChange": "YoY: -4K (-8.61%)",
      "mdlzIsPositive": false
  },
  {
      "mainLabel": "Sell Out",
      "value": "R$796K",
      "subLabel": "Value",
      "yoyLabel": "YoY: R$-75K (-8.61%)",
      "change": -8.61207288061252,
      "mdlzLabel": "Sell Out (Mdlz)",
      "mdlzValue": "R$796K",
      "mdlzsubLabel": "Value (Mdlz)",
      "mdlzYoyChange": "YoY: R$-75K (-8.61%)",
      "mdlzIsPositive": false
  },
  {
      "mainLabel": "Avg Price",
      "value": "R$66.54",
      "subLabel": "Per Unit",
      "yoyLabel": "YoY: +R$5.75 (9.46%)",
      "change": 9.46159560224702,
      "mdlzLabel": "Avg Price (Mdlz)",
      "mdlzValue": "R$66.44",
      "mdlzsubLabel": "Per unit (Mdlz)",
      "mdlzYoyChange": "YoY: +R$5.82 (9.60%)",
      "mdlzIsPositive": true
  }
] */