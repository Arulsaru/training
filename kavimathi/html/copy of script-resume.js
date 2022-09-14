function nextPage(id) {
    // event.preventDefault();
    const num = parseInt(id[id.length - 1]) - 1;  //id = page-2 ---->  num = 1
    // num = id;
    flag = false;
    // document.getElementById(id).active = true;
    switch (num) {
      case 1:
        flag = pageValidation(page1validation);
        break;
      case 2:
        flag = pageValidation(page2validation);
        break;
      case 3:
        flag = pageValidation(page3validation);
        break;
      case 4:
        flag = pageValidation(page4validation);
        break;
      case 5:
        flag = pageValidation(page5validation);
        break;
      case 6:
        flag = pageValidation(page6validation);
        break;
    }
  
    // if (flag) {
    //   document.getElementById(`submit${num}`).disabled = false; // submit-1 enabled
    //   // document.getElementById(`submit${num}`).active = false;
    // //   document.getElementById(`page-${num}`).style.display = 'none'; // page-1 none
    // //   document.getElementById(id).style.display = 'block'; // id = page-2  visible
    // }
  
  }
  
function pageShowHide(page) {
  const pageDetails = document.getElementsByClassName('page-detail');

  for (let j = 0; j < pageDetails.length; j++) {
    const pageDetail = pageDetails[j];
    pageDetail.style = 'display: none';
  }

  document.getElementById(`page-${page}`).style = '';

}

const pageMenus = document.getElementsByClassName('page-menu');
for (let i = 0; i < pageMenus.length; i++) {
  const pageMenu = pageMenus[i];
  pageMenu.addEventListener('click', function () {
    const page = this.getAttribute('data-page');
    pageShowHide(page);
  })
  for (let k = i+2; k <= pageMenus.length; k++) {
    const button = document.getElementById(`submit${k}`);
    button.disabled = true;
    // console.log(button);
  }
}

pageShowHide(1);
  
  function previousPage(id) {
    // for (let i = 0; i < document.getElementsByClassName('page-menu').length; i++) {
    //   if(i === parseInt(id[id.length - 1]) - 1) {
    //     document.getElementById(`page-${i - 1}`).style.display = 'block';
    //   } else {
    //     document.getElementById(`page-${i - 1}`).style.display = 'none';
    //   }
    // }
    const num = parseInt(id[id.length - 1]) + 1;
    document.getElementById(`page-${num}`).style.display = 'none'; // page-1 none
    document.getElementById(id).style.display = 'block';
  }
  
  function displayOnly(id) {
    for (let i = 0; i < document.getElementsByClassName('page-menu').length; i++) {
      if (i === parseInt(id[id.length - 1]) - 1) {
        document.getElementById(`page-${i + 1}`).style.display = 'block';
      } else {
        document.getElementById(`page-${i + 1}`).style.display = 'none';
      }
    }
  }
  
  const pageValidation = (id) => {
    flag = true;
    for (let i = 0; i < id.length; i++) {
      const ele = document.getElementsByName(id[i].name)[0];//document.getElementsByName(id[i].name) -> return nodelist as array, as there is only one element with name attribute i.e, first_name hence the list contains only one element and that element is in 0th position henece access with list[0]
      console.log(ele.nextElementSibling);
      const errorEle = ele.nextSibling.nextSibling;
      // const errorEle = ele.nextElementSibling.nextElementSibling;
      // console.log(errorEle);
      // console.log(ele.nextSibling);
      // console.log(ele.value);
      if (ele.value === '') {
        flag = false;
        let names = `${(id[i].name).charAt(0).toUpperCase() + (id[i].name).slice(1)}`;
        errorEle.innerText = `Enter ${(names).split('_').join(' ')}`;
      } else if (!ele.value.match(id[i].regex)) {
        flag = false;
        console.log(id[i].min);
        errorEle.innerText = 'Enter valid input';
      } else if (ele.value.length < id[i].min) {
        console.log(id[i].min)
        flag = false;
        errorEle.innerText = `Enter atleast ${(id[i].min)} letters`;
      } else if (ele.value.length > id[i].max) {
        console.log(id[i].max);
        flag = false;
        errorEle.innerText = `Enter within ${(id[i].max)} letters`;
      } else {
        errorEle.innerText = '';
      }
    }
  
    return flag;
  
  }
  
  const page1validation = [
    {
      name: 'first_name',
      required: true,
      regex: new RegExp('^[A-Z]{1}[a-z A-Z]+$'),
      min: 3,
      max: 20
    },
    {
      name: 'last_name',
      required: true,
      regex: new RegExp('^[A-Z]{0,1}[a-z A-Z]+$'),
      min: 1,
      max: 20
    },
    {
      name: 'mobile_no',
      required: true,
      regex: new RegExp('^[1-9]{1}[0-9]{9}$'),
    },
    {
      name: 'email',
      required: true,
      regex: new RegExp('([a-z]{1}[a-z0-9\\.]+@[a-z0-9]+([\\.][a-z]+)+)'),
      min: 10,
      max: 40
    },
    {
      name: 'address',
      required: true,
      regex: new RegExp('[a-zA-Z0-9\\.,:-]+'),
      min: 10,
      max: 50
    }
  ]
  
  const page2validation = [
    {
      name: 'school_name',
      required: true,
      regex: new RegExp('^[A-Z]{1}[a-z A-Z]+$')
    },
    {
      name: 'sslc_percent',
      required: true,
      regex: new RegExp('[1-9][0-9][0]?')
    },
    {
      name: 'school1_name',
      required: true,
      regex: new RegExp('^[A-Z]{1}[a-z A-Z]+$'),
      min: 3,
      max: 30
    },
    {
      name: 'hsc_percent',
      required: true,
      regex: new RegExp('[1-9][0-9][0]?')
    },
    {
      name: 'college',
      required: true,
      regex: new RegExp('^[A-Z]{1}[a-z A-Z]+$'),
      min: 10,
      max: 30
    },
    {
      name: 'college_percent',
      required: true,
      regex: new RegExp('[1-9][0-9][0]?')
    }
  ]
  
  const page3validation = [
    {
      name: 'skill1',
      required: true,
      regex: new RegExp('^[A-Z]{1}[a-z A-Z]+$'),
      min: 3,
      max: 20
     }
    // {
    //   name: 'skill2',
    //   required: true,
    //   regex: new RegExp('[A-Z][a-zA-z]+'),
    //   min: 3,
    //   max: 20
    // },
    // {
    //   name: 'skill3',
    //   required: true,
    //   regex: new RegExp('[A-Z][a-zA-z]+'),
    //   min: 3,
    //   max: 20
    // },
    // {
    //   name: 'skill4',
    //   required: true,
    //   regex: new RegExp('[A-Z][a-zA-z]+'),
    //   min: 3,
    //   max: 20
    // }
  ]
  
  const page4validation = [
    {
      name: 'project1',
      required: true,
      regex: new RegExp('^[A-Z]{1}[a-z A-Z]+$'),
      min: 3,
      max: 20
    },
    {
      name: 'project2',
      required: true,
      regex: new RegExp('[A-Z][a-zA-z]+'),
      min: 3,
      max: 20
    },
    {
      name: 'project3',
      required: true,
      regex: new RegExp('[A-Z][a-zA-z]+'),
      min: 3,
      max: 20
    },
    {
      name: 'project4',
      required: true,
      regex: new RegExp('[A-Z][a-zA-z]+'),
      min: 3,
      max: 20
    }
  ]
  
  const page5validation = [
    {
      name: 'certification1',
      required: true,
      regex: new RegExp('[A-Z][a-zA-z]+'),
      min: 3,
      max: 20
    },
    {
      name: 'certification2',
      required: true,
      regex: new RegExp('[A-Z][a-zA-z]+'),
      min: 3,
      max: 20
    },
    {
      name: 'certification3',
      required: true,
      regex: new RegExp('[A-Z][a-zA-z]+'),
      min: 3,
      max: 20
    },
    {
      name: 'certification4',
      required: true,
      regex: new RegExp('[A-Z][a-zA-z]+'),
      min: 3,
      max: 20
    }
  ]
  
  const page6validation = [
    {
      name: 'profile1',
      required: true,
      regex: new RegExp('[a-zA-Z0-9\\.,:-]+'),
      min: 3,
      max: 20
    },
    {
      name: 'profile2',
      required: true,
      regex: new RegExp('[a-zA-Z0-9\\.,:-]+'),
      min: 3,
      max: 20
    },
    {
      name: 'profile3',
      required: true,
      regex: new RegExp('[a-zA-Z0-9\\.,:-]+'),
      min: 3,
      max: 20
    }
  ]
  
  // const addSkill = document.getElementById('addSkill');
  // addSkill.addEventListener('click', addNewSkill);
  
  // function addNewSkill() {
  //   const skill = document.getElementById('skill');
  //   const skillDiv = document.createElement('div');
  //   skillDiv.className = 'form-floating mb-3 mt-3';
  //   const newSkill = document.createElement('input');
  //   newSkill.type = 'text';
  //   newSkill.className = 'skill';
  //   newSkill.placeholder = 'Enter Skills: ';
  //   newSkill.name = 'skill';
  //   skillDiv.appendChild(newSkill);
  //   const skillLabel = document.createElement('label');
  //   skillLabel.className = 'skills-label-id';
  //   skillLabel.innerHTML = 'Add skill: ';
  //   const removeSkill = document.createElement('button');
  //   removeSkill.className = 'remove-skills-button-div';
  //   removeSkill.innerHTML = 'Remove';
  //   skillDiv.appendChild(skillLabel);
  //   skillDiv.appendChild(removeSkill);
  //   skill.appendChild(skillDiv);
  // }
  
  const addSkills = document.getElementById('add');
  addSkills.addEventListener('click', addNewSkill);
  
  function addNewSkill() {
    const skill = document.getElementById('page-3');
    skill.className = 'form-floating mb-3 mt-3 page-detail skills-div';
    const divTag = document.createElement('div');
    divTag.className = 'form-floating mb-3 mt-3';
    divTag.id = 'div-1';
    const inputTag = document.createElement('input');
    inputTag.type = 'text';
    inputTag.className = 'skills';
    inputTag.placeholder = 'Enter skills';
    inputTag.name = 'skill1';
    inputTag.id = 's1';
    divTag.appendChild(inputTag);
    // const labelTag = document.createElement('label');
    // labelTag.className = 'skills-label-id';
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-skills-button';
    removeButton.id = 'remove';
    removeButton.innerHTML = 'Remove';
    // divTag.appendChild(labelTag);
    divTag.appendChild(removeButton);
    skill.appendChild(divTag);
  }
  
//   const removeSkills = document.getElementById('remove');
//   removeSkills.addEventListener('click', removeDummy);
  
//   function removeDummy() {
//     const elem = document.getElementById('s1');
//     elem.parentNode.removeChild(elem);
//     return false;
//   }
  
  
  
  // function removeSkill() {
  
  // }
  
  // function addSkills()
  // {
  // skill2.style.display = 'block';
  // }
  
  // $('.add').on('click', add);
  // $('.remove').on('click', remove);
  
  // function addSkills() {
  //   var skill_no = parseInt($('#add').val()) + 1;
  //   // var new_input = "<input type='text' id='new_" + new_chq_no + "'>";
  //   let new_input = "<input type='text' placeholder='Enter Your Skill' class='skills' " + skill_noskill1 +" name='skill1'>";
  //   // <span class='error'> </span>";
  //   $('#new_chq').append(new_input);
  
  //   $('#total_chq').val(skill_no);
  // }
  
  // function removeSkills() {
  //   var last_chq_no = $('#total_chq').val();
  
  //   if (last_chq_no > 1) {
  //     $('#new_' + last_chq_no).remove();
  //     $('#total_chq').val(last_chq_no - 1);
  //   }
  // }
  
  
  
  // $('.add').on('click', add);
  // $('.remove').on('click', remove);
  
  // function add() {
  //   var new_chq_no = parseInt($('#total_chq').val()) + 1;
  //   var new_input = "<input type='text' id='new_" + new_chq_no + "'>";
  
  //   $('#new_chq').append(new_input);
  
  //   $('#total_chq').val(new_chq_no);
  // }
  
  // function remove() {
  //   var last_chq_no = $('#total_chq').val();
  
  //   if (last_chq_no > 1) {
  //     $('#new_' + last_chq_no).remove();
  //     $('#total_chq').val(last_chq_no - 1);
  //   }
  // }
  // <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  // <input type="text">
  // <button class="add">Add</button>
  // <button class="remove">remove</button>
  // <div id="new_chq"></div>
  // <input type="hidden" value="1" id="total_chq"></input>