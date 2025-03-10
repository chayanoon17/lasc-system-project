// utils.js
export const getSectionLabel = (section) => {
    switch (section) {
      case 'teachingManagement':
        return 'การจัดการเรียนการสอน';
      case 'research':
        return 'การวิจัย';
      case 'operations':
        return 'การปฏิบัติงาน';
      case 'culturalPreservation':
        return 'ทำนุบำรุงศิลปวัฒนธรรม';
      case 'academicServices':
        return 'บริการวิชาการ';
      case 'others':
        return 'อื่นๆ';
      default:
        return '';
    }
  };
  