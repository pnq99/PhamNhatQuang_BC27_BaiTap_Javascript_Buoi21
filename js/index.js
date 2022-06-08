import Employee from './model.js';
import { buildMarkup, checkValidation } from './controller.js';
import { getDataFromInput } from './controller.js';

var btnOpenAddModal = document.getElementById('btnOpenAddModal');
var btnAddEmp = document.getElementById('btnAddEmp');
var btnSearchEmp = document.getElementById('btnSearchEmp');

var employeeList = [];

function addEmployee() {
  var dataObj = getDataFromInput();

  if (!dataObj) return;

  var newEmployee = new Employee(
    employeeList.length,
    dataObj.account,
    dataObj.name,
    dataObj.email,
    dataObj.password,
    dataObj.datepicker,
    dataObj.baseSalary,
    dataObj.role,
    dataObj.workHour
  );

  employeeList.push(newEmployee);
  display(employeeList);
}

function display(employeeList) {
  var tbody = document.getElementById('tableDanhSach');
  var markup = '';

  employeeList.forEach(employee => {
    markup += buildMarkup(employee);
  });
  tbody.innerHTML = markup;

  tbody.addEventListener('click', function (e) {
    // Guard clause
    if (!e.target.className.includes('del-btn')) return;
    var employeeId = +e.target.closest('tr').dataset.id;
    delEmployee(employeeId);
  });

  tbody.addEventListener('click', function (e) {
    // Guard clause
    if (!e.target.className.includes('select-btn')) return;
    var employeeId = +e.target.closest('tr').dataset.id;
    selectEmployee(employeeId);
  });

  clearInput();
}

function searchEmployee() {
  var searchClass = document.getElementById('searchClass').value;
  searchClass = searchClass.toLowerCase();

  var resultEmployees = [];
  for (var i = 0; i < employeeList.length; i++) {
    if (employeeList[i].class.toLowerCase().indexOf(searchClass) !== -1) {
      resultEmployees.push(employeeList[i]);
    }
  }

  display(resultEmployees);
}

function clearInput() {
  var inputsField = document.querySelectorAll('.input-group > input');

  var selectField = document.getElementById('role');

  for (var input of inputsField) {
    input.value = '';
  }
  selectField.value = '';
}

function delEmployee(employeeId) {
  var index = findEmployeeId(employeeId);
  if (index !== -1) {
    employeeList.splice(index, 1);
  }
  display(employeeList);
}

function selectEmployee(employeeId) {
  var index = findEmployeeId(employeeId);
  var employee = employeeList[index];
  var btnUpdate = document.getElementById('btnUpdate');
  document.getElementById('btnAddEmp').disabled = true;

  document.getElementById('account').value = employee.account;
  document.getElementById('name').value = employee.name;
  document.getElementById('email').value = employee.email;
  document.getElementById('password').value = employee.password;
  document.getElementById('datepicker').value = employee.datepicker;
  document.getElementById('baseSalary').value = employee.baseSalary;
  document.getElementById('role').value = employee.role;
  document.getElementById('workHour').value = employee.workHour;

  btnUpdate.addEventListener('click', function () {
    updateEmployee(index, employeeId);
  });
}

function updateEmployee(index, id) {
  var dataObj = getDataFromInput();

  if (!dataObj) return;

  var updatedEmployee = new Employee(
    id,
    dataObj.account,
    dataObj.name,
    dataObj.email,
    dataObj.password,
    dataObj.datepicker,
    dataObj.baseSalary,
    dataObj.role,
    dataObj.workHour
  );

  employeeList[index] = updatedEmployee;
  display(employeeList);
  clearInput();
}

function findEmployeeId(employeeId) {
  var index = -1;
  for (var i = 0; i < employeeList.length; i++) {
    if (employeeList[i].id === employeeId) {
      index = i;
    }
  }
  return index;
}

btnOpenAddModal.addEventListener('click', function () {
  btnAddEmp.disabled = false;
});
btnSearchEmp.addEventListener('click', searchEmployee);
btnAddEmp.addEventListener('click', addEmployee);
