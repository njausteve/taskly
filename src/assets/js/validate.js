const xlsx = require("xlsx");

let validSheets = {
  "OS last month": [
    "CLAIM NO",
    "CLASS",
    "COMPANY CLAIM",
    "DATE OF LOSS",
    "DATE REPORTED",
    "GROUP CLAIM",
    "INSURED NAME",
    "MANDATORY CLAIM",
    "O/S ESTIMATE",
    "PERIOD FROM",
    "PERIOD TO",
    "POLICY NO",
    "QUOTA SHARE",
    "SURPLUS 2ND",
    "SURPLUS  1ST",
    "XLOSS '1",
    "XLOSS '2"
  ],
  "OS end Month": [
    "CLAIM NO",
    "CLASS",
    "COMPANY CLAIM",
    "DATE OF LOSS",
    "DATE REPORTED",
    "GROUP CLAIM",
    "INSURED NAME",
    "MANDATORY CLAIM",
    "O/S ESTIMATE",
    "PERIOD FROM",
    "PERIOD TO",
    "POLICY NO",
    "QUOTA SHARE",
    "SURPLUS 2ND",
    "SURPLUS  1ST",
    "XLOSS '1",
    "XLOSS '2"
  ],
  Intimated: [
    "AGENCY",
    "CLAIM NO",
    "CLASS",
    "DATE OF ACCIDENT",
    "DATE OF EXPIRY",
    "DATE REPORTED",
    "INSURED",
    "INTIMATION RESERVE",
    "NO.",
    "PAID AMOUNT",
    "POLICY NO",
    "SUM INSURED"
  ],
  Paid: [
    "CHEQUE NO",
    "CLAIM NO.",
    "CLASS",
    "COMPANY RECOVERY",
    "DATE OF CHEQUE",
    "FACULTATIVE",
    "GROUP RECOVERY",
    "MANDATORY RECOVERY",
    "PAID AMOUNT",
    "PAYEE",
    "POLICYHOLDER",
    "QUOTA SHARE",
    "SUM INSURED",
    "SUPLUS 1ST",
    "SURPLUS 2ND",
    "UW YEAR",
    "XLOSS 1",
    "XLOSS 2"
  ]
};

function selectSheet(sheets, workbookTitle) {
  console.log("workbookTitle", workbookTitle);

  let selectedSheet = sheets
    .map(sheet => {
      let firstObject = sheet[0];

      let hasAllKeys = validSheets[workbookTitle].every(item => {
        return firstObject.hasOwnProperty(item);
      });

      if (hasAllKeys) {
        return sheet;
      }
    })
    .filter(sheet => sheet);

  return selectedSheet.length > 0 ? selectedSheet : undefined;
}

function processRawExcelData(rawWorkbook) {
  const sheetNames = rawWorkbook.SheetNames;
  const dataSheets = sheetNames.map(sheetName =>
    xlsx.utils.sheet_to_json(rawWorkbook.Sheets[sheetName])
  );

  return dataSheets;
}

async function loadExcelSheet(filePath) {
  const rawWorkbook = await xlsx.readFile(filePath.toString());
  return rawWorkbook;
}

export async function validate(filePath, workbookTitle) {
  let validationResponse = {};
  const workbookData = await loadExcelSheet(filePath);
  const processedWorkbook = await processRawExcelData(workbookData);
  const selectedSheet = await selectSheet(processedWorkbook, workbookTitle);

  if (!selectedSheet) {
    validationResponse.status = "invalid";
    validationResponse.errors = [
      {
        sourceSheet: workbookTitle,
        message: "wrong sheet selected",
        recommendations: [
          "select proper excel sheet",
          "check to see if column titles in the sheet with sorted data have not been altered"
        ]
      }
    ];
  } else {
    validationResponse.status = "valid";
    validationResponse.errors = [];
    validationResponse.data = selectedSheet;
  }

  return validationResponse;
}
