import { Point ,PointExcel} from "../models/point.models";
import { PointPayload } from "../models/request.models";
export function mapListPointToListPointExport(listPoint: Point[]): PointExcel[] {
    return listPoint.map((point: Point, index: number) => {
      return {
        STT: index + 1,
        'Mã số SV': point.student.id,
        'Họ và tên': point.student.name,
        'Ngày sinh': point.student.dateOfBirth,
        'Điểm chuyên cần': point.scoreNumberOne,
        'Điểm giữa kì': point.scoreNumberTwo,
        'Điểm thi': point.scoreNumberThree,
        'Điểm môn học': point.scoreTotal,
        'Thành chữ': point.scoreLetter,
      };
    });
}

export function mapListPointExcelToListPointPayload(
    classSubjectId:string,
    listPointExcel: PointExcel[]
  ): PointPayload[] {
    return listPointExcel.map((pointExcel: PointExcel) => {
      return {
        id: {
          studentId: pointExcel['Mã số SV'],
          classesSubjectsId: classSubjectId,
        },
        scoreNumberOne: pointExcel['Điểm chuyên cần'],
        scoreNumberTwo: pointExcel['Điểm giữa kì'],
        scoreNumberThree: pointExcel['Điểm thi'],
      };
    });
  }