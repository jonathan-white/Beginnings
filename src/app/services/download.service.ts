import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

  // **************************
  // Export to CSV
  // **************************

  convertToCSV(objArray) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;

    let str = '\uFEFF';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      // tslint:disable-next-line:forin
      for (const index in array[i]) {
        if (line !== '') { line += ','; }
        line += array[i][index];
      }

      str += line + '\r\n';
    }

    return str;
  }

  exportCSVFile(headers, items, fileTitle) {

    if (headers) {
      items.unshift(headers);
    }

    // Convert Object to JSON
    const jsonObject = JSON.stringify(items);

    const csv = this.convertToCSV(jsonObject);

    const exportedFilename = fileTitle + '.csv' || 'export.csv';

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, exportedFilename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', exportedFilename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  // **************************
  // Export to EXCEL
  // **************************

  // Old School Method
  emitXmlHeader(testTypes) {
    let headerRow =  '<ss:Row>\n';
    for (const colName in testTypes) {
      if (testTypes.hasOwnProperty(colName)) {
        headerRow += '  <ss:Cell>\n';
        headerRow += '    <ss:Data ss:Type="String">';
        headerRow += colName + '</ss:Data>\n';
        headerRow += '  </ss:Cell>\n';
      }
    }
    headerRow += '</ss:Row>\n';
    return '<?xml version="1.0"?>\n' +
          '<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n' +
          '<ss:Worksheet ss:Name="Sheet1">\n' +
          '<ss:Table>\n\n' + headerRow;
  }

  emitXmlFooter() {
    return '\n</ss:Table>\n' +
          '</ss:Worksheet>\n' +
          '</ss:Workbook>\n';
  }

  jsonToSsXml(headers, jsonObject) {
    let xml = '\ufeff';
    const data = typeof jsonObject !== 'object' ? JSON.parse(jsonObject) : jsonObject;

    xml += this.emitXmlHeader(headers);

    for (let row = 0; row < data.length; row++) {
        xml += '<ss:Row>\n';

        for (const col in data[row]) {
          if (data[row].hasOwnProperty(col)) {
            xml += '  <ss:Cell>\n';
            xml += '    <ss:Data ss:Type="' + headers[col]  + '">';
            xml += data[row][col] + '</ss:Data>\n';
            xml += '  </ss:Cell>\n';
          }
        }

        xml += '</ss:Row>\n';
    }

    xml += this.emitXmlFooter();
    return xml;
  }

  exportExcelFile(headers, items, fileTitle) {

    if (headers) {
      items.unshift(headers);
    }

    // Convert Object to JSON
    const jsonObject = JSON.stringify(items);

    const xls = this.jsonToSsXml(headers, jsonObject);

    const exportedFilename = fileTitle + '.xls' || 'export.xls';

    const blob = new Blob([xls], { type: 'application/vnd.ms-excel;charset=utf-8;' });


    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, exportedFilename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', exportedFilename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

}
