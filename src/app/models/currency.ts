export type CurrencyTable = CurrencyTableInfo[]

export interface CurrencyTableInfo {
  table: string
  no: string
  tradingDate: string
  effectiveDate: string
  rates: Currency[]
}

export interface Currency {
  currency: string
  code: string
  bid: number
  ask: number
  effectiveDate?: Date
}
