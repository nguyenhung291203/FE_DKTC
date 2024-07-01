import { Point ,PointExcel} from "../models/point.models";
import { PointPayload } from "../models/request.models";
export function mapListPointToListPointExport(listPoint: Point[]): PointExcel[] {
    return listPoint.map((point: Point, index: number) => {
      return {
        STT: index + 1,
        'Môn học': point.classSubject.subject.name,
        'Tín chỉ': point.classSubject.subject.credit,
        'Điểm chuyên cần': point.scoreNumberOne,
        'Điểm giữa kì': point.scoreNumberTwo,
        'Điểm thi': point.scoreNumberThree,
        'Điểm môn học': point.scoreTotal,
        'Thành chữ': point.scoreLetter,
        'Hệ 4':point.scoreLaster
      };
    });
}

// export function mapListPointExcelToListPointPayload(
//     classSubjectId:string,
//     listPointExcel: PointExcel[]
//   ): PointPayload[] {
//     return listPointExcel.map((pointExcel: PointExcel) => {
//       return {
//         id: {
//           studentId: pointExcel['Mã số SV'],
//           classesSubjectsId: classSubjectId,
//         },
//         scoreNumberOne: pointExcel['Điểm chuyên cần'],
//         scoreNumberTwo: pointExcel['Điểm giữa kì'],
//         scoreNumberThree: pointExcel['Điểm thi'],
//       };
//     });
//   }