const SPREADSHEET_ID = '1D-abLqOmZBsp375yGxf-3eceCRl2oLB55Q26M8FQlgo';

function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Painel de Acompanhamento das Atividades do DEA')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getDashboardData() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const tz = ss.getSpreadsheetTimeZone() || 'America/Fortaleza';

  function getSheetValues(name) {
    const sh = ss.getSheetByName(name);
    if (!sh) return [];
    const lastRow = sh.getLastRow();
    const lastCol = sh.getLastColumn();
    if (lastRow < 1 || lastCol < 1) return [];
    return sh.getRange(1, 1, lastRow, lastCol).getDisplayValues();
  }

  const modified = DriveApp.getFileById(SPREADSHEET_ID).getLastUpdated();
  return {
    resumo: getSheetValues('Resumo'),
    projetos: getSheetValues('Estudos e Projetos'),
    eventos: getSheetValues('Eventos'),
    demandas: getSheetValues('Demandas'),
    reunioes: getSheetValues('Reuniões'),
    infograficos: getSheetValues('Infográficos Temáticos'),
    atualizadoEm: Utilities.formatDate(modified, tz, "dd/MM/yyyy 'às' HH:mm")
  };
}
