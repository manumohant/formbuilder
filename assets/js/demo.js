jQuery(function($) {
  var i=0;
  var submitrulenumber=0;
  var computelogicnumber=0;
  var rulenumber=[];
  var rulenumbercnt=0;
  rulenumber[0]=[];
  var conditionArray = [];
  var firstHalf = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>{{FormHeading}}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <style>
  
  @media (min-width:1000px) and (max-width: 5000px) {
    .main-div {width:80%; margin-bottom:15px; margin-left:auto; margin-right:auto; display:inline-block; text-align:left;}
    .main-div h2 {color: #0099FF; font-weight: 600; margin: 0; font-size:16px; text-align:left; font-family: "Open Sans", sans-serif;}
    .left-div { width:25%; margin-bottom:15px; float:left; height:40px;}
    .left-div1 { width:73%; margin-bottom:15px; float:left; height:40px;}
    .left-div h2 { color: #393939; font-weight: 600; margin: 0; font-size:13px; text-align:left; font-family: "Open Sans", sans-serif;}
    .in-with { width:90%; height:26px}
    .in-with1 { width:92%; height: 32px;}
    .div-three { width:33%; float:left;}
    }
  
    @media (min-width: 700px) and (max-width: 999px) {
      .main-div {width:95%; margin-bottom:10px; display:inline-block;}
      .main-div h2 {color: #0099FF; font-weight: 600; margin: 0; font-size:16px; text-align:left; font-family: "Open Sans", sans-serif;}
      .left-div { width:25%; float:left;  height:40px;}
      .left-div1 { width:73%; margin-bottom:15px; float:left; height:40px;}
      .left-div h2 { color: #393939; font-weight: 600; margin: 0; font-size:16px; font-family: "Open Sans", sans-serif;}
      .in-with { width:90%;}
      .in-with1 { width:92%; height: 25px;}
      .div-three { width:32%; float:left;}
      }
  
      @media (min-width: 70px) and (max-width: 699px) {
        .hide1 { display:none !important; visibility:hidden !important;}
        .main-div {width:90%; margin-bottom:10px; display:inline-block;}
        .main-div h2 { color: #0099FF; font-weight: 600; margin: 0; font-size:16px; font-family: "Open Sans", sans-serif;}
        .left-div { width:100%; float:left; margin-bottom:10px; vertical-align:middle; font-size:12px; text-align:left;}
  .left-div1 { width:95%; float:left; margin-bottom:10px; vertical-align:middle; font-size:12px; text-align:left;}
  .in-with { width:95%;  height: 25px;}
  .in-with1 { width:97%; height: 28px;}
  }
  select option {width:300px; font-size: 12px; word-wrap: break-word;}
  b {color:grey;}
  </style>
  </head>
  <body style="font-family: 'Open Sans', sans-serif; background-image:none;">
  <div style="width:100%;">
  <div style="text-align:center;">
  <h4>{{FormHeading}}</h4>
    </div>
    </div>
  <div style="margin:auto; text-align:center;">
    <div id="mainFormHolder" class="main-div" style="border:1px solid #ccc; border-radius: 13px; padding:10px;">;`;
    var secondHalf=
    `</div>
    </div>
    </body>
    </html>`;

  var validationScriptString = `
  function IsEmpty(val)
  {
    if(!val || val=='') return true;
    else return false;
  }
  function IsAlphabet(val)
  {
    if(IsEmpty(val)) return false;
    
    var letters = /^[A-Za-z]+$/;
    if(val.match(letters)) return true;
    else return false;
  }
  function IsNumeric(val)
  {
    if(IsEmpty(val)) return false;
    
    if(isNaN(val)) return false;
    else return true;
  }
  function IsAlphaNumeric(val)
  {
    if(IsEmpty(val)) return false;
    
    var letterNumber = /^[0-9a-zA-Z]+$/;
    if(val.match(letterNumber)) return true;
    else return false;
  }
  function IsValidEMail(val) 
  {
    if(IsEmpty(val)) return false;
    
    var atpos = val.indexOf("@");
    var dotpos = val.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        return false;
    }
    else{
      return true;
    }
      
  }
  function IsValidPhone(str) 
  {
    if(IsEmpty(str)) return false;
    if(IsAlphabet(str)) return false;
    str = str.replace(/[^a-zA-Z0-9]/g, '');
    if(IsNumeric(str)) return true;
    return false;
  }
  function IsValidURL(string)
  {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;  
    }
  }
  `;
  addRule();

  var fields = [
    {
      type: 'autocomplete',
      label: 'Custom Autocomplete',
      required: true,
      values: [
        {label: 'SQL'},
        {label: 'C#'},
        {label: 'JavaScript'},
        {label: 'Java'},
        {label: 'Python'},
        {label: 'C++'},
        {label: 'PHP'},
        {label: 'Swift'},
        {label: 'Ruby'}
      ]
    },
    {
      label: 'Star Rating',
      attrs: {
        type: 'starRating'
      },
      icon: '🌟'
    }
  ];

  var replaceFields = [
    {
      type: 'textarea',
      subtype: 'tinymce',
      label: 'tinyMCE',
      required: true,
    }
  ];

  var actionButtons = [{
    id: 'smile',
    className: 'btn btn-success',
    label: '😁',
    type: 'button',
    events: {
      click: function() {
        alert('😁😁😁 !SMILE! 😁😁😁');
      }
    }
  }];

  var templates = {
    starRating: function(fieldData) {
      return {
        field: '<span id="'+fieldData.name+'">',
        onRender: function() {
          $(document.getElementById(fieldData.name)).rateYo({rating: 3.6});
        }
      };
    }
  };

  var inputSets = [{
        label: 'User Details',
        icon: '👨',
        name: 'user-details', // optional
        showHeader: true, // optional
        fields: [{
          type: 'text',
          label: 'First Name',
          className: 'form-control'
        }, {
          type: 'select',
          label: 'Profession',
          className: 'form-control',
          values: [{
            label: 'Street Sweeper',
            value: 'option-2',
            selected: false
          }, {
            label: 'Brain Surgeon',
            value: 'option-3',
            selected: false
          }]
        }, {
          type: 'textarea',
          label: 'Short Bio:',
          className: 'form-control'
        }]
      }, {
        label: 'User Agreement',
        fields: [{
          type: 'header',
          subtype: 'h3',
          label: 'Terms & Conditions',
          className: 'header'
        }, {
          type: 'paragraph',
          label: 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.',
        }, {
          type: 'paragraph',
          label: 'Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.',
        }, {
          type: 'checkbox',
          label: 'Do you agree to the terms and conditions?',
        }]
      }];

  var typeUserDisabledAttrs = {
    autocomplete: ['access']
  };

  var typeUserAttrs = {
    text: {
      className: {
        label: 'Class',
        options: {
          'red form-control': 'Red',
          'green form-control': 'Green',
          'blue form-control': 'Blue'
        },
        style: 'border: 1px solid red'
      }
    }
  };

  // test disabledAttrs
  var disabledAttrs = ['placeholder'];

  var fbOptions = {
    subtypes: {
      text: ['datetime-local']
    },
    onSave: function(e, formData) {
      //toggleEdit();
      document.getElementsByClassName("render-wrap")[0].style.display="block";
      // document.body.classList.toggle('form-rendered', false);
      $('.render-wrap').formRender({
        formData: formData,
        templates: templates
      });
      renderJS();
      
      window.sessionStorage.setItem('formData', JSON.stringify(formData));
    },
    stickyControls: {
      enable: true
    },
    sortableControls: true,
    // fields: fields,
    templates: templates,
    // inputSets: inputSets,
    typeUserDisabledAttrs: typeUserDisabledAttrs,
    typeUserAttrs: typeUserAttrs,
    disableInjectedStyle: false,
    // actionButtons: actionButtons,
    disableFields: ['autocomplete'],
    // replaceFields: replaceFields,
    disabledFieldButtons: {
      text: ['copy']
    }
    // controlPosition: 'left'
    // disabledAttrs
  };
  var formData = window.sessionStorage.getItem('formData');
  var editing = true;

  if (formData) {
    fbOptions.formData = JSON.parse(formData);
  }

  /**
   * Toggles the edit mode for the demo
   * @return {Boolean} editMode
   */
  function toggleEdit() {
    document.body.classList.toggle('form-rendered', editing);
    var a = document.getElementById("a");
    a.style.display="none";
    if(!editing){
      document.getElementById("viewHTMLButton").style.display="none";
      document.getElementById("conditionDivMain").style.display="block";
    }
    else{
      document.getElementById("viewHTMLButton").style.display="block";
      document.getElementById("conditionDivMain").style.display="none";
    }
    return editing = !editing;
  }

  var setFormData = '[{"type":"text","label":"Full Name","subtype":"text","className":"form-control","name":"text-1476748004559"},{"type":"select","label":"Occupation","className":"form-control","name":"select-1476748006618","values":[{"label":"Street Sweeper","value":"option-1","selected":true},{"label":"Moth Man","value":"option-2"},{"label":"Chemist","value":"option-3"}]},{"type":"textarea","label":"Short Bio","rows":"5","className":"form-control","name":"textarea-1476748007461"}]';

  var formBuilder = $('.build-wrap').formBuilder(fbOptions);
  var fbPromise = formBuilder.promise;
  document.addEventListener('fieldAdded', function(){
    setTimeout(function(){
      updateFieldDropdowns();
      $('.render-wrap').formRender({
        formData: formBuilder.formData,
        templates: templates
      });
      renderJS();
      },100);
  });
  
 
  document.addEventListener('fieldRemoved', function(){
    setTimeout(function(){
    updateFieldDropdowns();
    $('.render-wrap').formRender({
      formData: formBuilder.formData,
      templates: templates
    });
    renderJS();
    },500);
  });
  
  [].forEach.call
  (
    document.getElementsByClassName("refresharea"),
    function(sel){
      sel.addEventListener("click",function(e){
        $('.render-wrap').formRender({
          formData: formBuilder.formData,
          templates: templates
        });
        renderJS();
      })
    }
  );
  [].forEach.call
  (
    document.getElementsByClassName("refreshrules"),
    function(sel){
      sel.addEventListener("click",function(e){
        updateFieldDropdowns();
        
      })
    }
  );

  function updateFieldDropdowns()
  {
    var frmData=JSON.parse(formBuilder.actions.getData('json', true));
    var lclCnt=0;
    for(lclCnt=0;lclCnt<=rulenumbercnt;lclCnt++){
      $("#wantToFields"+lclCnt).empty();
      var wantToField = document.getElementById("wantToFields"+lclCnt);
      dropdownOptionsGenerator(frmData,wantToField);
      
    }
    for(lclCnt=0;lclCnt<=computelogicnumber;lclCnt++){
      $("#computelogicvalueof"+lclCnt).empty();
      var computelogicvalueof = document.getElementById("computelogicvalueof"+lclCnt);
      dropdownOptionsGenerator(frmData,computelogicvalueof);

      $("#fromvalueof"+lclCnt).empty();
      var fromvalueof = document.getElementById("fromvalueof"+lclCnt);
      dropdownOptionsGenerator(frmData,fromvalueof);
      
    }
    
    
    $("#submitButtonList").empty();
    var submitButtonLst1=document.getElementById("submitButtonList");
    dropdownOptionsGenerator(frmData,submitButtonLst1);
    var ct=0;
    for(ct=0;ct<=submitrulenumber;ct++){
      $("#submitConditionInputList"+ct).empty();
      var subconlist=document.getElementById("submitConditionInputList"+ct);
      dropdownOptionsGenerator(frmData,subconlist);
    }

    
  }

  fbPromise.then(function(fb) {
    document.getElementsByClassName("render-wrap")[0].style.display="block";
    var apiBtns = {
      // showData: fb.actions.showData,
      
     
      // addField: function() {
      //   var field = {
      //       type: 'text',
      //       class: 'form-control',
      //       label: 'Text Field added at: ' + new Date().getTime()
      //     };
      //   fb.actions.addField(field);
      // },
      // removeField: function() {
      //   fb.actions.removeField();
      // },
      // testSubmit: function() {
      //   var formData = new FormData(document.forms[0]);
      //   console.log('Can submit: ', document.forms[0].checkValidity());
      //   // Display the key/value pairs
      //   console.log('FormData:', formData);
      //   for(var pair of formData.entries()) {
      //      console.log(pair[0]+ ': '+ pair[1]);
      //   }
      // },
      // resetDemo: function() {
      //   window.sessionStorage.removeItem('formData');
      //   location.reload();
      // }
    };
    Object.keys(apiBtns).forEach(function(action) {
      document.getElementById(action)
      .addEventListener('click', function(e) {
        apiBtns[action]();
      });
    });

    // document.getElementById('setLanguage')
    // .addEventListener('change', function(e) {
    //   fb.actions.setLang(e.target.value);
    // });

    // document.getElementById('getXML').addEventListener('click', function() {
    //   alert(formBuilder.actions.getData('xml'));
    // });
    // document.getElementById('getJSON').addEventListener('click', function() {
    //   alert(formBuilder.actions.getData('json', true));
    // });
    
    
    document.getElementById('getJS').addEventListener('click', function() {
      var js=document.createElement("script");
      js.id="jsScript";
      var str="";
      for(var k in rulenumber)
      {
        var iWantTo=document.getElementById("iWantTo"+k);
        var val = iWantTo.options[iWantTo.selectedIndex].value

        var conditionSelect=document.getElementById("conditionSelect"+k);
        var conditionSelectValue = conditionSelect.options[conditionSelect.selectedIndex].value
        str += checkAgainst(val,conditionSelectValue,k);
        
        
      }

      js.innerHTML="(function(){"+str+"})()";
      try{
        var item = document.getElementById("jsScript");
        item.parentNode.removeChild(item);
      }
      catch(e){

      }
      document.getElementById("render-wrap").appendChild(js);
      var str=document.getElementById("render-wrap").outerHTML;
      download(str);
    });
  });

  document.getElementById('edit-form').onclick = function() {
    toggleEdit();
  };
  
  // document.getElementById('addRule').onclick=function(){
    
  // }
  document.getElementById('addNewrule').onclick=function(){
    rulenumbercnt=rulenumbercnt+1;
    addRule();
  }
  function addRule(){
    
    ruleCreator();
    
    $('.selectcustom').select2();
    rulenumber[rulenumbercnt]=[];
    
  }
  
  function dropdownOptionsGenerator(frmData,optionField)
  {
    if(!optionField) return;
    frmData.forEach(function(elmt){
      if(elmt.name){
        var opt = document.createElement('option');
        opt.value = elmt.name;
        opt.innerHTML = elmt.name;
        optionField.appendChild(opt);
      }
    });
  }
  function equalsOptionGenerator(optionField)
  {
    var arr=['Equals','Not Equals','Contains'];
    arr.forEach(function(elmt){
      
      var opt = document.createElement('option');
      opt.value = elmt;
      opt.innerHTML = elmt;
      optionField.appendChild(opt);
    });
  }
  function ruleCreator()
  {
    var parentDiv=document.getElementById("rulediv");
    var borderDiv = document.createElement("div");

    borderDiv.id="borderDiv"+rulenumbercnt;
    borderDiv.style.borderStyle="solid";
    borderDiv.style.borderRadius="5px";
    
    var div1=document.createElement("div");
    div1.style.margin="10px";

    var wantTolabel = document.createElement("label");
    wantTolabel.innerHTML="I want to";
    wantTolabel.style.paddingRight="10px";

    var wantedsSelect = document.createElement("select");
    wantedsSelect.innerHTML="<option>Show</option><option>Hide</option><option>Disable</option><option>Enable</option>";
    wantedsSelect.className="selectcustom";
    wantedsSelect.id="iWantTo"+rulenumbercnt;
    wantedsSelect.name="iWantTo"+rulenumbercnt;
    wantedsSelect.style.width="10%";

    var fieldsLabel = document.createElement("label");
    fieldsLabel.innerHTML="Field(s)";
    fieldsLabel.style.paddingRight="10px";
    fieldsLabel.style.paddingLeft="10px";

    var wantToFields =document.createElement("select");
    wantToFields.className="selectcustom";
    wantToFields.id="wantToFields"+rulenumbercnt;
    wantToFields.name="wantToFields"+rulenumbercnt;
    wantToFields.multiple="multiple";
    wantToFields.style.width="60%";
    wantToFields.style.paddingRight="10px";
    if(formBuilder){
      var frmData=JSON.parse(formBuilder.actions.getData('json', true));
      dropdownOptionsGenerator(frmData,wantToFields);
    }

    div1.appendChild(wantTolabel);
    div1.appendChild(wantedsSelect);
    div1.appendChild(fieldsLabel);
    div1.appendChild(wantToFields);

    var div2 = document.createElement("div");
    div2.style.margin="10px";

    var ifLabel = document.createElement("label");
    ifLabel.innerHTML="If";
    ifLabel.style.paddingRight="10px";

    var wantedsIfSelect = document.createElement("select");
    wantedsIfSelect.innerHTML="<option>All</option><option>None</option><option>Any</option>";
    wantedsIfSelect.className="selectcustom";
    wantedsIfSelect.id="conditionSelect"+rulenumbercnt;
    wantedsIfSelect.name="conditionSelect"+rulenumbercnt;
    wantedsIfSelect.style.width="10%";
  

    var ifRuleLabel = document.createElement("label");
    ifRuleLabel.innerHTML="of following rules matches";
    ifRuleLabel.style.paddingLeft="10px";

    div2.appendChild(ifLabel);
    div2.appendChild(wantedsIfSelect);
    div2.appendChild(ifRuleLabel);

    var div3=document.createElement("div");
    div3.id="conditiondiv"+rulenumbercnt;
    div3.style.margin="10px";

    var addLink=document.createElement("a");
    addLink.innerHTML="add new condition";
    addLink.id="addConditionDiv"+rulenumbercnt;
    addLink.style.margin="10px";

    borderDiv.appendChild(div1);
    borderDiv.appendChild(div2);
    borderDiv.appendChild(div3);
    borderDiv.appendChild(addLink);
    parentDiv.appendChild(borderDiv);
    document.getElementById('iWantTo'+rulenumbercnt).onchange = function() {
      //alert(formBuilder.actions.getData('json', true));
      var cnt=this.id.match(/\d+$/)[0];
      $("#wantToFields"+cnt).empty();
      var frmData=JSON.parse(formBuilder.actions.getData('json', true));
      var wantToField = document.getElementById("wantToFields"+cnt);
      dropdownOptionsGenerator(frmData,wantToField);
      
      
    };

    addLink.onclick = function()
    {
      
      var cnt=this.id.match(/\d+$/)[0];
      var conditiondiv = document.getElementById("conditiondiv"+cnt);
      conditionCreator(conditiondiv,cnt);
      i++;
      $('.selectcustom').select2();
    };

    
    
  }

  function conditionCreator(conditiondiv,cnt)
  {
    var ifLabel=document.createElement("label");
    ifLabel.style.paddingRight="10px";
    ifLabel.innerHTML="If ";
    rulenumber[cnt].push(i);
    
    var div = document.createElement("div");
    var selectList = document.createElement("select");
    var conditionList = document.createElement("select");
    var conditionInput = document.createElement("input");
    var removeLink = document.createElement("a");
    
    div.id="div"+i;
    selectList.id = "optionField"+i;
    selectList.style.width="20%";
    selectList.className="selectcustom";
    conditionList.id = "conditionField"+i;
    conditionList.className="selectcustom";
    conditionList.style.width="15%";
    conditionInput.id="conditionInput"+i;
    removeLink.id="removeLink"+i;
    removeLink.innerHTML="Remove";
    
    var frmData=JSON.parse(formBuilder.actions.getData('json', true));
    dropdownOptionsGenerator(frmData,selectList);
    equalsOptionGenerator(conditionList);
    div.appendChild(ifLabel);
    div.appendChild(selectList);
    div.appendChild(conditionList);
    div.appendChild(conditionInput);
    div.appendChild(removeLink);
    conditiondiv.appendChild(div);
    $('.selectcustom').select2();
    document.getElementById("removeLink"+i).onclick = function() {
      var nbr=this.id.match(/\d+$/)[0];
      
      $('#div'+nbr).remove();
      var intVal=parseInt(nbr);
      for(var k in rulenumber)
      {
        var index = rulenumber[k].indexOf(intVal);
        if (index > -1) {
          rulenumber[k].splice(index, 1);
        }
      }
    };
    conditionArray.push(i);
  }

  function download(text) 
  {
    var head = document.getElementById('head').value;
    var firstHalfTemp=firstHalf.replace('{{FormHeading}}',head)
    text= firstHalfTemp+text+secondHalf;
    var a = document.getElementById("a");
    var file = new Blob([text], {type: "text/html"});
    a.href = URL.createObjectURL(file);
    a.style.display="block";
    a.download = "formHTML.html";
  }
  document.getElementById("downloadBtn").addEventListener("click",function(){
    //updateFieldDropdowns();
    $('.render-wrap').formRender({
      formData: formBuilder.formData,
      templates: templates
    });
    renderJS();
    var text=document.getElementById("render-wrap").outerHTML;
    var head = document.getElementById('head').value;
    if(!head)head="";
    var firstHalfTemp=firstHalf.replace(/{{FormHeading}}/g,head)
    text= firstHalfTemp+text+secondHalf;
    var file = new Blob([text], {type: "text/html"});
    var link = document.createElement("a");
    link.download = "formHTML.html";
    link.href = URL.createObjectURL(file);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;

  });
  function renderJS()
  {
    var js=document.createElement("script");
    js.type="text/javascript";
    js.id="jsScript";
    var str="";
    for(var k in rulenumber)
    {
      var iWantTo=document.getElementById("iWantTo"+k);
      var val = iWantTo.options[iWantTo.selectedIndex].value

      var conditionSelect=document.getElementById("conditionSelect"+k);
      var conditionSelectValue = conditionSelect.options[conditionSelect.selectedIndex].value
      str += checkAgainst(val,conditionSelectValue,k);
      
      
    }
    // form submit validation codes
    var submitstring="";
    var onclickButtonTriggerString="var onSubmitClick=validation;";
    var submitButton=document.getElementById("submitButtonList");
    if(submitButton.options[submitButton.selectedIndex])
    {
      submitstring+="function validation(){";
      var val = submitButton.options[submitButton.selectedIndex].value;
      onclickButtonTriggerString += `
      $('#`+val+`').bind('click',onSubmitClick);`;
      var cont = 0
      for(cont=0;cont<=submitrulenumber;cont++)
      {
        var submitConditionInputList = document.getElementById("submitConditionInputList"+cont);
        if(!submitConditionInputList) continue;
        var submitConditionInputVal = submitConditionInputList.options[submitConditionInputList.selectedIndex].value;
  
        var submitConditionOperationList=document.getElementById("submitConditionOperationList"+cont);
        var submitConditionOperationVal =  submitConditionOperationList.options[submitConditionOperationList.selectedIndex].value;
  
        var submitConditionValueList=document.getElementById("submitConditionValueList"+cont);
        var submitConditionValueVal=submitConditionValueList.options[submitConditionValueList.selectedIndex].value;
        
        var operator="";
        if(submitConditionOperationVal=="Is") operator="!";
        if(submitConditionValueVal=="Not Empty")
        {
          submitstring+=`
          if(`+operator+operator+`IsEmpty(document.getElementsByName('`+submitConditionInputVal+`')[0].value))
          {
            alert("value should not be empty ");
            return false;
          }`;
        }
        else if(submitConditionValueVal=="Alphabet")
        {
          submitstring+=`if(`+operator+`IsAlphabet(document.getElementsByName('`+submitConditionInputVal+`')[0].value))
          {
            alert("value must be an alphabet");
            return false;
          }`;
        }
        else if(submitConditionValueVal=="Numeric")
        {
          submitstring+=`if(`+operator+`IsNumeric(document.getElementsByName('`+submitConditionInputVal+`')[0].value))
          {
            alert("value must be an numeric");
            return false;
          }`;
        }
        else if(submitConditionValueVal=="Alpha numeric")
        {
          submitstring+=`if(`+operator+`IsAlphaNumeric(document.getElementsByName('`+submitConditionInputVal+`')[0].value))
          {
            alert("value must be alpha numeric");
            return false;
          }`;
        }
        else if(submitConditionValueVal=="EMail")
        {
          submitstring+=`if(`+operator+`IsValidEMail(document.getElementsByName('`+submitConditionInputVal+`')[0].value))
          {
            alert("Please enter valid email");
            return false;
          }`;
        }
        else if(submitConditionValueVal=="Phone Number")
        {
          submitstring+=`if(`+operator+`IsValidPhone(document.getElementsByName('`+submitConditionInputVal+`')[0].value))
          {
            alert("Please enter valid phone number");
            return false;
          }`;
        }
        else if(submitConditionValueVal=="URL")
        {
          submitstring+=`if(`+operator+`IsValidURL(document.getElementsByName('`+submitConditionInputVal+`')[0].value))
          {
            alert("Please enter valid URL");
            return false;
          }`;
        }
        
      }
      



      submitstring+=`
      return true;
    }`;
    }
    //form compute logic
    var computelogicstring="";
    if(computelogicnumber>=0)
    {
      var ct=0;
      for(ct=0;ct<=computelogicnumber;ct++)
      {
        var computelogicvalueofList = document.getElementById("computelogicvalueof"+ct);
        if(!computelogicvalueofList) continue;
        if(!computelogicvalueofList.options[computelogicvalueofList.selectedIndex]) continue;
        var computelogicvalueofVal = computelogicvalueofList.options[computelogicvalueofList.selectedIndex].value;
  
        var fromvalueofList = document.getElementById("fromvalueof"+ct);
        var fromvalueofListVal = fromvalueofList.options[fromvalueofList.selectedIndex].value;

        var oprList = document.getElementById("operand"+ct);
        var operandVal = oprList.options[oprList.selectedIndex].value;
        
        var inputVal = document.getElementById("inputval"+ct).value;
        if(!inputVal)continue;
        computelogicstring+=`
        var fromvalueofListVal`+ct+` = document.getElementById('`+fromvalueofListVal+`');
        var computelogicvalueofVal`+ct+` = document.getElementById('`+computelogicvalueofVal+`');
        
        computelogicvalueofVal`+ct+`.readOnly =true;
        fromvalueofListVal`+ct+`.addEventListener("change", function(){
          var compval = fromvalueofListVal`+ct+`.value;
          var opr = '`+operandVal+`';
          var inputval = `+inputVal+`;
          computelogicvalueofVal`+ct+`.value = eval(compval+opr+inputval);
        }); 
        
        `;
      }
     
    }
    str+=submitstring;
    str+=computelogicstring;
    str+=onclickButtonTriggerString;
    str+=validationScriptString;
    //js.innerHTML="(function(){"+str+"})()";
    js.innerHTML=`
    `+str+`
    `;
    try{
      var item = document.getElementById("jsScript");
      item.parentNode.removeChild(item);
    }
    catch(e){

    }
    var col_class="col-sm-6";
    var columnNumber = $("#columnSelection").val();
    if(columnNumber==1)col_class="col-sm-12";
    else if(columnNumber==3)col_class="col-sm-4";
    else col_class="col-sm-6";
    document.getElementById("render-wrap").appendChild(js);
    var innerHTML = document.getElementById("render-wrap").innerHTML;
    innerHTML = innerHTML.replace(/form-group/g, 'form-group '+col_class);
    var button_replace="fb-button form-group "+col_class;
    var re = new RegExp(button_replace,"g");
    document.getElementById("render-wrap").innerHTML=innerHTML.replace(re, 'fb-button form-group col-sm-12');
    var noteLabel=document.createElement("label");
    noteLabel.innerHTML="Note:Please avoid using special characters like %,&,etc in input values";
    noteLabel.className="col-sm-12";
    document.getElementById("rendered-form").appendChild(noteLabel);
    // var str=document.getElementById("render-wrap").outerHTML;
    // download(str);
  }
  function checkAgainst(action,con,k)
  {
    var JSString = "";
    var selectedValues = [];  
    var conditionArray = rulenumber[k];

    
    $("#wantToFields"+k+" :selected").each(function(){

        selectedValues.push($(this).val()); 
    });
    if(selectedValues.length<=0) return"";
    selectedValues.forEach(function(flds){
      if(action=="Show")JSString+='[].forEach.call(document.getElementsByClassName("form-group field-'+flds+'"),function(sel){sel.style.display="none"});';
      else if(action=="Hide")JSString+='[].forEach.call(document.getElementsByClassName("form-group field-'+flds+'"),function(sel){sel.style.display="block"});';
      else if(action=="Disable")JSString+='[].forEach.call(document.getElementsByName("'+flds+'"),function(sel){sel.disabled=false});';
      else if(action=="Enable")JSString+='[].forEach.call(document.getElementsByName("'+flds+'"),function(sel){sel.disabled=true});';
    });
        

    conditionArray.forEach(function(nbr){

      
      var lhsElement=document.getElementById("optionField"+nbr);
      var lhsValue= lhsElement.options[lhsElement.selectedIndex].value;
      var rhsValue=document.getElementById("conditionInput"+nbr).value;

      JSString+='document.getElementsByName("'+lhsValue+'")[0]'+
      '.addEventListener("change", function(e) {'+
        "conditionCheck"+k+"();"+
      '});';
    });
    JSString+="function conditionCheck"+k+"(){";
    
    conditionArray.forEach(function(nbr){
      var lhsElement=document.getElementById("optionField"+nbr);
      var lhsValue= lhsElement.options[lhsElement.selectedIndex].value;
      var rhsValue=document.getElementById("conditionInput"+nbr).value;
      var comparisonElement=document.getElementById("conditionField"+nbr);
      var comparisonValue=comparisonElement.options[comparisonElement.selectedIndex].value;
      
      JSString+="var val"+nbr+"=document.getElementsByName('"+lhsValue+"')[0].value;";
      
      

    });
    var temp_string="if(";
    var cur_cnt=0;
    var oprn="";
    if(con=="All") oprn="&&";
    else if(con=="None") oprn="&&";
    else if(con=="Any") oprn="||";
    
    conditionArray.forEach(function(nbr){
      var comparisonElement=document.getElementById("conditionField"+nbr);
      var comparisonValue=comparisonElement.options[comparisonElement.selectedIndex].value;
      var rhsValue=document.getElementById("conditionInput"+nbr).value;
      rhsValue="'"+rhsValue+"'";
      if(comparisonValue=="Equals"){
        
        temp_string+='val'+nbr+'=='+rhsValue;
      }
      else if(comparisonValue=="Not Equals"){
        temp_string+='val'+nbr+'!='+rhsValue; 
      }
      else if(comparisonValue=="Contains"){
        temp_string+='val'+nbr+'.indexOf('+rhsValue+')!==-1';  
      }

      if(cur_cnt<conditionArray.length-1){
        temp_string+=oprn;
      }
      cur_cnt++;
      

    });
    
    JSString+=temp_string+"){";
    if(action=="Disable"){
      selectedValues.forEach(function(flds){
        if(con!="None")
          //JSString+='document.getElementsByName("'+flds+'")[0].disabled =true;';
          JSString+='[].forEach.call(document.getElementsByName("'+flds+'"),function(sel){sel.disabled=true});';
        else
        JSString+='[].forEach.call(document.getElementsByName("'+flds+'"),function(sel){sel.disabled=false});';
      });
      JSString+='}else{';
      selectedValues.forEach(function(flds){
        if(con!="None")
        JSString+='[].forEach.call(document.getElementsByName("'+flds+'"),function(sel){sel.disabled=false});';
        else
        JSString+='[].forEach.call(document.getElementsByName("'+flds+'"),function(sel){sel.disabled=true});';
      });
      JSString+='}';
    }
    else if(action=="Enable"){
      selectedValues.forEach(function(flds){
        if(con!="None")
        JSString+='[].forEach.call(document.getElementsByName("'+flds+'"),function(sel){sel.disabled=false});';
        else
        JSString+='[].forEach.call(document.getElementsByName("'+flds+'"),function(sel){sel.disabled=true});';
      });
      JSString+='}else{';
      selectedValues.forEach(function(flds){
        if(con!="None")
        JSString+='[].forEach.call(document.getElementsByName("'+flds+'"),function(sel){sel.disabled=true});';
        else
        JSString+='[].forEach.call(document.getElementsByName("'+flds+'"),function(sel){sel.disabled=false});';
      });
      JSString+='}';
    }
    else if(action=="Show"){
      selectedValues.forEach(function(flds){
        if(con!="None")
        JSString+='[].forEach.call(document.getElementsByClassName("form-group field-'+flds+'"),function(sel){sel.style.display="block"});';
        else
        JSString+='[].forEach.call(document.getElementsByClassName("form-group field-'+flds+'"),function(sel){sel.style.display="none"});';
      });
      JSString+='}else{';
      selectedValues.forEach(function(flds){
        if(con!="None")
        JSString+='[].forEach.call(document.getElementsByClassName("form-group field-'+flds+'"),function(sel){sel.style.display="none"});';
        else
        JSString+='[].forEach.call(document.getElementsByClassName("form-group field-'+flds+'"),function(sel){sel.style.display="block"});';
      });
      JSString+='}';
    }
    else if(action=="Hide"){
      selectedValues.forEach(function(flds){
        if(con!="None")
        JSString+='[].forEach.call(document.getElementsByClassName("form-group field-'+flds+'"),function(sel){sel.style.display="none"});';
        else
        JSString+='[].forEach.call(document.getElementsByClassName("form-group field-'+flds+'"),function(sel){sel.style.display="block"});';
      });
      JSString+='}else{';
      selectedValues.forEach(function(flds){
        if(con!="None")
        JSString+='[].forEach.call(document.getElementsByClassName("form-group field-'+flds+'"),function(sel){sel.style.display="block"});';
        else
        JSString+='[].forEach.call(document.getElementsByClassName("form-group field-'+flds+'"),function(sel){sel.style.display="none"});';
      });
      JSString+='}';
    }

    JSString+="}";
    
    return JSString;
  }

  document.getElementById("columnSelection").addEventListener("change",function(){
    //updateFieldDropdowns();
    $('.render-wrap').formRender({
      formData: formBuilder.formData,
      templates: templates
    });
    renderJS();
  })
document.getElementById("addComputeLogic").onclick=computeRuleCreator;
function computeRuleCreator()
{
  var parentDiv=document.getElementById("computeLogicDiv");
  var scopeDiv = document.createElement("div");
  scopeDiv.id="scopediv"+computelogicnumber;
  scopeDiv.style.margin="10px";
  var scopelabel = document.createElement("label");
  scopelabel.innerHTML="value of"
  scopelabel.style.paddingRight="10px";

  var computelogicvalueof = document.createElement("select");
  computelogicvalueof.id = "computelogicvalueof"+computelogicnumber;
  computelogicvalueof.style.width="20%";
  computelogicvalueof.className="selectcustom";
  if(formBuilder){
    var frmData=JSON.parse(formBuilder.actions.getData('json', true));
    dropdownOptionsGenerator(frmData,computelogicvalueof);
  }
  var fromlabel = document.createElement("label");
  fromlabel.innerHTML="From value of "
  fromlabel.style.paddingRight="10px";

  var fromvalueof = document.createElement("select");
  fromvalueof.id = "fromvalueof"+computelogicnumber;
  fromvalueof.style.width="20%";
  fromvalueof.style.paddingRight="10px";
  fromvalueof.className="selectcustom";
  if(formBuilder){
    var frmData=JSON.parse(formBuilder.actions.getData('json', true));
    dropdownOptionsGenerator(frmData,fromvalueof);
  }


  var operand = document.createElement("select");
  operand.id = "operand"+computelogicnumber;
  operand.style.width="5%";
  operand.style.paddingRight="10px";
  operand.className="selectcustom";
  operand.innerHTML=`<option>*</option>
  <option>+</option>
  <option>-</option>
  <option>/</option>`;
  var inputval = document.createElement("input");
  inputval.id="inputval"+computelogicnumber;
  inputval.style.width="20%";
  inputval.style.paddingRight="10px";
  scopeDiv.appendChild(scopelabel);
  scopeDiv.appendChild(computelogicvalueof);
  scopeDiv.appendChild(fromlabel);
  scopeDiv.appendChild(fromvalueof);
  scopeDiv.appendChild(operand);
  scopeDiv.appendChild(inputval);

  parentDiv.appendChild(scopeDiv);

  $('.selectcustom').select2();
  computelogicnumber++;
}
document.getElementById("addformrule").onclick=  function submitruleCreator()
{
  var parentDiv=document.getElementById("submitValidationconditions");
  var scopeDiv = document.createElement("div");
  scopeDiv.id="scopediv"+submitrulenumber;
  scopeDiv.style.margin="10px";
  var scopelabel1 = document.createElement("label");
  scopelabel1.innerHTML="If"
  scopelabel1.style.paddingRight="10px";
  var submitConditionInputList = document.createElement("select");
  submitConditionInputList.id = "submitConditionInputList"+submitrulenumber;
  submitConditionInputList.style.width="20%";
  submitConditionInputList.className="selectcustom";
  if(formBuilder){
    var frmData=JSON.parse(formBuilder.actions.getData('json', true));
    dropdownOptionsGenerator(frmData,submitConditionInputList);
  }

  var submitConditionOperationList = document.createElement("select");
  submitConditionOperationList.id = "submitConditionOperationList"+submitrulenumber;
  submitConditionOperationList.style.width="10%";
  submitConditionOperationList.className="selectcustom";
  submitConditionOperationList.innerHTML=`<option>Is</option>
  <option>Is Not</option>`;

  var submitConditionValueList = document.createElement("select");
  submitConditionValueList.id = "submitConditionValueList"+submitrulenumber;
  submitConditionValueList.style.width="20%";
  submitConditionValueList.className="selectcustom";
  submitConditionValueList.innerHTML=`<option>Not Empty</option>
  <option>Alphabet</option>
  <option>Numeric</option>
  <option>Alpha numeric</option>
  <option>EMail</option>
  <option>Phone Number</option>
  <option>URL</option>`;

  scopeDiv.appendChild(scopelabel1);
  scopeDiv.appendChild(submitConditionInputList);
  scopeDiv.appendChild(submitConditionOperationList);
  scopeDiv.appendChild(submitConditionValueList);
  parentDiv.appendChild(scopeDiv);

  $('.selectcustom').select2();
  submitrulenumber++;
};
  
});
