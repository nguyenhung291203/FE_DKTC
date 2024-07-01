import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { PointExcel } from '../models/point.models';

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

  exportToExcelListPoint(
    student: any,
    data: PointExcel[],
    fileName: string
  ): void {
    // Tạo workbook
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Tạo worksheet với các thông tin từ mẫu
    const ws_data = [
      [
        'ĐẠI HỌC QUỐC GIA HÀ NỘI',
        null,
        null,
        'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM',
      ],
      ['TRUNG TÂM GIÁO DỤC', null, null, 'Độc lập - Tự do - Hạnh phúc'],
      ['THỂ CHẤT VÀ THỂ THAO'],
      [],
      ['GIẤY CHỨNG NHẬN KẾT QUẢ HỌC TẬP'],
      ['GIÁM ĐỐC TRUNG TÂM GIÁO DỤC THỂ CHẤT VÀ THỂ THAO'],
      ['CHỨNG NHẬN'],
      [],
      ['Anh (Chị)', null, null, null, student.name, null, null, null, null],
      [null, null, null, null],

      [
        'Ngày sinh',
        null,
        null,

        student.dateOfBirth,
        null,
        null,
        'Mã SV',
        student.id,
      ],
      [
        'Ngành',
        null,
        null,

        student.classStudent.marjor.name,
        null,
        null,
        'Lớp',
        student.classStudent.name,
      ],
      [
        'Đơn vị quản lý sinh viên:',
        null,
        null,
        student.classStudent.marjor.university.name,
      ],
      [],
      ['TT', 'Môn học', 'Số tín chỉ', 'Điểm', null, null],
      [null, null, null, 'Hệ 10', 'Hệ chữ', 'Hệ 4'],
    ];

    // Thêm dữ liệu bảng vào worksheet
    data.forEach((row) => {
      ws_data.push([
        row.STT,
        row['Môn học'],
        row['Tín chỉ'],
        row['Điểm môn học'],
        row['Thành chữ'],
        row['Hệ 4'],
      ]);
    });

    // Tạo worksheet từ ws_data
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(ws_data);

    // Thêm worksheet vào workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Xuất file Excel
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveExcelFile(excelBuffer, fileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
    FileSaver.saveAs(data, `${fileName}_export_${new Date().getTime()}.xlsx`);
  }
}
