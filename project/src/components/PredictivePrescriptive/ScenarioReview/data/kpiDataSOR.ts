export const fetchKpiData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/kpis_mix_eva');
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch KPI data", error);
      return [];
    }
  };
  


/* export const kpiDataSOR = [
    {
      mainLabel: 'Sell Out',
      value: '24,609,741',
      subLabel: 'Volume',
      yoyLabel: 'Base: 25,317,841K (-2.80%)',
      change: -2.80,
      mdlzLabel: 'Sell In (Mdlz)',
      mdlzValue: '3,589,629',
      mdlzsubLabel: 'Volume (Mdlz)',
      mdlzYoyChange: 'Base: 3,694,569 (-2.84%)',
      mdlzIsPositive: false,
    },
    {
      mainLabel: 'Sell Out',
      value: 'R$31,982,631',
      subLabel: 'Value',
      yoyLabel: 'Base: +R$31,973,410 (0.03%)',
      change: 0.03,
      mdlzLabel: 'Sell Out (Mdlz)',
      mdlzValue: 'R$102,590,194',
      mdlzsubLabel: 'Value (Mdlz)',
      mdlzYoyChange: 'Base: +R$102,590,333 (0.13%)',
      mdlzIsPositive: true,
    },
    {
      mainLabel: 'Avg Price',
      value: 'R$1.30',
      subLabel: 'Profit',
      yoyLabel: 'Base: +R$1.26 (2.91%)',
      change: 2.91,
      mdlzLabel: 'Avg Price (Mdlz)',
      mdlzValue: 'R$47,729,158',
      mdlzsubLabel: 'Profit (Mdlz)',
      mdlzYoyChange: 'Base: +R$46,003,834 (3.75%)',
      mdlzIsPositive: true,
    },
  ]; */