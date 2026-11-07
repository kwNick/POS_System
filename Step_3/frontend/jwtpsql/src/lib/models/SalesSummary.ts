export type SalesSummaryModel = {
    seriesType: string;  // Soley for All chart axis points
    seriesKey: string;   // Soley for All chart axis points
    seriesName: string;  // Soley for All chart axis points
    pointNumber: number; // Soley for chart axis points
    date?: string;       // Soley for chart axis points
    totalTransactions: number;
    totalRevenue: number;
    averageSale: number;
    totalTax: number;
    avgTaxPerSale: number;
    unitsSold: number;
    employeeSalesSummary: EmployeeSummary[];
};

export type EmployeeSummary = {
    employeeId: number;
    employeeName: string;
    totalTransactions: number;
    totalRevenue: number;
    averageSale: number;
};