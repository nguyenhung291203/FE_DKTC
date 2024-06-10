import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx-style';
@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor() {}
  fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  public exportExcel(jsonData: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveExcelFile(excelBuffer, fileName);
  }

  exportToPDF(htmlContent: HTMLElement, fileName: string = 'output.pdf'): void {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('My HTML Content', 20, 20);
    doc.addPage();
    doc.html(htmlContent, {
      x: 20,
      y: 20,
      width: 170,
      autoPaging: 'text',
      windowWidth: 675,
    });
    doc.save(fileName);
  }

  exportCertificateExcel(jsonData: any[], fileName: string): void {
    const data: any = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ];

    data[0][1] = 'ĐẠI HỌC QUỐC GIA HÀ NỘI';
    data[1][1] = 'TRUNG TÂM GIÁO DỤC';
    data[2][2] = 'THỂ CHẤT VÀ THỂ THAO';
    data[0][6] = 'CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM';
    data[1][6] = 'Độc lập - Tự do - Hạnh phúc';
    data[7][0] = 'GIẤY CHỨNG NHẬN KẾT QUẢ HỌC TẬP';
    data[8][0] = 'GIÁM ĐỐC TRUNG TÂM GIÁO DỤC THỂ CHẤT VÀ THỂ THAO';
    data[9][0] = 'CHỨNG NHẬN';
    data[11][1] = 'Anh (Chị) Phạm Minh Ngọc';
    data[12][1] = 'Ngày sinh';
    data[13][1] = 'Ngành';
    data[14][1] = 'Đơn vị quản lý sinh viên';
    data[12][9] = 'Mã sinh viên';
    data[13][9] = 'Lớp';

    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

    worksheet['!merges'] = [
      { s: { r: 0, c: 1 }, e: { r: 0, c: 5 } },
      { s: { r: 1, c: 1 }, e: { r: 1, c: 5 } },
      { s: { r: 1, c: 6 }, e: { r: 1, c: 8 } },
      { s: { r: 2, c: 2 }, e: { r: 2, c: 4 } },
      { s: { r: 7, c: 0 }, e: { r: 7, c: 10 } },
      { s: { r: 8, c: 0 }, e: { r: 8, c: 10 } },
      { s: { r: 9, c: 0 }, e: { r: 9, c: 10 } },
    ];

    const centerAlignment = { horizontal: 'center', vertical: 'center' };

    worksheet['B1'].s = { font: { bold: true }, alignment: centerAlignment };
    worksheet['B2'].s = { font: { bold: true }, alignment: centerAlignment };
    worksheet['C3'].s = { font: { bold: true }, alignment: centerAlignment };
    worksheet['G1'].s = { font: { bold: true }, alignment: centerAlignment };
    worksheet['G2'].s = { font: { bold: true }, alignment: centerAlignment };
    worksheet['A8'].s = { font: { bold: true }, alignment: centerAlignment };
    worksheet['A9'].s = { font: { bold: true }, alignment: centerAlignment };
    worksheet['A10'].s = { font: { bold: true }, alignment: centerAlignment };
    worksheet['B12'].s = { font: { bold: true }, alignment: centerAlignment };
    worksheet['B13'].s = { font: { bold: true }, alignment: centerAlignment };
    worksheet['B14'].s = { font: { bold: true }, alignment: centerAlignment };
    worksheet['J13'].s = { font: { bold: true }, alignment: centerAlignment };
    worksheet['J14'].s = { font: { bold: true }, alignment: centerAlignment };

    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
      cellStyles: true,
    });

    this.saveExcelFile(excelBuffer, fileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
    FileSaver.saveAs(data, `${fileName}_export_${new Date().getTime()}.xlsx`);
  }
}
