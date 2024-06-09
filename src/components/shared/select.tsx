"use client";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define types for props
interface Option {
  package: string;
  price: number;
}

interface SelectScrollableProps {
  options: Option[];
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  formData: any;
  country: string;
}

export function SelectScrollable({
  options,
  setFormData,
  formData,
  country,
}: SelectScrollableProps) {
  const [exchangeRates, setExchangeRates] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  const currencyConverter = (price: number) => {
    if (!exchangeRates) return "Loading...";

    const currency = countryCurrencyMap[country] || "USD";
    const exchangeRate = exchangeRates[currency];
    const convertedPrice = price * exchangeRate;

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(convertedPrice);
  };

  return (
    <Select
      name="package"
      onValueChange={(e) => {
        setFormData({ ...formData, ["package"]: e });
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Package" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options?.map((option) => (
            <SelectItem key={option.package} value={option.package}>
              {option.package} {`-->`} {currencyConverter(option.price)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
const countryCurrencyMap: { [key: string]: string } = {
  AF: "AFN", // Afghanistan
  AL: "ALL", // Albania
  DZ: "DZD", // Algeria
  AS: "USD", // American Samoa
  AD: "EUR", // Andorra
  AO: "AOA", // Angola
  AI: "XCD", // Anguilla
  AG: "XCD", // Antigua and Barbuda
  AR: "ARS", // Argentina
  AM: "AMD", // Armenia
  AW: "AWG", // Aruba
  AU: "AUD", // Australia
  AT: "EUR", // Austria
  AZ: "AZN", // Azerbaijan
  BS: "BSD", // Bahamas
  BH: "BHD", // Bahrain
  BD: "BDT", // Bangladesh
  BB: "BBD", // Barbados
  BY: "BYN", // Belarus
  BE: "EUR", // Belgium
  BZ: "BZD", // Belize
  BJ: "XOF", // Benin
  BM: "BMD", // Bermuda
  BT: "BTN", // Bhutan
  BO: "BOB", // Bolivia
  BA: "BAM", // Bosnia and Herzegovina
  BW: "BWP", // Botswana
  BR: "BRL", // Brazil
  IO: "USD", // British Indian Ocean Territory
  VG: "USD", // British Virgin Islands
  BN: "BND", // Brunei
  BG: "BGN", // Bulgaria
  BF: "XOF", // Burkina Faso
  BI: "BIF", // Burundi
  CV: "CVE", // Cape Verde
  KH: "KHR", // Cambodia
  CM: "XAF", // Cameroon
  CA: "CAD", // Canada
  KY: "KYD", // Cayman Islands
  CF: "XAF", // Central African Republic
  TD: "XAF", // Chad
  CL: "CLP", // Chile
  CN: "CNY", // China
  CO: "COP", // Colombia
  KM: "KMF", // Comoros
  CK: "NZD", // Cook Islands
  CR: "CRC", // Costa Rica
  HR: "HRK", // Croatia
  CU: "CUP", // Cuba
  CW: "ANG", // Curaçao
  CY: "EUR", // Cyprus
  CZ: "CZK", // Czech Republic
  CD: "CDF", // Democratic Republic of the Congo
  DK: "DKK", // Denmark
  DJ: "DJF", // Djibouti
  DM: "XCD", // Dominica
  DO: "DOP", // Dominican Republic
  EC: "USD", // Ecuador
  EG: "EGP", // Egypt
  SV: "USD", // El Salvador
  GQ: "XAF", // Equatorial Guinea
  ER: "ERN", // Eritrea
  EE: "EUR", // Estonia
  SZ: "SZL", // Eswatini
  ET: "ETB", // Ethiopia
  FK: "FKP", // Falkland Islands
  FJ: "FJD", // Fiji
  FI: "EUR", // Finland
  FR: "EUR", // France
  GF: "EUR", // French Guiana
  PF: "XPF", // French Polynesia
  GA: "XAF", // Gabon
  GM: "GMD", // Gambia
  GE: "GEL", // Georgia
  DE: "EUR", // Germany
  GH: "GHS", // Ghana
  GI: "GIP", // Gibraltar
  GR: "EUR", // Greece
  GL: "DKK", // Greenland
  GD: "XCD", // Grenada
  GP: "EUR", // Guadeloupe
  GU: "USD", // Guam
  GT: "GTQ", // Guatemala
  GG: "GBP", // Guernsey
  GN: "GNF", // Guinea
  GW: "XOF", // Guinea-Bissau
  GY: "GYD", // Guyana
  HT: "HTG", // Haiti
  HN: "HNL", // Honduras
  HK: "HKD", // Hong Kong
  HU: "HUF", // Hungary
  IS: "ISK", // Iceland
  IN: "INR", // India
  ID: "IDR", // Indonesia
  IR: "IRR", // Iran
  IQ: "IQD", // Iraq
  IE: "EUR", // Ireland
  IM: "GBP", // Isle of Man
  IL: "ILS", // Israel
  IT: "EUR", // Italy
  CI: "XOF", // Ivory Coast
  JM: "JMD", // Jamaica
  JP: "JPY", // Japan
  JE: "GBP", // Jersey
  JO: "JOD", // Jordan
  KZ: "KZT", // Kazakhstan
  KE: "KES", // Kenya
  KI: "AUD", // Kiribati
  XK: "EUR", // Kosovo
  KW: "KWD", // Kuwait
  KG: "KGS", // Kyrgyzstan
  LA: "LAK", // Laos
  LV: "EUR", // Latvia
  LB: "LBP", // Lebanon
  LS: "LSL", // Lesotho
  LR: "LRD", // Liberia
  LY: "LYD", // Libya
  LI: "CHF", // Liechtenstein
  LT: "EUR", // Lithuania
  LU: "EUR", // Luxembourg
  MO: "MOP", // Macao
  MG: "MGA", // Madagascar
  MW: "MWK", // Malawi
  MY: "MYR", // Malaysia
  MV: "MVR", // Maldives
  ML: "XOF", // Mali
  MT: "EUR", // Malta
  MH: "USD", // Marshall Islands
  MQ: "EUR", // Martinique
  MR: "MRU", // Mauritania
  MU: "MUR", // Mauritius
  YT: "EUR", // Mayotte
  MX: "MXN", // Mexico
  FM: "USD", // Micronesia
  MD: "MDL", // Moldova
  MC: "EUR", // Monaco
  MN: "MNT", // Mongolia
  ME: "EUR", // Montenegro
  MS: "XCD", // Montserrat
  MA: "MAD", // Morocco
  MZ: "MZN", // Mozambique
  MM: "MMK", // Myanmar
  NA: "NAD", // Namibia
  NR: "AUD", // Nauru
  NP: "NPR", // Nepal
  NL: "EUR", // Netherlands
  NC: "XPF", // New Caledonia
  NZ: "NZD", // New Zealand
  NI: "NIO", // Nicaragua
  NE: "XOF", // Niger
  NG: "NGN", // Nigeria
  NU: "NZD", // Niue
  NF: "AUD", // Norfolk Island
  KP: "KPW", // North Korea
  MK: "MKD", // North Macedonia
  MP: "USD", // Northern Mariana Islands
  NO: "NOK", // Norway
  OM: "OMR", // Oman
  PK: "PKR", // Pakistan
  PW: "USD", // Palau
  PS: "ILS", // Palestine
  PA: "PAB", // Panama
  PG: "PGK", // Papua New Guinea
  PY: "PYG", // Paraguay
  PE: "PEN", // Peru
  PH: "PHP", // Philippines
  PN: "NZD", // Pitcairn Islands
  PL: "PLN", // Poland
  PT: "EUR", // Portugal
  PR: "USD", // Puerto Rico
  QA: "QAR", // Qatar
  CG: "XAF", // Republic of the Congo
  RE: "EUR", // Réunion
  RO: "RON", // Romania
  RU: "RUB", // Russia
  RW: "RWF", // Rwanda
  BL: "EUR", // Saint Barthélemy
  SH: "SHP", // Saint Helena
  KN: "XCD", // Saint Kitts and Nevis
  LC: "XCD", // Saint Lucia
  MF: "EUR", // Saint Martin
  PM: "EUR", // Saint Pierre and Miquelon
  VC: "XCD", // Saint Vincent and the Grenadines
  WS: "WST", // Samoa
  SM: "EUR", // San Marino
  ST: "STN", // São Tomé and Príncipe
  SA: "SAR", // Saudi Arabia
  SN: "XOF", // Senegal
  RS: "RSD", // Serbia
  SC: "SCR", // Seychelles
  SL: "SLL", // Sierra Leone
  SG: "SGD", // Singapore
  SX: "ANG", // Sint Maarten
  SK: "EUR", // Slovakia
  SI: "EUR", // Slovenia
  SB: "SBD", // Solomon Islands
  SO: "SOS", // Somalia
  ZA: "ZAR", // South Africa
  KR: "KRW", // South Korea
  SS: "SSP", // South Sudan
  ES: "EUR", // Spain
  LK: "LKR", // Sri Lanka
  SD: "SDG", // Sudan
  SR: "SRD", // Suriname
  SJ: "NOK", // Svalbard and Jan Mayen
  SE: "SEK", // Sweden
  CH: "CHF", // Switzerland
  SY: "SYP", // Syria
  TW: "TWD", // Taiwan
  TJ: "TJS", // Tajikistan
  TZ: "TZS", // Tanzania
  TH: "THB", // Thailand
  TL: "USD", // Timor-Leste
  TG: "XOF", // Togo
  TK: "NZD", // Tokelau
  TO: "TOP", // Tonga
  TT: "TTD", // Trinidad and Tobago
  TN: "TND", // Tunisia
  TR: "TRY", // Turkey
  TM: "TMT", // Turkmenistan
  TC: "USD", // Turks and Caicos Islands
  TV: "AUD", // Tuvalu
  UG: "UGX", // Uganda
  UA: "UAH", // Ukraine
  AE: "AED", // United Arab Emirates
  GB: "GBP", // United Kingdom
  US: "USD", // United States
  UY: "UYU", // Uruguay
  UZ: "UZS", // Uzbekistan
  VU: "VUV", // Vanuatu
  VA: "EUR", // Vatican City
  VE: "VES", // Venezuela
  VN: "VND", // Vietnam
  WF: "XPF", // Wallis and Futuna
  EH: "MAD", // Western Sahara
  YE: "YER", // Yemen
  ZM: "ZMW", // Zambia
  ZW: "ZWL", // Zimbabwe
};
