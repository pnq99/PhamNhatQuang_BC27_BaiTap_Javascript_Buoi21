function Employee(
  arrLength,
  account,
  name,
  email,
  password,
  datepicker,
  baseSalary,
  role,
  workHour
) {
  this.id = arrLength;
  this.account = account;
  this.name = name;
  this.email = email;
  this.pass = password;
  this.datepicker = datepicker;
  this.baseSalary = baseSalary;
  this.role = role;
  this.workHour = +workHour;
  this.class = this.classify();
}

Employee.prototype.sumSalary = function () {
  var salary = 0;
  switch (this.role) {
    case 'Sếp':
      salary = this.baseSalary * 3;
      break;
    case 'Trưởng phòng':
      salary = this.baseSalary * 2;
      break;
    case 'Nhân Viên':
      salary = this.baseSalary;
      break;
    default:
      salary = 'Chưa nhập mức lương';
  }
  return salary;
};

Employee.prototype.classify = function () {
  var classified = '';

  if (this.workHour >= 192) {
    classified = 'Nhân viên xuất sắc';
  } else if (this.workHour >= 176) {
    classified = 'Nhân viên giỏi';
  } else if (this.workHour >= 160) {
    classified = 'Nhân viên khá';
  } else {
    classified = 'Nhân viên trung bình';
  }
  return classified;
};

export default Employee;
