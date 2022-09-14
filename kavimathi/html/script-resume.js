function preview_image(event) 
{
 var reader = new FileReader();
 reader.onload = function()
 {
  var output = document.getElementById('output_image');
  output.src = reader.result;
 }
 reader.readAsDataURL(event.target.files[0]);
}

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

  if (flag) {
    document.getElementById(`submit${num}`).disabled = false; // submit-1 enabled
    // document.getElementById(`submit${num}`).active = false;
    document.getElementById(`page-${num}`).style.display = 'none'; // page-1 none
    document.getElementById(id).style.display = 'block'; // id = page-2  visible
  }

}



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
    const errorEle = ele.nextSibling.nextSibling;
    // const errorEle = ele.nextElementSibling.nextElementSibling;
    if (ele.value === '') {
      flag = false;
      let names = `${(id[i].name).charAt(0).toUpperCase() + (id[i].name).slice(1)}`;
      errorEle.innerText = `Enter ${(names).split('_').join(' ')}`;
    } else if (!ele.value.match(id[i].regex)) {
      flag = false;
      errorEle.innerText = 'Enter valid input';
    } else if (ele.value.length < id[i].min) {
      flag = false;
      errorEle.innerText = `Enter atleast ${(id[i].min)} letters`;
    } else if (ele.value.length > id[i].max) {
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


let skillIndex = 1;
const addSkills = document.getElementById('add');
addSkills.addEventListener('click', addNewSkill);

function addNewSkill() {
  skillIndex += 1; 
  const skill = document.getElementById('page-3');
  skill.className = 'form-floating mb-3 mt-3 page-detail skills-div';
  const divTag = document.createElement('div');
  divTag.setAttribute('id', `skills-${skillIndex}`);
  divTag.className = 'form-floating mb-3 mt-3 div-1';
  const heading = document.createElement('h4');
  const content = document.createTextNode(`SKILL ${skillIndex}`);
  heading.appendChild(content);
  divTag.appendChild(heading);
  const inputTag = document.createElement('input');
  inputTag.type = 'text';
  // inputTag.className = (`skills-${skillIndex}`);
  inputTag.placeholder = (`Enter Your Skill ${skillIndex}`);
  inputTag.name = (`skill${skillIndex}`);
  divTag.appendChild(inputTag);
  const removeButton = document.createElement('button');
  removeButton.className = 'remove-skills';
  removeButton.type = 'button';
  // removeButton.setAttribute('id', `skills-${skillIndex}`);
  removeButton.innerHTML = 'Remove';
  divTag.appendChild(removeButton);
  removeButton.onclick = () => {
    console.log(removeButton.parentElement);
    removeSkills(removeButton.parentElement);
  }
  // removeButton.addEventListener('click',removeSkills(removeButton.parentElement));

  skill.appendChild(divTag);
  // console.log(removeButton);

 
  function removeSkills(className) {
    const num = className.getAttribute('id').split('-')[1];
    if(skillIndex === num) {
      className.remove();
    } else {
      for(let i = num; i <skillIndex; i++) {
        const number = parseInt(i) + 1;
        const presentEleChilds = document.getElementById(`skills-${i}`).childNodes;
        console.log(presentEleChilds);
        const nextEleChilds = document.getElementById(`skills-${number}`).childNodes;
        console.log(nextEleChilds);
        presentEleChilds[1].value = nextEleChilds[1].value;  
      }
    }
    document.getElementById(`skills-${skillIndex}`).remove();
    skillIndex--;
    console.log(skillIndex);
}

}