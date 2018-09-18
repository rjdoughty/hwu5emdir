
let command = '';
let state = {
 
  transDept: employeeList,
  employeeData: command
}



const runInputs = function (event) {
  event.preventDefault();

  // 2. verify
switch (state.employeeData) {
  case 'verify' :
   cleanResults();
    let inputName = $('#name').val();
    render(state.transDept.some(e => e.name.toUpperCase() === inputName.toUpperCase()) ? 'Employee Found' : 'Employee Not Found');
  break;
  
  //Lookup
  case 'lookup' :
  cleanResults();
    const lookName = $('#name').val();
    let lookStr = ' ';
    render(state.transDept.some(e => e.name.toUpperCase() === lookName.toUpperCase()) ? ' ' : 'Employee Not Found');
    const lookOut = state.transDept.find(e => e.name.toUpperCase() === lookName.toUpperCase()); 
    
        lookStr += `<p>name: ${lookOut.name}</p>`
        lookStr += `<p>office: ${lookOut.officeNum}</p>`
        lookStr += `<p>phone: ${lookOut.phoneNum}</p><br>`;
        
    render(lookStr);
  break;

  //Contains: 
  case 'contains' :
    cleanResults();
    const contName = $('#name').val();
    let contStr = '';
    
    render(state.transDept.some(e => e.name.toUpperCase().includes(contName.toUpperCase()))  ? ' ' : 'Employee Not Found');
    const contOut = state.transDept.filter(e => e.name.toUpperCase().includes(contName.toUpperCase()));
    contOut.forEach(e => render(`<p>name: ${e.name}</p><p>office: ${e.officeNum}</p><p>phone: ${e.phoneNum}</p><br>`));
    render(contStr);
  break;

  //Update:
  case 'update' :
  cleanResults();
    const employeeName = $('#name').val();
    const employeeNumber = $('#office').val();
    const employeePhone = $('#phone').val();
    let updateStr = ' ';

    render(state.transDept.some(e => e.name.toUpperCase() === employeeName.toUpperCase()) ? ' ' : 'Employee Not Found');
      const updateOut = state.transDept.find(e => e.name.toUpperCase() === employeeName.toUpperCase()); 
        updateOut.officeNum = employeeNumber; updateOut.phoneNum = employeePhone;
        updateStr += `<p>name: ${updateOut.name}</p>`;
        updateStr += `<p>office: ${updateOut.officeNum}</p>`;
        updateStr += `<p>phone: ${updateOut.phoneNum}</p><br>`;
      render(updateStr);
  break;

  //add
  case 'add' :
  cleanResults();
    const name = $('#name').val();
    const officeNum = $('#office').val();
    const phoneNum = $('#phone').val();
    let addStr = '';
    employeeList.push({ name, officeNum, phoneNum });

      addStr += `<p>name: ${name}</p>`;
      addStr += `<p>office: ${officeNum}</p>`;
      addStr += `<p>phone: ${phoneNum}</p><br>`;
      render(addStr);
  break;
  
  case 'delete':
 
    const delName = $('#name').val();
    cleanResults();
    render(state.transDept.some(e => e.name.toUpperCase() === delName.toUpperCase()) ? 'Employeed Deleted' : 'Employee Not Found');
    const deleteOut = state.transDept.findIndex(e => e.name.toUpperCase() === delName.toUpperCase()); 
    console.log(deleteOut);
    employeeList.splice(deleteOut, 1);
        //render('Employee Deleted');
        break;
      }
    }



    //to clear results
    const cleanResults = function (){
      $('#results').empty();
    $('#outputs').empty();
    }
//to clear content to name search
const cleanUp = function () {

  $('#results').empty();
  $('#outputs').empty();
  $('#name').addClass('show');
  $('button').addClass('show');
  $('#phone').removeClass('show');
  $('#office').removeClass('show');
  $('h1').addClass('hide');
  $('h3').addClass('hide');
}    

//to clear content for add update
const cleanAddUp = function () {
  $('#results').empty();
  $('#outputs').empty();
  $('#name').addClass('show');
  $('#phone').addClass('show');
  $('#office').addClass('show');
  $('button').addClass('show');
  $('h1').addClass('hide');
  $('h3').addClass('hide');

}
//clear content for home and print
const cleanProme = function () {
  $('#results').empty();
  $('#outputs').empty();
  $('input').removeClass('show');
  $('button').removeClass('show');
}

//When print is clicked:
const print = function () {
  cleanProme();
  $('h1').addClass('hide');
  $('h3').addClass('hide');
  let printStr = '';
 employeeList.forEach(e => renderAll(`<p>name: ${e.name}</p><p>office: ${e.officeNum}</p><p>phone: ${e.phoneNum}</p></br>`));
render(printStr);
}
$('#print').on('click', print);


//When verify is clicked:
const verify = function () {
  state.employeeData = 'verify';
  cleanUp();
}
$('#verify').on('click', verify);


//When lookup is clicked:
const lookup = function () {
  state.employeeData = 'lookup';
  cleanUp();
}
$('#lookup').on('click', lookup);


//When contains is clicked:
const contain = function () {
  state.employeeData = 'contains';
  cleanUp();
}
$('#contain').on('click', contain);


//When update is clicked:
const update = function () {
  state.employeeData = 'update';
  cleanAddUp();
}
$('#update').on('click', update);


//When add is clicked: 
const add = function () {
  state.employeeData = 'add';
  cleanAddUp();
}
$('#add').on('click', add);


//When delete is clicked:
const remove = function () {
  state.employeeData = 'delete';
  cleanUp();
}
$('#delete').on('click', remove);


//display home page when simplicity is clicked
const goHome = function (){
 cleanProme();
  $('h1').removeClass('hide');
  $('h3').removeClass('hide');
}
$('#home').on('click', goHome);


//render
const render = function (outputStr) {
  $('#outputs').append(outputStr);
}

const renderAll = function (outputStr) {
  $('#results').append(outputStr);
}
$('#submit').on('click', runInputs);

