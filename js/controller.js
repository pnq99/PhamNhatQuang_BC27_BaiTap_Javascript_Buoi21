export function getDataFromInput() {
  var account = document.getElementById('account').value;
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var datepicker = document.getElementById('datepicker').value;
  var baseSalary = +document.getElementById('baseSalary').value;
  var role = document.getElementById('role').value;
  var workHour = document.getElementById('workHour').value;

  var isValid = checkValidation(
    account,
    name,
    email,
    password,
    datepicker,
    baseSalary,
    role,
    workHour
  );

  if (!isValid) {
    return;
  }

  var dataObj = {
    account: account,
    name: name,
    email: email,
    password: password,
    datepicker: datepicker,
    baseSalary: baseSalary,
    role: role,
    workHour: workHour,
  };

  return dataObj;
}

export function buildMarkup(dataObj) {
  return `
    <tr data-id=${dataObj.id}>
      <td data-account="${dataObj.account}">${dataObj.account}</td>
      <td>${dataObj.name}</td>
      <td>${dataObj.email}</td>
      <td>${dataObj.datepicker}</td>
      <td>${dataObj.role}</td>
      <td>${dataObj.sumSalary()}</td>
      <td>${dataObj.class}</td>
      <td>
        <button class="btn btn-success select-btn" data-toggle="modal" data-target="#myModal">Chọn</button>
        <hr>
        <button class="btn btn-danger del-btn">Xóa</button>
      </td>
    </tr>
    `;
}

function isRequired(value) {
  if (!value) {
    return false;
  }
  return true;
}

export function checkValidation(
  account,
  name,
  email,
  password,
  datepicker,
  baseSalary,
  role,
  workHour
) {
  var isValid = true;

  // Account Check

  if (!isRequired(account) || account.length < 4 || account.length > 6) {
    isValid = false;
    document.getElementById('notiAccount').innerHTML =
      'Tài khoản tối đa 4 - 6 ký số, không để trống';
  } else {
    document.getElementById('notiAccount').innerHTML = '';
  }

  // Name Check
  var namePattern = new RegExp('^[A-Za-z_ ]+$');

  if (!isRequired(name)) {
    isValid = false;
    document.getElementById('notiName').innerHTML = 'Không để trống';
  } else if (!namePattern.test(name)) {
    isValid = false;
    document.getElementById('notiName').innerHTML = 'Tên nhân viên phải là chữ';
  } else {
    document.getElementById('notiName').innerHTML = '';
  }

  // Email Check
  var emailPattern = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$');

  if (!isRequired(email)) {
    isValid = false;
    document.getElementById('notiEmail').innerHTML = 'Không được để trống';
  } else if (!emailPattern.test(email)) {
    isValid = false;
    document.getElementById('notiEmail').innerHTML =
      'Email phải đúng định dạng';
  } else {
    document.getElementById('notiEmail').innerHTML = '';
  }

  // password check
  var passwordPattern = new RegExp(
    '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,10}$'
  );

  if (!isRequired(password)) {
    isValid = false;
    document.getElementById('notiPassword').innerHTML = 'Không được để trống';
  } else if (!passwordPattern.test(password)) {
    isValid = false;
    document.getElementById('notiPassword').innerHTML =
      'Từ 6-10 ký tự(1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)';
  } else {
    document.getElementById('notiPassword').innerHTML = '';
  }

  // datePicker check
  // prettier-ignore
  var datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/

  if (!isRequired(datepicker)) {
    isValid = false;
    document.getElementById('notiDate').innerHTML = 'Không được để trống';
  } else if (!datePattern.test(datepicker)) {
    isValid = false;
    document.getElementById('notiDate').innerHTML =
      'Định dạng ngày: mm/dd/yyyy';
  } else {
    document.getElementById('notiDate').innerHTML = '';
  }

  // baseSalary check
  if (!isRequired(baseSalary)) {
    isValid = false;
    document.getElementById('notiSalary').innerHTML = 'Không được để trống';
  } else if (baseSalary < 1e6 || baseSalary > 20e6) {
    isValid = false;
    document.getElementById('notiSalary').innerHTML =
      'Lương cơ bản: 1.000.000 - 20.000.000';
  } else {
    document.getElementById('notiSalary').innerHTML = '';
  }

  if (!role) {
    isValid = false;
    document.getElementById('notiRole').innerHTML = 'Vui lòng chọn chức vụ';
  } else {
    document.getElementById('notiRole').innerHTML = '';
  }

  // workHour check
  if (!isRequired(workHour)) {
    isValid = false;
    document.getElementById('notiWorkhour').innerHTML = 'Không được để trống';
  } else if (workHour < 80 || workHour > 200) {
    isValid = false;
    document.getElementById('notiWorkhour').innerHTML =
      'Số giờ làm trong tháng 80 - 200 giờ';
  } else {
    document.getElementById('notiWorkhour').innerHTML = '';
  }

  return isValid;
}
