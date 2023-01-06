interface Student {
    student_id: number;
    name: string;
  }
    
  interface Teacher {
    teacher_id: number;
    teacher_name: string;
  }
    
  type StudentTeacher = Student & Teacher;
    
  let obj1: StudentTeacher = {
    student_id: 3232,
    name: 'rita',
    teacher_id: 7873,
    teacher_name: 'seema',
  };
    
  console.log(obj1.teacher_id);
  console.log(obj1.name);