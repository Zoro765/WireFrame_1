// backend/src/controllers/kpiController.ts
import { Request, Response } from 'express';

export const getKPIs = async (req: Request, res: Response) => {
  const mockData = [
    {
      mainLabel: 'Sell Out Volume',
      value: '348,940K',
      yoyLabel: 'YoY: -67,201K',
      change: -12.85,
      mdlzLabel: 'Volume (Mdlz)',
      mdlzValue: '144,077K',
      mdlzYoyChange: 'YoY: -28,195K',
      mdlzIsPositive: false,
    },
  ];

  res.json(mockData);
};