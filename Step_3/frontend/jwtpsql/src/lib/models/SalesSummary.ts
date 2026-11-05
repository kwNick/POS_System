export type SalesSummaryModel = {
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