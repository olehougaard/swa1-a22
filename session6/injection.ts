const taxRate = .25

type Sale = { readonly total: number }
type TaxReport = { readonly tax: number }
type TaxReceipt = {}

async function readDailySales(date: Date): Promise<Sale[]> {
  const res: Response = await fetch("http://example.com/sales?date=" + date.toString())
  return res.json()
}

async function reportTaxes(taxes: TaxReport[]): Promise<TaxReceipt> {
  const res: Response = await fetch("http://irs.gov/taxes", {method: 'POST', body: JSON.stringify(taxes) })
  return res.json()
}

async function reportDailyTaxes(date: Date): Promise<TaxReceipt> {
  let sales = await readDailySales(date)
  let taxes = sales.map(({total}) => ({tax: taxRate * total}))
  return reportTaxes(taxes)
}

